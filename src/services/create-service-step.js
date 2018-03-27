const logger = require('winston')
const _ = require('lodash')

class CreateServiceStep {
  constructor ({docker}) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._docker = docker
  }

  start (stream) {
    return stream.consume((err, message, push, next) => {
      if (err) {
        return
      }

      this._process(message)
        .then((value) => {
          next()
          logger.debug('service %s migrated', message.name)
          push(null, message)
        })
        .catch((err) => {
          logger.warn('[create-service-step] Service %s warning: %s', message.name, JSON.stringify(err.message), JSON.stringify(err.response.data))
          next()
        })
    })
  }

  _process (message) {
    return new Promise((resolve, reject) => {
      for (let network of message.taskTemplate.networks) {
        network.target = _.get(message, `_metadata.networks.${network.target}.peer`, undefined)
      }
      this._docker.services.create(message.toSwarm())
        .then((value) => {
          logger.info('[create-service-step] create response:', JSON.stringify(value))
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = CreateServiceStep
