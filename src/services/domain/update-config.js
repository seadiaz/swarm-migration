const logger = require('winston')
const _ = require('lodash')

class UpdateConfig {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.parallelism = 0
    this.delay = 0
    this.failureAction = ''
    this.monitor = 0
    this.maxFailureRatio = 0
    this.order = undefined
  }

  static fromSwarm (obj) {
    let response = new this()
    response.parallelism = _.get(obj, 'Parallelism')
    response.delay = _.get(obj, 'Delay')
    response.failureAction = _.get(obj, 'FailureAction')
    response.monitor = _.get(obj, 'Monitor')
    response.maxFailureRatio = _.get(obj, 'MaxFailureRatio')
    response.order = _.get(obj, 'Order')
    return response
  }

  toSwarm () {
    return {
      Parallelism: this.parallelism,
      Delay: this.delay,
      FailureAction: this.failureAction,
      Monitor: this.monitor,
      MaxFailureRatio: this.maxFailureRatio,
      Order: this.order
    }
  }
}

module.exports = UpdateConfig
