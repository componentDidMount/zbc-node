const {
  topicClientDefaultOptions
} = require('./__internal/options');
const {
  isUndefinedOrNull,
  typeMatchers
} = require('./__internal/utils');

class TopicClient {

  constructor(zbc) {
    this.zbc = zbc;
  }

  createTopic(topicName, partitionCount, replicationFactor) {
    if (!typeMatchers.string(topicName)) {
      console.error(`${topicName} is not a string, please pass a string value as the topicName.`);
    }
    if (isUndefinedOrNull(partitionCount)) {
      partitionCount = topicClientDefaultOptions.partitionCount;
    } else if (!typeMatchers.integer(partitionCount)) {
      console.error(`${partitionCount} is not an integer, please pass an integer value as the partitionCount.`);
    }
    if (isUndefinedOrNull(replicationFactor)) {
      replicationFactor = topicClientDefaultOptions.replicationFactor;
    } else if (!typeMatchers.integer(replicationFactor)) {
      console.error(`${topicName} is not an integer, please pass an integer value as the replicationFactor.`);
    }

    const returnValue = this.zbc.CreateTopic(topicName, partitionCount, replicationFactor);
    try {
      const returnObject = JSON.parse(returnValue);
      return returnObject;
    } catch (err) {
      console.error(error);
    }
  }
}

module.exports = TopicClient;
