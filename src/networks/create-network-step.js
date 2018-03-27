const logger = require('winston')
const highland = require('highland')

class CreateNetworkStep {
  constructor ({docker}) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._docker = docker
  }

  start (stream) {
    return stream.consume((err, message, push, next) => {
      if (err) {
        return
      }

      if (message === highland.nil) {
        push(null, message)
        return
      }

      this._process(message)
        .then((value) => {
          next()
          logger.info('service %s migrated', message.name)
          push(null, message)
        })
        .catch((err) => {
          logger.warn('[create-network-step] network %s warning: %s', message.name, JSON.stringify(err.message), JSON.stringify(err.response.data))
          next()
        })
    })
  }

  _process (message) {
    return new Promise((resolve, reject) => {
      this._docker.networks.create(message.toSwarm())
        .then((value) => {
          logger.info('[create-network-step] create response:', JSON.stringify(value))
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = CreateNetworkStep
