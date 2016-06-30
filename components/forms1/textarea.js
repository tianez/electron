'use strict';
var FormGroup = require('./formGroup')
const Textarea = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
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
        let value = e.target.value.replace(/(^\s*)|(\s*$)/, "")
        let length = value.length
        let tip = this.props.tip
        if (value) {
            if (length < this.props.min && this.props.min) {
                tip = '请输入至少' + this.props.min + '个字符！'
                error = true
            } else if (length > this.props.max && this.props.max) {
                tip = '请输入至多' + this.props.max + '个字符！'
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
    render: function() {
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                    error: this.state.error,
                    warning: this.state.warning,
                    success: this.state.success,
                },
                React.createElement('textarea', {
                    className: 'form-control',
                    value: this.state.value,
                    type:'text',
                    onChange: this.handleChange,
                    placeholder: this.props.placeholder,
                    disabled: this.props.disabled,
                    required: this.props.required,
                }) 
            )
        )
    }
});

module.exports = Textarea