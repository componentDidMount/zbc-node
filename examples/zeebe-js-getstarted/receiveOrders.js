const { Client } = require('zbc-node')

const zbClient = new Client({bootstrapAddr: '0.0.0.0:51015'})

const payload = {'orderId': '12345'}
const createInstanceResult = zbClient.createWorkflowInstance('get-started', 'order-process', zbClient.LatestVersion, payload)
console.log(createInstanceResult)
