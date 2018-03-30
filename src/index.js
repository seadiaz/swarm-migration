#!/usr/bin/env node

const yargs = require('yargs')

yargs
  .usage('Usage: $0 <command> [options]')
  .commandDir('commands')
  .demand(1)
  .help()
  .wrap(yargs.terminalWidth())
  .parse()
