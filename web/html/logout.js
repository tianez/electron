'use strict';

class Logout extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        storedb('user').remove()
        this.props.history.pushState(null, 'login')
    }
    render() {
        return (
            null
        )
    }
}

module.exports = Logout
