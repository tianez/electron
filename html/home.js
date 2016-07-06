'use strict'

const {
    Calendar
} = require('../components/forms/index')

const Editer = require('../components/editer')

let html = `
<h1>This is a Title</h1>
 <p>Here's some text, it's useful</p>
 <img src="http://www.itianyugroup.com/uploadfile/2016/0629/20160629120921895.jpg" />
`;

var Home = React.createClass({
    getInitialState: function() {
        return {
            items: ['hello', 'world', 'click', 'me']
        };
    },
    handleSelect: function(data) {
        console.log(data); // Momentjs object
        console.log(data.format('YYYY-MM-D HH d')); // Momentjs object
    },
    updateHtml: function(html) {
        console.log(html);
        this.setState({
            html: html
        })
    },
    render: function() {
        return (
            React.createElement('div', {
                    className: 'container pure-g'
                },
                React.createElement('div', {
                        className: 'pure-u-1'
                    },
                    React.createElement(Editer, {
                        value: html,
                        onChange: this.updateHtml
                    }),
                    React.createElement('div', {
                        dangerouslySetInnerHTML: {
                            __html: this.state.html
                        }
                    })

                    // React.createElement(Calendar, {
                    //     date: now => { //默认时间
                    //         // return now.add(-4, 'days')
                    //         return now
                    //     },
                    //     style:{
                    //         width:281
                    //     },
                    //     firstDayOfWeek: 1, //星期几打头
                    //     onInit: this.handleSelect,
                    //     onChange: this.handleSelect
                    // })
                )
            )
        )
    }
});

module.exports = Home
