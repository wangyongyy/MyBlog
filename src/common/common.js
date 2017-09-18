require('../index/index');
console.log('我是入口文件');
if(module.hot){
	module.hot.accept();
}
