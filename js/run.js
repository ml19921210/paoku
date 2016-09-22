/**
 * Created by Administrator on 2016/9/2 0002.
 */
window.onload=function(){
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var runImg=document.querySelectorAll(".run");
    var jumpImg=document.querySelectorAll(".jump");
    var hindImg=document.querySelectorAll(".hind");
    var startbox=document.querySelector(".start-box");
    var start=$(".start-box .start")[0];
    var endbox=document.querySelector(".end-box");
    var end=$(".end-box .end")[0];
    window.onresize=function(){
        canvas.width=document.documentElement.clientWidth;
        canvas.height=document.documentElement.clientHeight;
    };
    window.onresize();
    start.onclick=function(){
        var audio=document.getElementsByTagName("audio")[0]
        audio.play();
        var gogo = document.getElementsByClassName("gogo")[0];
        var juli=document.getElementsByClassName("juli")[0];
        sum = 0;
        var tt=setInterval(function () {
            sum++;
            gogo.innerHTML = sum+"m";
            juli.innerHTML=gogo.innerHTML;
        }, 20);
        startbox.style.display="none";


        var gameobj=new game(canvas,cobj,runImg,jumpImg,hindImg,end,endbox,tt,audio);
        gameobj.play();
        //gameobj1.play();

    }

};