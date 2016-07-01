'use strict'

let debounce = require('lodash/debounce')
const {
    Editor,
    EditorState,
    Modifier,
    RichUtils,
    DefaultDraftBlockRenderMap,
    convertFromRaw,
    convertToRaw,
    CompositeDecorator,
    ContentState,
    Entity,
    AtomicBlockUtils,
    DraftPasteProcessor
} = Draft;

let htmlToContent = require('./utils/htmlToContent')
let draftRawToHtml = require('./utils/draftRawToHtml')
let findEntities = require('./utils/findEntities')

let Link = require('./components/Link')
let EntityControls = require('./components/EntityControls')
let InlineStyleControls = require('./components/InlineStyleControls')
let BlockStyleControls = require('./components/BlockStyleControls')
let ColorStyleControls = require('./components/ColorStyleControls')

class BasicHtmlEditor extends React.Component {
    constructor(props) {
        super(props);
        let {
            value
        } = props;
        let delay = props.delay ? props.delay : 500

        const decorator = new CompositeDecorator([{
            strategy: findEntities.bind(null, 'link'),
            component: Link
        }]);
        this.focus = () => this.refs.editor.focus()
        this.ENTITY_CONTROLS = [{
            label: 'Link',
            icon: 'fa-link',
            action: this._addLink.bind(this)
        }, {
            label: 'unLink',
            icon: 'fa-unLink',
            action: this._removeLink.bind(this)
        }, {
            label: 'focus',
            action: this.focus
        }]

        this.state = {
            editorState: value ?
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(htmlToContent(value)),
                    decorator
                ) : EditorState.createEmpty(decorator)
        };


        this.onChange = (editorState) => {
            let previousContent = this.state.editorState.getCurrentContent();
            this.setState({
                editorState
            });

            // only emit html when content changes
            if (previousContent !== editorState.getCurrentContent()) {
                this.emitHTML(editorState);
            }
        };

        function emitHTML(editorState) {
            let raw = convertToRaw(editorState.getCurrentContent());
            let html = draftRawToHtml(raw);
            this.props.onChange(html);
        }
        // this.emitHTML = debounce(emitHTML, this.props.debounce);
        this.emitHTML = debounce(emitHTML, delay);

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
        this.handleReturn = (e) => this._handleReturn(e);
        this.addLink = this._addLink.bind(this);
        this.removeLink = this._removeLink.bind(this);
    }

    _handleKeyCommand(command) {
        const {
            editorState
        } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _handleReturn(e) {
        if (e.metaKey === true) {
            return this._addLineBreak();
        } else {
            return false;
        }
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        console.log(inlineStyle);
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    _toggleColor(toggledColor) {
        const {
            editorState
        } = this.state;
        const selection = editorState.getSelection();
        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(styleMap)
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent());
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );
        const currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }
        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
            );
        }
        this.onChange(nextEditorState);
    }

    _addLineBreak( /* e */ ) {
        let newContent, newEditorState;
        const {
            editorState
        } = this.state;
        const content = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const block = content.getBlockForKey(selection.getStartKey());

        console.log(content.toJS(), selection.toJS(), block.toJS());

        if (block.type === 'code-block') {
            newContent = Modifier.insertText(content, selection, '\n');
            newEditorState = EditorState.push(editorState, newContent, 'add-new-line');
            this.onChange(newEditorState);
            return true;
        } else {
            return false;
        }
    }

    _addLink( /* e */ ) {
        const {
            editorState
        } = this.state;
        const selection = editorState.getSelection();
        if (selection.isCollapsed()) {
            return;
        }
        const href = window.prompt('Enter a URL');
        const entityKey = Entity.create('link', 'MUTABLE', {
            href
        });
        this.onChange(RichUtils.toggleLink(editorState, selection, entityKey));
    }

    _removeLink( /* e */ ) {
        const {
            editorState
        } = this.state;
        const selection = editorState.getSelection();
        if (selection.isCollapsed()) {
            return;
        }
        this.onChange(RichUtils.toggleLink(editorState, selection, null));
    }

    render() {
        const {
            editorState
        } = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (
            React.createElement('div', {
                    className: 'RichEditor-root draftjs-bhe',
                },
                React.createElement(BlockStyleControls, {
                    editorState: editorState,
                    blockTypes: this.BLOCK_TYPES,
                    onToggle: this.toggleBlockType
                }),
                React.createElement(InlineStyleControls, {
                    editorState: editorState,
                    inlineStyles: this.INLINE_STYLES,
                    onToggle: this.toggleInlineStyle
                }),
                React.createElement(EntityControls, {
                    editorState: editorState,
                    entityControls: this.ENTITY_CONTROLS
                }),
                React.createElement(ColorStyleControls, {
                    editorState: editorState,
                    onToggle: this.toggleColor
                }),
                React.createElement('div', {
                        className: className
                    },
                    React.createElement(Editor, {
                        blockStyleFn: getBlockStyle,
                        customStyleMap: styleMap,
                        editorState: editorState,
                        handleKeyCommand: this.handleKeyCommand,
                        handleReturn: this.handleReturn,
                        onChange: this.onChange,
                        placeholder: 'Tell a story...',
                        ref: 'editor',
                        spellCheck: true
                    })
                )
            )
        )
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    },
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
}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

module.exports = BasicHtmlEditor
