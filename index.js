const {spawn} = require('child_process');
const readline = require('readline');

const {detecter, player} = require('./conflict');

if (
  process.argv[2] === 'merge' ||
  process.argv[2] === 'pull' ||
  (process.argv[2] === 'rebase' &&
    !process.argv.slice(3).includes('-i') &&
    !process.argv.slice(3).includes('--interactive'))
) {
  let playing = false;
  const play = player();
  const git = spawn('git', process.argv.slice(2), {stdio: [0, 'pipe', 2]});
  const rl = readline.createInterface({
    input: git.stdout,
    output: process.stdout
  });
  detecter(rl).once('conflict', () => {
    playing = true;
    play();
  });
  rl.once('close', () => {
    if (!playing) {
      process.exit();
    }
  });
} else {
  spawn('git', process.argv.slice(2), {stdio: 'inherit'});
}
