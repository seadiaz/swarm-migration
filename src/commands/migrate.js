const MigrationServiceExpert = require('../services/migration-service-expert')
const MigrationNetworkExpert = require('../networks/migration-network-expert')

exports.command = 'migrate <type> [includes]'

exports.describe = 'Migrate object from one cluster to another'

exports.builder = {
  type: {
    default: 'service',
    choices: ['service', 'network']
  },
  includes: {
    default: '.*',
    type: 'string',
    description: 'includes only that match the regex'
  },
  replace: {
    default: false,
    type: 'boolean',
    description: 'replace if exists'
  },
  dry: {
    default: false,
    type: 'boolean'
  }
}

exports.handler = function (argv) {
  if (argv.type === 'service') { new MigrationServiceExpert({includes: argv.includes, replace: argv.replace, dry: argv.dry}).run() }
  if (argv.type === 'network') { new MigrationNetworkExpert().run() }
}
