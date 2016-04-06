const ports = {
    node: process.env.NODE_PORT || 4000
};
const urls = {
    node: 'http://localhost:' + ports.node.toString(),
    api: 'http://localhost:8000/api'
};

module.exports = {
    ports,
    urls
};