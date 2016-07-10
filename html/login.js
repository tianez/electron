'use strict'

const {
    Link
} = ReactRouter;
var Login = React.createClass({
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
                              display:'block'
                            }
                        },
                        React.createElement('fieldset', {},
                            React.createElement('legend', {}, '用户登录'),
                            React.createElement('input', {
                                type: 'email',
                                placeholder: 'Email'
                            }),
                            React.createElement('input', {
                                type: 'password',
                                placeholder: 'Password'
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
