// Copyright © 2018 Camunda Services GmbH (info@camunda.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var ref = require("ref");
var ffi = require("ffi-napi");

var Struct = require("ref-struct");
var ArrayType = require("ref-array");

var GoString = Struct({
    p: "string",
    n: "longlong"
});

var LongArray = ArrayType(ref.types.longlong);

var ffiInterface = {
    InitClient: ["string", [GoString]],
    CreateTopic: ["string", [GoString, "int", "int"]],
    CreateWorkflow: ["string", [GoString, GoString]],
    CreateWorkflowInstance: ["string", [GoString, GoString, "int", GoString]],
    JobWorker: ["string", [GoString, GoString, GoString, "int", "int"]],
    PollJob: ["string", ["int"]],
    CompleteJob: ["string", [GoString, GoString]],
    FailJob: ["string", [GoString]]
}

var zbc = null; //ffi.Library("../../lib/obj/zbc.so", );

if (process.platform === "win32") {
    zbc = ffi.Library('../../lib/obj/libzbc-windows-4.0-amd64', ffiInterface)
}

if (process.platform === "darwin") {
    zbc = ffi.Library('../../lib/obj/libzbc-darwin-10.6-amd64', ffiInterface)
} 

if (process.platform === "linux") {
    zbc = ffi.Library('../../lib/obj/libzbc-linux-amd64', ffiInterface)
}

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
var createWorkflow  = "../demoProcess.bpmn"
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
var jobKey = job["jobKey"]
var jobPayload = JSON.stringify(job["payload"])
console.log("Completing a job with ID: ", jobKey)
console.log(jobPayload)


var completeRequest = JSON.stringify(JSON.parse(resp))
var resp = zbc.CompleteJob(new GoString({p: jobKey, n: jobKey.length}),
                           new GoString({p: jobPayload, n: jobPayload.length}))
console.log(resp)
console.log()


console.log("Polling for a new job")
var resp = zbc.PollJob(1)                     
console.log("FFI response: ", resp)
console.log()

var jobKey = job["jobKey"]
var jobPayload = job["payload"]
console.log("Failing a job with ID: ", jobKey)
console.log(jobPayload)

var completeRequest = JSON.stringify(JSON.parse(resp))
var resp = zbc.FailJob(new GoString({p: jobKey, n: jobKey.length}))
console.log(resp)
console.log()
