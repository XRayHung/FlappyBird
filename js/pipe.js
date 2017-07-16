(function(w){
	
	//管道构造函数
	//参数: ctx 管口朝下的上管道图片 管口朝上的下管道图片 两管道之间的间隔 大地的高度  管道向左移动的速度
	function Pipe(ctx, imgDown, imgUp, space, landHeight, speed){
		this.ctx=ctx;
		this.imgDown=imgDown;
		this.imgUp=imgUp;
		this.space=space;
		this.landHeight=landHeight;
		this.speed=speed || 2;
		Pipe.len++;
		
		//管道最小高度
		this.minHeight=100;
		
		//管道默认宽高
		this.width=this.imgDown.width;
		this.height=this.imgDown.height;
		
		//管道的x、y坐标
		//每个管道占自身宽度的三倍
	    this.x=300 + this.width * 3 * (Pipe.len-1);
	    this.y=0;
	    
	    this.init();
		
	}
	Pipe.len=0;
	
	util.extend(Pipe.prototype,{
		//初始化管道坐标
		init:function(){
			//单个管道的最大高度
			var maxHeight=this.ctx.canvas.height-this.landHeight-this.space-this.minHeight;
			//随机生成的上管道高度在最小高度和最大高度之间
			var randomHeight=Math.random() * maxHeight;
			randomHeight = randomHeight < this.minHeight ? this.minHeight : randomHeight;
			
			//上管道的y坐标=随机生成的高度 - 管道默认的高度
			this.downY=randomHeight - this.height;
			//下管道y坐标=随机生成的高度 + 上下管道的间隔
			this.upY=randomHeight + this.space;
		},
				
		draw:function(){
			this.ctx.drawImage(this.imgDown, this.x, this.downY);
			this.ctx.drawImage(this.imgUp, this.x, this.upY);
			this.drawPath();
		},
 
        //根据管道的宽高和坐标绘制对应的路径
		drawPath:function(){
			this.ctx.rect(this.x, this.downY, this.width, this.height);
			this.ctx.rect(this.x, this.upY, this.width, this.height);
		},
 
        update:function(){
        	this.x -= this.speed;
        	if(this.x <= -this.width){
        		this.init();
        		this.x += this.width * 3 * Pipe.len;
        	}
        },
				
	});
		
	w.getPipe = function( ctx, imgDown, imgUp, space, landHeight, speed ) {
        return new Pipe( ctx, imgDown, imgUp, space, landHeight, speed );
    };	
		
})(window)
