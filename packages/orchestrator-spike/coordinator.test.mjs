import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fork } from 'node:child_process';
import { Coordinator } from './coordinator.mjs';

test('approval, exclusive claim, restart, stale owner and uncertain effect', () => {
  const dir = mkdtempSync(join(tmpdir(), 'kershell-coordinator-'));
  const path = join(dir, 'spike.sqlite');
  let now = 1000;
  const first = new Coordinator(path, () => now);
  try {
    first.create('fixture', true);
    assert.equal(first.claim('fixture'), null);
    assert.equal(first.approve('fixture'), true);
    const owner = first.claim('fixture', 100);
    assert.ok(owner);
    const second = new Coordinator(path, () => now);
    try {
      assert.equal(second.claim('fixture'), null);
      now = 1100;
      assert.equal(second.recoverExpired(), 1);
      assert.equal(first.complete('fixture', owner), false);
      assert.equal(second.claim('fixture'), null);
      assert.equal(first.reconcile('fixture', 'pending'), true);
      now = 1101;
      const newOwner = second.claim('fixture');
      assert.ok(newOwner && newOwner !== owner);
      now = 1102;
      assert.equal(second.markEffectUncertain('fixture', newOwner, 'external-fixture-1'), true);
      assert.equal(first.recoverExpired(), 0);
      assert.equal(first.claim('fixture'), null);
      assert.equal(second.get('fixture').status, 'unknown');
      assert.equal(first.reconcile('fixture', 'completed'), true);
      assert.equal(second.get('fixture').status, 'completed');
      assert.equal(second.get('fixture').effect_key, 'external-fixture-1');
      assert.deepEqual(second.events('fixture'), [
        'approval_requested', 'approved', 'claimed', 'lease_expired_unknown', 'retry_authorized', 'claimed', 'effect_unknown', 'effect_confirmed'
      ]);
    } finally { second.close(); }
  } finally { first.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('state and event roll back together when event storage fails', () => {
  const dir = mkdtempSync(join(tmpdir(), 'kershell-coordinator-'));
  const path = join(dir, 'spike.sqlite');
  const coordinator = new Coordinator(path);
  try {
    coordinator.create('fixture');
    const owner = coordinator.claim('fixture');
    const previousEvents = coordinator.events('fixture');
    const prepare = coordinator.db.prepare;
    coordinator.db.prepare = function (sql) {
      if (sql.startsWith('INSERT INTO events')) throw new Error('event store unavailable');
      return prepare.call(this, sql);
    };
    try {
      assert.throws(() => coordinator.complete('fixture', owner), /event store unavailable/);
    } finally {
      coordinator.db.prepare = prepare;
    }
    assert.equal(coordinator.get('fixture').status, 'running');
    assert.deepEqual(coordinator.events('fixture'), previousEvents);
  } finally { coordinator.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('two prepared processes competing for one task get one lease', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'kershell-coordinator-'));
  const path = join(dir, 'spike.sqlite');
  const coordinator = new Coordinator(path);
  try {
    coordinator.create('fixture');
    const children = [0, 1].map(() => fork(new URL('./claim-worker.mjs', import.meta.url), [path], { silent: true }));
    const ready = children.map(child => new Promise((resolve, reject) => {
      child.once('message', message => message === 'ready' ? resolve() : reject(new Error(`unexpected ${message}`)));
      child.once('error', reject);
      child.once('exit', code => { if (code) reject(new Error(`worker exited ${code}`)); });
    }));
    await Promise.all(ready);
    const results = children.map(child => new Promise((resolve, reject) => {
      child.once('message', message => resolve(message));
      child.once('error', reject);
      child.send('claim');
    }));
    const owners = await Promise.all(results);
    assert.equal(owners.filter(Boolean).length, 1);
    assert.equal(coordinator.events('fixture').filter(event => event === 'claimed').length, 1);
  } finally { coordinator.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('expired work cannot confirm with a backdated caller time or retry automatically', () => {
  const dir = mkdtempSync(join(tmpdir(), 'kershell-coordinator-'));
  const path = join(dir, 'spike.sqlite');
  let now = 1000;
  const coordinator = new Coordinator(path, () => now);
  try {
    coordinator.create('fixture');
    const owner = coordinator.claim('fixture', 100);
    assert.ok(owner);
    now = 1100;
    assert.equal(coordinator.complete('fixture', owner, 1000), false);
    assert.equal(coordinator.recoverExpired(), 1);
    assert.equal(coordinator.get('fixture').status, 'unknown');
    assert.equal(coordinator.claim('fixture'), null);
  } finally { coordinator.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('lease expiry is checked after waiting for the database lock', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'kershell-coordinator-'));
  const path = join(dir, 'spike.sqlite');
  const coordinator = new Coordinator(path);
  try {
    coordinator.create('fixture');
    const claimedAt = Date.now();
    const owner = coordinator.claim('fixture', 600);
    const blocker = fork(new URL('./claim-worker.mjs', import.meta.url), [path, 'hold-lock'], { silent: true });
    await new Promise((resolve, reject) => {
      blocker.once('message', message => message === 'ready' ? resolve() : reject(new Error(`unexpected ${message}`)));
      blocker.once('error', reject);
      blocker.once('exit', code => { if (code) reject(new Error(`worker exited ${code}`)); });
    });
    assert.ok(Date.now() - claimedAt < 600, 'lease must be live before the wait');
    assert.equal(coordinator.complete('fixture', owner), false);
    assert.equal(coordinator.get('fixture').status, 'running');
  } finally { coordinator.close(); rmSync(dir, { recursive: true, force: true }); }
});
