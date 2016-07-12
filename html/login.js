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
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                user_name: 'tianez',
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
        e.preventDefault();
        request
            .post('http://www.mycms.com/login2')
            .send(this.state.info)
            .set('Accept', 'application/json')
            .set('Cookie', 'usern=tianez')
            .end(function(err, res) {
                if (err) throw err
                console.log(res);
                console.log(res.xhr);
                let setCookie2 = res.header['set-cookie']
                console.log(setCookie2.length);
                for (let i = 0; i < setCookie2.length; i++) {
                    console.log(setCookie2[i]);
                }
                let data = JSON.parse(res.text)
                storedb('user').insert(data)
                    // this.props.history.pushState(null, '/')
                console.log(data);
                console.log(document.cookie);
            }.bind(this))
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
                            onSubmit: this._onSubmit.bind(this)
                        },
                        React.createElement(Input, {
                            type: 'text',
                            title: '用户名',
                            name: 'user_name',
                            placeholder: 'username',
                            value: this.state.info.user_name,
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
