(function(w){
	
	//大地背景构造函数
	//参数： ctx 大地图片 图片向左滑动速度
	function Land(ctx, img, speed){
		this.ctx=ctx;
		this.img=img;
		this.speed=speed || 2;
		this.width=this.img.width;
		this.height=this.img.height;
		Land.len++;//每创建一个实例就自增1
		this.x=this.img.width*(Land.len-1);
		this.y=this.ctx.canvas.height-this.img.height;
	}
	Land.len=0;//设置对象实例数量
	util.extend(Land.prototype,{
		
		draw:function(){
			this.ctx.drawImage(this.img, this.x, this.y);
		},	
			
		update:function(){
		    this.x -= this.speed;
		    this.x += this.x <= -this.img.width ?  this.img.width * Land.len : 0;
		}
		
	} );
	
	// 工厂模式 创建对象实例
    w.getLand = function( ctx, img, speed ) {
        return new Land( ctx, img, speed );
    };
	
})(window);
