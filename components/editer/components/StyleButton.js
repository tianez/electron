'use strict'
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'RichEditor-styleButton';
        let label = this.props.label
        if (this.props.icon) {
            className += ' fa '
            className += this.props.icon
            label = ''
        }
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            React.createElement('span', {
                className: className,
                title: this.props.label,
                onMouseDown: this.onToggle
            }, label)
        );
    }
}
module.exports = StyleButton
