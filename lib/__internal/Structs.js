const ref = require("ref");
const Struct = require("ref-struct");
const ArrayType = require("ref-array");

class Structs {
  constructor() {
    this._GoString = Struct({
      p: "string",
      n: "longlong"
    });
    this._LongArray = ArrayType(ref.types.longlong);
    this._GoSlice = Struct({
      data: this.LongArray,
      len: "longlong",
      cap: "longlong"
    });
  }
  get GoString() {
    return this._GoString;
  }
  set GoString(goString) {
    this._GoString = goString;
  }
  get LongArray() {
    return this._LongArray;
  }
  set LongArray(longArray) {
    this._LongArray = longArray;
  }
  get GoSlice() {
    return this._GoSlice;
  }
  set GoSlice(goSlice) {
    this._GoSlice = goSlice;
  }
  newGoString(string) {
    const goString = new this.GoString({ p: string, n: string.length });
    return goString;
  }
}

module.exports = Structs;
