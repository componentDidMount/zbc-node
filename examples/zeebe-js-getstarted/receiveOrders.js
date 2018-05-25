const { Client } = require('zbc-nodejs')

const zbClient = new Client({bootstrapAddr: '0.0.0.0:51015'})

const payload = {'orderNumber': '12345'}
const createInstanceResult = zbClient.createWorkflowInstance('get-started', 'orderProcess', zbClient.LatestVersion, payload)
console.log(createInstanceResult)
