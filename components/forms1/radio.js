'use strict';
var FormGroup = require('./formGroup')
const Checkbox = React.createClass({
	getInitialState: function() {
		console.log(this.props.value)
		return {
			value: this.props.value
		}
	},
	componentDidMount: function() {},
	_click: function(e) {
		let value = e.target.value
		this.setState({
			value: value
		})
		this.props._onChange(this.props.k, value)
	},
	render: function() {
		let radioinline = this.props.inline ? 'radio' : 'radio-inline'
		let selectNodes = this.props.lists.map(function(d) {
			let checked = ''
			if (d.k == this.state.value) {
				checked = 'checked'
			}
			return React.createElement("label", {
					className: radioinline,
					key: d.k
				},
				React.createElement('div', {
						className: 'radio',
					},
					React.createElement('span', {
							className: checked,
						},
						React.createElement('input', {
							type: 'radio',
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
						className: 'radio-list'
					},
					selectNodes
				)
			)
		)
	}
});

module.exports = Checkbox