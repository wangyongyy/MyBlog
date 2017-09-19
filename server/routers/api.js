const express = require('express');
const router=express.Router();

//引入操作数据库的模型
let User=require('../dbModels/User');

/*
 *校验用户名密码
 */

//后端想要给前端的格式
let responseMesg;
//中间件
router.use((req,res,next)=>{
	console.log('中间件进来了');
	responseMesg={
		success:false,
		message:''
	}
	next();
})

/*
 * 校验用户名和密码
 */
router.post('/user/check',(req,res,next)=>{
	let parms=req.body;
	//登录逻辑
	//1、首先判断前端传的参数是否正确(后端必须做参数的正确性校验，考虑最坏的情况)
	if(!parms.username||!parms.password){
		//返回给前端一个错误消息
		responseMesg.message='用户名或者密码不能为空';
		res.json(responseMesg);
		return;
	};
	
	User.findOne({
		username:parms.username,
		password:parms.password
	})
	.then((user)=>{
		if(user){
			responseMesg.success=true;
			responseMesg.message='登录成功';
			//登录成功后往session里面存东西
			//把数据库查出来的这个user作为表示存到session的user属性上
			req.session.user=user;
			res.json(responseMesg);
		}else{
			responseMesg.message='用户名或者密码不正确';
			res.json(responseMesg);
		}
	})
});



module.exports=router;
