const logger = require('winston')
const _ = require('lodash')

class LogDriver {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.name = ''
    this.options = {}
  }

  static fromSwarm (obj) {
    let response = new this()
    response.name = _.get(obj, 'Name')
    response.options = _.get(obj, 'Options')
    return response
  }

  toSwarm () {
    return {
      Name: this.name,
      Options: this.options
    }
  }
}

module.exports = LogDriver
