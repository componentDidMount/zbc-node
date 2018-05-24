const { Client } = require('zbc-nodejs')

var myClient = new Client({bootstrapAddr: '0.0.0.0:51015'})
console.log('starting client')

myClient.createTopic('hello-world')
myClient.createWorkflow('hello-world', '../demoProcess.bpmn')

console.log('creating workflow instances')
for (let i = 0; i < 100; i++) {
  myClient.createWorkflowInstance('hello-world', 'demoProcess', myClient.LatestVersion, {'a': 'b'})
}

let counter = 0
console.log('starting job worker')
myClient.jobWorker('default-topic', 'foo', {}, function (jobKey, payload) {
  counter++

  console.log()
  console.log(counter, jobKey, payload)
  if (counter % 2 == 0) {
    console.log('Completing job!')
    myClient.completeJob(jobKey, payload)
    return
  }

  console.log('Failing job!')
  myClient.failJob(jobKey)
})

if (process.platform === 'win32') {
  var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('SIGINT', function () {
    process.emit('SIGINT')
  })
}

process.on('SIGINT', function () {
  // graceful shutdown
  process.exit()
})

console.log("I'm done!")
