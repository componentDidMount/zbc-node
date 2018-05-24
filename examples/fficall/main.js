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
    CreateWorkflowInstance: ["string", [GoString, GoString, "int", GoString]],
    JobWorker: ["string", [GoString, GoString, GoString, "int", "int"]],
    PollJob: ["string", ["int"]],
    CompleteJob: ["string", [GoString]],
    FailJob: ["string", [GoString]]
});

console.log("Initializing client")
var bootstrapAddr = "0.0.0.0:51015"
var resp = zbc.InitClient(new GoString({p: bootstrapAddr, n: bootstrapAddr.length}))
console.log("FFI response: ", resp)
console.log()

console.log("Creating topic: default-topic")
var topicName = "default-topic"
var resp = zbc.CreateTopic(new GoString({p: topicName, n: topicName.length}), 1, 1)
console.log("FFI response: ", resp)
console.log()

console.log("Creating workflow: demoProcess")
var createWorkflow  = "demoProcess.bpmn"
var resp = zbc.CreateWorkflow(new GoString({p: topicName, n: topicName.length}), new GoString({p: createWorkflow, n: createWorkflow.length}))
console.log("FFI response: ", resp)
console.log()


for (var i = 0; i < 10; i++) {
    console.log("Creating workflow instance: demoProcess")
    var createWorkflowInstance  = "demoProcess"
    var latestVersion = -1
    var payload = JSON.stringify({"a": "b"})
    var resp = zbc.CreateWorkflowInstance(new GoString({p: topicName, n: topicName.length}), 
                                        new GoString({p: createWorkflowInstance, n: createWorkflowInstance.length}), 
                                        latestVersion,
                                        new GoString({p: payload, n: payload.length}))
    console.log("FFI response: ", resp)

}
console.log()

console.log("Starting job worker")
var workerName  = "nodejs-worker"
var jobType = "foo"
var resp = zbc.JobWorker(new GoString({p: topicName, n: topicName.length}), 
                         new GoString({p: workerName, n: workerName.length}),
                         new GoString({p: jobType, n: jobType.length}),
                         1000,
                         32)                            
console.log("FFI response: ", resp)
console.log()

console.log("Polling for a job")
var resp = zbc.PollJob(1)                     
console.log("FFI response: ", resp)
console.log()

var job = JSON.parse(resp)["data"]["jobs"][0]
console.log("Completing a job with ID: ", job["jobKey"])
var completeRequest = JSON.stringify(JSON.parse(resp))
var resp = zbc.CompleteJob(new GoString({p: completeRequest, n: completeRequest.length}))
console.log(resp)
console.log()


console.log("Polling for a new job")
var resp = zbc.PollJob(1)                     
console.log("FFI response: ", resp)
console.log()

var job = JSON.parse(resp)["data"]["jobs"][0]
console.log("Completing a job with ID: ", job["jobKey"])
var completeRequest = JSON.stringify(JSON.parse(resp))
var resp = zbc.FailJob(new GoString({p: completeRequest, n: completeRequest.length}))
console.log(resp)
console.log()
