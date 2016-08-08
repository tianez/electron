'use strict';

var Canvas = React.createClass({
    getDefaultProps: function() {
        return {
            width: 200
        }
    },
    getInitialState: function() {
        return {
            width: this.props.width,
            height: this.props.height || this.props.width
        }
    },
    render: function() {
        return (
            React.createElement('div', {
                    style: {
                        width: this.state.width,
                        height: this.state.height
                    }
                },
                React.createElement('img', {
                    style: {
                        width: this.state.width,
                        height: this.state.height,
                        display: 'block'
                    },
                    src: this.props.src
                }))
        )
    }
})
module.exports = Canvas
