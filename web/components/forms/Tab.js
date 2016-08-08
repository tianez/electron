'use strict'

class Tab extends React.Component {
    constructor() {
        super()
        this.state = ({
            dotstyle: {
                top: 0,
                left: 0,
            },
            dot: 0
        })
    }
    _onClick(index) {
        this.setState({
            dot: index
        })
    }
    render() {
        let dot = this.state.dot
        let childs = []
        if (this.props.children) {
            if (this.props.children.length) {
                childs = this.props.children
            } else {
                childs.push(this.props.children)
            }
        }
        return (
            React.createElement('div', {
                    className: 'tab'
                },
                React.createElement('div', {
                        className: 'tab-cards'
                    },
                    childs.map(function(child, index) {
                        let active = index == dot ? ' active' : ''
                        return React.createElement('div', {
                                key: index,
                                onClick: this._onClick.bind(this, index),
                                className: 'tab-card' + active
                            },
                            child.props.title
                        )
                    }.bind(this)),
                    React.createElement('div', {
                        className: 'tab-cardsw',
                        style: {
                            width: '5rem',
                        }
                    })
                ),
                React.createElement('div', {
                        className: 'tab-cards2'
                    },
                    childs.map(function(child, index) {
                        let active = index == dot ? ' active' : ''
                        return React.createElement('div', {
                                key: index,
                                className: 'tab-card2 ' + active
                            },
                            child.props.children
                        )
                    })
                )
            )
        )
    }
}

Tab.defaultProps = {
    value: '保存'
}

module.exports = Tab
