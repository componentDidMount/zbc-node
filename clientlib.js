var ref = require("ref");
var ffi = require("ffi");

var Struct = require("ref-struct");
var ArrayType = require("ref-array");

class Client {
  constructor() {
    var GoString = Struct({
        p: "string",
        n: "longlong"
    });

    var CreateTopic = Struct({
        Error: "string",
        Name: "string",
        State: "string",
        Partitions: "int",
        ReplicationFactor: "int"
    });

    var LongArray = ArrayType(ref.types.longlong);

    var GoSlice = Struct({
        data: LongArray,
        len:  "longlong",
        cap: "longlong"
    });

    var zbc = ffi.Library("./obj/zbc.so", {
      InitClient: [GoString, [GoString]],
      CreateTopic: [CreateTopic, [GoString, "int", "int"]],
      CreateJobWorker: ['void', [GoString, GoString, GoString, 'int', 'int', 'int']],
      PollJob: [GoString, []],
      Complete: [GoString]
    });
  }
  connect(bootstrapAddr = '127.0.0.1:51015') {
    const status = zbc.InitClient(new GoString({p: bootstrapAddr, n: bootstrapAddr.length}));
    console.log(status);
  }
  job_worker(topicName, jobType, options, callback) {
    const defaultOptions = {
        "workerName": "foobar",
        "lockDuration": 1000,
        "credits": 32,
    };
    const key = this._callJobWorker(topicName, defaultOptions.workerName, jobType, defaultOptions.lockDuration, defaultOptions.credits);
    while (true) {
      let job = zbc.PollJob();
      if (job != null) {
        let ourJob = JSON.parse(job.data);
        console.log(ourJob);
        callback(ourJob);
      }
    }
  }
  _callJobWorker(topicName, workerName, jobType, lockDuration, credits) {
    const topicName = new GoString({p: topicName, n: topicName.length})
    const workerName = new GoString({p: workerName, n: workerName.length})
    const jobType = new GoString({p: jobType, n: jobType.length})

    return zbc.CreateJobWorker(topicName, workerName, jobType, lockDuration, credits);
  }
  complete(ourJob) {
    const job = JSON.stringify(ourJob);
    const GoJob = new GoString({p: job, n: job.length})
    zbc.Complete(GoJob);
  }
}
