
var helpers = require('./helpers.js');
var async = require('async');
var fs = require('fs');

exports.version = "0.1.0";

// 列出所有的相册信息
exports.list_all = function (req, res) {
    console.log("获取所有相册信息");
    load_album_list(function (err, albums) {
        if (err) {
            helpers.send_failure(res, 500, err);
            return;
        }

        helpers.send_success(res, { albums: albums });
    });
};

// 根据相册上一级名称加载
exports.album_by_name = function (req, res) {
    
    var getp = req.query;
    var page_num = getp.page ? getp.page : 0;
    var page_size = getp.page_size ? getp.page_size : 1000;

    if (isNaN(parseInt(page_num))) page_num = 0;
    if (isNaN(parseInt(page_size))) page_size = 1000;
    console.log(req.query + ";" + page_num + ";" + page_size);
    // 具体的相册名
    var album_name = req.params.album_name;

    load_album(
        album_name,
        page_num,
        page_size,
        function (err, album_contents) {
            if (err && err.error == "no_such_album") {
                helpers.send_failure(res, 404, err);
            }  else if (err) {
                helpers.send_failure(res, 500, err);
            } else {
                helpers.send_success(res, { album_data: album_contents });
            }
        }
    );
};

// 加载文件
function load_album_list(callback) {
    console.log("获取所有相册信息");
    fs.readdir(
        "./static/albums",
        function (err, files) {
            if (err) {
                callback(helpers.make_error("file_error", JSON.stringify(err)));
                return;
            }

            var only_dirs = [];
            // 
            async.forEach(
                files,
                function (element, cb) {
                    fs.stat(
                        "./static/albums/" + element,
                        function (err, stats) {
                            if (err) {
                                cb(helpers.make_error("file_error",
                                                      JSON.stringify(err)));
                                return;
                            }
                            if (stats.isDirectory()) {
                                // element 是albums/ 下的子目录名称
                                only_dirs.push({ name: element });
                            }
                            cb(null);
                        }                    
                    );
                },
                function (err) {
                    callback(err, err ? null : only_dirs);
                }
            );
        }
    );
};

function load_album(album_name, page, page_size, callback) {
    fs.readdir(
        "./static/albums/" + album_name,
        function (err, files) {
            if (err) {
                if (err.code == "ENOENT") {
                    callback(helpers.no_such_album());
                } else {
                    callback(helpers.make_error("file_error",
                                                JSON.stringify(err)));
                }
                return;
            }

            var only_files = [];
            var path = "./static/albums/" + album_name + "/";
            console.log(files.length + "; 文件个数");
            async.forEach(
                files,
                function (element, cb) {
                    fs.stat(
                        path + element,
                        function (err, stats) {
                            if (err) {
                                cb(helpers.make_error("file_error",
                                                      JSON.stringify(err)));
                                return;
                            }
                            if (stats.isFile()) {
                                var obj = { filename: element,
                                            desc: element };
                                only_files.push(obj);
                            }
                            cb(null);
                        }                    
                    );
                },
                function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        var ps = page_size;
                        console.log("执行到这里了吗？");
                        for (var i = 0; i < only_files.length; i++) {
                            console.log(only_files[i].filename);
                        }
                        // slice 返回
                        var photos = only_files.slice(page * ps, ps);
                        var obj = { short_name: album_name,
                                    photos: photos };

                        callback(null, obj);
                    }
                }
            );
        }
    );
};

