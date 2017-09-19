	
	
module.exports=app=>{
	
	app.use(require('./auth'))
	
	
	//引入路由
	app.use('/api',require('./api'));
	app.use('/admin',require('./admin'));
	app.use('/',require('./main'));
	
	
}
	