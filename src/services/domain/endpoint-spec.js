const logger = require('winston')
const _ = require('lodash')
const Port = require('./port')

class EndpointSpec {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.mode = 'vip'
    this.ports = []
  }

  static fromSwarm (obj) {
    let response = new this()
    response.mode = _.get(obj, 'Mode')
    response.ports = _.map(_.get(obj, 'Ports', []), (item) => {
      return Port.fromSwarm(item)
    })
    return response
  }

  toSwarm () {
    return {
      Mode: this.mode,
      Ports: _.map(this.ports, (item) => {
        return item.toSwarm()
      })
    }
  }
}

module.exports = EndpointSpec
