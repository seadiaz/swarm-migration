const logger = require('winston')
const _ = require('lodash')
const highland = require('highland')
const Service = require('./domain/service')

class FindServicesStep {
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

      this._process()
        .then((value) => {
          _.forEach(value, (item) => {
            push(null, Service.fromSwarm(item))
          })
          next()
        })
        .catch((err) => {
          logger.warn('warning: %s', err)
          next()
        })
    })
  }

  _process () {
    return new Promise((resolve, reject) => {
      this._docker.services.list()
        .then((value) => {
          resolve(value)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = FindServicesStep
