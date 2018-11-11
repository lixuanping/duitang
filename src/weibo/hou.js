// 轮播图板块的后端
var request = require("request");
var express = require('express');
var app = express();//默认用法  赋值给app


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


app.get('/a', function (req, res) {
    var id= req.query.id//接收前端传过来的id 即传过来什么id会得到不样的返回数据
    console.log(id)
    var page= req.query.page
    // console.log(page)
    request('https://m.weibo.cn/api/container/getIndex?containerid='+id+'&openApp=0', (err, a, body) => {
        res.send(body)
    })
})

// 端口
app.listen(18090)

