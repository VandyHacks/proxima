const {EventEmitter} = require('events');

/*
* The core class for reading data as lines.
*/

exports.LineBuffer = class extends EventEmitter {

  /*
  * Class constructor.
  */

  constructor() {
    super();

    this._buffer = '';
  }

  /*
  * Chunks loader function.
  */

  feed(chunk) {
    this._buffer += (chunk || '').toString('binary');

    let lines = this._buffer.split(/\r?\n/);
    if (lines.length > 1) {
      this._buffer = lines.pop(); // chunk for the next round

      lines = lines.filter(v => !!v);
      lines.forEach(l => this.emit('line', l));
      return lines;
    }
    return [];
  }

  /*
  * Clears the buffer.
  */

  drain() {
    this._buffer = '';
    this.emit('drain');
  }

}
