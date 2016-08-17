'use strict'
const request = require('superagent')
const {
    Link
} = ReactRouter;
const {
    Form,
    Input,
    Button
} = require('../components/forms/index')
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                username: 'tianez',
                password: '123456'
            }
        }
    }
    _onChange(name, value) {
        let info = this.state.info
        info[name] = value
        this.setState({
            info: info
        })
    }
    _onSubmit(e) {
        // e.preventDefault();
        // request
        //     .post('http://www.mycms.com/login2')
        //     .send(this.state.info)
        //     .set('Accept', 'application/json')
        //     .set('Cookie', 'usern=tianez')
        //     .end(function(err, res) {
        //         if (err) throw err
        //         console.log(res);
        //         let data = JSON.parse(res.text)
        //         console.log(res);
        //         storedb('user').insert(data)
        //         this.props.history.pushState(null, '/')
        //     }.bind(this))
        storedb('user').insert(e)
        this.props.history.pushState(null, '/')
    }
    render() {
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
                            title: '首页'
                        }, '首页'),
                        React.createElement(Link, {
                            to: 'login',
                            title: '登录'
                        }, '登录')
                    ),
                    React.createElement(Form, {
                        action: 'user/login',
                        info: this.state.info,
                        // apiSubmit: false,
                        legend: '用户登录',
                        onSubmit: this._onSubmit.bind(this)
                    },
                        React.createElement(Input, {
                            type: 'text',
                            title: '用户名',
                            name: 'username',
                            placeholder: 'username',
                            value: this.state.info.username,
                            onChange: this._onChange.bind(this)
                        }),
                        React.createElement(Input, {
                            type: 'password',
                            title: '密码',
                            name: 'password',
                            placeholder: 'password',
                            value: this.state.info.password,
                            onChange: this._onChange.bind(this)
                        }),
                        React.createElement(Button, {
                            value: '登录'
                        })
                    )
                )
            )
        )
    }
}
module.exports = Login
