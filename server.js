// 程序入口
var express = require('express');
var app = express();

var fs = require('fs');
var album_handler = require('./handlers/albums.js');
var page_handler = require('./handlers/pages.js');
var helpers = require('./handlers/helpers.js');

// 设置静态文件路由
app.use(express.static(__dirname + "./static"))

// 列出所有的相册文件信息
app.use('/v1/albums.json', album_handler.list_all); 
// 获得某个目录的相册文件信息
app.get('/v1/albums/:album_name.json', album_handler.album_by_name);

// 根据页数获取相册信息 
app.get('/pages/:page_name', page_handler.generate);
app.get('/pages/:page_name/:sub_page', page_handler.generate);

app.get("/", function(req, res) {
	res.redirect("/pages/home");
	res.end();
}); 

app.get("*", four_oh_four);

// 404错误
function four_oh_four(req, res) {
    res.writeHead(404, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(helpers.invalid_resource()) + "\n");
}

app.listen(8080);
console.log("Album-Manager is listening on 8080"); // 默认8080端口
