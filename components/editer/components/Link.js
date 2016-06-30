let {
    Entity
} = require('draft-js')

let Link = function(props) {
    const {
        href
    } = Entity.get(props.entityKey).getData();
    return (
        React.createElement('a', {
            href: href,
            className: 'drafjs-bhe_link'
        }, props.children)
    )
}
module.exports = Link
