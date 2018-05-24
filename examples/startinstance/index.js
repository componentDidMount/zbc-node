const { Client } = require("zbc-nodejs");

const exampleClient = new Client();

console.log("starting client")

const connectResult = exampleClient.connect({bootstrapAddr: "0.0.0.0:51015"});
console.log("Connect Result", connectResult);

const createWorkflowResult = exampleClient.createWorkflow("default-topic","demoProcess.bpmn");
console.log("Create Workflow Result", createWorkflowResult);

const createInstanceResult = exampleClient.createWorkflowInstance("default-topic","demoProcess",-1,{});
console.log("Create Instance Result", createInstanceResult);
