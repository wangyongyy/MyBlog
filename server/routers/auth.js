
/*
 *处理登录鉴权的模块
 */

module.exports=(req,res,next)=>{
	if(req.app.locals.isDev){
		req.session.user={
			_id:'59b9df70eb7adc29cbd8cde7',
			username:'张三'
		}
	};
	if(req.url.startsWith('/admin')){ //startsWith('/admin'),以什么开头
		if(req.session.user){
			//存在session,就放行
			console.log('有权限，允许放行');
			next();
		}else{
			//重定向转到登录页面
			console.log('没有登录，')
			res.redirect('/login');
			//return;
		}
	}else{
		next();
	}
	
	
	
}
