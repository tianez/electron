'use strict';
var FormGroup = require('./formGroup')
const China_id = React.createClass({
	getInitialState: function() {
		return {
			value: ''
		}
	},
	getDefaultProps: function() {
		return {
			tip: '',
			disabled: '',
			required: '',
		}
	},
	componentDidMount: function() {
		this._setValue(this.props.value)
	},
	handleChange: function(e) {
		let value = e.target.value
		value = value.replace(/\s/g, '')
		if (value) {
			if (!Regs['number'].test(value)) {
				value = this.state.value || ''
			}
		}
		this._setValue(value)
		this.props._onChange(this.props.k, value)
	},
	_setValue: function(v) {
		let start = v.substr(0, 6)
		let center = v.substr(6, 8)
		let end = v.substr(14, 4)
		if (center) {
			start += ' ' + center
		}
		if (end) {
			start += ' ' + end
		}
		this.setState({
			value: start
		})
	},
	render: function() {
		return (
			React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                },
				React.createElement('input', {
					className: 'form-control',
					type: this.props.type,
					value: this.state.value,
					onChange: this.handleChange,
					placeholder: this.props.placeholder,
					disabled: this.props.disabled,
					required: this.props.required,
				})
			)
		)
	}
})

module.exports = China_id