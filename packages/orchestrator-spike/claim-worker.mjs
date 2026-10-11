import { Coordinator } from './coordinator.mjs';

const coordinator = new Coordinator(process.argv[2]);
if (process.argv[3] === 'hold-lock') {
  coordinator.db.exec('BEGIN IMMEDIATE');
  process.send('ready');
  setTimeout(() => {
    coordinator.db.exec('COMMIT');
    coordinator.close();
  }, 1100);
} else {
  process.send('ready');
  process.once('message', message => {
    try {
      if (message !== 'claim') throw new Error('unexpected command');
      process.send(coordinator.claim('fixture'));
    } catch (error) {
      process.send({ error: error.message });
      process.exitCode = 1;
    } finally {
      coordinator.close();
    }
  });
}
