
/*
 *处理登录鉴权的模块
 */

module.exports=(req,res,next)=>{
	if(req.app.locals.isDev){
		req.session.user={
			id:'599ed834e0510be9d781cec3',
			username:'张三',
		}
	}
	console.log('所有的请求都被我拦截掉',req.url);
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
