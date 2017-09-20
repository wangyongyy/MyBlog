const express = require('express');
const router=express.Router();

let Article = require('../dbModels/Article');

//后端想要给前端的格式
let responseMesg;
//中间件
router.use((req,resp,next)=>{
	console.log('中间件进来了');
	responseMesg={
		success:false,
		message:'',
		data:{
			total:0,
			rows:[]
		}
	}
	next();
})

/*
 *跳转到登录后的首页
 */
router.get('/index',(req,res,next)=>{
	res.render('admin/article-list',{
		user:req.session.user
	})
})

/*
 *查询列表（一次性查出所有数据）（）
 */
router.get('/article/list',(req,res,next)=>{
	Article.find().then(articles=>{
		res.json(articles);
	})
});

/*
 *查询列表（服务端分页）
 */
router.get('/article/pagination',(req,res,next)=>{
	//获取下前端传给后端的分页数据
	let offset = Number(req.query.offset);
	let limit = Number(req.query.limit);
	let sort = req.query.sort || '_id';  //以哪个字段排序
	let order = (req.query.order === 'asc' ? 1 : -1);//排序方式
	//console.log();
	console.log(offset,limit,order,sort);
	Article.count().then(count=>{
		responseMesg.data.total=count;  //查询数据总共有多少条
	});
	Article.find().sort({
		[sort]:order
	}).skip(offset).limit(limit).then(articles=>{
		responseMesg.success=true;
		responseMesg.data.rows=articles;
		res.json(responseMesg);
	})
});

/*
 *添加文章
 */
router.get('/article/add',(req,res,next)=>{
	res.render('admin/article-add');
});

/*
 *查询某篇文章，并且跳转到编辑页面
 */
router.get('/article/:id',(req,res,next)=>{
	let id = req.params.id;
	Article.findById(id).then(article=>{
		res.render('admin/article-edit',{
			article
		});
	})
})

/*
 *删除文章
 */
router.delete('/article/:id',(req,res,next)=>{
	let id = req.params.id;
	Article.findByIdAndRemove(id).then(article=>{
		responseMesg.message='删除成功';
		responseMesg.success=true;
		res.json(responseMesg);
	})
})

/*
 *保存文章
 */

router.post('/article/save',(req,res,next)=>{
	//获取内容
	let parms=req.body;
	if(!parms.title||!parms.body){
		responseMesg.message='标题或者内容不可以为空';
		res.json(responseMesg);
		return;
	}
	new Article({
		title:parms.title,
		body:parms.body
	}).save().then(article=>{
		responseMesg.success=true;
		responseMesg.message='输出成功';
		res.json(responseMesg);
	});
});

/*
 *修改文章
 */
router.post('/article/update',(req,res,next)=>{
	//获取内容
	let parms=req.body;
	Article.findByIdAndUpdate(parms.id,{ //根据id,查找要修改的内容
		title:parms.title,
		body:parms.body
	}).then(article=>{
		if(article){
			responseMesg.success=true;
			responseMesg.message='修改成功';
		}else{
			responseMesg.message='修改失败';
		}
		res.json(responseMesg);
	})
});

//退出登录，重定向login
router.get('/logout',(req,res,next)=>{
	req.session.user=null;
	res.redirect('/login');
})

module.exports=router;
