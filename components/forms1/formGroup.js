'use strict';
const FormGroup = React.createClass({
	componentWillMount: function() {},
	render: function() {
		let classes = classNames({
			'form-group animated bounceInRight': true,
			'has-error': this.props.error,
			'has-warning': this.props.warning,
			'has-success': this.props.success,
		})
		let tclasses = classNames({
			'help-block animated': true,
			'has-error shake': this.props.error,
			'has-success': this.props.success,
		})
		return (
			React.createElement('div', {
					className: classes,
					style: {
						animationDelay: 300 + 100 * this.props.k + 'ms',
					}
				},
				React.createElement('label', {
						className: 'col-md-2 control-label'
					},
					this.props.title
				),
				React.createElement('div', {
						className: 'col-md-4'
					},
					this.props.children,
					React.createElement('span', {
							className: tclasses,
						},
						this.props.help
					)
				)
			)
		)
	}
})

module.exports = FormGroup