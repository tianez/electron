'use strict';
var FormGroup = require('./formGroup')
const Select = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        }
    },
    handleChange: function(e) {
        let value = e.target.value
        console.log(value)
        this.setState({
            value: value
        })
        this.props._onChange(this.props.k, value)
    },
    componentDidMount: function(){
        // $("select").select2();
    },
    render: function() {
        let selectNodes = []
        let isselected;
        let data = this.props.lists
        for (let key in data) {
            let tab = React.createElement("option", {
                value: key,
                key: key,
            }, data[key])
            selectNodes.push(tab)
        }
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                },
                React.createElement('div', {
                        className: 'row'
                    },
                    React.createElement('div', {
                            className: 'col-md-12'
                        },
                        React.createElement("select", {
                            className: "form-control input-xlarge select2me",
                            name: this.props.k,
                            onChange: this.handleChange,
                            value: this.state.value,
                        }, selectNodes),
                        React.createElement('div', {
                        className: 'input-icon right'
                    },
                    React.createElement('i', {
                        className: 'fa fa-check'
                    }, 'help'),
                    React.createElement('input', {
                        className: 'form-control',
                        type: this.props.type,
                        value: this.state.value,
                        placeholder: this.props.placeholder,
                        disabled: this.props.disabled,
                        required: this.props.required,
                        autoComplete: 'off',
                        onChange: this.handleChange,
                        onFocus: this.handleChange,
                        onBlur: this.handleChange,
                        readOnly: 'readOnly',
                    })
                ),
<span style={{left: 0, width: 420}} className="select2-container select2-container--default select2-container--open">
        <span style={{width: '420px'}} dir="ltr" class="select2-dropdown select2-dropdown--below">
                <span className="select2-search select2-search--dropdown">
                        <input className="select2-search__field" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" type="search" />
                </span>
                <span className="select2-results">
                        <ul aria-hidden="false" aria-expanded="true" id="select2-sex-ye-results" className="select2-results__options" role="tree">
                                <li aria-selected="false" role="treeitem" id="select2-sex-ye-result-exnp-0" className="select2-results__option select2-results__option--highlighted">男</li>
                                <li aria-selected="false" role="treeitem" id="select2-sex-ye-result-p3vy-1" className="select2-results__option">女</li>
                                <li aria-selected="true" role="treeitem" id="select2-sex-ye-result-gi9u-2" className="select2-results__option">保密</li>
                        </ul>
                </span>
        </span>
</span>
                    ))
            )
        )
    }
});

module.exports = Select

