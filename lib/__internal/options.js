const clientDefaultOptions = {
  bootstrapAddr: "127.0.0.1:51015"
};
const jobClientDefaultOptions = {
  workerName: "myJobWorker",
  lockDuration: 1000,
  credits: 32
};
const topicClientDefaultOptions = {
  replicationFactor: 1,
  partitionCount: 1
};

module.exports = {
  clientDefaultOptions,
  jobClientDefaultOptions,
  topicClientDefaultOptions
};
