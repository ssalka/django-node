const drf = require('./drf');
const React = require('react');
const ReactDOM = require('react-dom');

var ChatWindow = require('./chat');

var currentUser;

drf.getUser(user => 
    currentUser = user
);

ReactDOM.render(
    <ChatWindow />,
    document.getElementById('root')
);

