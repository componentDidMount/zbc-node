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

const {topicClientDefaultOptions} = require('./__internal/options')
const {isUndefinedOrNull, typeMatchers} = require('./__internal/utils')

class TopicClient {

  constructor (ffiLib) {
    this.zbc = ffiLib.zbc
    this.structs = ffiLib.structs
  }

  createTopic (topicName, partitionCount, replicationFactor) {
    if (!typeMatchers.string(topicName)) {
      console.error(`${topicName} is not a string, please pass a string value as the topicName.`)
    }
    if (isUndefinedOrNull(partitionCount)) {
      partitionCount = topicClientDefaultOptions.partitionCount
    } else if (!typeMatchers.integer(partitionCount)) {
      console.error(`${partitionCount} is not an integer, please pass an integer value as the partitionCount.`)
    }
    if (isUndefinedOrNull(replicationFactor)) {
      replicationFactor = topicClientDefaultOptions.replicationFactor
    } else if (!typeMatchers.integer(replicationFactor)) {
      console.error(`${topicName} is not an integer, please pass an integer value as the replicationFactor.`)
    }

    const returnValue = this.zbc.CreateTopic(this.structs.newGoString(topicName), partitionCount, replicationFactor)
    try {
      const returnObject = JSON.parse(returnValue)
      return returnObject
    } catch (err) {
      console.error(error)
    }
  }
}

module.exports = TopicClient
