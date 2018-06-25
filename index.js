const {spawn} = require('child_process');
const readline = require('readline');

const {detecter} = require('./conflict');

if (
  process.argv[2] === 'merge' ||
  process.argv[2] === 'pull' ||
  (process.argv[2] === 'rebase' &&
    !process.argv.slice(3).includes('-i') &&
    !process.argv.slice(3).includes('--interactive'))
) {
  const git = spawn('git', process.argv.slice(2), {stdio: [0, 'pipe', 2]});
  detecter(readline.createInterface({
    input: git.stdout,
    output: process.stdout
  })).once('conflict', () => {
    console.log('conflict');
  });
} else {
  spawn('git', process.argv.slice(2), {stdio: 'inherit'});
}
