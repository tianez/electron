'use strict'

const Layout = require('./layout')
const Header = require('./header')
const Footer = require('./footer')
const Nomatch = require('./Nomatch')
const Home = require('./home')
const Drag = require('./drag')
const ApiCloudsIndex = require('./ApiCloudsIndex')
const ApiClouds = require('./ApiClouds')
const ApiCloud = require('./ApiCloud')
const Pages = require('./Pages')
const Page = require('./Page')

var Temp = {
    Layout: Layout,
    Header: Header,
    Footer: Footer,
    Nomatch: Nomatch,
    Home: Home,
    Drag: Drag,
    ApiCloudsIndex: ApiCloudsIndex,
    ApiClouds: ApiClouds,
    ApiCloud: ApiCloud,
    Pages: Pages,
    Page: Page,
}
module.exports = Temp
