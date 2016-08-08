'use strict'

class Page extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            React.createElement('section', {
                    className: 'pure-u-1'
                },
                'page'
            )
        )
    }
}

module.exports = Page
