'use strict';
var FormGroup = require('./formGroup')
const Ueditor = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        }
    },
    componentDidMount: function() {
        let ueditor = UE.getEditor(this.props.k, {
            allowDivTransToP: false
        });
        ueditor.addListener('selectionchange', function(editor) {
            let value = ueditor.getContent()
            this.setState({
                value: value
            })
            this.props._onChange(this.props.k, value)
        }.bind(this))
    },
    render: function() {
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                },
                React.createElement('textarea', {
                    id: this.props.k,
                    value: this.state.value,
                    placeholder: this.props.placeholder,
                })
            )
        )
    }
});

module.exports = Ueditor