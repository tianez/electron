'use strict'
const request = require('superagent')
const {
    Link
} = ReactRouter;
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
                        className: 'pure-u-1'
                    },
                    React.createElement('form', {
                            className: 'pure-form pure-form-stacked pure-u-1-3',
                            style: {
                                margin: '0 auto',
                                display: 'block'
                            },
                            onSubmit: this._onSubmit
                        },
                        React.createElement('fieldset', {},
                            React.createElement('legend', {}, '用户登录'),
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'username',
                                value: this.state.info.user_name,
                                onChange: this._onChange1
                            }),
                            React.createElement('input', {
                                type: 'password',
                                placeholder: 'Password',
                                value: this.state.info.password,
                                onChange: this._onChange2
                            }),
                            React.createElement('input', {
                                type: 'submit',
                                className: 'pure-button pure-button-primary',
                                value: '登陆'
                            })
                        )
                    ),
                    React.createElement(Link, {
                        to: '/',
                        title: 'drag'
                    }, 'drag'),
                    React.createElement(Link, {
                        to: 'login',
                        title: 'login'
                    }, 'login')
                )
            )
        )
    }
})
module.exports = Login
