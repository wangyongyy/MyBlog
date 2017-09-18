//引入express
const express = require('express');

//引入模板
const swig = require('swig');

const app=express();

//调用webpack的配置
const webpack=require('webpack');
const webpackConfig=require('./webpack.config.js');
const compiler=webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler,{
	noInfo:true,
	stats:{
		colors:true
	},
	publicPath:webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
//配置静态资源目录
app.use('/public',express.static(__dirname+'/public'));

//模板配置--------------------------------------------------
app.engine('html',swig.renderFile);
app.set('views','./server/views');
app.set('view engine','html');
swig.setDefaults({
	cache:false
});
//模板配置---------end-----------------------------------------

//路由
app.get('/',(req,res,next)=>{
	res.render('index')
});

app.listen(8080,()=>{
	console.log('web应用程序启动了');
});
