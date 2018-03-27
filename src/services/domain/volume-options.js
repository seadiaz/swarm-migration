const DriverConfig = require('./driver-config')
const logger = require('winston')

class VolumeOptions {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.noCopy = false
    this.labels = {}
    this.driverConfig = new DriverConfig()
  }
}

module.exports = VolumeOptions
