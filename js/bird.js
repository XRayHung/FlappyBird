(function(w){
	
	//小鸟构造函数
    //参数: ctx 整张鸟图   图片中每一排的帧数 图片中每一列的帧数 小鸟起始x坐标 小鸟起始y坐标
	function Bird(ctx, img, widthFrame, heightFrame, x, y){
		
		this.ctx = ctx;
	    this.img = img;
	    this.widthFrame = widthFrame;
	    this.heightFrame = heightFrame;
	    this.x = x;
	    this.y = y;
	
		//单个小鸟的宽和高
		this.width = this.img.width / this.widthFrame;
		this.height = this.img.height / this.heightFrame;
		
		//当前小鸟渲染的帧数
		this.currentFrame = 0;
		
		//小鸟下降的速度
		this.speed = 1;
		
		//小鸟下降的加速度
		this.acceleration = 0.1;
		
		//给小鸟绑定点击事件并一次调用
		this.bind();
		
	}
	Bird.prototype={
		constructor:Bird,
		
		//绘制小鸟
	    draw:function(){
	    	
		    //定义一个基本角度  当下落速度为1时小鸟顺时针旋转10°
		    var baseRadian = Math.PI / 180 * 10;
		    //定义一个最大旋转角度45°
		    var maxRadian = Math.PI / 180 * 45;
		    
		    //根据速度计算旋转角度
		    var rotateRadian = baseRadian * this.speed;
		    //旋转角度最大不超过45°
		    rotateRadian= rotateRadian >= maxRadian ? maxRadian : rotateRadian;
		    
		    
   		    this.ctx.save();
		    /*
		    * 1、平移到小鸟的中心点
		    * 2、然后根据下落的速度旋转坐标系
		    * 3、绘制小鸟，但是绘制的x和y坐标变为负的宽高一半。
		    * */
		    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		    this.ctx.rotate(rotateRadian);
		    this.ctx.drawImage(this.img, this.width * this.currentFrame, 0,
			                this.width, this.height, -this.width / 2, -this.height / 2, 
			                this.width, this.height);
		    this.ctx.restore();
	    },
	
		//计算下一帧的数据
		update:function(){
			this.currentFrame = ++this.currentFrame >= this.widthFrame ? 0 :this.currentFrame;
			this.y +=this.speed;//小鸟不断下落，y坐标一直增加
			this.speed += this.acceleration;//每下落一次就改变下落速度
		},
		
		//点击小鸟下降事件 
		bind:function(){
			var that=this;
			this.ctx.canvas.addEventListener("click",function(){
				that.speed = -3;
			});
		},
	}
	
	//创建小鸟实例
	var bird=null;
	w.getBird=function(ctx, img, widthFrame, heightFrame, x, y){
		if(!bird){//只创建一只鸟
			bird=new Bird(ctx, img, widthFrame, heightFrame, x, y);
		}
		return bird;
	};
	
})(window);
