
require('bootstrap-table');
require('BOOTSTRAP_TABLE_CSS');
require('bootstrap-table/dist/locale/bootstrap-table-zh-CN')
console.log('文章列表');

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$('#table').bootstrapTable({
	//url:'/admin/article/list',  客户端分页地址
	url:'/admin/article/pagination',
	sortOrder:'desc',
	columns:[
		{
			field:'_id',
			title:'ID',
			visible:false,
			sortable:true,  //允许该字段排序
			
		},{
			field:'title',
			title:'标题',
			width:150
		},{
			field:'body',
			title:'内容',
			visible:false,
		},{
			field:'time',
			title:'发布时间',
			align:'center',
			formatter:function(value){
				//value  该字段的值
				return new Date(value).Format("yyyy-MM-dd hh:mm:ss").substring(0,10);
			},
			sortable:true,
		},{
			field:'operat',
			title:'操作',
			align:'center',
			formatter:function(value){
				return 	`<div class="btn-group" role="group" aria-label="...">
					   		<button data-action="edit" type="button" class="btn btn-primary">编辑</button>
					   		<button data-action="delete" type="button" class="btn btn-danger">删除</button>
					   	</div>`
			},
			events:{
				'click [data-action="edit"]':function(event,value,row,index){
					location.href='/admin/article/'+row['_id']; //参数url路径化
				},
				'click [data-action="delete"]':function(event,value,row,index){
					let isSure=window.confirm('你确认删除文章【'+row['title']+'】吗？');
					if(isSure){
						$.ajax({
							url:'/admin/article/'+row['_id'],
							method:'delete',
							success:function(resp){
								alert(resp.message);
								if(resp.success){
									$('#table').bootstrapTable('remove', {
										field:'_id',
										values:[row['_id']]
									});
								}
							}
						})
					}
				}
			}
			
		},
		
	],
	pagination:true,  //是否分页
	classes:'table table-hover table-no-bordered',
	showRefresh:true,
	showColumns:true,
	paginationPreText:'上一页',
	paginationNextText:'下一页',
	sidePagination:'server',   //服务端分页
	responseHandler:function(resp){  //加载后端数据成功后会调用的函数，resp为从服务器请求到的数据。
		/*return {
			total:15,
			rows:[{_ID:1,title:'标题',body:'内容',time:Date.now()}]
		}*/
		if(!resp.success){
			return {
				total:0,
				rows:[]
			}
		};
		return resp.data;
	}
})
