const {
  isFunction,
  isUndefinedOrNull,
  typeMatchers
} = require("./__internal/utils");
const { jobClientDefaultOptions } = require("./__internal/options");

class JobClient {

  constructor(ffiLib) {
    this.zbc = ffiLib.zbc;
    this.structs = ffiLib.structs;
  }

  createJobWorker(topicName, jobType, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }
    const workerOptions = Object.assign(jobClientDefaultOptions, options);

    const jobWorkerReturn = this._callJobWorker(topicName, workerOptions.workerName, jobType, workerOptions.lockDuration, workerOptions.credits);
    if (jobWorkerReturn.error.length != 0) {
      console.error(jobWorkerReturn.error)
      return null
    }

    this._pollJob(callback)
  }

  _pollJob(callback) {
    const pollJobReturn = this.zbc.PollJob(1)
      
    if (isUndefinedOrNull(pollJobReturn)) {
      // undefined error case
      console.log("Undefined error case while polling job")
      return null
    }
    
    const pollJob = JSON.parse(pollJobReturn)
    if (pollJob.error.length != 0) {
      // specific error case
      return pollJob.error;
    }
      
    let job = pollJob.data.jobs[0]
    callback(job.jobKey, job.payload)

    let _this = this
    setTimeout(function() { _this._pollJob(callback) }, 1)
  }

  _callJobWorker(topicName, workerName, jobType, lockDuration, credits) {
    const returnValue = this.zbc.JobWorker(this.structs.newGoString(topicName), 
                                           this.structs.newGoString(workerName), 
                                           this.structs.newGoString(jobType), 
                                           lockDuration, 
                                           credits);
    return JSON.parse(returnValue);
  }
  
  completeJob(jobKey, payload) {
    if (isUndefinedOrNull(jobKey) || isUndefinedOrNull(payload)) {
      console.error("Please specify a jobKey and payload.");
      return null;
    }

    let payloadString;
    if (isUndefinedOrNull(payload)) {
      payloadString = "";
    } else if (typeMatchers.string(payload)) {
      payloadString = payload;
    } else {
      payloadString = JSON.stringify(payload);
    }

    const returnValue = this.zbc.CompleteJob(this.structs.newGoString(jobKey), 
                                             this.structs.newGoString(payloadString));
    return JSON.parse(returnValue);
  }

  failJob(jobKey) {
    if (isUndefinedOrNull(jobKey) || !typeMatchers.string(jobKey)) {
      console.error("Please specify a jobKey when failing a Job.");
      return null;
    }

    const returnValue = this.zbc.FailJob(this.structs.newGoString(jobKey));
    return JSON.parse(returnValue);
  }
}

module.exports = JobClient;
