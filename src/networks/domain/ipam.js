const _ = require('lodash')

class IPAM {
  constructor () {
    this.driver = ''
    this.options = ''
    this.config = ''
  }

  static fromSwarm (obj) {
    let response = new this()
    response.driver = _.get(obj, 'Driver')
    response.options = _.get(obj, 'Options')
    response.config = _.get(obj, 'Config')
    return response
  }

  toSwarm () {
    return {}
  }
}

module.exports = IPAM
