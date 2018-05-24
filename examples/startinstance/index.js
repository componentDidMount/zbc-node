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

const { Client } = require("zbc-nodejs");

const exampleClient = new Client({bootstrapAddr: "0.0.0.0:51015"});

console.log("starting client")

const createWorkflowResult = exampleClient.createWorkflow("default-topic","../demoProcess.bpmn");
console.log("Create Workflow Result", createWorkflowResult);

const createInstanceResult = exampleClient.createWorkflowInstance("default-topic","demoProcess",-1,{});
console.log("Create Instance Result", createInstanceResult);
