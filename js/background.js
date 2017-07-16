(function(w){
	//背景构造函数
	//参数: ctx 背景图像 背景向左移动速度
	function BackGround(ctx, img, speed){
		this.ctx = ctx;
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
        this.speed = speed || 2;
        //每创建一个对象实例,自增1
        BackGround.len++;
        //根据背景的数量，动态计算起始的x轴坐标
        this.x=this.width * (BackGround.len-1);
        this.y=0;
		
	}
	//设置对象实例数量
	BackGround.len=0;
	
	BackGround.prototype={
		constructor: BackGround,
		//绘制背景
		draw: function(){
		   this.ctx.drawImage(this.img, this.x, this.y);
		},
		
		update:function(){
			this.x -=this.speed;
			if(this.x <= -this.width){
                this.x += this.width*BackGround.len;
            }
		}
	};
	
	w.getBackGround = function( ctx, img, speed ) {
        return new BackGround( ctx, img, speed );
    };	
    
})(window)
