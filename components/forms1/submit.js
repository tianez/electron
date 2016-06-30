'use strict';
var FormGroup = require('./formGroup')
const Submit = React.createClass({
    getDefaultProps: function() {
        return {
            btnValue: '确定'
        }
    },
    render: function() {
        let classes = classNames({
            'form-group animated bounceInRight': true,
        })
        return (
            React.createElement(FormGroup, {
                    k: this.props.kk,
                },
                React.createElement('input', {
                    className: 'btn btn-success submit-btn',
                    type: 'submit',
                    value: this.props.btnValue
                })
            )
        )
    }
});

module.exports = Submit