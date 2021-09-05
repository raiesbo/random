const path = require('path');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const cssRules = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
}

const imgRules = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
}

const fontRules = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
}

const rules = [cssRules, imgRules, fontRules]

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'built'),
    },
    module: {
        rules: rules // collection of all the rules and loaders
    },
    optimization: {
        minimize: true, // to run it also in production
        minimizer: [
            // new CssMinimizerPlugin(), // makes css smaller
        ]
    }
}