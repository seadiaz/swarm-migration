const logger = require('winston')
const _ = require('lodash')

class Service {
  constructor (client, registries) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._client = client
    this._registries = registries
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
      this._client.post('/services/create', service, {
        headers: this._buildRegistryHeaders(service.TaskTemplate.ContainerSpec.Image)
      })
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

  _buildRegistryHeaders (image) {
    let registry = _.find(this._registries, (registry) => {
      return _.includes(image, registry.serveraddress)
    })

    if (registry) {
      return {
        'X-Registry-Auth': Buffer.from(JSON.stringify(registry)).toString('Base64')
      }
    }

    return {}
  }
}

module.exports = Service
