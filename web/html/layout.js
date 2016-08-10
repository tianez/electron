'use strict'
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
const Apicloud = require('../components/utils/Apicloud')
const Header = require('./header')
const Sidebar = require('./sidebar')
const Footer = require('./footer')
var Layout = React.createClass({
    _onChange: function () {
        let config = ConfigStore.getAll()
        console.log(config)
        window.document.title = config.title
        this.setState(config)
    },
    componentDidMount: function () {
        ConfigStore.addChangeListener(this._onChange);
        let filter = {
            where: {
                state: 1
            },
            order: ['order DESC', 'createdAt DESC'],
            limit: 100
        }
        Apicloud.get('role', filter, function (err, res) {
            let roles = JSON.parse(res.text)
            ConfigActions.update('roles', roles)
        })
    },
    componentWillUnmount: function () {
        ConfigStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            // React.createElement(ReactCSSTransitionGroup, {
            //         component: 'div',
            //         id: 'warper',
            //         className: 'pure-g',
            //         transitionName: 'switch',
            //         transitionEnterTimeout: 500,
            //         transitionLeaveTimeout: 500
            //     },
            React.createElement('div', {
                id: 'warper',
                className: 'pure-g',
            },
                // React.createElement('div', {
                //         className: 'switch',
                //         key: this.props.location.pathname
                //     },
                React.createElement(Header),
                React.createElement('section', {
                    id: 'main'
                },
                    React.createElement(Sidebar),
                    React.createElement('section', {
                        id: 'content',
                        className: 'pure-u-1'
                    }, this.props.children)
                ),
                React.createElement(Footer)
                // )
            )
        )
    }
})
module.exports = Layout
