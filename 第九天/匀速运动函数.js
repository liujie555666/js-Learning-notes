/**
 * Created by Administrator on 2016/8/9.
 */
function animate(obj,endPoint,ms,jl) {clearInterval(obj.timer);
    var speed=endPoint>obj.offsetLeft?jl:-jl;
    obj.timer=setInterval(function () {
        var result=endPoint-obj.offsetLeft;
        if(Math.abs(result)<jl) {
            obj.style.left=endPoint+"px";
            clearInterval(obj.timer);
        }else
            obj.style.left=obj.offsetLeft+speed+"px";
    },ms)
}