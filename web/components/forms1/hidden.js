'use strict';
const Hidden = React.createClass({
    render: function() {
        return (
            React.createElement('input', {
                type: 'hidden',
                name: this.props.k,
                value: this.props.value
            })
        )
    }
});

module.exports = Hidden