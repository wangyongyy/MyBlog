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
//require('SRC/login/login');
console.log('我是入口文fsss');
/*if(module.hot){
	module.hot.accept();
}
*/

