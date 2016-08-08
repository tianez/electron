'use strict'

const classNames = require('classNames')

var FormGroup = React.createClass({
    render: function() {
        let classname = this.props.className ? 'form-group ' + this.props.className : 'form-group'
        return (
            React.createElement('div', {
                    className: classname
                },
                React.createElement('label', {
                    className: 'form-label'
                }, this.props.title),
                React.createElement('div', {
                        className: 'form-control'
                    },
                    this.props.limit ? React.createElement('i', {
                        className: 'form-ico fa'
                    }, this.props.limit) : null,
                    this.props.children,
                    this.props.help ? React.createElement('span', {
                        className: 'form-help'
                    }, this.props.help) : null
                )
            )
        )
    }
})
module.exports = FormGroup
