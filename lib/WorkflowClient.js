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

    const returnValue = this.zbc.CreateWorkflowInstance(topicName, bpmnProcessId, version, payload);

    if (!isUndefinedOrNull(returnValue)) {
      return JSON.parse(returnValue);
    } else {
      console.error("No return value from zbc while creating workflow instance.")
      return null;
    }
  }

  createWorkflow(topicName, resourceName, resource) {
    if (isUndefinedOrNull(topicName) || isUndefinedOrNull(resourceName) || isUndefinedOrNull(resource)) {
        console.error("TopicName, ResouceName or Resource is null");
        return null;
    }
    if (!typeMatchers.string(topicName) || !typeMatchers.string(resourceName) || !typeMatchers.string(resource)) {
      console.error("Cannot create workflow because one of the parameters topicName, resourceName or resource is not a string. Please pass only strings into create workflow method.");
      return null;
    }

    const returnValue = this.zbc.CreateWorkflow(topicName, resourceName, resource);

    if (!isUndefinedOrNull(returnValue)) {
      return JSON.parse(returnValue);
    } else {
      console.error("No return value from zbc while creating workflow.")
      return null;
    }
  }
}

module.exports = WorkflowClient;
