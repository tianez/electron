'use strict';
var FormGroup = require('./formGroup')
const Checkbox = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        }
    },
    componentDidMount: function() {
        let value = this.props.value
        let v_type = typeof value
        if (v_type == 'string') {
            this.setState({
                value: JSON.parse(value),
                v_type: v_type
            })
        }
    },
    _click: function(e) {
        let value = this.state.value
        let v_type = this.state.v_type
        let k = parseInt(e.target.value)
        let index = value.indexOf(k)
        if (index == -1) {
            value.push(k)
        } else {
            value.splice(index, 1)
        }
        this.setState({
            value: value
        })
        if (v_type == 'string') {
            value = JSON.stringify(value)
        }
        this.props._onChange(this.props.k, value)
    },
    render: function() {
        let checkboxinline = this.props.inline ? 'checkbox' : 'checkbox-inline'
        let selectNodes = this.props.lists.map(function(d) {
            let arr = this.state.value
            let k = d.k
            let checked = ''
            if (arr.indexOf(k) != -1) {
                checked = 'checked'
            }
            return React.createElement("label", {
                    className: checkboxinline,
                    key: d.k
                },
                React.createElement('div', {
                        className: 'checker',
                    },
                    React.createElement('span', {
                            className: checked,
                        },
                        React.createElement('input', {
                            type: 'checkbox',
                            value: d.k,
                            checked: checked,
                            onChange: this._click
                        }))
                ),
                d.v
            )
        }.bind(this))
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                },
                React.createElement('div', {
                        className: 'checkbox-list'
                    },
                    selectNodes
                )
            )
        )
    }
});

module.exports = Checkbox