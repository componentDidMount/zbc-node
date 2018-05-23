var ref = require("ref");
var ffi = require("ffi-napi");

var Struct = require("ref-struct");
var ArrayType = require("ref-array");

var GoString = Struct({
    p: "string",
    n: "longlong"
});

var LongArray = ArrayType(ref.types.longlong);

var zbc = ffi.Library("../../lib/obj/zbc.so", {
    InitClient: ["string", [GoString]],
});

var bootstrapAddr = "0.0.0.0:51015";
var status = zbc.InitClient(new GoString({p: bootstrapAddr, n: bootstrapAddr.length}));
console.log(status.n);
