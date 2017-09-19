let modelPath=$('[data-main]').data('main');
console.log(modelPath)
if(modelPath){
	import('../'+modelPath)
	.then(model=>{
		console.log('加载模块成功',model);
	}).catch(err=>{
		console.log('加载失败',err)
	})
}

//不是后台界面或者登陆界面
if(!location.pathname.startsWith('/admin')&!location.pathname.startsWith('/login')){
	require('jquery-pjax');
	$(document).pjax('a.pjax', '#main');
}

