// 纯数字验证码
function numTestCode(n){
    var arr = [];//存储数字的数组
    for(var i=0;i<n;i++){
        var num = parseInt(Math.random() * 10);
        arr.push(num);
    }
    return arr.join("");
}
// document.write(numTestCode(6));

//数字加字母验证码
function testCode(n){
    var arr = [];
    for(var i=0;i<n;i++){
        var num = parseInt(Math.random() * 123);//生成0-122的随机数
        if(num >= 0 && num <= 9){
            arr.push(num);
        }else if(num >= 65 && num <= 90 || num >= 97 && num <= 122){//大小写字母
            arr.push(String.fromCharCode(num));
        }else{
            i--;//减去一个循环
        }
    }
    return arr.join("");
}
//显示时间
function showTime(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;//0-11月
    var date = d.getDate();
    var week = d.getDay();//0-6
    var hour = doubleNum(d.getHours());
    var minute = doubleNum(d.getMinutes());
    var second = doubleNum(d.getSeconds());
    var str = year + "年" + month + "月" + date + "日 星期" + numOfChinese(week) +" " + hour +
    ":" + minute + ":" + second;
    return str;
}
function numOfChinese(num){
    var arr = ["日","一","二","三","四","五","六"];
    return arr[num];
}
function doubleNum(num){
    if(num < 10){
        return "0" + num;
    }else
        return num;
}
//获取CSS样式
function getStyle(node, cssStyle) {
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}
//颜色随机变化
function randomColor(){
    var color = "rgba(" + parseInt(Math.random()*256) + "," + parseInt(Math.random()*256) + "," + parseInt(Math.random()*256) + ",1)";
    return color;
}
//跨浏览器兼容的阻止事件冒泡
function stopBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancleBubble = true;
    }
}
//跨浏览器阻止超链接默认行为的函数
function preDef(e){
    if(e.preventDefult){
        e.preventDefult();//W3C默认阻止行为
    }else{
        window.event.returnValue = false;//IE默认阻止行为
    }
}
//不限制出界的拖拽
function drag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        //记录鼠标和被拖拽物体的相对位置
        var offsetX = e.clientX - node.offsetLeft;//可视位置的左上角-当前窗口的左上角
        var offsetY = e.clientY - node.offsetTop;
        //被拖拽物体保持相对距离和鼠标移动
        document.onmousemove = function(ev){
            var e = ev || window.event;
            node.style.left = e.clientX - offsetX + 'px';//获取当前窗口的坐标
            node.style.top = e.clientY -offsetY + 'px';
        }
    }
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}
//限制出界的拖拽
function limitDrag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        //记录鼠标和被拖拽物体的相对位置
        var offsetX = e.clientX - node.offsetLeft;//可视位置的左上角-当前窗口的左上角
        var offsetY = e.clientY - node.offsetTop;
        //被拖拽物体保持相对距离和鼠标移动
        document.onmousemove = function(ev){
            var e = ev || window.event;
            var l = e.clientX - offsetX;//获取当前窗口的坐标
            var t = e.clientY - offsetY;
            //限制出界
            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;//获取当前页面的宽
            var windowheight = document.documentElement.clientHeight || document.body.clientHeight;//获取当前页面的高
            if(l <= 0)
                l = 0;
            if(l >= windowWidth - node.offsetWidth)//当前窗口的宽-本身的宽
                l = windowWidth - node.offsetWidth;
            if(t <= 0)
                t = 0;
            if(t >= windowheight - node.offsetHeight)
                t = windowheight - node.offsetHeight; 
                   
            node.style.left = l + 'px';
            node.style.top = t + 'px';
        }
    }
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}