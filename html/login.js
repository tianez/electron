'use strict'
const request = require('superagent')
const {
    Link
} = ReactRouter;
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
var Login = React.createClass({
    getInitialState: function() {
        return {
            info: {
                user_name: 'tianez',
                password: '123456'
            }
        }
    },
    _onChange1: function(e) {
        console.log(e.target.value);
        let info = this.state.info
        info['user_name'] = e.target.value
        this.setState({
            info: info
        })
    },
    _onChange2: function(e) {
        console.log(e.target.value);
        let info = this.state.info
        info['password'] = e.target.value
        this.setState({
            info: info
        })
    },
    _onChange: function(name, value) {
        let info = this.state.info
        info[name] = value
        this.setState({
            info: info
        })
    },
    _onSubmit: function(e) {
        e.preventDefault();
        request
            .post('http://www.mycms.com/login2')
            .send(this.state.info)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                console.log(err);
                console.log(res);
            })
    },
    render: function() {
        return (
            React.createElement('section', {
                    className: 'pure-g'
                },
                React.createElement('section', {
                        className: 'pure-u-1 login'
                    },
                    React.createElement('section', {
                            className: 'login_t pure-u-1'
                        },
                        React.createElement(Link, {
                            to: '/',
                            title: 'drag'
                        }, 'drag'),
                        React.createElement(Link, {
                            to: 'login',
                            title: 'login'
                        }, 'login')
                    ),
                    React.createElement(Form, {
                            action: 'http://www.mycms.com/login2',
                            info: this.state.info,
                            apiSubmit: false,
                            legend: '用户登录',
                            onSubmit: this._onSubmit
                        },
                        React.createElement(Input, {
                            type: 'text',
                            title: '用户名',
                            name: 'user_name',
                            placeholder: 'username',
                            value: this.state.info.user_name,
                            onChange: this._onChange
                        }),
                        React.createElement(Input, {
                            type: 'password',
                            title: '密码',
                            name: 'password',
                            placeholder: 'password',
                            value: this.state.info.password,
                            onChange: this._onChange
                        }),
                        React.createElement(Button, {
                            value: '登录'
                        })
                    )
                )
            )
        )
    }
})
module.exports = Login
