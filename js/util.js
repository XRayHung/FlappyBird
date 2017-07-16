var util={
	extend: function( o1, o2 ) {
	            for ( var key in o2 ) {
	                if ( o2.hasOwnProperty( key ) ) {
	                    o1[ key ] = o2[ key ];
	                }
	            }
	        },
	      
	loadImage: function (imgUrl, fn){
	
		var imgObj={};//存储加载后的图像
		var tempImg;
		var imgLength=0;//要加载图片的数量
		var loaded=0;//已加载图片的数量
		for(var k in imgUrl){
			imgLength++;//统计有几张要加载的图片
			
			//根据遍历的url动态创建img
			tempImg=new Image();
			//判断是否图片加载完
			tempImg.onload=function(){
				loaded++;
				if(loaded>=imgLength){
					fn(imgObj);//调用回掉函数并将加载后的图片对象作为参数传入
				}
			};
			
			tempImg.src=imgUrl[k];
			//将创建的img存储到imgObj对象中
			imgObj[k]=tempImg;
		}
   },
   
   
}


			