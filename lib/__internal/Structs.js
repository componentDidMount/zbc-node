const ref = require("ref");
const Struct = require("ref-struct");
const ArrayType = require("ref-array");

class Structs {
  static get GoString() {
    return Struct({
      p: "string",
      n: "longlong"
    });
  }
  static get LongArray() {
    return ArrayType(ref.types.longlong);
  }
  static get GoSlice() {
    return Struct({
      data: Structs.LongArray,
      len: "longlong",
      cap: "longlong"
    });
  }
  static newGoString(string) {
    const goString = new Structs.GoString({ p: string, n: string.length });
    console.log(goString);
    return goString;
  }
}

module.exports = Structs;
