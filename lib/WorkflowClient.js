const {
  isUndefinedOrNull,
  typeMatchers
} = require('./__internal/utils');

class WorkflowClient {

  constructor(zbc) {
    this.zbc = zbc;
  }

  createInstance(topicName, bpmnProcessId, version, payload) {
    if (isUndefinedOrNull(payload)) {
      const payloadString = '{}';
    } else if (typeMatchers.string(payload)) {
      const payloadString = payload;
    } else {
      const payloadString = JSON.stringify(payload);
    }

    return this.zbc.CreateWorkflowInstance(topicName, bpmnProcessId, version, payload);
  }

  createWorkflow(topicName, resourceName, resource) {
    return this.zbc.CreateWorkflow(topicName, resourceName, resource);
  }
}

module.exports = WorkflowClient;
