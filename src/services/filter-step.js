const logger = require('winston')

class FilterStep {
  constructor ({includes}) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._includes = new RegExp(includes)
  }

  start (stream) {
    return stream.consume((err, message, push, next) => {
      if (err) {
        return
      }

      this._process(message)
        .then(() => {
          next()
          push(null, message)
        })
        .catch((err) => {
          logger.debug('[filter-step] Service %s warning: %s', message.name, err.message)
          next()
        })
    })
  }

  _process (message) {
    return new Promise((resolve, reject) => {
      if (!this._includes.test(message.name)) {
        reject(new Error('service filtered'))
        return
      }
      logger.info('%s included!', message.name)
      resolve()
    })
  }
}

module.exports = FilterStep
