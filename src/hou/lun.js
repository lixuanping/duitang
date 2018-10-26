// 轮播图板块的后端
var request = require("request");
var cheerio = require("cheerio");
var express = require('express');
var app = express();//默认用法  赋值给app
// 引入封装好的数据库 写 读 查 改
var xie = require("../js/dbxie.js");
var cha = require("../js/dbcha.js");
var gai = require("../js/dbgai.js");

// 专门处理post请求的
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 解决跨域的问题
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") {
        res.send(200);/*让options请求快速返回*/
    } else {
        next();
    }
});


// 轮播图的路由
app.get('/a', function (req, res) {
    request("https://www.duitang.com/napi/mbanner/?app_code=mdt", (err, a, body) => {
        // var $ = cheerio.load(body)
        // var list = JSON.parse(body).data.object_list//得到存放轮播图的数组
        // var arr = []
        // for(var i =0 ;i <list.length ; i++){//把每张图片的路径存到数组
        //     arr.push(list[i].image)
        // }
        // for(var j = 0 ;j < arr.length ; j++){//把图片路径存入数据库
        //     xie.query('lunbo',[{img:arr[j]}],function(argument){

        //     })
        // }
        cha.query('lunbo', {}, function (argument) {//读取数据库 并返回给前端
            res.send(argument)
        })

    })
})


// 首页内容的路由
app.get('/b', function (req, res) {
    request("https://www.duitang.com/napi/index/hot/?start=0&include_fields=sende", (err, a, body) => {
        var list = JSON.parse(body).data.object_list//得到存放内容的数组
        res.send(list)
    })
})


// 首页点击加载更多的路由
app.get('/c', function (req, res) {
    var num = req.query.start//前端传过来的东西
    num+=24
    request("https://www.duitang.com/napi/index/hot/?start="+num+"&limit=24&include_fields=sende", (err, a, body) => {
        if(err){
            console.log('!!!!!!!!!!!!!!!!');
            return;
        }
        var list = JSON.parse(body).data.object_list//得到存放内容的数组

        res.send(list)
    })
})


// 注册的路由
app.get('/d', function (req, res) {
    var num = req.query//前端传过来的东西
    cha.query('username', {username:num.user}, function (argument) {//读取数据库 并返回给前端
        if(argument.length===0){//用户名不存在则写进数据库
            xie.query('username',[{username:num.user,password:num.pass}],function(argument){
                res.send(num.user)
            })
        }else{
            res.send('no')
        }
    })
})


//登陆的路由
app.post('/e', function (req, res) {
    var num = req.body//前端传过来的东西
    cha.query('username',{username:num.user,password:num.pass}, function (argument) {//读取数据库 并返回给前端
        if(argument.length===0){
            res.send('no')
        }else{
            res.send(num.user)
        }
    })
})


// 首页点击进入详情页 获取此用户的相关动态路由
app.get('/f', function (req, res) {
    var num = req.query//前端传过来的东西  然后拼接成需要的东西爬取到数据再返回给前端
    request("https://www.duitang.com/napi/blog/list/by_root_album/?start=0&include_fields=sender%2Calbum&limit=6&album_id="+num.twoId+"&blog_id="+num.id+"&_=1540119078135", (err, a, body) => {
        var list = JSON.parse(body)
        res.send(list)//把前端需要的东西传回去
    })
})



// 商店页面菜单下面的三个推荐商品
app.get('/g', function (req, res) {
    request("https://buy.duitang.com/napi/buy/index/module/info/?type=3,4,7&timestamp=1540175133000", (err, a, body) => {
        var list = JSON.parse(body).data.object_list
        res.send(list)//把前端需要的东西传回去
    })
})


// 商店页面专题部分
app.get('/h', function (req, res) {
    request("https://buy.duitang.com/napi/buy/index/popular/list/?limit=5&start=0&timestamp=1540176102000", (err, a, body) => {
        var list = JSON.parse(body).data.object_list
        res.send(list)//把前端需要的东西传回去
    })
})


// 底部数据板块
app.get('/j', function (req, res) {
    request("https://buy.duitang.com/napi/buy/inventory/list/by_datasource/?sort_by=&sort_type=desc&limit=10&start=0&filter_id=inv_%E6%8A%A4%E8%82%A4&timestamp=1540216117000", (err, a, body) => {
        var list = JSON.parse(body).data.object_list
        res.send(list)//把前端需要的东西传回去
    })
})


// 底部数据板块点击进入到详情页下面的点击加入购物车 把商品信息写入数据库
app.get('/k', function (req, res) {
    var num = req.query//前端传过来的东西
    // console.log(num)
    cha.query('car', {id:num.id}, function (argument) {//读取数据库 并返回给前端
        // console.log(argument)
        if(argument.length===0){//没有此商品则写进数据库
            xie.query('car',[{id:num.id,url:num.img,title:num.title,price:num.price,qty:num.qty}],function(argument){
                
            })
        }else{//否则修改数量即可 第一个是表名 第二个是改的条件 第三个是该过的内容 第四个是返回的
            gai.query('car',{id:num.id},{$set:{qty:num.qty}},function(argument){
                
            })
        }
    })
})



//app.veu页面一开始请求购物车  为了得到商品总数
app.get('/l', function (req, res) {
    cha.query('car',{},function (argument) {//读取数据库 并返回给前端
        res.send(argument)
    })
})

// 端口
app.listen(18090)