'use strict'
let StyleButton = require('./StyleButton')

let Language = require('../config/Language')
let local = 'zh_CN'
let locals = Language[local]

let INLINE_STYLES = [{
    label: 'Bold',
    icon: 'fa-bold',
    style: 'BOLD'
}, {
    label: 'Italic',
    icon: 'fa-italic',
    style: 'ITALIC'
}, {
    label: 'Underline',
    icon: 'fa-underline',
    style: 'UNDERLINE'
}, {
    label: 'Monospace',
    style: 'CODE'
}, {
    label: 'Strikethrough',
    style: 'STRIKETHROUGH'
}]

module.exports = function InlineStyleControls(props) {
    let inlineStyles = props.inlineStyles || INLINE_STYLES
    let currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        React.createElement('div', {
                className: 'RichEditor-controls'
            },
            inlineStyles.map(type =>
                React.createElement(StyleButton, {
                    key: type.label,
                    active: currentStyle.has(type.style),
                    label: locals[type.label] || type.label,
                    icon: type.icon,
                    onToggle: props.onToggle,
                    style: type.style
                })
            )
        )
    )
}
