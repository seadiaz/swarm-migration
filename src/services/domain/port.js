const logger = require('winston')
const _ = require('lodash')

class Port {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.protocol = ''
    this.publishedPort = 0
    this.targetPort = 0
    this.publishMode = undefined
  }

  static fromSwarm (obj) {
    let response = new this()
    response.protocol = _.get(obj, 'Protocol')
    response.publishedPort = _.get(obj, 'PublishedPort')
    response.targetPort = _.get(obj, 'TargetPort')
    response.publishMode = _.get(obj, 'PublishMode')
    return response
  }

  toSwarm () {
    return {
      Protocol: this.protocol,
      PublishedPort: this.publishedPort,
      TargetPort: this.targetPort,
      PublishMode: this.publishMode
    }
  }
}

module.exports = Port
