const logger = require('winston')
const _ = require('lodash')

class Network {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.target = ''
    this.aliases = []
  }

  static fromSwarm (obj) {
    let response = new this()
    response.target = _.get(obj, 'Target')
    response.aliases = _.get(obj, 'Aliases')
    return response
  }

  toSwarm () {
    return {
      Target: this.target,
      Aliases: this.aliases
    }
  }
}

module.exports = Network
