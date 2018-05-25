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
myClient.jobWorker('hello-world', 'foo', {}, function (jobKey, payload) {
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
