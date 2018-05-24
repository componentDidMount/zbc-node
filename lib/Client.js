const ffi = require('ffi-napi');

const Structs = require('./__internal/Structs');
const { clientDefaultOptions } = require('./__internal/options');

const JobClient = require('./JobClient');
const TopicClient = require('./TopicClient');
const WorkflowClient = require('./WorkflowClient');

class Client {
  constructor() {
    this.structs = new Structs();

    const ffiInterface = {
        // general client
        InitClient: ["string", [this.structs.GoString]],

        // topicClient
        CreateTopic: ["string", [this.structs.GoString, "int", "int"]],

        // workflowClient
        CreateWorkflow: ["string", [this.structs.GoString, this.structs.GoString]],
        CreateWorkflowInstance: ["string", [this.structs.GoString, this.structs.GoString, "int", this.structs.GoString]],

        // jobClient
        JobWorker: ['void', [this.structs.GoString, this.structs.GoString, this.structs.GoString, "int", "int"]],
        PollJob: ["string", []],
        CompleteJob: ["string", ["string", "string"]],
        FailJob: ["string", ["string"]]
    };

    this.zbc = ffi.Library(__dirname + "/obj/zbc.so", ffiInterface);

    this.jobClient = new JobClient(this.zbc, this.structs);
    this.workflowClient = new WorkflowClient(this.zbc, this.structs);
    this.topicClient = new TopicClient(this.zbc, this.structs);
  }

  /**
   * Connect to Zeebe with given options.
   * @param {JSONObject={}} options
   * @return {Object}
   */
  connect(options = {}) {
    const clientOptions = Object.assign(clientDefaultOptions, options);

    const status = this.zbc.InitClient(this.structs.newGoString(clientOptions.bootstrapAddr));
    if (status == null) {
      return null;
    } else {
      return JSON.parse(status);
    }
  }

  /**
   * Creates a topic with given partitionNumber and replicationFactor.
   * @param {string} topicName - TopicName
   * @param {int=} partitionCount
   * @param {int=} replicationFactor
   * @return {Object}
   */
  createTopic(topicName, partitionCount, replicationFactor) {
    return this.topicClient.createTopic(topicName, partitionCount, replicationFactor);
  }

  /**
   * Create a Workflow Instance for given bpmnProcessId and version.
   * @param {string} topicName
   * @param {string} bpmnProcessId
   * @param {string} version
   * @param {string=} payload
   * @return {Object}
   */
  createWorkflowInstance(topicName, bpmnProcessId, version, payload) {
    return this.workflowClient.createWorkflowInstance(topicName, bpmnProcessId, version, payload);
  }

  /**
   * Create / Deploy a given workflow (xml).
   * @param {string} topicName
   * @param {string} fileName
   * @return {Object}
   */
  createWorkflow(topicName, fileName) {
    return this.workflowClient.createWorkflow(topicName, fileName);
  }

  /**
   * Creates a job worker.
   * @param {string} topicName
   * @param {string} jobType
   * @param {Object} options
   * @param {function} callback
   * @return {Object}
   */
  jobWorker(topicName, jobType, options, callback) {
    return this.jobClient.createJobWorker(topicName, jobType, options, callback);
  }

  /**
   * Completes a job by given jobKey and payload.
   * @param {string} jobKey
   * @param {JSONObject} payload
   * @return {Object}
   */
  completeJob(jobKey, payload) {
    return this.jobClient.completeJob(jobKey, payload);
  }

  /**
   * Fails a job by given jobKey.
   * @param {string} jobKey
   * @return {Object}
   */
  failJob(jobKey) {
    return this.jobClient.failJob(jobKey);
  }
}

module.exports = Client;
