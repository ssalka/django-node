const React = require('react');

var ComponentTemplate = require('./component-template');
var autoBind = require('react-autobind');

class CommentInput extends ComponentTemplate {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            enter: false
        };
    }

    handleChange(event) {
        // Get input value after DOM change
        var message = event.target.value;
        var submit = message && this.state.enter;
        this.props.onUserInput(message, submit);
        if (submit) {
            this.toggle('enter');
            event.target.value = '';
        }
    }

    toggle(prop) {
        this.setStateVar(prop,
            !this.state[prop]
        );
    }

    handleKeyPress(event) {
        // Check if enter key pressed
        if (event.key == 'Enter') {
            this.toggle('enter');
            this.handleChange(event);
        }
    }

    render() {
        return <input
            type="text"
            name="comment"
            placeholder="Comment"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
        />;
    }
}

module.exports = CommentInput;