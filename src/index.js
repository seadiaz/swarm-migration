#!/usr/bin/env node

const winston = require('winston')
const config = require('config')
const yargs = require('yargs')

winston.configure({
  level: config.get('logging.level'),
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: config.get('logging.level')
    })
  ]
})

let args = yargs
  .usage('Usage: $0 <command> [options]')
  .commandDir('commands')
  .demand(1)
  .help()
  .wrap(yargs.terminalWidth())
  .argv

winston.debug(args)
