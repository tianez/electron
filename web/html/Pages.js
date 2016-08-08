'use strict'
const {
    Link
} = ReactRouter;

const request = require('superagent')

class L extends React.Component {
    constructor() {
        super()
    }
    render() {
        let p
        let page = this.props.page
        if (page == this.props.current_page) {
            p = React.createElement('span', {
                className: 'pure-button active',
            }, page)
        } else {
            p = React.createElement(Link, {
                className: 'pure-button',
                to: '/api/' + this.props.url + '?page=' + page,
            }, page)
        }
        return (
            React.createElement("li", {
                key: page,
            }, p)
        )
    }
}

class Page extends React.Component {
    constructor() {
        super()
    }
    render() {
        let i = 1
        let prev = 4
        let total = this.props.page.total || ''
        let last_page = this.props.page.last_page || ''
        let current_page = this.props.page.current_page || ''
        let items = []
        if (prev > last_page + 1) {
            prev = last_page + 1
        }
        for (i; i < prev; i++) {
            let p = React.createElement(L, {
                url: this.props.url,
                page: i,
                current_page: current_page
            })
            items.push(p)
        }
        let j = current_page - 1
        let c = current_page + 2
        if (c > last_page + 1) {
            c = last_page + 1
        }
        if (j > i && j > prev - 1) {
            let p = React.createElement("li", {},
                React.createElement('span', {
                    className: 'pure-button'
                }, '...')
            )
            items.push(p)
            for (j; j < c; j++) {
                let p = React.createElement(L, {
                    url: this.props.url,
                    page: j,
                    current_page: current_page
                })
                items.push(p)
            }
        } else {
            j = i
            for (j; j < c; j++) {
                let p = React.createElement(L, {
                    url: this.props.url,
                    page: j,
                    current_page: current_page
                })
                items.push(p)
            }
        }
        let k = last_page - prev + 2
        if (k > j) {
            let p = React.createElement("li", {},
                React.createElement('span', {
                    className: 'pure-button'
                }, '...')
            )
            items.push(p)

        } else {
            k = j
        }
        for (k; k < last_page + 1; k++) {
            let p = React.createElement(L, {
                url: this.props.url,
                page: k,
                current_page: current_page
            })
            items.push(p)
        }
        return (
            React.createElement("nav", {
                    className: 'pure-menu pure-menu-open pure-menu-horizontal'
                },
                React.createElement("ul", {
                        className: "pure-paginator"
                    },
                    React.createElement("li", {},
                        React.createElement("span", {
                            className: 'pure-button',
                            "aria-hidden": "true"
                        }, '共查询到' + total + '条数据')
                    ),
                    items,
                    React.createElement("li", {},
                        React.createElement("span", {
                            className: 'pure-button totle',
                        }, '共' + last_page + '页')
                    )
                )
            )
        )
    }
}
const Pages = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            del_id: [],
            del_all: [],
            isdel_all: false,
            thead_key: [],
            thead_name: [],
            title: '',
            pages: {},
            url: this.props.params.pages,
        }
    },

    getDefaultProps: function() {},

    componentDidMount: function() {
        let query = this.props.location.query
        let page = query.page || 1
        let url = this.props.params.pages;
        this._reQuest(url, page)
    },
    componentWillReceiveProps: function(nextProps) {
        let page = nextProps.location.query.page || 1
        let page2 = this.props.location.query.page || 1
        if (this.props.params.pages != nextProps.params.pages || page != page2) {
            let url = nextProps.params.pages;
            this._reQuest(url, page)
        }
    },
    _reQuest: function(url, page) {
        url = 'http://www.mycms.com/' + url
        request.get(url)
            .query({
                page: page
            })
            .end(function(err, res) {
                if (err) {
                    let msg = [res.status + 'error']
                } else {
                    let data = JSON.parse(res.text)
                    if (data.res == 404) {
                        this.setState({
                            mods: [],
                            info: data.info,
                            title: data.msg,
                        });
                        return
                    }
                    ConfigActions.update('title', data.title)
                    let items = []
                    this.setState({
                        pages: data.pages,
                        items: items.concat(data.pages.data),
                        del_all: this._set_del_all(data.info),
                        thead: data.thead,
                        thead_key: data.thead.th,
                        thead_name: data.thead.td,
                        title: data.title,
                    });
                }
            }.bind(this))
    },
    _set_del_all: function(items) {
        let del_all = []
        let x
        for (x in items) {
            del_all.push(items[x]['id'])
        }
        return del_all
    },
    _del: function(e) {
        console.log(e.target)
        console.log(e.target.value)
    },
    _thead: function() {
        let thead_name = this.state.thead_name
        let list = thead_name.map(function(d) {
            return (
                React.createElement("th", {
                    key: d
                }, d)
            )
        }.bind(this))
        let isdel_all = this.state.isdel_all
        let checked
        if (isdel_all) {
            checked = 'checked'
        } else {
            checked = ''
        }
        return (
            React.createElement("thead", {},
                React.createElement("tr", {},
                    React.createElement("th", {
                            colSpan: "1",
                            rowSpan: "1",
                            className: "table-checkbox sorting_disabled"
                        },
                        React.createElement("div", {
                                className: "checker"
                            },
                            React.createElement("span", {
                                    className: checked
                                },
                                React.createElement("input", {
                                    className: "group-checkable",
                                    type: "checkbox",
                                    onClick: this._isdel_all,
                                })
                            )
                        )
                    ),
                    list,
                    React.createElement("th", {}, '操作')
                )
            )
        )
    },
    _isdel_all: function() {
        let isdel_all = this.state.isdel_all
        let del_all = this.state.del_all
        let del_id = []
        if (isdel_all) {
            isdel_all = false
        } else {
            isdel_all = true
            del_id = del_id.concat(del_all)
        }
        this.setState({
            isdel_all: isdel_all,
            del_id: del_id
        });
    },
    _list: function(data) {
        let url = this.props.params.list
        let td = this.state.thead_key
        let list = td.map(function(d) {
            return (
                React.createElement("td", {
                    key: d + data.id
                }, data[d])
            )
        }.bind(this))
        return list
    },
    _click: function(e) {
        let del_id = this.state.del_id
        let k = parseInt(e.target.value)
        let index = del_id.indexOf(k)
        if (index == -1) {
            del_id.push(k)
        } else {
            del_id.splice(index, 1)
        }
        this.setState({
            del_id: del_id
        })
    },
    _onDel: function(e) {
        e.preventDefault()
        let id = e.target.id
        id = id.split("_")
        id = id[1]
        let url = '../' + this.props.params.list + '/del/' + id
        request.get(url)
            .end(function(err, res) {
                if (err) {
                    ConfigActions.msg(res.status + 'error')
                } else {
                    var data = JSON.parse(res.text)
                    if (data.res == 404) {
                        this.setState({
                            mods: [],
                            info: data.info,
                            title: data.msg,
                        });
                        return
                    }
                    this.componentDidMount()
                    ConfigActions.msg(data.msg)
                }
            }.bind(this))
    },
    render: function() {
        let url = this.props.params.pages
        let list = this.state.items.map(function(data) {
            let curl = '/api/' + url + '/' + data.id
            let arr = this.state.del_id
            let k = data.id
            let checked
            if (arr.indexOf(k) != -1) {
                checked = 'checked'
            } else {
                checked = ''
            }
            let role
            if (url == 'roles') {
                role = React.createElement(Link, {
                    activeClassName: "active",
                    to: '/permissions/' + data.id,
                    style: {
                        marginLeft: '20px'
                    }
                }, "用户组权限")
            }
            return (
                React.createElement("tr", {
                        key: data.id
                    },
                    React.createElement("td", {},
                        React.createElement("div", {
                                className: "checker"
                            },
                            React.createElement("span", {
                                    className: checked
                                },
                                React.createElement("input", {
                                    className: "checkboxes",
                                    value: data.id,
                                    name: 'del_id[]',
                                    type: "checkbox",
                                    onClick: this._click,
                                })
                            )
                        )
                    ),
                    this._list(data),
                    React.createElement("td", {},
                        React.createElement(Link, {
                            activeClassName: "active",
                            to: curl
                        }, "编辑"),
                        ' | ',
                        React.createElement('a', {
                            activeClassName: "active",
                            id: 'del_' + data.id,
                            onClick: this._onDel
                        }, "删除"),
                        role
                    )
                )
            )
        }.bind(this))
        return (
            React.createElement("section", {
                    className: "pure-u-1"
                },
                React.createElement("h3", {
                        className: "page-title"
                    },
                    this.state.title
                ),
                React.createElement("table", {
                        className: "pure-table pure-table-bordered",
                        style: {
                            width: '100%'
                        }
                    },
                    this._thead(),
                    React.createElement("tbody", null,
                        list
                    )
                ),
                React.createElement(Page, {
                    page: this.state.pages,
                    url: this.props.params.pages,
                })
            )
        )
    }
})

module.exports = Pages
