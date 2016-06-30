'use strict'
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
const Apicloud = require('../components/utils/Apicloud')
const Header = require('./header')
const Footer = require('./footer')
var Layout = React.createClass({
    componentDidMount: function() {
        let filter = {
            where: {
                state: 1
            },
            order: ['order DESC', 'createdAt DESC'],
            limit: 100
        }
        Apicloud.get('role', filter, function(err, res) {
            let roles = JSON.parse(res.text)
            ConfigActions.update('roles', roles)
        })
    },
    render: function() {
        return (
            React.createElement('div', {
                    className: 'warp'
                },
                React.createElement(Header),
                React.createElement(ReactCSSTransitionGroup, {
                        component: 'div',
                        id: 'main',
                        transitionName: 'switch',
                        transitionEnterTimeout: 500,
                        transitionLeaveTimeout: 500
                    },
                    React.createElement('div', {
                            className: 'switch',
                            key: this.props.location.pathname
                        },
                        this.props.children)
                ),
                React.createElement(Footer)
            )
        )
    }
})
module.exports = Layout
