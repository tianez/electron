'use strict';
var FormGroup = require('./formGroup')
const Password = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        }
    },
    handleChange: function(e) {
        let value = e.target.value
        value = value.replace(/(^\s*)|(\s*$)/g, "")
        this.setState({
            value: value
        })
        this.props._onChange(this.props.k, value)
    },
    render: function() {
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.props.tip,
                    k: this.props.kk,
                },
                React.createElement('input', {
                    type: 'password',
                    style: {
                        display: 'none',
                    },
                }),
                React.createElement('input', {
                    className: 'form-control',
                    type: 'password',
                    value: this.state.value,
                    placeholder: this.props.placeholder,
                    onChange: this.handleChange,
                    autoComplete: 'off',
                })
            )
        )
    }
});

module.exports = Password