const {spawn} = require('child_process');

const git = spawn('git', process.argv.slice(2));

git.stdout.pipe(process.stdout);
git.stderr.pipe(process.stderr);
