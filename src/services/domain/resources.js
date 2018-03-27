const logger = require('winston')
const _ = require('lodash')
const Resource = require('./resource')

class Resources {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.limits = new Resource()
    this.reservations = new Resource()
  }

  static fromSwarm (obj) {
    let response = new this()
    response.limits = Resource.fromSwarm(_.get(obj, 'Limits'))
    response.reservations = Resource.fromSwarm(_.get(obj, 'Reservations'))
    return response
  }

  toSwarm () {
    return {
      Limits: this.limits.toSwarm(),
      Reservations: this.reservations.toSwarm()
    }
  }
}

module.exports = Resources
