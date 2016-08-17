'use strict'
const Apicloud = require('../components/utils/Apicloud')
const {
    Form,
    Input,
    Textarea,
    Editer,
    Radio,
    Checkbox,
    Upload,
    Range,
    Button,
    Hidden
} = require('../components/forms/index')
var ApiCloud = React.createClass({
    getDefaultProps: function () {
        return {
            article: '文章',
            menu: '菜单',
            model: '字段'
        }
    },
    getInitialState: function () {
        return {
            info: null
        }
    },
    componentDidMount: function () {
        this._req(this.props)
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.location.pathname !== this.state.hash) {
            this._req(nextProps)
        }
    },
    _req: function (props) {
        let action = props.params.clouds
        let title = this.props[action] ? this.props[action] : '田恩仲开发设计'
        let {
            articleId
        } = props.params
        let where = {
            state: 1
        }
        let $_GET = get(props.location.search)
        extend(where, $_GET)
        delete where['_k']
        let rep = {
            model: props.params.clouds
        }
        extend(where, rep, true)
        let filter = {
            where: where,
            order: ['order DESC', 'createdAt DESC'],
            limit: $_GET['limit'] ? parseInt($_GET['limit']) : 100
        }
        Apicloud.get('model', filter, function (err, res) {
            let model = JSON.parse(res.text)
            if (articleId !== 'add') {
                action = action + '/' + articleId
                let article = storedb('article').find({ 'id': articleId })
                if (article && article.length !== 0) {
                    article = article[0]['value']
                    article._method = 'PUT'
                    ConfigActions.update('title', article.title + '-编辑' + title)
                    this.setState({
                        hash: props.location.pathname,
                        model: model,
                        title: '编辑' + title,
                        info: article,
                        action: action,
                        id: articleId
                    })
                } else {
                    Apicloud.get(props.params.clouds + '/' + articleId, '', function (err, res) {
                        article = JSON.parse(res.text)
                        storedb('article').insert({ 'id': articleId, 'value': article })
                        article._method = 'PUT'
                        ConfigActions.update('title', article.title + '-编辑' + title)
                        this.setState({
                            hash: props.location.pathname,
                            model: model,
                            title: '编辑' + title,
                            info: article,
                            action: action,
                            id: articleId
                        })
                    }.bind(this))
                }
            } else {
                let userId = storedb('user').find()[0].userId
                let info = {
                    userId: userId
                }
                ConfigActions.update('title', '新增' + title)
                this.setState({
                    hash: props.location.pathname,
                    model: model,
                    title: '新增' + title,
                    action: action,
                    info: info
                })
            }
        }.bind(this))
    },
    _onChange: function (name, value) {
        let info = this.state.info
        info[name] = value
        this.setState({
            info: info
        })
    },
    _onSubmit: function (data) {
        ConfigActions.update('title', data.title)
        ConfigActions.update(data.id, data)
        if (!this.state.id) {
            ConfigActions.update('msg', '发布成功！')
            window.location.href = '/#/apicloud/' + this.props.params.clouds + '/' + data.id
        } else {
            ConfigActions.update('msg', '保存成功！')
        }
    },
    render: function () {
        let render
        let forms
        let info = this.state.info
        let model = this.state.model
        if (model) {
            let onChange = this._onChange
            forms = model.map(function (d, index) {
                if (info[d.name] || info[d.name] == 0) {
                    d.value = info[d.name]
                } else {
                    d.value = d.default || ''
                }
                d.key = d.name
                d.onChange = onChange
                switch (d.type) {
                    case "text":
                        return (React.createElement(Input, d))
                        break;
                    case "password":
                        return (React.createElement(Input, d))
                        break;
                    case "email":
                        return (React.createElement(Input, d))
                        break;
                    case "textarea":
                        return (React.createElement(Textarea, d))
                        break;
                    case "upload":
                        return (React.createElement(Upload, d))
                        break;
                    case "image":
                        return (React.createElement(Upload, d))
                        break;
                    case "editer":
                        return (React.createElement(Editer, d))
                        break;
                    case "radio":
                        return (React.createElement(Radio, d))
                        break;
                    case "checkbox":
                        return (React.createElement(Checkbox, d))
                        break;
                    case "hidden":
                        return (React.createElement(Hidden, d))
                        break;
                    default:
                        break;
                }
            })
        }
        if (info) {
            render =
                React.createElement('section', {
                    className: 'container'
                },
                    React.createElement('h3', null, this.state.title),
                    React.createElement(Form, {
                        action: this.state.action,
                        info: info,
                        legend: this.state.title,
                        onSubmit: this._onSubmit
                    },
                        forms,
                        React.createElement(Button)
                    )
                )
        }
        return (
            React.createElement('section', {
                className: 'warp'
            }, render)
        )
    }
})

module.exports = ApiCloud
