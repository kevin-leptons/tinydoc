#!/usr/bin/env node

const os = require('os')

const yargs = require('yargs')

const {dev, build, serve} = require('../lib')

const PORT = 8080

yargs.
usage('$0 <cmd> [args]').

command('dev <src> <dest>', 'Build and serve document', (yargs) => {
    yargs.
    option('port', {
        describe: 'Port to serve',
        alias: 'p',
        type: 'number',
        default: PORT
    }).
    option('dist', {
        describe: 'Build for distribution',
        types: 'boolean',
        default: false
    }).
    option('page-size', {
        describe: 'Page size',
        alias: 's',
        type: 'number',
        default: 16
    })
}, async_cli(cli_dev)).

command('build <src> <dest>', 'Build document', (yars) => {
    yars.
    option('dist', {
        describe: 'Build for distribution',
        type: 'boolean',
        default: false
    })
}, async_cli(cli_build)).

command('serve <dest>', 'Serve document', (yargs) => {
    yargs.
    option('port', {
        describe: 'Port to serve',
        alias: 'p',
        type: 'number',
        default: PORT
    }).
    option('page-size', {
        describe: 'Page size',
        alias: 's',
        type: 'number',
        default: 16
    })
}, async_cli(cli_serve)).

strict().
demandCommand().
help().
argv

function async_cli(async_fn) {
    return (arg) => {
        async_fn(arg).
        catch(e => {
            console.error(e)
            process.exit(1)
        })
    }
}

async function cli_dev(conf) {
    await dev(conf.src, conf.dest, {
        port: conf.port,
        dist: conf.dist,
        page_size: conf.pageSize
    })
}

async function cli_build(conf) {
    await build(conf.src, conf.dest, {
        dist: conf.dist
    })
}

async function cli_serve(conf) {
    await serve(conf.dest, {
        port: conf.port,
        page_size: conf.pageSize
    })
}
