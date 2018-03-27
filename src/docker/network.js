const logger = require('winston')

class Network {
  constructor (client) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._client = client
  }

  list (filter) {
    return new Promise((resolve, reject) => {
      this._client.get(`/networks?${filter}`)
        .then((value) => {
          if (value.status !== 200) {
            reject(new Error(value.data))
            return
          }
          resolve(value.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  findByScope (scope) {
    return this.list({filter: '{"scope": "swarm"}'})
  }

  create (network) {
    return new Promise((resolve, reject) => {
      this._client.post('/networks/create', network)
        .then((value) => {
          if (value.status !== 201) {
            reject(new Error(value.data))
            return
          }
          resolve(value.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

module.exports = Network
