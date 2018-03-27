const logger = require('winston')
const _ = require('lodash')
const highland = require('highland')
const Network = require('./domain/network')

class FindNetworksStep {
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
            push(null, Network.fromSwarm(item))
          })
          next()
        })
        .catch((err) => {
          logger.warn('warning: %s', JSON.stringify(err))
          next()
        })
    })
  }

  _process () {
    return new Promise((resolve, reject) => {
      this._docker.networks.list()
        .then((value) => {
          resolve(value)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = FindNetworksStep
