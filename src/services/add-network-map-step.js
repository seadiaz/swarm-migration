const logger = require('winston')
const _ = require('lodash')

class FindNetworkByIdStep {
  constructor ({origin, destination}) {
    logger.silly('creating instance of %s', this.constructor.name)
    this._origin = origin
    this._destination = destination
  }

  start (stream) {
    return stream.consume((err, item, push, next) => {
      if (err) {
        return
      }

      this._process(item)
        .then((value) => {
          next()
          _.set(item, '_metadata.networks', value)
          push(null, item)
        })
        .catch((err) => {
          logger.warn('[find-network-by-id-step] Service %s warning: %s', item.name, err.message)
          next()
        })
    })
  }

  _process (item) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this._getOriginList(),
        this._getDestinationList()
      ])
        .then((values) => {
          let response = {}
          _(values[0]).reject(['Driver', 'host']).reject(['Driver', 'null']).forEach((originNetwork) => {
            let destinationNetwork = _.find(values[1], ['Name', originNetwork.Name])
            if (destinationNetwork) {
              response[originNetwork.Id] = {
                type: 'network',
                name: originNetwork.Name,
                side: 'origin',
                peer: destinationNetwork.Id
              }
            }
          })
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  _getOriginList () {
    return new Promise((resolve, reject) => {
      if (this._originList) {
        resolve(this._originList)
      }

      this._origin.networks.list()
        .then((value) => {
          this._originList = value
          resolve(value)
        })
        .catch((err) => {
          logger.error('[add-network-map-step] error getting origin network list')
          reject(err)
        })
    })
  }

  _getDestinationList () {
    return new Promise((resolve, reject) => {
      if (this._destinationList) {
        resolve(this._destinationList)
      }

      this._destination.networks.list()
        .then((value) => {
          this._destinationList = value
          resolve(value)
        })
        .catch((err) => {
          logger.error('[add-network-map-step] error getting destination network list', err.message)
          reject(err)
        })
    })
  }
}

module.exports = FindNetworkByIdStep
