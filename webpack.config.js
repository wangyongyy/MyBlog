const webpack = require('webpack');
const path = require('path');
const srcPath = path.resolve(__dirname,'src');


module.exports={
    entry:{
        'common/main':[srcPath+'/common/common.js','webpack-hot-middleware/client?reload=true']
    },
    output:{
        path:__dirname+'/public',
        filename:'[name].js',
        publicPath:'http://localhost:3000/public'
    },
    devtool:'eval-source-map',
    //模块
    module:{
        rules:[
        	{
        		test:/\.(png|jpg)$/,
        		use:'url-loader?limit=8192&context=client&name=[name].[ext]'
        	},
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader?sourceMap'
                ]
            }
        ]
    },
    //插件
    plugins:[
    	new webpack.optimize.OccurrenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),  //启用HMR  模块热替换
    	new webpack.NoEmitOnErrorsPlugin()
    ]
}

