const yaml = require('js-yaml')
const fs = require('fs')
const Joi = require('joi')
const _ = require('lodash')

const SCHEMA = Joi.object().keys({
  docker: Joi.object().required().keys({
    origin: Joi.object().required().keys({
      url: Joi.string().required().uri({scheme: ['http', 'https']}),
      apiKey: Joi.string().required()
    }),
    destination: Joi.object().keys({
      url: Joi.string().required().uri({scheme: ['http', 'https']}),
      apiKey: Joi.string().required()
    }),
    registries: Joi.array().items(
      Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        serveraddress: Joi.string().required()
      })
    )
  })
})

class Config {
  static fromPath (path) {
    let response = new this()
    response._config = yaml.safeLoad(fs.readFileSync(path, 'utf8'))
    if (!response._validate()) {
      throw new Error('config invalid')
    }
    return response
  }

  get (path) {
    return _.get(this._config, path)
  }

  _validate () {
    const result = SCHEMA.validate(this._config)
    if (result.error) {
      console.log(result.error.message)
      return false
    }

    return true
  }
}

module.exports = Config
