import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';

// F0-03 fixture: a small durable coordinator, not production queue code.
export class Coordinator {
  constructor(path, clock = Date.now) {
    this.clock = clock;
    this.db = new DatabaseSync(path);
    this.db.exec('PRAGMA journal_mode=WAL');
    this.db.exec('PRAGMA busy_timeout=2000');
    this.db.exec(`CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY, status TEXT NOT NULL, approved INTEGER NOT NULL,
      owner TEXT, lease_until INTEGER, effect_key TEXT, version INTEGER NOT NULL DEFAULT 0
    )`);
    this.db.exec(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT, task_id TEXT NOT NULL,
      kind TEXT NOT NULL, at INTEGER NOT NULL
    )`);
  }

  close() { this.db.close(); }
  get(id) { return this.db.prepare('SELECT * FROM tasks WHERE id=?').get(id); }
  events(id) { return this.db.prepare('SELECT kind FROM events WHERE task_id=? ORDER BY id').all(id).map(row => row.kind); }

  create(id, needsApproval = false) {
    return this.#transaction(() => {
      this.db.prepare('INSERT INTO tasks (id,status,approved) VALUES (?,?,?)')
        .run(id, needsApproval ? 'awaiting_approval' : 'pending', needsApproval ? 0 : 1);
      this.#event(id, needsApproval ? 'approval_requested' : 'queued');
    });
  }

  approve(id) {
    return this.#transaction(() => {
      const changed = this.db.prepare("UPDATE tasks SET status='pending', approved=1, version=version+1 WHERE id=? AND status='awaiting_approval'").run(id);
      if (!changed.changes) return false;
      this.#event(id, 'approved');
      return true;
    });
  }

  claim(id, leaseMs = 30_000) {
    const owner = randomUUID();
    return this.#transaction(() => {
      const now = this.clock();
      const changed = this.db.prepare("UPDATE tasks SET status='running', owner=?, lease_until=?, version=version+1 WHERE id=? AND status='pending' AND approved=1")
        .run(owner, now + leaseMs, id);
      if (changed.changes) this.#event(id, 'claimed');
      return changed.changes ? owner : null;
    });
  }

  complete(id, owner) {
    return this.#transaction(() => {
      const now = this.clock();
      const changed = this.db.prepare("UPDATE tasks SET status='completed', owner=NULL, lease_until=NULL, version=version+1 WHERE id=? AND status='running' AND owner=? AND lease_until>?")
        .run(id, owner, now);
      if (!changed.changes) return false;
      this.#event(id, 'completed');
      return true;
    });
  }

  markEffectUncertain(id, owner, effectKey) {
    return this.#transaction(() => {
      const now = this.clock();
      const changed = this.db.prepare("UPDATE tasks SET status='unknown', effect_key=?, owner=NULL, lease_until=NULL, version=version+1 WHERE id=? AND status='running' AND owner=? AND lease_until>?")
        .run(effectKey, id, owner, now);
      if (!changed.changes) return false;
      this.#event(id, 'effect_unknown');
      return true;
    });
  }

  recoverExpired() {
    return this.#transaction(() => {
      const now = this.clock();
      const expired = this.db.prepare("SELECT id FROM tasks WHERE status='running' AND lease_until<=?").all(now);
      let recovered = 0;
      for (const { id } of expired) {
        const changed = this.db.prepare("UPDATE tasks SET status='unknown', owner=NULL, lease_until=NULL, version=version+1 WHERE id=? AND status='running' AND lease_until<=?").run(id, now);
        if (!changed.changes) continue;
        this.#event(id, 'lease_expired_unknown');
        recovered += 1;
      }
      return recovered;
    });
  }

  reconcile(id, outcome) {
    if (!['completed', 'pending'].includes(outcome)) throw new Error('Explicit completed or retry decision required');
    return this.#transaction(() => {
      const changed = this.db.prepare("UPDATE tasks SET status=?, version=version+1 WHERE id=? AND status='unknown'").run(outcome, id);
      if (!changed.changes) return false;
      this.#event(id, outcome === 'pending' ? 'retry_authorized' : 'effect_confirmed');
      return true;
    });
  }

  #transaction(action) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const result = action();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  #event(id, kind) { this.db.prepare('INSERT INTO events (task_id,kind,at) VALUES (?,?,?)').run(id, kind, this.clock()); }
}
