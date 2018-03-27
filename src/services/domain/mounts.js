const logger = require('winston')
const BindOptions = require('./bind-options')

class Mounts {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.target = ''
    this.source = ''
    this.type = ''
    this.readOnly = false
    this.bindOptions = new BindOptions()
  }
}

module.exports = Mounts
