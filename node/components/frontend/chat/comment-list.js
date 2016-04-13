const React = require('react');

var ComponentTemplate = require('./component-template');
var autoBind = require('react-autobind');

class CommentItem extends ComponentTemplate {
    constructor(props) {
        super(props);
        this.state = {
            user: props.username,
            text: props.comment
        };
    }

    render() {
        return <li>{this.state.user}: {this.state.text}</li>;
    }
}

class CommentList extends ComponentTemplate {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <ul>{
            this.props.items.map((comment) =>
                <CommentItem
                    key={comment.id}
                    username={comment.user}
                    comment={comment.text}
                    time={comment.created}
                />
            )
        }</ul>;
    }
}

module.exports = CommentList;