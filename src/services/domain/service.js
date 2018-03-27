const _ = require('lodash')
const logger = require('winston')
const TaskTemplate = require('./task-template')
const UpdateConfig = require('./update-config')
const EndpointSpec = require('./endpoint-spec')
const RollbackConfig = require('./rollback-config')
const Mode = require('./mode')

class Service {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.id = ''
    this.name = ''
    this.labels = {}
    this.taskTemplate = new TaskTemplate()
    this.mode = new Mode()
    this.updateConfig = new UpdateConfig()
    this.rollbackConfig = new RollbackConfig()
    this.networks = []
    this.endpointSpec = new EndpointSpec()
  }

  static fromSwarm (obj) {
    let response = new this()
    response.id = _.get(obj, 'ID')
    response.name = _.get(obj, 'Spec.Name')
    response.labels = _.get(obj, 'Spec.Labels')
    response.taskTemplate = TaskTemplate.fromSwarm(_.get(obj, 'Spec.TaskTemplate'))
    response.updateConfig = UpdateConfig.fromSwarm(_.get(obj, 'Spec.UpdateConfig'))
    response.rollbackConfig = RollbackConfig.fromSwarm(_.get(obj, 'Spec.RollbackConfig'))
    response.mode = Mode.fromSwarm(_.get(obj, 'Spec.Mode'))
    response.networks = _.get(obj, 'Networks')
    response.endpointSpec = EndpointSpec.fromSwarm(_.get(obj, 'Spec.EndpointSpec'))
    return response
  }

  toSwarm () {
    return {
      Name: this.name,
      Labels: this.labels,
      TaskTemplate: this.taskTemplate.toSwarm(),
      UpdateConfig: this.updateConfig.toSwarm(),
      RollbackConfig: this.rollbackConfig.toSwarm(),
      Mode: this.mode.toSwarm(),
      Networks: this.networks,
      EndpointSpec: this.endpointSpec.toSwarm()
    }
  }
}

module.exports = Service
