/*
 *文章表
 */

const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
	title:String, //文章标题
	body:String,  //文章内容
	cover:String,
	comments:[		//文章评论
		{
			body:String, //评论内容
			data:{
				type:Date,
				default:Date.now
			}
		}
	],
	time:{		//文章发布时间
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model('Article',userSchema);
