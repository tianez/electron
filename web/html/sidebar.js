'use strict'
const {
    Link
} = ReactRouter;

const request = require('superagent')

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
                    React.createElement("i", {
                        className: this.props.icon
                    }),
                    React.createElement("span", {}, this.props.title),
                    React.createElement('i', {
                        className: 'fa fa-angle-right'
                    })
                ),
                this.props.children
            )
        )
    }
}

class Children extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    _onClick(e) {
        this.setState({
            curl: e.currentTarget.id
        })
        e.preventDefault()
    }
    render() {
        let list
        let lists = this.props.data.lists
        if (lists) {
            return React.createElement("ul", {
                    className: 'pure-menu-sub'
                },
                lists.map(function(d, index) {
                    return (
                        React.createElement(A, {
                                key: index,
                                to: 'api/' + d.curl,
                                title: d.title,
                                icon: d.icon
                            },
                            React.createElement(Children, {
                                data: d,
                            }))
                    )
                }.bind(this))
            )
        } else {
            return null
        }
    }
}
class Sidebar extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: []
        }
    }
    componentDidMount() {
        // var url = 'http://www.mycms.com/react/sidebar';
        // request.get(url)
        //     .end(function(err, res) {
        //         console.log(res);
        //         if (err) throw err;
        //         var data = JSON.parse(res.text);
        //         console.log(data);
        //         this.setState({
        //             menu: data
        //         });
        //     }.bind(this))
        let filter = {
            where: {
                state: 1
            },
            order: ['order DESC', 'createdAt DESC'],
            limit: 20
        }
        Apicloud.get('menu', filter, function(err, res) {
            let menu = JSON.parse(res.text)
            this.setState({
                menu2: menu
            })
        }.bind(this))
    }
    render() {
        let menus
        if (this.state.menu) {
            menus = this.state.menu.map(function(d, index) {
                return React.createElement(A, {
                        key: index,
                        to: 'api/' + d.curl,
                        title: d.title,
                        icon: d.icon
                    },
                    React.createElement(Children, {
                        data: d,
                    }))
            })
        }
        let menus2
        if (this.state.menu2) {
            menus = this.state.menu2.map(function(d, index) {
                return React.createElement(A, {
                    key: index,
                    to: d.link,
                    title: d.title
                })
            })
        }
        return (
            React.createElement('aside', {
                    id: 'sidebar',
                    className: 'pure-u-1 pure-menu sidebar'
                },
                React.createElement(Link, {
                    className: 'pure-menu-heading pure-menu-link',
                    to: '/'
                }, '我的理想乡'),
                React.createElement('ul', {
                        className: 'pure-menu-list'
                    },
                    React.createElement(A, {
                        to: 'drag',
                        title: 'drag'
                    }),
                    menus,
                    menus2
                )
            )
        )
    }
}
module.exports = Sidebar
