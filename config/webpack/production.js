process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
    ],
}

environment.loaders.append('sass', sassLoader)

module.exports = environment.toWebpackConfig()
