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
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            React.createElement('span', {
                className: className,
                onMouseDown: this.onToggle
            }, this.props.label)
        );
    }
}
module.exports = StyleButton
