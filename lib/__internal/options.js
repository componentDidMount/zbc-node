const Structs = require("./Structs");
const Struct = require("ref-struct");

const clientDefaultOptions = {
  bootstrapAddr: "127.0.0.1:51015"
};
const jobClientDefaultOptions = {
  workerName: "myJobWorker",
  lockDuration: 1000,
  credits: 32
};
const topicClientDefaultOptions = {
  replicationFactor: 1,
  partitionCount: 1
};
const GoString = Struct({
  p: "string",
  n: "longlong"
});
const ffiInterface = {
  // general client
  InitClient: ["string", [GoString]],

  // topicClient
  CreateTopic: ["string", [Structs.GoString, "int", "int"]],

  // workflowClient
  CreateWorkflow: [Structs.GoString, [Structs.GoString, Structs.GoString, Structs.GoString]],
  CreateWorkflowInstance: [Structs.GoString, [Structs.GoString, Structs.GoString, Structs.GoString]],

  // jobClient
  JobWorker: ['void', [Structs.GoString, Structs.GoString, Structs.GoString, "int", "int"]],
  PollJob: [Structs.GoString, []],
  CompleteJob: [Structs.GoString, ["string", "string"]],
  FailJob: [Structs.GoString, ["string"]]
};

module.exports = {
  clientDefaultOptions,
  jobClientDefaultOptions,
  topicClientDefaultOptions,
  ffiInterface
};
