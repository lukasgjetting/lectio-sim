const path = require('path');

module.exports = {
    entry: './scripts/main.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: 'source-map'
};
