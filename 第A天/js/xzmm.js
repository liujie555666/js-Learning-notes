/**
 * Created by Administrator on 2016/8/10.
 */
onload=function () {
    function animate(obj, attrs, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var attr in attrs) {//传进来是那个属性,而且他的值是多少
                var current = 0;
                if (attr === "opacity") {
                    current = Math.round(parseInt(getstyle(obj, attr)*100 ))|| 0;
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
                else if (attr === "zindex") {
                    obj.style.zIndex = attrs[attr];
                }
                else {
                    obj.style[attr] = current + step + "px";
                }
                if (attr === "zindex") {
                    continue;
                }
                if (current != attrs[attr]) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();//当定时器停止了,动画就结束了.如果有回调函数了,就回调函数了.
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
function $(objid) {return document.getElementById(objid)}
    var json = [
        {   //  1
            width:400,
            top:20,
            left:50,
            opacity:20,
            z:2
        },
        {  // 2
            width:600,
            top:70,
            left:0,
            opacity:80,
            z:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            z:4
        },
        {  // 4
            width:600,
            top:70,
            left:600,
            opacity:80,
            z:3
        },
        {   //5
            width:400,
            top:20,
            left:750,
            opacity:20,
            z:2
        }
    ];
    var wrap=$("wrap");
    var arrow=$("arrow");
    var slider=$("slider");
    var lis=slider.getElementsByTagName("li");
    wrap.onmouseover=function () {
        animate(arrow,{opacity:100});
    }
    wrap.onmouseout=function () {
        animate(arrow,{opacity:0});
    }
    var as=arrow.children;
    for(var k in as){
        as[k].onclick=function () {
            if(this.className=="prev"){
                var json0=json.shift();
                json.push(json0);
                change();
            }else{
                var json1=json.pop();
                json.unshift(json1);
                change();
            }
        }
    }
    change();
    function change() {
        for(var i=0;i<json.length;i++){
            animate(lis[i],{
                width:json[i].width,
                height:json[i].height,
                left:json[i].left,
                top:json[i].top,
                opacity:json[i].opacity,
                zindex:json[i].z
            },function () {

            })
        }
    }
}