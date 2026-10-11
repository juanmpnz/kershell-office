import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Coordinator } from './coordinator.mjs';

test('approval, exclusive claim, restart, stale owner and uncertain effect', () => {
  const dir = mkdtempSync(join(tmpdir(), 'kershell-coordinator-'));
  const path = join(dir, 'spike.sqlite');
  const first = new Coordinator(path);
  try {
    first.create('fixture', true);
    assert.equal(first.claim('fixture', 1000), null);
    assert.equal(first.approve('fixture'), true);
    const owner = first.claim('fixture', 1000, 100);
    assert.ok(owner);
    const second = new Coordinator(path);
    try {
      assert.equal(second.claim('fixture', 1000), null);
      assert.equal(second.recoverExpired(1100), 1);
      assert.equal(first.complete('fixture', owner, 1101), false);
      const newOwner = second.claim('fixture', 1101);
      assert.ok(newOwner && newOwner !== owner);
      assert.equal(second.markEffectUncertain('fixture', newOwner, 1102, 'external-fixture-1'), true);
      assert.equal(first.recoverExpired(999_999), 0);
      assert.equal(first.claim('fixture', 999_999), null);
      assert.equal(second.get('fixture').status, 'unknown');
      assert.equal(first.reconcile('fixture', 'completed'), true);
      assert.equal(second.get('fixture').status, 'completed');
      assert.deepEqual(second.events('fixture'), [
        'approval_requested', 'approved', 'claimed', 'lease_expired', 'claimed', 'effect_unknown', 'effect_confirmed'
      ]);
    } finally { second.close(); }
  } finally { first.close(); rmSync(dir, { recursive: true, force: true }); }
});
