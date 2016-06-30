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

        this.ENTITY_CONTROLS = [{
            label: 'Add Link',
            action: this._addLink.bind(this)
        }, {
            label: 'Remove Link',
            action: this._removeLink.bind(this)
        }];

        this.INLINE_STYLES = [{
            label: 'Bold',
            style: 'BOLD'
        }, {
            label: 'Italic',
            style: 'ITALIC'
        }, {
            label: 'Underline',
            style: 'UNDERLINE'
        }, {
            label: 'Monospace',
            style: 'CODE'
        }, {
            label: 'Strikethrough',
            style: 'STRIKETHROUGH'
        }];

        this.BLOCK_TYPES = [{
            label: 'P',
            style: 'unstyled'
        }, {
            label: 'H1',
            style: 'header-one'
        }, {
            label: 'H2',
            style: 'header-two'
        }, {
            label: 'Blockquote',
            style: 'blockquote'
        }, {
            label: 'UL',
            style: 'unordered-list-item'
        }, {
            label: 'OL',
            style: 'ordered-list-item'
        }, {
            label: 'Code Block',
            style: 'code-block'
        }];
        this.state = {
            editorState: value ?
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(htmlToContent(value)),
                    decorator
                ) : EditorState.createEmpty(decorator)
        };

        // this.focus = () => this.refs.editor.focus();
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
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
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
    }
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

module.exports = BasicHtmlEditor
