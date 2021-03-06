const path = require('path')
const fs = require('fs')

const express = require('express')

const {Service, ConfTable} = require('./service')
const {make_system_description} = require('./util')
const router = require('./router')
const middleware = require('./middleware')

class App {
    /*
    Arguments.
        * conf / Object / {}.
        * conf.port / Number / 8080.
        * conf.root / String. Path to build directory.
        * conf.page_size / Integer / 16.
    */
    constructor(conf) {
        this._conf = Object.assign({}, conf)
        this._conf.port = conf.port ? conf.port : 8080
        this._conf.page_size = conf.page_size ? conf.page_size : 16
    }

    async serve() {
        this._init_params()
        this._create_service()
        await this._load_doc_conf()
        this._create_express()
        this._load_view_engine()
        this._load_router()
        this._serve()
    }

    // private members

    _init_params() {
        this._conf.asset_dir = path.join(this._conf.root, 'asset')
    }

    _create_service() {
        this._service = new Service({
            root: this._conf.root,
            storage_file: path.join(this._conf.root, 'index.sqlite'),
            page_size: this._conf.page_size
        })
    }

    async _load_doc_conf() {
        let conf_table = this._service.get(ConfTable)
        this._doc_conf = await conf_table.list()
    }

    _create_express() {
        this._app = express()

        this._app.locals = {
            _title: this._doc_conf.get('name'),
            _icon: '/asset/icon.png',
            _sys_description: make_system_description(this._doc_conf)
        }
    }

    _load_view_engine() {
        this._app.set('views', path.join(__dirname, 'view'))
        this._app.set('view engine', 'pug')
    }

    _load_router() {
        this._app.use(middleware.service(this._service))

        this._app.use('/asset', router.asset(this._conf.asset_dir))
        this._app.use('/', router.root)
        this._app.use('/doc', router.doc)

        this._app.use('*', middleware.http_404)
    }

    _serve() {
        let server = this._app.listen(this._conf.port, () => {
            let addr = server.address()
            console.log(`Serving at "http://localhost:${addr.port}"`)
        })
    }
}

module.exports = App
