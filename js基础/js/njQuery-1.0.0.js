(function(w,undefined){
    var njQuery = function(){
        return new njQuery.prototype.init();
    }
    njQuery.prototype = {
        constructor: njQuery,
        inti: function(selector){
            //处理字符串两端的空格
            selector = njQuery.trim(selector);
            //1、传入''、null、undefined、NaN、0、false，返回空的jQuery对象
            if(!selector){
                return this;
            }
            //2、字符串
            else if(njQuery.isString(selector)){//调用方法
                //2.1判断是否是代码片段<a>
                if(njQuery.isHTML(selector)){
                    //根据代码片段创建所有的元素
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    // //将创建好的一级元素添加到jQuery中
                    // for(var i = 0;i<temp.children.length;i++){
                    //     this[i] = temp.children[i];
                    // }
                    // //给jQuery对象添加length属性
                    // this.length = temp.children.length;
                    [].push.apply(this,temp.children);//替换上述代码
                    //返回加工好的this(jQuery)
                    return this;
                }
                //2.2判断是否是选择器
                else{
                    //根据传入的选择器找到对应的元素
                    var res = document.querySelectorAll(selector);
                    //将找到的元素添加到njQuery上
                    [].push.apply(this,res);
                    //返回加工好的this
                    return this;
                }
            }
            //3、数组
            // else if (typeof selector === "object" && "length" in selector &&
            //     selector !== window) {
            //     //3.1真数组
            //     if (({}.toString.apply(selector) == "[object Array]")) {
            //         [].push.apply(this,selector);
            //         return this;
            //     }
            //     //3.2伪数组
            //     else{
            else if(njQuery.isArray(selector)){
                    //将自定义的伪数组转换为真数组
                    var arr = [].slice.call(selector);
                    //将真数组转换成伪数组
                    [].push.apply(this,arr);
                    return this;
                // }
            }
            //4、其他类型
            else{
                this[0] = selector;
                this.length = 1;
                return this;
            }
        }
    }
    /*//封装方法
    njQuery.isString = function (str) {//判断是否是字符
        return typeof selector==="string";
    }
    njQuery.isHTML = function (str) {//判断是否是代码
        return selector.charAt(0)=="<"&&selector.charAt(selector.length-1)==">"
                &&selector.length>=3
    }
    njQuery.trim = function (str) {//判断是否支持trim方法(兼容浏览器)
        if(str.trim){
            return str.trim();
        }else{
            return str.replace(/^\s+|\s+$/g,'');//正则表达式
        }
    }
    njQuery.isObject = function(sele){//判断是否是对象
        return typeof sele === "object"
    }
    njQuery.isWindow = function (sele) {//判断是否在window
        return sele === window;
    }
    njQuery.isArray = function (sele) {//判断是否是数组
        if(njQuery.isObject(sele)&&!njQuery.isWindow(sele) && "length" in sele){
            return true;
        }
        return false;
    }
    njQuery.isFunction = function(sele){//判断是否是函数
        return typeof sele === "function";
    }*/

    njQuery.extend = njQuery.prototype.extend = function(){
        for(var key in obj){
            this[key] = obj[key];
        }
    }
    //封装到对象中，容易维护
    njQuery.extend({
        isString : function (str) {//判断是否是字符
            return typeof selector==="string";
        },
        isHTML : function (str) {//判断是否是代码
            return selector.charAt(0)=="<"&&selector.charAt(selector.length-1)==">"
                    &&selector.length>=3
        },
        trim : function (str) {//判断是否支持trim方法(兼容浏览器)          
            if(str.trim){
                return str.trim();
            }else{
                return str.replace(/^\s+|\s+$/g,'');//正则表达式
            }
        },
        isObject : function(sele){//判断是否是对象
            return typeof sele === "object"
        },
        isWindow : function (sele) {//判断是否在window
            return sele === window;
        },
        isArray : function (sele) {//判断是否是数组
            if(njQuery.isObject(sele)&&!njQuery.isWindow(sele) && "length" in sele){
                return true;
            }
            return false;
        },
        isFunction : function(sele){//判断是否是函数
            return typeof sele === "function";
        },
        ready : function(fn){
            //判断DOM是否加载完毕
            if(document.readyState == "complate"){
                fn();
            }else if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",function () {
                    fn();
                })
            }else{
                document.attachEvent("onreadystatechange",function () {
                    if(document.readyState == "complete"){
                        fn();
                    }
                });
            }
        }
    });
    njQuery.prototype.init.prototype = njQuery.prototype;
    window.njQuery = window.$ = njQuery;
})(window);