const {spawn} = require('child_process');

if ((process.argv[2] === 'merge' || process.argv[2] === 'pull') && process.stdout.isTTY) {
  const git = spawn('git', process.argv.slice(2), {stdio: [0, 'pipe', 2]});
  git.stdout.pipe(process.stdout);
} else {
  spawn('git', process.argv.slice(2), {stdio: 'inherit'});
}
