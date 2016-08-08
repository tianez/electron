'use strict'

const ApiStore = require('../components/utils/ApiStore')
class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {}
        }
    }
    componentDidMount() {
        ApiStore.get('acman/zhaiyanapi/tcrand?fangfa=json', function(err, res) {
            let data = JSON.parse(res.text)
            this.setState({
                info: data
            })
        }.bind(this))
    }
    render() {
        return (
            React.createElement('footer', {
                    id: 'footer',
                    className: 'footer pure-u-1'
                },
                this.state.info.taici,
                '—— ',
                this.state.info.source
            )
        )
    }
}

module.exports = Footer
