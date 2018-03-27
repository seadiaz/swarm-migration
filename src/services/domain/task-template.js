const logger = require('winston')
const _ = require('lodash')
const ContainerSpec = require('./container-spec')
const LogDriver = require('./log-driver')
const Resources = require('./resources')
const RestartPolicy = require('./restart-policy')
const Placement = require('./placement')
const Network = require('./network')

class TaskTemplate {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.containerSpec = new ContainerSpec()
    this.logDriver = new LogDriver()
    this.placement = new Placement()
    this.networks = []
    this.forceUpdate = 0
    this.resources = new Resources()
    this.restartPolicy = new RestartPolicy()
  }

  static fromSwarm (obj) {
    let response = new this()
    response.containerSpec = ContainerSpec.fromSwarm(_.get(obj, 'ContainerSpec'))
    response.logDriver = LogDriver.fromSwarm(_.get(obj, 'LogDriver'))
    response.placement = Placement.fromSwarm(_.get(obj, 'Placement'))
    response.networks = _.map(_.get(obj, 'Networks', []), (item) => {
      return Network.fromSwarm(item)
    })
    response.forceUpdate = _.get(obj, 'ForceUpdate')
    response.resources = Resources.fromSwarm(_.get(obj, 'Resources'))
    response.restartPolicy = RestartPolicy.fromSwarm(_.get(obj, 'RestartPolicy'))
    return response
  }

  toSwarm () {
    return {
      ContainerSpec: this.containerSpec.toSwarm(),
      LogDriver: this.logDriver.toSwarm(),
      Placement: this.placement.toSwarm(),
      Networks: _.map(this.networks, (item) => {
        return item.toSwarm()
      }),
      ForceUpdate: this.forceUpdate,
      Resources: this.resources.toSwarm(),
      RestartPolicy: this.restartPolicy.toSwarm()
    }
  }
}

module.exports = TaskTemplate
