let StyleButton = require('./StyleButton')

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
                    label: type.label,
                    onToggle: type.action
                })
            )
        )
    )
}
