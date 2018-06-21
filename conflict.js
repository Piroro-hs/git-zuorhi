module.exports.detect = line => {
  if (/^CONFLICT \(.+\): /.test(line)) {
    console.log('conflict!!!');
  }
}
