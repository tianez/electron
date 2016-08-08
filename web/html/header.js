'use strict'
const {
    Link
} = ReactRouter;

const Apicloud = require('../components/utils/Apicloud')
class A extends React.Component {
    render() {
        return (
            React.createElement('li', {
                    className: 'pure-menu-item'
                },
                React.createElement(Link, {
                        className: 'pure-menu-link',
                        to: '/' + this.props.to,
                        activeClassName: 'active'
                    },
                    this.props.title
                )
            )
        )
    }
}
class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: null
        }
    }
    componentDidMount() {
        let filter = {
            where: {
                state: 1
            },
            order: ['order DESC', 'createdAt DESC'],
            limit: 20
        }
        let that = this
        new Promise(function(resolve, reject) {
            Apicloud.get('menu', filter, function(err, res) {
                if (err) {
                    reject('error');
                } else {
                    let menu = JSON.parse(res.text)
                    resolve(menu);
                    that.setState({
                        menu: menu
                    })
                }
            })
        }).then(function(r) {
            // console.log('Done: ' + r);
            return new Promise(function(resolve, reject) {
                // console.log('calculating');
                resolve('2000 OK');
            });
        }).then(function(r) {
            console.log('Done: ' + r);
        }).catch(function(reason) {
            console.log('Failed: ' + reason);
        });
        // Apicloud.get('menu', filter, function(err, res) {
        //     let menu = JSON.parse(res.text)
        //     this.setState({
        //         menu: menu
        //     })
        // }.bind(this))
    }
    render() {
        let menus
        if (this.state.menu) {
            menus = this.state.menu.map(function(d, index) {
                return React.createElement(A, {
                    key: index,
                    to: d.link,
                    title: d.title
                })
            })
        }
        return (
            React.createElement('header', {
                    id: 'header',
                    className: 'pure-u-1 pure-menu pure-menu-horizontal pure-menu-fixed'
                },
                React.createElement(Link, {
                    className: 'pure-menu-heading pure-menu-link left',
                    to: '/'
                }, '我的理想乡'),
                React.createElement('ul', {
                        className: 'pure-menu-list left'
                    },
                    React.createElement(A, {
                        to: 'login',
                        title: 'login'
                    }),
                    React.createElement(A, {
                        to: 'logout',
                        title: 'logout'
                    }),
                    menus
                )
            )
        )
    }
}
module.exports = Header
