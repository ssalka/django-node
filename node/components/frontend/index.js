const drf = require('./drf');
const React = require('react');
const ReactDOM = require('react-dom');

var ChatWindow = require('./chat');

var currentUser;
// TODO: Want to get comments via REST framework, but new comments don't show on submit (?)
// drf.get('/comments').done(comments => {
//     ReactDOM.render(
//         <ChatWindow comments={comments}/>,
//         document.getElementById('root')
//     );
// });

// Using comments injected into template by Django
ReactDOM.render(
    <ChatWindow comments={_djangovars.comments}/>,
    document.getElementById('root')
);

drf.getUser().done(
    (user) => currentUser = user
);