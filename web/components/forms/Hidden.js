'use strict'

var Hidden = React.createClass({
    render: function() {
        return (
            React.createElement('input', {
                type: 'hidden',
                disabled: this.props.disabled,
                value: this.props.value
            })
        )
    }
})

module.exports = Hidden
