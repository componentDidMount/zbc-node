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
    CreateTopic: ["string", [GoString, "int", "int"]],
    CreateWorkflow: ["string", [GoString, GoString]],
    CreateWorkflowInstance: ["string", [GoString, GoString, "int", GoString]]
});

console.log("Initializing client")
var bootstrapAddr = "0.0.0.0:51015";
var resp = zbc.InitClient(new GoString({p: bootstrapAddr, n: bootstrapAddr.length}));
console.log("FFI response: ", resp);


console.log("Creating topic: default-topic")
var topicName = "default-topic"
var resp = zbc.CreateTopic(new GoString({p: topicName, n: topicName.length}), 1, 1)
console.log("FFI response: ", resp)


console.log("Creating workflow: demoProcess")
var createWorkflow  = "demoProcess.bpmn"
var resp = zbc.CreateWorkflow(new GoString({p: topicName, n: topicName.length}), new GoString({p: createWorkflow, n: createWorkflow.length}))
console.log("FFI response: ", resp)

console.log("Creating workflow instance: demoProcess")
var createWorkflowInstance  = "demoProcess"
var latestVersion = -1
var payload = "{}"
var resp = zbc.CreateWorkflowInstance(new GoString({p: topicName, n: topicName.length}), 
                                      new GoString({p: createWorkflowInstance, n: createWorkflowInstance.length}), 
                                      latestVersion,
                                      new GoString({p: payload, n: payload.length}))
console.log("FFI response: ", resp)
