const logger = require('winston')

class BindOptions {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.propagation = ''
  }
}

module.exports = BindOptions
