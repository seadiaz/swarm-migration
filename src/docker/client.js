const logger = require('winston')
const axios = require('axios')
const Service = require('./service')
const Network = require('./network')

class Client {
  constructor ({socketPath, baseURL, apiKey, registry}) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._client = axios.create({
      socketPath: socketPath,
      baseURL: baseURL,
      timeout: 5000,
      headers: {
        'Api-Key': apiKey || 'dummy',
        'X-Registry-Auth': registry ? Buffer.from(JSON.stringify(registry)).toString('Base64') : null
      }
    })
  }

  get services () {
    if (!this._services) {
      this._services = new Service(this._client)
    }

    return this._services
  }

  get networks () {
    if (!this._networks) {
      this._networks = new Network(this._client)
    }

    return this._networks
  }
}

module.exports = Client
