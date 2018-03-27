const _ = require('lodash')
const logger = require('winston')
const Privileges = require('./privileges')

class ContainerSpec {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.image = ''
    this.command = ''
    this.args = []
    this.env = []
    this.dir = ''
    this.user = ''
    this.labels = {}
    this.mounts = []
    this.privileges = new Privileges()
    this.isolation = 'default'
  }

  static fromSwarm (obj) {
    let response = new this()
    response.image = ContainerSpec._getImageWithoutSHA(obj)
    response.command = _.get(obj, 'Command')
    response.args = _.get(obj, 'Args')
    response.env = _.get(obj, 'Env')
    response.dir = _.get(obj, 'Dir')
    response.user = _.get(obj, 'User')
    response.labels = _.get(obj, 'Labels')
    response.mounts = _.get(obj, 'Mounts')
    response.isolation = _.get(obj, 'Isolation')
    return response
  }

  toSwarm () {
    return {
      Image: this.image,
      Command: this.command,
      Args: this.args,
      Env: this.env,
      Dir: this.dir,
      User: this.user,
      Labels: this.labels,
      Mounts: this.mounts,
      Isolation: this.isolation
    }
  }

  static _getImageWithoutSHA (obj) {
    return _.get(obj, 'Image').replace(/@.*/, '')
  }
}

module.exports = ContainerSpec
