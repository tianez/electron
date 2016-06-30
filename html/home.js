'use strict'

const {
    Calendar
} = require('../components/forms/index')

const Editer = require('../components/editer')

let html = `
  <h1>This is a Title1111112323223</h1>
  <p>Here's some text, it's useful</p>
  <p>More text, some inline <strong>styling</strong> for <em>some</em> elements</p>
  <ul><li>sssssssssssssssssssssssss</li><li>sssssssssssssssssssssssss</li></ul>
  <ol><li>sssssssssssssssssssssssss</li></ol>
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
    updateHtml:function(html) {
        console.log(html);
      this.setState({
        html:html
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
