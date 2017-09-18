//引入express
const express = require('express');

//引入模板
const swig = require('swig');

const app=express();




//模板配置--------------------------------------------------
app.engine('html',swig.renderFile);
app.set('views','./server/views');
app.set('view engine','html');

//模板配置---------end-----------------------------------------

//取出设置的环境变量
console.log('取出的变量值',process.env.NODE_ENV);

//是否是开发模式
const isDev = process.env.NODE_ENV==='dev';

if(isDev){
	//模板不缓存
	swig.setDefaults({
		cache:false
	});
	
	//调用webpack的配置-----------------中间件实现热刷新----------------------
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
	
	//路由
	app.get('/',(req,res,next)=>{
		res.render('index')
	});
	
	//引入路由
	app.use('/',require('./server/routers/api'));
	
	
	//引入browser-sync模块实现修改前端代码浏览器自动刷新
	const browserSync=require('browser-sync').create();
	
	//实现服务器重启后浏览器能自动刷新
	const reload = require('reload');
	const http = require('http');
	const server = http.createServer(app);
	reload(app);
	/*server.listen(8080,()=>{
		browserSync.init({
			ui:false,
			open:false,
			online:false,
			notify:false,
	        proxy: "localhost:8080",
	        files: "./server/views/**",
	        port:3000
	    });
		console.log('web应用程序启动了');
	});*/
	server.listen(3000,()=>{
		browserSync.init({
			ui:false,
			open:false,
			online:false,
			notify:false,
	        proxy: "localhost:3000",
	        files: "./server/views/**",
	        port:8080
	    },()=>console.log('开发模式，代理服务器程序启动了'));
	});
	
	
}else{
	//配置静态资源目录
	app.use('/public',express.static(__dirname+'/public'));
	
	//路由------------------------------------------------------
	app.get('/',(req,res,next)=>{
		res.render('index')
	});
	
	//引入路由----------------------------------------------
	app.use('/',require('./server/routers/api'));
	
	
	app.listen(8080,()=>{
		console.log('web应用程序启动了');
	});
}











/*app.listen(8080,()=>{
	console.log('web应用程序启动了');
});*/


