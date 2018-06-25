const EventEmitter = require('events');

module.exports.detecter = rl => {
  const emitter = new EventEmitter();
  rl.on('line', line => {
    if (/^CONFLICT \(.+\): /.test(line)) {
      emitter.emit('conflict');
    }
  });
  return emitter;
}
