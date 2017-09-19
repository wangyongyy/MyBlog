
require('./login.css');
let MD5=require('md5.js');

$('#myForm').on('submit',function(e){
	e.preventDefault();
	let [username,password]=[this.username.value.trim(),this.password.value.trim()]
	console.log(username,password);
	if(!username||!password){
		$('#errorMesg').text('用户名或者密码不能为空')
		.show()
		.animate({
			display:'none'
		},2000,function(){
			$(this).hide();
		})
		return;
	};
	password=new MD5().update(password).digest('hex');
	$.ajax({
		url:'/api/user/check',
		method:'post',
		data:{
			username,
			password
		},
		success:function(data){
			if(data.success){
				location.href='/admin/index';
			}else{
				$('#errorMesg').text('用户名或者密码不正确')
				.show()
				.animate({
					display:'none'
				},2000,function(){
					$(this).hide();
				})
			}
			//console.log('这是后端返回给前端的数据',data)
		}
	});
})
