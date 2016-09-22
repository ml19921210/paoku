/**
 * Created by Administrator on 2016/9/2 0002.
 */
//function fire(cobj) {
//    this.cobj = cobj
//    this.x = 0;
//    this.y = 0;
//    this.x1 = 20 * Math.random() - 10;
//    this.y1 = 20 * Math.random() - 10;
//    this.x2 = 20 * Math.random() - 10;
//    this.y2 = 20 * Math.random() - 10;
//    this.speedy = -2 - Math.random() - 2;
//    this.speedx = (16 * Math.random() - 8)
//    this.life = 4;
//    this.r = 1;
//    this.color = "#fef";
//}
//fire.prototype = {
//    draw: function () {
//        var cobj = this.cobj;
//        cobj.save();
//        cobj.beginPath();
//        cobj.fillStyle = this.color;
//        cobj.translate(this.x, this.y);
//        cobj.scale(this.r, this.r)
//        cobj.moveTo(0, 0);
//        //cobj.bezierCurveTo(this.x1,this.y1,this.x2,this.y2,0,0);
//        cobj.lineTo(this.x1, this.y1);
//        cobj.lineTo(this.x2, this.y2);
//        cobj.fill();
//        cobj.restore();
//    },
//    update: function () {
//        this.x += this.speedx;
//        this.y += this.speedy;
//        this.life -= 0.2;
//        this.r -= 0.06;
//    }
//}
//
//
//function stone(cobj, x, y,color) {
//    var color=color||"#fff";
//    var stoneArr = [];
//    for (var i = 0; i < 5; i++) {
//        var obj = new fire(cobj);
//        obj.x = x;
//        obj.y = y;
//        obj.color=color;
//        stoneArr.push(obj);
//    }
//    var t = setInterval(function () {
//        for (var i = 0; i < stoneArr.length; i++) {
//            stoneArr[i].draw();
//            stoneArr[i].update();
//            if (stoneArr[i].r < 0 || stoneArr[i].life < 0) {
//                stoneArr.splice(i, 1);
//            }
//        }
//        if (stoneArr.length == 0) {
//            clearInterval(t);
//        }
//    }, 50)
//}
//
//
//
//
//





function person (canvas,cobj,runImg,jumpImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runImg=runImg;
    this.jumpImg=jumpImg;
    this.status="runImg";
    this.state=0;
    this.x=this.canvas.width/20;
    this.y=0;
    this.width=110;
    this.height=120;
    this.speedY=5;
    this.zhongli=9.8;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,110,120,0,0,this.width,this.height)
        this.cobj.restore()
    },
    out:function(){
        if(this.y>420){
            this.y=420;
            //stone(this.cobj, this.x + this.width / 2, this.y + this.height)
        }else if (this.y<420){
            this.speedY+=this.zhongli;
            this.y+=this.speedY;
        }
    }
}


/*
* 障碍物
* */
function hind(canvas,cobj,hindImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hindImg=hindImg;
    this.state=0;
    this.x=canvas.width;
    this.y=490;
    this.width=56;
    this.height=40;
}
hind.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hindImg[this.state],0,0,564,399,0,0,this.width,this.height)
        this.cobj.restore()
    }
}







/*游戏主程序
* */
function game (canvas,cobj,runImg,jumpImg,hindImg,end,endbox,tt,audio){
    this.canvas=canvas;
    this.cobj=cobj;
    this.person=new person(canvas,cobj,runImg,jumpImg);
    this.canvasH=canvas.height;
    this.canvasW=canvas.width;
    this.speed=9;
    this.hindImg=hindImg;
    this.hindArr=[];
    this.score=1;
    this.life=1;
    this.end=end;
    this.endbox=endbox;
    this.tt=tt;
    this.audio=audio;
}
game.prototype={
    play:function(){
        var that=this;
        that.key();
        var back=0;
        var num=0;
        var num1=0;
        var step=5000+parseInt(5*Math.random())*1000;
        var t=setInterval(function(){
            num++;
            back-=that.speed;
            that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
            if(that.person.status=="runImg"){
                that.person.state=num%8;
            }else if(that.person.status=="jumpImg"){
                that.person.state=0;
            }
            if(that.person.x>that.person.canvas.width/4){
                that.person.x=that.person.canvas.width/4;
            }
            that.person.x+=that.speed;
            that.person.draw();
            that.person.out();
            that.canvas.style.backgroundPositionX=back+"px";
            if(num1%step==0){
                num1=0;
                step=5000+parseInt(5*Math.random())*1000;
                var hindObj=new hind(that.canvas,that.cobj,that.hindImg)
                hindObj.state=Math.floor(that.hindImg.length*Math.random());
                that.hindArr.push(hindObj);
                if(that.hindArr.length>5){
                    that.hindArr.shift()
                }
            }
            num1+=50;


            for(var i=0;i<that.hindArr.length;i++){
                that.hindArr[i].x-=that.speed;
                that.hindArr[i].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.hindArr[i])){
                    if(!that.hindArr[i].flag1){
                        that.life--;
                        //stone(that.cobj, that.person.x + that.person.width / 2, that.person.y + that.person.height / 2,"red")
                    }
                    that.hindArr[i].flag1=true;
                    if(that.life<=0){
                        clearInterval(that.tt);
                        that.endbox.style.display="block";
                        that.audio.pause();
                        clearInterval(t);
                        that.end.onclick=function(){
                            location.reload();
                        };

                    }
                }else if(that.hindArr[i].x+that.hindArr[i].width<that.person.x){
                    if(!that.hindArr[i].flag&&!that.hindArr[i].flag1){
                        if(that.score%3==0){
                            that.speed+=1;
                        }
                    }
                    that.hindArr[i].flag=true;
                }
            }


        },50)
    },
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(e){
            var code = e.keyCode;
            if (!flag) {
                return;
            }
            flag=false;
            if (code == 32) {
                that.person.zhongli=0;
                that.person.speedY=0;
                that.person.status = "jumpImg"
                var initA = 0;
                var initY = that.person.y
                var speedA = 7;
                var r = 250;
                var t = setInterval(function () {
                    initA += speedA;
                    if (initA >= 180) {
                        //stone(that.cobj, that.person.x + that.person.width / 2, that.person.y + that.person.height);
                        clearInterval(t);
                        that.person.y = initY;
                        that.person.status = "runImg";
                        flag = true;
                    }else{
                        var len = Math.sin(initA * Math.PI / 180) * r;
                        that.person.y = initY - len;
                    }
                }, 50)

            }

        }

    }
}