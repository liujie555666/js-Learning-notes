/**
 * Created by Administrator on 2016/8/9.
 */
function animate(obj, attrs, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in attrs) {
            //传进来是那个属性,而且他的值是多少
            var current =0;
            if(attr==="opacity") {
                current=Math.round(parseInt(getstyle(obj, attr)))||0;
            }else{
                current=parseInt(getstyle(obj, attr))
            }
            var step = (attrs[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(attr==="opacity"){
                if("opacity" in obj.style){
                    obj.style.opacity= (current + step)/100;
                }else{
                    obj.style.filter="alpha(opacity)="+(current+step);
                }
            }
            else{
                obj.style[attr] = current + step + "px";
            }

            if (current != attrs[attr]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
                //当定时器停止了,动画就结束了.如果有回调函数了,就回调函数了.
            }
        }

    }, 20)
}
function getstyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];//ie浏览器
    } else {
        return window.getComputedStyle(obj, null)[attr];//w3c浏览器
    }
}