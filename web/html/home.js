'use strict'

const {
    Calendar,
    ColorPicker,
    Select,
    Button,
    Tab,
    Audio
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
    componentDidMount: function() {
        // var editor = new Simditor({
        //     textarea: $('#editor'),
        //     // pasteImage: true,
        //     upload: {
        //         url: '/upload'
        //     },
        //     //   markdown: true,
        //     toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
        //             '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment', '|',
        //             'markdown', 'fullscreen', 'html','test'
        //         ]
        //         //optional options
        // });
    },
    handleSelect: function(data) {
        console.log(data); // Momentjs object
        console.log(data.format('YYYY-MM-D HH d')); // Momentjs object
    },
    updateHtml: function(html) {
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
                    React.createElement(Audio, {
                    })
                    // React.createElement(Editer, {
                    //     value: html,
                    //     onChange: this.updateHtml
                    // }),
                    // React.createElement('div', {
                    //     dangerouslySetInnerHTML: {
                    //         __html: this.state.html
                    //     }
                    // }),
                    // React.createElement(ColorPicker),
                    // React.createElement(Select),
                    // React.createElement(Tab, {},
                    //     React.createElement('div', {
                    //             title: '1232sds'
                    //         },
                    //         '8977888'
                    //     ),
                    //     React.createElement('div', {
                    //             title: '1232'
                    //         },
                    //         '89778882999922'
                    //     )
                    // ),
                    // React.createElement('textarea', {
                    //     id: 'editor',
                    //     placeholder: 'placeholder'
                    // })
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
