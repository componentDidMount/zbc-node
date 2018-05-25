const { Client } = require('zbc-nodejs')

const myClient = new Client({bootstrapAddr: '0.0.0.0:51015'})

// Create a new topic "get started" with one partition and replicationFactor 1
myClient.createTopic('get-started', 1, 1)

// Create our order workflow that we modeled above
const createWorkflowResult = myClient.createWorkflow('get-started', 'order-process.bpmn')
console.log('Result', createWorkflowResult)
