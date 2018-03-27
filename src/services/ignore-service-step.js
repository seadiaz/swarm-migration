const logger = require('winston')
const highland = require('highland')

class IgnoreServiceStep {
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
        .catch(() => {
          next()
        })
    })
  }

  _process (message) {
    return new Promise((resolve, reject) => {
      this._docker.services.findByName(message.name)
        .then((value) => {
          if (value) {
            logger.warn('%s ignored!', message.name)
            reject(new Error())
            return
          }

          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = IgnoreServiceStep
