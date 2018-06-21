const {spawn} = require('child_process');
const readline = require('readline');

const {detect} = require('./conflict');

if (
  process.argv[2] === 'merge' ||
  process.argv[2] === 'pull' ||
  (process.argv[2] === 'rebase' &&
    !process.argv.slice(3).includes('-i') &&
    !process.argv.slice(3).includes('--interactive'))
) {
  const git = spawn('git', process.argv.slice(2), {stdio: [0, 'pipe', 2]});
  const rl = readline.createInterface({
    input: git.stdout,
    output: process.stdout
  });
  rl.on('line', detect);
} else {
  spawn('git', process.argv.slice(2), {stdio: 'inherit'});
}
