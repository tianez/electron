'use strict'

const classNames = require('classNames')
const FormGroup = require('./FormGroup')

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: props.files,
            value: props.value,
            name: props.name,
            help: props.help,
            options: props.options,
            show: false,
        }
    }
    _toggleShow(e) {
        this.setState({
            show: !this.state.show
        })
    }
    _changeChoose(value, titie) {
        this.setState({
            value: value,
            name: titie,
            show: false
        })
        if (this.props.onChange) {
            this.props.onChange(this.props.name, value)
        }
    }
    _onChange(e) {
        e.preventDefault()
        let value = e.target.value
        console.log(value)
        this.setState({
            value: value
        })
        if (this.props.onChange) {
            this.props.onChange(this.props.name, value)
        }
    }
    render() {
        let value = this.state.value
        let name = this.props.name
        let options = this.state.options.map(function(d, index) {
            let isActive = value == d.value ? ' active' : ''
            return (
                React.createElement('div', {
                        key: index,
                        className: 'form-option' + isActive,
                        onClick: this._changeChoose.bind(this, d.value, d.title)
                    },
                    d.title
                )
            )
        }.bind(this))
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.help,
                    className: 'form-select'
                },
                React.createElement('div', {
                    className: 'form-input',
                    value: this.state.name,
                    onClick: this._toggleShow.bind(this)
                }, this.state.name),
                React.createElement('div', {
                        className: 'form-choose',
                        style: {
                            display: this.state.show ? 'block' : 'none'
                        }
                    },
                    React.createElement('div', {
                            className: 'form-select-search'
                        },
                        React.createElement('input', {
                            className: 'form-input',
                            value: this.state.search,
                            placeholder: 'Search',
                            onChange: this._onChange.bind(this)
                        })),
                    React.createElement('div', {
                            className: 'form-select-choose'
                        },
                        options
                    )
                )
            )
        )
    }
}
Select.defaultProps = {
    title: '单选框',
    type: 'radio',
    value: 2,
    options: [{
        title: '选项1',
        value: 1
    }, {
        title: '选项2',
        value: 2
    }, {
        title: '选项3',
        value: 3
    }, {
        title: '选项4',
        value: 4
    }],
    name: 'state',
    placeholder: '',
    help: '',
    disabled: '',
    required: 'required'
}
module.exports = Select
