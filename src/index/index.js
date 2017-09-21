
function reset(){
		
	let $content = $('#content.post-index');
	let $articles = $content.find('article');
	let _margin = 6*2;
	let content_width = $content.width();
	
	/*
	 *宽度
	 */
	let article_width_old = 249;
	let max_column = parseInt(content_width/article_width_old);
	let article_width_new=content_width/max_column;
	$articles.css('width',article_width_new-_margin)
	
	/*
	 *高度
	 */
	let content_height = $content.height();
	$content.css('height',content_height);
	$articles.css({
		position:'absolute',
		left:0,
		top:0
	});
	
	let all_height = [];
	$articles.each(function(index,item){
		let column = index%max_column;
		let left = article_width_new*column;
		let row = parseInt(index/max_column);
		
		all_height.push($(item).height()+_margin);
		
		let top = 0;
		//index = row * max_column + colume
		while(row>0){
			row--;
			top+=all_height[row*max_column+column]
		}
		
		$(item).css({
			'-webkit-transform':'translate('+left+'px,'+top+'px)',
			'-moz-transform':'translate('+left+'px,'+top+'px)',
			'-ms-transform':'translate('+left+'px,'+top+'px)',
			'-o-transform':'translate('+left+'px,'+top+'px)',
			'transform':'translate('+left+'px,'+top+'px)'
		})
		
	})
};
reset();
window.onresize = function(){
	reset();
};
