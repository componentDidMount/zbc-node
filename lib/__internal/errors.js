// Copyright © 2018 Camunda Services GmbH (info@camunda.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const jobClientErrors = {
  completeJob_NoKey: 'Please specify a jobKey when completing a Job.',
  failJob_NoKey: 'Please specify a jobKey when failing a Job.',
}

const topicClientErrors = {
  createTopic_NoZbcResponse: 'No response while creating topic from zbc.',
  createTopic_TopicNameString: 'is not a string, please pass a string value as the topicName.',
  createTopic_PartitionCountInt: 'is not an integer, please pass an integer value as the partitionCount.',
  createTopic_ReplicationFactorInt: 'is not an integer, please pass an integer value as the replicationFactor.'
}

const workflowClientErrors = {
  createWorkflow_TopicFileNull: 'TopicName or FileName is null.',
  createWorkflow_TopicFileNoString: 'Cannot create workflow because one of the parameters topicName or fileName is not a string. Please pass only strings into create workflow method.',
  createWorkflow_NoZbcResponse: 'No return value from zbc while creating workflow.',
  createWorkflowInstance_NoZbcResponse: 'No return value from zbc while creating workflow instance.',
  createWorkflowInstance_TopicProcessNull: 'TopicName or bpmnProcessId is null.',
  createWorkflowInstance_TopicProcessNoString: 'TopicName or bpmnProcessId are not strings.'
}

module.exports = {
  jobClientErrors,
  topicClientErrors,
  workflowClientErrors
}
