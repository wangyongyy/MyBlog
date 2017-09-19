const express = require('express');
const router=express.Router();
let Article = require('../dbModels/Article');

/*
 *判断是否是ajax请求还是直接刷新的请求
 * 如果是ajax请求则返回片段
 * 如果是直接刷新请求，则返回整个页面
 * 这个中间件只负责判断不负责渲染
 * X-Requested-With:XMLHttpRequest
 */
router.use((req,res,next)=>{
	res.locals.isAjax=req.xhr;
	next();
})


/*
 *首页
 */
router.get('/',(req,res,next)=>{
	res.render('index')
});

/*
 *文章详情
 */
router.get('/article/detail',(req,res,next)=>{
	res.render('article-details')
});

router.get('/index',(req,res,next)=>{
	res.render('index');
})

/*
 *跳转到登录界面
 */
router.get('/login',(req,res,next)=>{
	res.render('login');
})

/*
 *首页文章列表
 */
router.get('/article/list',(req,res,next)=>{
	//获取下前端传给后端的分页数据
	let page = Number(req.query.page)||1;
	let limit = 9;
	let offset = (page-1)*limit;

	Article.count().then(count=>{
		responseMesg.data.total=count;  //查询数据总共有多少条
	});
	Article.find().sort({
		'_id':-1
	}).skip(offset).limit(limit).then(articles=>{
		articles.map((item,index)=>{
			//获取第一张图片作为封面
			let result = item.body.match(/<img [^>]*src=['"]([^'"]+)[^>]*>/);
			if(result){
				item.cover=result[1];
			}else{
				item.cover='https://o0xihan9v.qnssl.com/wp-content/uploads/2015/07/2015073107381236_miao.jpg';
			}
			//过滤html并且截取70个字
			item.body=item.body.replace(/<[^>]+>/g,"").substring(0,70)+'...';
		})
		res.json(articles);
	})
})


module.exports=router;
