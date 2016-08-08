'use strict'
const RcColorPicker = require('rc-color-picker')

class ColorPicker extends React.Component {
    constructor() {
        super()
    }
    changeHandler(colors) {
        console.log(colors);
    }
    render() {
        return (
            React.createElement(RcColorPicker, {
                animation: "slide-up",
                color: '#36c',
                onChange: this.changeHandler.bind(this)
            })
        )
    }
}

module.exports = ColorPicker
