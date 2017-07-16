(function(w){
	function Scene(ctx, imgObj){
		this.ctx=ctx;
		this.imgObj=imgObj;
		//监听者队列
		this.listeners=[];
		//该场景所需的所有角色
        this.roles = [];
        this._initRoles();
	}
	
	Scene.prototype={
		
		constructor:Scene,
		
		_initRoles:function(){
			
			//为了实现背景无限轮播，创建2个背景实例并将创建的实例放入roles数组中
			for(var i=0; i<2; i++){
            	this.roles.push(getBackGround( this.ctx, this.imgObj.sky, 10));
            }
            
            //创建6个管道实例并将创建的实例放入roles数组中
            for(var i=0;i<6;i++){
            	this.roles.push(getPipe(this.ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, 100, this.imgObj.land.height));
            }
            
            //创建4个大地背景实例并将创建的实例放入roles数组中
            for(var i=0;i<4;i++){
            	this.roles.push( getLand(this.ctx, this.imgObj.land, 10));
            }
            
            //创建小鸟对象实例并将创建的实例放入roles数组中
            this.roles.push(getBird(this.ctx, this.imgObj.bird, 3, 1, 10, 10) );
                
		},
		
		//添加监听者
		addListener: function(listener){
			this.listeners.push(listener);
		},
		
		//监听小鸟是否死亡，一旦死亡就告知监听者(回调函数)
		triggerBirdOver: function(){
			this.listeners.forEach(function(listener){
				listener();
			});
		},
		
		//绘制
		draw: function(){
			
			var bird = getBird();
			
        	//计算小鸟的中心
        	var birdCoreX = bird.x + bird.width / 2;
            var birdCoreY = bird.y + bird.height / 2;
            
        	//如果小鸟的中心点撞向天空或大地或碰到管道那么游戏结束
        	if(this.ctx.isPointInPath(birdCoreX, birdCoreY) || birdCoreY < 0 
        	    || birdCoreY > (this.ctx.canvas.height - this.imgObj.land.height)){
                 
                 this.triggerBirdOver();//此时监听到了小鸟死亡状态
        	  	
        	}else {
        		//先清除上一次绘制的6个管道路径，
	            //然后再按照新的位置绘制新路径
	            this.ctx.beginPath();
	            this.roles.forEach(function(role){
	            	role.draw();
	            	role.update();
	            });
        	}
		},
	};
	
	w.getGameScene=function(ctx, imgObj){
		return new Scene(ctx, imgObj);
	};
	
})(window)
