let StyleButton = require('./StyleButton')
module.exports = function BlockStyleControls(props) {
    const {
        editorState,
        blockTypes
    } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        React.createElement('div', {
                className: 'RichEditor-controls'
            },
            blockTypes.map(type =>
                React.createElement(StyleButton, {
                    key: type.label,
                    active: type.style === blockType,
                    label: type.label,
                    onToggle: props.onToggle,
                    style: type.style
                })
            )
        )
    )
}
