'use strict'

class Botton extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            React.createElement('div', {
                    className: 'form-group'
                },
                React.createElement('div', {
                        className: 'form-control'
                    },
                    React.createElement('input', {
                        className: 'pure-button pure-button-primary',
                        type: 'submit',
                        disabled: this.props.disabled,
                        value: this.props.value
                    })
                )
            )
        )
    }
}

Botton.defaultProps = {
    value: '保存'
}

module.exports = Botton
