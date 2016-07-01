'use strict'
// let StyleButton = require('./StyleButton')

let Language = require('../config/Language')
let local = 'zh_CN'
let locals = Language[local]

let COLORS = [{
    label: 'Red',
    style: 'red'
}, {
    label: 'Orange',
    style: 'orange'
}, {
    label: 'Yellow',
    style: 'yellow'
}, {
    label: 'Green',
    style: 'green'
}, {
    label: 'Blue',
    style: 'blue'
}, {
    label: 'Indigo',
    style: 'indigo'
}, {
    label: 'Violet',
    style: 'violet'
}, ];


const colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};

class ColorControls extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let currentStyle = this.props.editorState.getCurrentInlineStyle()
        return (
            React.createElement('div', {
                    className: 'RichEditor-controls'
                },
                COLORS.map((type) =>
                    React.createElement(StyleButton, {
                        key: type.label,
                        active: currentStyle.has(type.style),
                        label: type.label,
                        onToggle: this.props.onToggle,
                        style: type.style
                    })
                )
            )
        )
    }
}

class StyleButton extends React.Component {
    constructor() {
        super()
    }
    onToggle(e) {
        e.preventDefault()
        this.props.onToggle(this.props.style)
    }
    render() {
        let className = 'RichEditor-styleButton';
        let style;
        if (this.props.active) {
            className += ' RichEditor-activeButton';
            style = colorStyleMap[this.props.style]
        }
        return (
            React.createElement('span', {
                className: className,
                style: style,
                onMouseDown: this.onToggle.bind(this)
            }, this.props.label)
        )
    }
}

module.exports = ColorControls
