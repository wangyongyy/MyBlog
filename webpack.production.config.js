const webpack = require('webpack');
const path = require('path');
const srcPath = path.resolve(__dirname,'src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:{
        'common/main':srcPath+'/common/common.js',
        'common/admin-lib':['jquery','bootstrap','BOOTSTRAP_CSS']
    },
    output:{
        path:__dirname+'/public',
        filename:'[name].js',
        publicPath:'http://localhost:8080/public'
    },
    resolve:{
    	modules:[srcPath,'node_modules'],//知道查找规则
    	//取别名，在自己的js文件里直接使用别名
    	alias:{
    		
    		SRC:srcPath,
    		BOOTSTRAP_CSS:'bootstrap/dist/css/bootstrap.css',
    		BOOTSTRAP_TABLE_CSS:'bootstrap-table/dist/bootstrap-table.css'
    	}
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
            },
            {
        		test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
         		use: [
           			'file-loader?limit=8192&name=/fonts/[name].[ext]'
         		]
       		},
       		{
	      		test: /\.js$/,
	      		exclude: /node_modules/,
	      		use: {
	        		loader: 'babel-loader',
	        		options: {
	          		presets: ['env'],
	          		plugins: ['transform-runtime','syntax-dynamic-import']
	        		}
	      		}
	    	}
        ]
    },
    //插件
    plugins:[
    	new CleanWebpackPlugin(['public'],{
    		exclude:['ueditor']
    	}),
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
		new webpack.optimize.UglifyJsPlugin(),//不支持混淆es6
    ]
}

