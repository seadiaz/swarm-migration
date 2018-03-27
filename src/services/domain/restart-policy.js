const logger = require('winston')
const _ = require('lodash')

class RestartPolicy {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.condition = ''
    this.delay = 0
    this.maxAttempts = 0
  }

  static fromSwarm (obj) {
    let response = new this()
    response.condition = _.get(obj, 'Condition')
    response.delay = _.get(obj, 'Delay')
    response.maxAttempts = _.get(obj, 'MaxAttempts')
    return response
  }

  toSwarm () {
    return {
      Condition: this.condition,
      Delay: this.delay,
      MaxAttempts: this.maxAttempts
    }
  }
}

module.exports = RestartPolicy
