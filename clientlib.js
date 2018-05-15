var ref = require("ref");
var ffi = require("ffi");

var Struct = require("ref-struct");
var ArrayType = require("ref-array");

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
class Client {

  constructor() {
    this.zbc = ffi.Library("./obj/zbc.so", {
      Add: ["longlong", ["longlong", "longlong"]],
      TopicInfo: [CreateTopic, []],
  
      InitClient: [GoString, [GoString]],
      CreateTopic: [CreateTopic, [GoString, "int", "int"]],
      JobWorker: ['void', [GoString, GoString, GoString, 'int', 'int']],
      PollJob: ['string', []],
      CompleteJob: ['void', ['string']],
    });
  }

  connect(bootstrapAddr = '127.0.0.1:51015') {
    //console.log(this.zbc);
    const status = this.zbc.InitClient(new GoString({p: bootstrapAddr, n: bootstrapAddr.length}));
    //console.log(status.p.slice(0, status.n));
  }

  job_worker(topicName, jobType, options, callback) {
    const defaultOptions = {
        "workerName": "foobar",
        "lockDuration": 1000,
        "credits": 32,
    };

    this._callJobWorker(topicName, defaultOptions.workerName, jobType, defaultOptions.lockDuration, defaultOptions.credits);

  while (true) {
    let job = this.zbc.PollJob()
    if (job.length > 0) {
      //console.log("Received job")
      let ourJob = JSON.parse(job);
      //console.log(ourJob);
      callback(ourJob);
    }
  }
     
  }

  _callJobWorker(topicName, workerName, jobType, lockDuration, credits) {
    const mytopicName = new GoString({p: topicName, n: topicName.length})
    const myworkerName = new GoString({p: workerName, n: workerName.length})
    const myjobType = new GoString({p: jobType, n: jobType.length})

    this.zbc.JobWorker(mytopicName, myworkerName, myjobType, lockDuration, credits)
  }

  complete(ourJob) {
    const job = JSON.stringify(ourJob);
    //const GoJob = new GoString({p: job, n: job.length})
    this.zbc.CompleteJob(job);
    //console.log("completed!!!!")
  }
}

module.exports = Client;

