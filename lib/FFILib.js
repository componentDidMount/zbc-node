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

const ffi = require('ffi-napi')

const Structs = require('./__internal/Structs')

class FFILib {
  constructor () {
    this._structs = new Structs()

    const ffiInterface = {
      // general client
      InitClient: ['string', [this.structs.GoString]],

      // topicClient
      CreateTopic: ['string', [this.structs.GoString, 'int', 'int']],

      // workflowClient
      CreateWorkflow: ['string', [this.structs.GoString, this.structs.GoString]],
      CreateWorkflowInstance: ['string', [this.structs.GoString, this.structs.GoString, 'int', this.structs.GoString]],

      // jobClient
      JobWorker: ['string', [this.structs.GoString, this.structs.GoString, this.structs.GoString, 'int', 'int']],
      PollJob: ['string', ['int']],
      CompleteJob: ['string', [this.structs.GoString, this.structs.GoString]],
      FailJob: ['string', [this.structs.GoString]]
    }

    this._zbc = ffi.Library(`${__dirname}/obj/zbc.so`, ffiInterface)
  }
  get zbc () {
    return this._zbc
  }
  get structs () {
    return this._structs
  }
  set zbc (zbcValue) {
    this._zbc = zbcValue
  }
  set structs (structsValue) {
    this._structs = structsValue
  }
}

module.exports = FFILib
