const logger = require('winston')
const _ = require('lodash')

class Privileges {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.credentialSpec = null
    this.seLinuxContext = null
  }

  static fromSwarm (obj) {
    let response = new this()
    response.credentialSpec = _.get(obj, 'CredentialSpec')
    response.seLinuxContext = _.get(obj, 'SELinuxContext')
    return response
  }
}

module.exports = Privileges
