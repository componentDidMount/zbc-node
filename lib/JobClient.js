const {
  isUndefinedOrNull,
  typeMatchers
} = require('./__internal/utils');
const {
  jobClientDefaultOptions
} = require('./__internal/options');
const Structs = require('./__internal/Structs');

class JobClient {
  constructor(zbc) {
    this.zbc = zbc;
  }
  createJobWorker(topicName, options, jobType) {
    const workerOptions = Object.assign(jobClientDefaultOptions, options);

    const jobWorkerReturn = this._callJobWorker(topicName, workerOptions.workerName, jobType, workerOptions.lockDuration, workerOptions.credits);
    if (!isUndefinedOrNull(jobWorkerReturn.error)) {
      return jobWorkerReturn.error;
    } else {
      while (true) {
        const pollJobReturn = this.zbc.PollJobWorker();
        if (isUndefinedOrNull(pollJobReturn)) {
          // undefined error case
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
    const returnValue = this.zbc.JobWorker(Structs.newGoString(topicName), Structs.newGoString(workerName), Structs.newGoString(jobType), lockDuration, credits);
    return JSON.parse(returnValue);
  }
  completeJob(jobKey, payload) {
    if (isUndefinedOrNull(jobKey) || !typeMatchers.string(jobKey)) {
      console.error('Please specify a jobKey when completing a Job.');
      return null;
    }

    if (isUndefinedOrNull(payload)) {
      const payloadString = '{}';
    } else if (typeMatchers.string(payload)) {
      const payloadString = payload;
    } else {
      const payloadString = JSON.stringify(payload);
    }

    return this.zbc.CompleteJob(jobKey, payloadString);
  }
  failJob(jobKey) {
    if (isUndefinedOrNull(jobKey) || !typeMatchers.string(jobKey)) {
      console.error('Please specify a jobKey when failing a Job.');
      return null;
    }
    this.zbc.FailJob(jobKey);
  }

}

module.exports = JobClient;
