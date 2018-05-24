const { Client } = require("zbc-nodejs");

const exampleClient = new Client({bootstrapAddr: "0.0.0.0:51015"});

console.log("starting client")

const createWorkflowResult = exampleClient.createWorkflow("default-topic","demoProcess.bpmn");
console.log("Create Workflow Result", createWorkflowResult);

const createInstanceResult = exampleClient.createWorkflowInstance("default-topic","demoProcess",-1,{});
console.log("Create Instance Result", createInstanceResult);
