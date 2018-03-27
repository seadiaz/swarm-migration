const logger = require('winston')
const _ = require('lodash')
const Replicated = require('./replicated')

class Mode {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.replicated = undefined
    this.global = undefined
  }

  static fromSwarm (obj) {
    let response = new this()
    if (_.has(obj, 'Replicated')) {
      response.replicated = Replicated.fromSwarm(_.get(obj, 'Replicated'))
    }
    if (_.has(obj, 'Global')) {
      response.global = {}
    }
    return response
  }

  toSwarm () {
    return {
      Replicated: this.replicated ? this.replicated.toSwarm() : undefined,
      Global: this.global
    }
  }
}

module.exports = Mode
