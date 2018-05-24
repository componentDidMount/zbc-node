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
    if (!isUndefinedOrNull(jobWorkerReturn.error)) {
      return jobWorkerReturn.error;
    } else {
      while (true) {
        const pollJobReturn = this.zbc.PollJobWorker();
        if (isUndefinedOrNull(pollJobReturn)) {
          // undefined error case
          console.log("Undefined error case while polling job");
        } else {
          const pollJob = JSON.parse(pollJobReturn);
          if (!isUndefinedOrNull(pollJob.error)) {
            // specific error case
            return pollJob.error;
          } else {
            callback(pollJob);
          }
        }
      }
    }
  }
  _callJobWorker(topicName, workerName, jobType, lockDuration, credits) {
    const returnValue = this.zbc.JobWorker(this.structs.newGoString(topicName), this.structs.newGoString(workerName), this.structs.newGoString(jobType), lockDuration, credits);
    return JSON.parse(returnValue);
  }
  completeJob(jobKey, payload) {
    if (isUndefinedOrNull(jobKey) || !typeMatchers.string(jobKey)) {
      console.error("Please specify a jobKey when completing a Job.");
      return null;
    }

    let payloadString;
    if (isUndefinedOrNull(payload)) {
      payloadString = "{}";
    } else if (typeMatchers.string(payload)) {
      payloadString = payload;
    } else {
      payloadString = JSON.stringify(payload);
    }

    const returnValue = this.zbc.CompleteJob(this.structs.newGoString(jobKey), this.structs.newGoString(payloadString));
    if (returnValue == null) {
      console.error("No result while completing job from zbc.");
      return null;
    } else {
      return JSON.parse(returnValue);
    }
  }
  failJob(jobKey) {
    if (isUndefinedOrNull(jobKey) || !typeMatchers.string(jobKey)) {
      console.error("Please specify a jobKey when failing a Job.");
      return null;
    }

    const returnValue = this.zbc.FailJob(this.structs.newGoString(jobKey));
    if (returnValue == null) {
      console.error("No result while completing job from zbc.");
      return null;
    } else {
      return JSON.parse(returnValue);
    }
  }
}

module.exports = JobClient;
