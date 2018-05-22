const Structs = require("./Structs");

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
const ffiInterface = {
  // general client
  InitClient: [Structs.GoString, [Structs.GoString]],

  // topicClient
  CreateTopic: [Structs.CreateTopic, [Structs.GoString, "int", "int"]],

  // workflowClient
  CreateWorkflow: [
    Structs.GoString,
    [Structs.GoString, Structs.GoString, Structs.GoString]
  ],
  CreateWorkflowInstance: [
    Structs.GoString,
    [Structs.GoString, Structs.GoString, Structs.GoString]
  ],

  // jobClient
  CreateJobWorker: [
    Structs.GoString,
    [Structs.GoString, Structs.GoString, Structs.GoString, "int", "int"]
  ],
  PollJobWorker: [Structs.GoString, []],
  CompleteJob: [Structs.GoString, ["string", "string"]],
  FailJob: [Structs.GoString, ["string"]]
};

module.exports = {
  clientDefaultOptions,
  jobClientDefaultOptions,
  topicClientDefaultOptions,
  ffiInterface
};
