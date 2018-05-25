const { Client } = require('zbc-nodejs')

const zbClient = new Client({bootstrapAddr: '0.0.0.0:51015'})
zbClient.jobWorker('get-started', 'payment-service', {}, (jobKey, payload) => {

  console.log("The payload", payload)

  // Let's complete the job with some new payload
  const paymentPayload = {'totalPrice':50000}
  zbClient.completeJob(jobKey, paymentPayload)

  // With fail job, you can fail the job.
  // zbClient.failJob(jobKey)
})
