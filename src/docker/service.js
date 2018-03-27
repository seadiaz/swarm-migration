const logger = require('winston')

class Service {
  constructor (client) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._client = client
  }

  list () {
    return new Promise((resolve, reject) => {
      this._client.get('/services')
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

  findByName (name) {
    return new Promise((resolve, reject) => {
      this._client.get('/services', {params: {filters: `{"name": {"${name}": true}}`}})
        .then((value) => {
          if (value.status !== 200) {
            reject(new Error(value.data))
            return
          }
          resolve(value.data[0])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  create (service) {
    return new Promise((resolve, reject) => {
      this._client.post('/services/create', service)
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

  delete (service) {
    return new Promise((resolve, reject) => {
      this._client.delete(`/services/${service.id}`)
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
}

module.exports = Service
