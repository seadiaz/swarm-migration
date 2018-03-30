const logger = require('winston')
const highland = require('highland')
const DockerClient = require('../docker/client')
const FindNetworksStep = require('./find-networks-step')
const CreateNetworkStep = require('./create-network-step')

class MigrationNetworkExpert {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    // this._originDocker = new DockerClient({baseURL: config.get('docker.origin.url'), apiKey: config.get('docker.origin.apiKey')})
    // this._destinationDocker = new DockerClient({socketPath: config.get('docker.destination.socket')})
  }

  run () {
    return new Promise((resolve, reject) => {
      let inputStream = highland()
      let outputSream = new FindNetworksStep({docker: this._originDocker}).start(inputStream)
      // outputSream = new FilterStep({includes: this._includes}).start(outputSream)
      outputSream = new CreateNetworkStep({docker: this._destinationDocker}).start(outputSream)
      outputSream = outputSream.consume((err, item, push, next) => {
        if (err) { return }
        // logger.info('final:', JSON.stringify(item, null, 2))
        next()
      })
      outputSream.resume()
      inputStream.write()
      inputStream.write(highland.nil)
    })
  }
}

module.exports = MigrationNetworkExpert
