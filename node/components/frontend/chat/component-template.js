const React = require('react');

class ComponentTemplate extends React.Component {
    setStateVar(key, value) {
        // Updates a single state variable
        var newState = this.state;
        newState[key] = value;
        this.setState(newState);
    }
}

module.exports = ComponentTemplate;