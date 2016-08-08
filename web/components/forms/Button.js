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
                            className: 'form-button-dot',
                            onClick: this.onClick.bind(this),
                        },
                        React.createElement('input', {
                            className: 'pure-button pure-button-primary form-button',
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
