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

const ref = require('ref')
const Struct = require('ref-struct')
const ArrayType = require('ref-array')

class Structs {
  constructor () {
    this._GoString = Struct({
      p: 'string',
      n: 'longlong'
    })
    this._LongArray = ArrayType(ref.types.longlong)
    this._GoSlice = Struct({
      data: this.LongArray,
      len: 'longlong',
      cap: 'longlong'
    })
  }
  get GoString () {
    return this._GoString
  }
  set GoString (goString) {
    this._GoString = goString
  }
  get LongArray () {
    return this._LongArray
  }
  set LongArray (longArray) {
    this._LongArray = longArray
  }
  get GoSlice () {
    return this._GoSlice
  }
  set GoSlice (goSlice) {
    this._GoSlice = goSlice
  }
  newGoString (string) {
    const goString = new this.GoString({ p: string, n: string.length })
    return goString
  }
}

module.exports = Structs
