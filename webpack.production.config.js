const webpack = require('webpack');
const path = require('path');
const srcPath = path.resolve(__dirname,'src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:{
        'common/main':srcPath+'/common/common.js'
    },
    output:{
        path:__dirname+'/public',
        filename:'[name].js',
        publicPath:'http://localhost:8080/public'
    },
    //模块
    module:{
        rules:[
        	{
        		test:/\.(png|jpg)$/,
        		use:'url-loader?limit=8192&context=client&name=/img/[name].[ext]'
        	},
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                	fallback:"style-loader",
                	use:"css-loader"
                })
            }
        ]
    },
    //插件
    plugins:[
    	new CleanWebpackPlugin(['public']),
    	new ExtractTextPlugin({
    		filename:function(getPath){
    			return getPath('css/[name].css').replace('css/common','css');
    		},
    		allChunks:true
    	}),
    	new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery'
		}),
		//压缩混淆
		new webpack.optimize.UglifyJsPlugin(),
    ]
}

