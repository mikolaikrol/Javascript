const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry : './src/main.js',
    mode : 'development',
    output : {
        path : path.resolve(__dirname, './public/dist'),
        filename : 'scripts/bundle.js'
    },
    devtool : 'eval-source-map',
    devServer : {
        contentBase : './public/dist',
        port : 3000 
    },
    externals: {
            moment: 'moment'
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
                test: /\.js$/,
                exclude: (/node_modules/),
                use: [
                    {loader : 'babel-loader'}
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
             from: './public/index.html',
             to:  'index.html'
          }
        ]),
      ]
     
}