let StyleButton = require('./StyleButton')

let Language = require('../config/Language')
let local = 'zh_CN'
let locals = Language[local]

module.exports = function EntityControls(props) {
    let {
        entityControls
    } = props;
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        React.createElement('div', {
                className: 'RichEditor-controls'
            },
            entityControls.map(type =>
                React.createElement(StyleButton, {
                    key: type.label,
                    active: currentStyle.has(type.style),
                    label: locals[type.label] || type.label,
                    icon: type.icon,
                    onToggle: type.action
                })
            )
        )
    )
}
