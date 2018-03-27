const logger = require('winston')
const _ = require('lodash')

class Placement {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.platforms = []
    this.constraints = []
  }

  static fromSwarm (obj) {
    let response = new this()
    response.platforms = _.get(obj, 'Platforms')
    response.constraints = _.get(obj, 'Constraints')
    return response
  }

  toSwarm () {
    return {
      Platforms: this.platforms,
      Constraints: this.constraints
    }
  }
}

module.exports = Placement
