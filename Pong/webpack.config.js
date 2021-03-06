const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry : './public/javascripts/main.js',
    mode : 'development',
    output : {
        path : path.resolve(__dirname, './public/dist'),
        filename : 'scripts/bundle.js'
    },
    devtool : 'eval-source-map',
    devServer : {
        contentBase : './public/dist',
        port : 8080
    },
    module : {
        rules :[
            {
                test : /\.(png|jpg|gif)/,
                use : [
                    {
                        loader : 'file-loader',
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'images'
                        }
                    }
                ]
            },
            {
                test : /\.css/,
                use : [
                    {
                        loader : 'style-loader' 
                    },
                    {   
                        loader : 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
          {
             from: './views/play.html',
             to:  'play.html'
          }
        ]),
      ]
     
}