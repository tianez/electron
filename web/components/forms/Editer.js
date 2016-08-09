'use strict'

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
const Editer = require('../editer')
let {
    processHTML
} = require('draft-js/lib/DraftPasteProcessor')

const {
    Map
} = Immutable

const FormGroup = require('./FormGroup')

let htmlToContent = function(html) {
  return processHTML(html);
}

class MyEditer extends React.Component {
    constructor(props) {
        super(props);
        let { value } = props;
        console.log(htmlToContent(value));
        const decorator = new CompositeDecorator([{
            strategy: findLinkEntities.bind(null, 'link'),
            component: Link
        }])
        this.state = {
          editorState: value ?
            EditorState.createWithContent(
              ContentState.createFromBlockArray(htmlToContent(value)),
              decorator
            ) :
            EditorState.createEmpty(decorator)
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({
            editorState
        });
        this.handleKeyCommand = (command) => this._handleKeyCommand(command)
        this.toggleBlockType = (type) => this._toggleBlockType(type)
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
        this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);

        this.logState = () => {
            const content = this.state.editorState.getCurrentContent()
            this.setState({
                html: html
            })
        };
        this.onURLChange = (e) => this.setState({
            urlValue: e.target.value
        });
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    }
    _handleKeyCommand(command) {
        console.log(command);
        const {
            editorState
        } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState)
            return true
        }
        return false
    }
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }
    _toggleColor(toggledColor) {
        const {
            editorState
        } = this.state;
        const selection = editorState.getSelection();
        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(colorStyleMap)
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
    _promptForLink(e) {
        // const src = window.prompt('Enter a URL');
        e.preventDefault();
        const {
            editorState
        } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                showURLInput: true,
                urlValue: '',
            }, () => {
                setTimeout(() => this.refs.url.focus(), 0);
            });
        }
    }

    _confirmLink(e) {
        e.preventDefault();
        const {
            editorState,
            urlValue
        } = this.state;
        const entityKey = Entity.create('LINK', 'MUTABLE', {
            url: urlValue
        });
        this.setState({
            editorState: RichUtils.toggleLink(
                editorState,
                editorState.getSelection(),
                entityKey
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }

    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }
    _removeLink(e) {
        e.preventDefault();
        const {
            editorState
        } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    }
    clean(e) {
        e.preventDefault();
        this.setState({
            editorState: EditorState.createEmpty()
        });
        this.refs.editor.focus()
    }
    render() {
        const {
            editorState
        } = this.state;
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder'
            }
        }
        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                React.createElement('div', {},
                    React.createElement('input', {
                        onChange: this.onURLChange,
                        ref: 'url',
                        type: 'text',
                        value: this.state.urlValue,
                        onKeyDown: this.onLinkInputKeyDown
                    }),
                    React.createElement('button', {
                        onChange: this.onURLChange,
                        ref: 'url',
                        type: 'text',
                        value: 'this.state.urlValue',
                        onMouseDown: this.confirmLink
                    }, 'Confirm')
                )
        }
        return (
            React.createElement(FormGroup, {
                    title: this.props.title
                },


                React.createElement('div', {
                        className: 'RichEditor-root'
                    },
                    React.createElement(BlockStyleControls, {
                        editorState: editorState,
                        onToggle: this.toggleBlockType
                    }),
                    React.createElement(InlineStyleControls, {
                        editorState: editorState,
                        onToggle: this.toggleInlineStyle
                    }),
                    React.createElement(ColorControls, {
                        editorState: editorState,
                        onToggle: this.toggleColor
                    }),
                    React.createElement('div', {
                            className: 'RichEditor-controls',
                        },
                        React.createElement('span', {
                            className: 'RichEditor-styleButton',
                            onMouseDown: this._promptForLink.bind(this)
                        }, 'Add Link'),
                        React.createElement('span', {
                            className: 'RichEditor-styleButton',
                            onMouseDown: this._removeLink.bind(this)
                        }, 'Remove Link'),
                        React.createElement('span', {
                            className: 'RichEditor-styleButton',
                            onMouseDown: this.clean.bind(this)
                        }, 'clean')
                    ),
                    urlInput,
                    React.createElement('div', {
                            className: className,
                            onClick: this.focus
                        },
                        React.createElement(Editor, {
                            blockStyleFn: getBlockStyle,
                            customStyleMap: colorStyleMap,
                            editorState: editorState,
                            handleKeyCommand: this.handleKeyCommand,
                            onChange: this.onChange,
                            placeholder: 'Tell a story...',
                            ref: 'editor',
                            spellCheck: true
                        })
                    )
                ),
                React.createElement('input', {
                    onClick: this.logState,
                    type: 'button',
                    value: 'Log State',
                }),
                React.createElement('div', {}, this.state.html),
                React.createElement('div', {
                    dangerouslySetInnerHTML: {
                        __html: this.state.html
                    }
                })
            )
        )
    }
}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor(props) {
        super(props)
    }
    onToggle(e) {
        e.preventDefault()
        this.props.onToggle(this.props.style)
    }
    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        let style;
        if (this.props.active) {
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
const BLOCK_TYPES = [{
    label: 'H1',
    style: 'header-one'
}, {
    label: 'H2',
    style: 'header-two'
}, {
    label: 'H3',
    style: 'header-three'
}, {
    label: 'H4',
    style: 'header-four'
}, {
    label: 'H5',
    style: 'header-five'
}, {
    label: 'H6',
    style: 'header-six'
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
}, ]

class BlockStyleControls extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {
            editorState
        } = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return (
            React.createElement('div', {
                    className: 'RichEditor-controls',
                    onToggle: this.toggleBlockType
                },
                BLOCK_TYPES.map((type) =>
                    React.createElement(StyleButton, {
                        key: type.label,
                        active: type.style === blockType,
                        label: type.label,
                        onToggle: this.props.onToggle,
                        style: type.style
                    })
                )
            )
        )
    }
}

var INLINE_STYLES = [{
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
}, ];

class InlineStyleControls extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let currentStyle = this.props.editorState.getCurrentInlineStyle()
        return (
            React.createElement('div', {
                    className: 'RichEditor-controls'
                },
                INLINE_STYLES.map((type) =>
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

var COLORS = [{
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

function findLinkEntities(entityType, contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === entityType
            );
        },
        callback
    );
}

const Link = (props) => {
    const {
        url
    } = Entity.get(props.entityKey).getData();
    return (
        React.createElement('a', {
            href: url
        }, props.children)
    )
}
module.exports = MyEditer
