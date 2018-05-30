var fs = require('fs');
var album = require('./album.js');

exports.version = "1.0";
// root 是你的根目录路径
exports.albums = function(root, callback) {
	fs.readdir(root + "/albums",
		function(err, files) {
			if (err) {
				callback(err);
				return;
			}
			// 使用递归更正，只获取文件的目录信息
			var dics = []; // 获取的目录信息
			(function iterator(index) {
				if (index == files.length) {

					callback(null, dics);
					return;
				}
				fs.stat(root + "albums/" + files[index], function(err, status) {
					// console.log(root + "albums/" + files[index]); //打印下 路径 
					if (err) {
						callback({err: "file_err", message: JSON.stringify(err)});
						return;
					}
					if (status.isDirectory()) {
 						var obj = root + "albums/" + files[index];
 						dics.push(album.create_album(obj));
					}
					else {
						// dics.push(root + "albums/" + files[index]);
					}
					iterator(index + 1);
				})
			})(0);
		}

	);
};