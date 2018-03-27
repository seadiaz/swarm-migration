const _ = require('lodash')
const IPAM = require('./ipam')

class Network {
  constructor () {
    this.id = ''
    this.name = ''
    this.scope = ''
    this.driver = ''
    this.enableIPv6 = false
    this.ipam = new IPAM()
    this.internal = false
    this.attachable = true
    this.ingress = false
    this.configFrom = undefined
    this.configOnly = false
    this.containers = null
    this.options = null
    this.labels = {}
  }

  static fromSwarm (obj) {
    let response = new this()
    response.id = _.get(obj, 'Id')
    response.name = _.get(obj, 'Name')
    response.scope = _.get(obj, 'Scope')
    response.driver = _.get(obj, 'Driver')
    response.enableIPv6 = _.get(obj, 'EnableIPv6')
    response.ipam = IPAM.fromSwarm(_.get(obj, 'IPAM'))
    response.internal = _.get(obj, 'Internal')
    response.attachable = _.get(obj, 'Attachable')
    response.ingress = _.get(obj, 'Ingress')
    response.configFrom = _.get(obj, 'ConfigFrom')
    response.configOnly = _.get(obj, 'ConfigOnly')
    response.containers = _.get(obj, 'Containers')
    response.options = _.get(obj, 'Options')
    response.labels = _.get(obj, 'Labels')
    return response
  }

  toSwarm () {
    return {
      Id: this.id,
      Name: this.name,
      Scope: this.scope,
      Driver: this.driver,
      EnableIPv6: this.enableIPv6,
      IPAM: this.ipam.toSwarm(),
      Internal: this.internal,
      Attachable: this.attachable,
      Ingress: this.ingress,
      ConfigFrom: this.configFrom,
      ConfigOnly: this.configOnly,
      Containers: this.containers,
      Options: this.options,
      Labels: this.labels
    }
  }
}

module.exports = Network
