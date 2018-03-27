const logger = require('winston')
const highland = require('highland')
const Service = require('./domain/service')

class RemoveServiceStep {
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
        .then(() => {
          next()
          push(null, message)
        })
        .catch((err) => {
          logger.error('[remove-service-step] Service %s warning: %s', message.name, JSON.stringify(err.message))
          next()
        })
    })
  }

  _process (message) {
    return new Promise((resolve, reject) => {
      this._docker.services.findByName(message.name)
        .then((value) => {
          if (!value) {
            resolve()
            return
          }
          return this._docker.services.delete(Service.fromSwarm(value))
        })
        .then(() => {
          logger.info('%s removed!', message.name)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = RemoveServiceStep
