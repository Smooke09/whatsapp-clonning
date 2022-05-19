// webpack config default   
const path = require('path')

module.exports = {

    // config do pdfjs antiga tem que setar a versao 2.0.489 para funcionar
    entry: {
        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist'
    }
}