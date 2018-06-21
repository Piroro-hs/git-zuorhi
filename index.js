const {spawn} = require('child_process');
const readline = require('readline');

const {detect} = require('./conflict');

if (process.argv[2] === 'merge' || process.argv[2] === 'pull') {
  const git = spawn('git', process.argv.slice(2), {stdio: [0, 'pipe', 2]});
  const rl = readline.createInterface({
    input: git.stdout,
    output: process.stdout
  });
  rl.on('line', detect);
} else {
  spawn('git', process.argv.slice(2), {stdio: 'inherit'});
}
