var React = require('react');

module.exports = class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: props.text};
    }
    render() {
        return (
            <div>{this.state.text}</div>
        );
    }
};