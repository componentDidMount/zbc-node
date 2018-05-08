var ref = require("ref");
var ffi = require("ffi");

var Struct = require("ref-struct");
var ArrayType = require("ref-array");

var GoString = Struct({
    p: "string",
    n: "longlong"
});

var CreateTopic = Struct({
    Error: "string",
    Name: "string",
    State: "string",
    Partitions: "int",
    ReplicationFactor: "int"
});

var LongArray = ArrayType(ref.types.longlong);

var GoSlice = Struct({
    data: LongArray,
    len:  "longlong",
    cap: "longlong"
});


var zbc = ffi.Library("./obj/zbc.so", {
    Add: ["longlong", ["longlong", "longlong"]],
    TopicInfo: [CreateTopic, []],

    InitClient: [GoString, [GoString]],
    CreateTopic: [CreateTopic, [GoString, "int", "int"]]
});

console.log("Add(12, 99) = ", zbc.Add(12, 99));
console.log(zbc.TopicInfo())


var bootstrapAddr = "0.0.0.0:51015";
var status = zbc.InitClient(new GoString({p: bootstrapAddr, n: bootstrapAddr.length}));
console.log(status.n);

console.log("Creating Topic");
var newTopicName = new GoString({p: "nodejs-topic", n: 12});
var topic = zbc.CreateTopic(newTopicName, 1, 1);
console.log(topic);
