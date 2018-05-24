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

/**
 * Checks if parameter is a function
 */
const isFunction = f => typeof f === 'function'

/**
 * Applies test function on each element on the array and ANDs the results
 * @param [Array] arr
 * @param [Function] test
 */
const andArrayWith = (arr, test) => arr.reduce((boolean, current) => boolean && test(current), true)

/**
 * Checks if parameter is an array of functions
 */
const isArrayOfFunctions = a => Array.isArray(a) && a.length > 0 && andArrayWith(a, isFunction)

/**
 * Checks if parameter is undefined or null
 */
const isUndefinedOrNull = a => typeof a === 'undefined' || a === null

const typeMatchers = {
  null: isUndefinedOrNull,

  /**
   * @returns {boolean} true if value is Integer
   */
  integer(a) {
    return (
      Number.isInteger(a) && a >= -Math.pow(2, 31) && a <= Math.pow(2, 31) - 1
    )
  },

  /**
   * @returns {boolean} true if value is Long
   */
  long(a) {
    return Number.isInteger(a) && !typeMatchers.integer(a)
  },

  /**
   * @returns {boolean} true if value is Double
   */
  double(a) {
    return typeof a === 'number' && !Number.isInteger(a)
  },

  /**
   * @returns {boolean} true if value is Boolean
   */
  boolean(a) {
    return typeof a === 'boolean'
  },

  /**
   * @returns {boolean} true if value is String
   */
  string(a) {
    return typeof a === 'string'
  },

  /**
   * @returns {boolean} true if value is File
   */
  file(a) {
    return a instanceof File
  },

  /**
   * @returns {boolean} true if value is Date.
   * */
  date(a) {
    return a instanceof Date
  },

  /**
   * @returns {boolean} true if value is JSON
   */
  json(a) {
    return typeof a === 'object'
  }
}

module.exports = {
  isFunction,
  andArrayWith,
  isArrayOfFunctions,
  isUndefinedOrNull,
typeMatchers}
