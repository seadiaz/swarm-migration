const logger = require('winston')
const highland = require('highland')
const config = require('config')
const FindServicesStep = require('./find-services-step')
const FilterStep = require('./filter-step')
const AddNetworkMapStep = require('./add-network-map-step')
const RemoveServiceStep = require('./remove-service-step')
const IgnoreServiceStep = require('./ignore-service-step')
const CreateServiceStep = require('./create-service-step')
const DockerClient = require('../docker/client')

class MigrationServiceExpert {
  constructor ({includes, replace, dry}) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._originDocker = new DockerClient({
      baseURL: config.get('docker.origin.url'),
      apiKey: config.get('docker.origin.apiKey')
    })
    this._destinationDocker = new DockerClient({
      baseURL: config.get('docker.destination.url'),
      apiKey: config.get('docker.destination.apiKey'),
      registries: config.get('docker.registries')
    })
    this._includes = includes
    this._replace = replace
    this._dry = dry
  }

  run () {
    return new Promise((resolve, reject) => {
      let inputStream = highland()
      let outputSream = new FindServicesStep({docker: this._originDocker}).start(inputStream)
      if (this._includes) {
        outputSream = new FilterStep({includes: this._includes}).start(outputSream)
      }
      outputSream = new AddNetworkMapStep({origin: this._originDocker, destination: this._destinationDocker}).start(outputSream)
      if (!this._dry) {
        if (this._replace) {
          outputSream = new RemoveServiceStep({docker: this._destinationDocker}).start(outputSream)
        } else {
          outputSream = new IgnoreServiceStep({docker: this._destinationDocker}).start(outputSream)
        }
        outputSream = new CreateServiceStep({docker: this._destinationDocker}).start(outputSream)
      } else {
        outputSream = outputSream.consume((err, item, push, next) => {
          if (err) { return }
          logger.info('final:', JSON.stringify(item, null, 2))
          next()
        })
      }
      outputSream.resume()
      inputStream.write()
      inputStream.write(highland.nil)
    })
  }
}

module.exports = MigrationServiceExpert
