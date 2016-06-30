'use strict';
var FormGroup = require('./formGroup')
const Input = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value,
            tip: this.props.tip,
            length: 0,
        }
    },
    componentWillMount: function() {
        let length = this.props.value.length
        let min = length < this.props.min && this.props.min
        let max = length > this.props.max && this.props.max
        let error = length > 0 && (min || max)
        let warning = length == 0 && this.props.required
        let success = length > 0 && !min && !max
        this.setState({
            length: length,
            error: error,
            warning: warning,
            success: success,
        })
    },
    handleChange: function(e) {
        let error = false
        let warning = false
        let success = false
        let value = e.target.value.replace(/(^\s*)|(\s*$)/g, "")
        let length = value.length
        let tip = this.props.tip
        if (value) {
            let type = this.props.type
            if (Regs[type] && !Regs[type].test(value)) {
                tip = Regs[type + '-tip']
                error = true
            }
            if (length < this.props.min && this.props.min) {
                tip = '请输入至少' + this.props.min + '个字符！'
                error = true
            } else if (length > this.props.max && this.props.max) {
                tip = '请输入至多' + this.props.max + '个字符！'
                value = this.state.value
                length = 20
                error = true
            }
            if (!error) {
                success = true
            }
        } else if (this.props.required) {
            tip = this.props.title + '必须填写！'
            warning = true
        }
        this.setState({
            value: value,
            tip: tip,
            length: length,
            error: error,
            warning: warning,
            success: success,
        })
        if (success || !this.props.required) {
            this.props._onChange(this.props.k, value)
        }
    },
    _onFocus: function(e) {
        let value = e.target.value

    },
    render: function() {
        let helpClass = classNames({
            'fa': true,
            'fa-exclamation': this.state.error,
            'fa-warning': this.state.warning,
            'fa-check': this.state.success,
        })
        let help = ''
        if (this.props.max) {
            help = ' ' + this.state.length + ' / ' + this.props.max
        }
        let password = ''
        if (this.props.type == 'password') {
            password = React.createElement('input', {
                type: 'password',
                style: {
                    display: 'none',
                },
            })
        }
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                    error: this.state.error,
                    warning: this.state.warning,
                    success: this.state.success,
                },
                React.createElement('div', {
                        className: 'input-icon right'
                    },
                    React.createElement('i', {
                        className: helpClass
                    }, help),
                    password,
                    React.createElement('input', {
                        className: 'form-control',
                        type: this.props.type,
                        value: this.state.value,
                        placeholder: this.props.placeholder,
                        disabled: this.props.disabled,
                        required: this.props.required,
                        autoComplete: 'off',
                        onChange: this.handleChange,
                        onFocus: this.handleChange,
                        onBlur: this.handleChange,
                    })
                )
            )
        )
    }
})

module.exports = Input