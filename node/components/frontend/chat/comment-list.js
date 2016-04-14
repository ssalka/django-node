const React = require('react');
const ComponentTemplate = require('./component-template');
const autoBind = require('react-autobind');

class CommentItem extends ComponentTemplate {
    constructor(props) {
        super(props);
        this.state = {
            username: props.user,
            comment: props.text,
            timePosted: props.created.time
        };
    }

    render() {
        return <li>[{this.state.timePosted}] {this.state.username}: {this.state.comment}</li>;
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
                    user={comment.user}
                    text={comment.text}
                    created={comment.created}
                />
            )
        }</ul>;
    }
}

module.exports = CommentList;