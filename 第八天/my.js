/**
 * Created by Administrator on 2016/8/6.
 */
function scroll() {
    if(window.pageYOffset!=null){
        return {
            left:window.pageXOffset,top:window.pageYOffset
        };
    }else if(document.compatMode=="CSS1Compat"){
        //判断有没有声明DTD  CSS1Compat标准的浏览器模式
        return {
            left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop
        };

    }
    return {left:document.body.scrollLeft,top:document.body.scrollTop};
}
function $(id) {
    return document.getElementById(id);
}
function show(obj) {
    obj.style.display="block";
}
function hidden(obj) {
    obj.style.display="none";
}