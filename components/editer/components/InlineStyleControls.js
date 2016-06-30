let StyleButton = require('./StyleButton')

module.exports = function InlineStyleControls(props) {
    let {
        inlineStyles
    } = props;
    var currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        React.createElement('div', {
                className: 'RichEditor-controls'
            },
            inlineStyles.map(type =>
                React.createElement(StyleButton, {
                    key: type.label,
                    active: currentStyle.has(type.style),
                    label: type.label,
                    onToggle: type.action,
                    style: type.style
                })
            )
        )
    )
}
