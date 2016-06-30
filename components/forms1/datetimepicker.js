'use strict';
const Datetimepicker = React.createClass({

    getInitialState: function() {
        return {
            value: this.props.value
        }
    },
    componentDidMount: function() {
        $('.form_date').datetimepicker({
            language: 'zh-CN',
            pickerPosition: "bottom-right",
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            maxView: 1,
            minView: 1,
            forceParse: 0
        });
    },
    handleChange: function(e) {
        this.setState({
            value: e.target.value
        });
    },
    render: function() {
        return (
            React.createElement(FormGroup, {
                    title: this.props.title,
                    help: this.state.tip,
                    k: this.props.kk,
                },
                React.createElement('div', {
                        id: 'datetimepicker' + this.props.k,
                        name: this.props.k,
                        className: 'input-append date form_date',
                        data_date_format: 'yyyy-mm-dd hh:00:00',
                        data_link_field: 'dtp_' + this.props.k,
                        data_link_format: 'yyyy-mm-dd hh:00:00',
                        value: this.state.value,
                        placeholder: this.props.placeholder,
                        onChange: this.handleChange
                    },
                    React.createElement('input', {
                        type: 'text',
                        id: 'dtp_' + this.props.k,
                        name: this.state.value,
                        className: 'form-control input-xlarge select2me',
                        size: '12'
                    }),
                    React.createElement('span', {
                            className: 'add-on',
                        },
                        React.createElement('i', {
                            className: 'icon-th',
                        }),
                        React.createElement('input', {
                            type: 'hidden',
                            id: 'dtp_' + this.props.k
                        })
                    )
                )
            )
        )
    }
});

module.exports = Datetimepicker