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

    this._zbc = ffi.Library(__dirname + '/obj/zbc.so', ffiInterface)
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
