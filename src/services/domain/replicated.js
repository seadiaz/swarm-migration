const logger = require('winston')
const _ = require('lodash')

class Replicated {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.replicas = 0
  }

  static fromSwarm (obj) {
    let response = new this()
    response.replicas = _.get(obj, 'Replicas')
    return response
  }

  toSwarm () {
    return {
      Replicas: this.replicas
    }
  }
}

module.exports = Replicated
