const logger = require('winston')
const _ = require('lodash')

class Resource {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.memoryBytes = 0
    this.nanoCPUs = 0
  }

  static fromSwarm (obj) {
    let response = new this()
    response.memoryBytes = _.get(obj, 'MemoryBytes')
    response.nanoCPUs = _.get(obj, 'NanoCPUs')
    return response
  }

  toSwarm () {
    return {
      MemoryBytes: this.memoryBytes,
      NanoCpUs: this.nanoCPUs
    }
  }
}

module.exports = Resource
