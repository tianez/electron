'use strict'

class Botton extends React.Component {
    constructor() {
        super()
        this.state = ({
            dotstyle: {
                top: 0,
                left: 0,
            },
            dot: false
        })
    }
    onClick(e) {
        let top = e.clientY - e.target.getBoundingClientRect().top
        let left = e.clientX - e.target.getBoundingClientRect().left
        this.setState({
            dotstyle: {
                top: top + 'px',
                left: left + 'px',
            },
            dot: true
        })
        setTimeout(function() {
            this.setState({
                dot: false
            })
        }.bind(this), 3000)
    }
    render() {
        return (
            React.createElement('div', {
                    className: 'form-group'
                },
                React.createElement('div', {
                        className: 'form-control'
                    },
                    React.createElement('div', {
                            className: 'content'
                        },
                        React.createElement('button', {
                                className: 'button styl-material',
                                id: 'js-ripple-btn'
                            },
                            React.createElement('svg', {
                                    className: 'ripple-obj',
                                    id: 'js-ripple'
                                },
                                React.createElement('use', {
                                    height: '100px',
                                    width: '100px',
                                    'xlink:href': '#ripply-scott',
                                    className: 'js-ripple'
                                })
                            )
                        )
                    ),
                    React.createElement('div', {
                            className: 'pure-button-dot',
                            onClick: this.onClick.bind(this),
                            ref: 'theInput'
                        },
                        React.createElement('input', {
                            className: 'pure-button pure-button-primary',
                            type: 'submit',
                            disabled: this.props.disabled,
                            value: this.props.value
                        }),
                        this.state.dot ? React.createElement('div', {
                            className: 'pure-dot',
                            style: this.state.dotstyle
                        }) : ''
                    )
                )
            )
        )
    }
}

Botton.defaultProps = {
    value: '保存'
}

module.exports = Botton
