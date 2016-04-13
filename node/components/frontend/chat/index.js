const React = require('react');

const ComponentTemplate = require('./component-template');
const urls = require('../../settings').urls;
const autoBind = require('react-autobind');

var socket = io.connect(urls.node);

var CommentList = require('./comment-list');
var CommentInput = require('./comment-input');

class ChatWindow extends ComponentTemplate {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            comments: props.comments,
            inputValue: ''
        };
    }

    updateInputValue(value) {
        this.setStateVar('inputValue',
            value || ''
        );
    }

    addComment(comment) {
        this.setStateVar('comments',
            [...this.state.comments, JSON.parse(comment)]
        );
    }

    componentDidMount() {
        var chat = this;
        socket.on('connect', function () {
            // TODO: Send notification when a new user joins
            socket.on('message', chat.addComment);
        });
    }

    handleUserInput(message, submit) {
        var text = submit ? '' : message;
        if (submit) {
            socket.emit('message', message);
        }
        this.updateInputValue(text);
    }

    render() {
        return <div>
            <CommentList items={this.state.comments}/>
            <CommentInput
                value={this.state.inputValue}
                onUserInput={this.handleUserInput}
            />
        </div>;
    }
}

module.exports = ChatWindow;