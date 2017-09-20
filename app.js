//引入express
const express = require('express');

//引入模板
const swig = require('swig');

//处理前端的post请求
const bodyParser = require('body-parser')

//引入session模块
const session = require('express-session')

//引入链接数据库的插件驱动
const mongoose = require('mongoose');

const path = require('path');

const app=express();

//中间件，加密解密
app.use(session({
  secret: 'keyboard cat',  //用来加密的秘钥，有这个才能解密
  resave: false,  //是否重新保存回话
  saveUninitialized: true  //自动初始化会话
}));

//处理前端POST请求的配置
//处理前端传给后端的表单数据，（表单提交，ajax提交）
app.use(bodyParser.urlencoded({ extended: false }));
 
 //处理前端以json格式传给后端的数据
// parse application/json
app.use(bodyParser.json());


//模板配置--------------------------------------------------
app.engine('html',swig.renderFile);
app.set('views','./server/views');
app.set('view engine','html');

//模板配置---------end-----------------------------------------

//富文本编辑器
const ueditor = require('ueditor');

//将ueditor设置为静态目录
app.use('/ueditor',express.static(__dirname+'/public/ueditor'));
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/ueditor/upload/img'
     var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/ueditor/upload/file/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/ueditor/upload/video/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));




//是否是开发模式
const isDev = process.env.NODE_ENV==='dev';
app.locals.isDev=isDev;


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
	
	
	//引入路由
	require('./server/routers/routes')(app);
	
	
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
	
	//引入路由------------------------------------------------------
	require('./server/routers/routes')(app);
	
	
	app.listen(8080,()=>{
		console.log('web应用程序启动了');
	});
};

//链接数据库地址
mongoose.connect('mongodb://localhost:27017/Blog3',{useMongoClient:true})
.on('open',(db)=>{
	console.log('数据库链接成功');
})
.on('error',(error)=>{
	console.log('数据库链接失败');
})




