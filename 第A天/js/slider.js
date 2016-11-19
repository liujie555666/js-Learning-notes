/**
 * Created by Administrator on 2016/8/10.
 */
function animate(obj, attrs, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in attrs) {
            //传进来是那个属性,而且他的值是多少
            var current = 0;
            if (attr === "opacity") {
                current = Math.round(parseInt(getstyle(obj, attr))) || 0;
            } else {
                current = parseInt(getstyle(obj, attr))
            }
            var step = (attrs[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (attr === "opacity") {
                if ("opacity" in obj.style) {
                    obj.style.opacity = (current + step) / 100;
                } else {
                    obj.style.filter = "alpha(opacity)=" + (current + step);
                }
            }
            else {
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
onload = function () {
    function $(objid) {
        return document.getElementById(objid);
    }
    var js_slider = $("js-slider");
    var slider_main = $("slider-main");
    var imgs = slider_main.children;
    var slider_ctrl = $("slider-ctrl");
    for (var i = 0; i < imgs.length; i++) {
        var span = document.createElement("span");
        span.setAttribute("class", "slider-ctrl-con");
        span.innerHTML = imgs.length - i;
        slider_ctrl.insertBefore(span, slider_ctrl.children[1]);
    }
    var spans = slider_ctrl.children;
    spans[1].setAttribute("class", "slider-ctrl-con current");
    var scrollwidth = js_slider.clientWidth;

    for (var i = 1; i < imgs.length; i++) {
        imgs[i].style.left = scrollwidth + "px";
    }//默认
    var inow = 0;//用来标记当前显示的是第几张图片;
    var clickflag;
    for (var k in spans) {
        spans[k].onclick = function () {
            if(clickflag==false){return;}
                clickflag=false;
            if (this.className === "slider-ctrl-prev") {
                //当我们点击左侧是,当前的这张图片先慢慢走到右边,上一张图片一定先快速走到左侧(-310),然后慢慢走到当前可视的盒子(既大盒子)
                animate(imgs[inow], {left: scrollwidth},function () {clickflag=true;});
                --inow<0?inow=imgs.length-1:inow;
                imgs[inow].style.left = -scrollwidth + "px";
                animate(imgs[inow], {left: 0});
                setSquare();
            } else if (this.className === "slider-ctrl-next") {
                autoplay(function () {
                    clickflag=true;
                });
            } else {
                var that = this.innerHTML - 1;
                if (that > inow) {
                    animate(imgs[inow], {left: -scrollwidth});
                    imgs[that].style.left = scrollwidth + "px";
                } else if (that < inow) {
                    animate(imgs[inow], {left: scrollwidth});
                    imgs[that].style.left = -scrollwidth + "px";
                }
                inow = that;
                animate(imgs[inow], {left: 0},function () {clickflag=true;});
                setSquare();
            }
        }
    }
    function setSquare() {
        for (var i = 1; i < spans.length - 1; i++) {
            spans[i].setAttribute("class", "slider-ctrl-con");
        }
        spans[inow + 1].setAttribute("class", "slider-ctrl-con current");
    }
    var timer=null;
    timer=setInterval(autoplay,1500);
    js_slider.onmouseover=function () {
        clearInterval(timer);
    }
    js_slider.onmouseout=function () {
        timer=setInterval(autoplay,1500);
    }
        function autoplay(fn) {
        animate(imgs[inow], {left: -scrollwidth},function () {clickflag=true;});
        ++inow>imgs.length-1?inow=0:inow;
        imgs[inow].style.left = scrollwidth + "px";
            if (fn){
                animate(imgs[inow],{left:0},fn());
            }else {
                animate(imgs[inow],{left:0});
            }
        setSquare();
    }
}
