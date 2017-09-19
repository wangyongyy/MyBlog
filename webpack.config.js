const webpack = require('webpack');
const path = require('path');
const srcPath = path.resolve(__dirname,'src');


module.exports={
    entry:{
        'common/main':[srcPath+'/common/common.js','webpack-hot-middleware/client?reload=true'],
        'common/admin-lib':['jquery','bootstrap','BOOTSTRAP_CSS'],
        'common/lib':['jquery','APP_CSS']
    },
    output:{
        path:__dirname+'/public',
        filename:'[name].js',
        publicPath:'http://localhost:3000/public'
    },
    devtool:'eval-source-map',
    resolve:{
    	modules:[srcPath,'node_modules'],//知道查找规则
    	//取别名，在自己的js文件里直接使用别名
    	alias:{
    		
    		SRC:srcPath,
    		BOOTSTRAP_CSS:'bootstrap/dist/css/bootstrap.css',
    		BOOTSTRAP_TABLE_CSS:'bootstrap-table/dist/bootstrap-table.css',
    		APP_CSS:'SRC/common/app.less'
    	}
    },
    //模块
    module:{
        rules:[
        	{
        		test:/\.(png|jpg)$/,
        		use:'url-loader'
        	},
            {
                test:/(\.css|.less)$/,
                use:[
                    'style-loader',
                    'css-loader?sourceMap',
                    'less-loader'
                ]
            },
            {
        		test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
         		use: [
           			'file-loader'
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
    	new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery'
		}),
    	new webpack.optimize.OccurrenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),  //启用HMR  模块热替换
    	new webpack.NoEmitOnErrorsPlugin()
    ]
}

