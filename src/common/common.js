let modelPath=$('[data-main]').data('main');

if(modelPath){
	import('../'+modelPath)
	.then(model=>{
		
	}).catch(err=>{
		
	})
}



//不是后台界面或者登陆界面
if(!location.pathname.startsWith('/admin')&!location.pathname.startsWith('/login')){
	require('jquery-pjax');
	$(document).pjax('a.pjax', '#main');
}

