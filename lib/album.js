var fs = require('fs');
var path = require('path'); // 需要这两个模块


function Album(album_path) {
	this.name = path.basename(album_path);
	this.path = album_path;
}
Album.prototype.name = null;
Album.prototype.path = null;
Album.prototype._photos = null;
Album.prototype.photos = function(callback) {
	if (this._photos != null) {
		callback(null, this._photos);
		return;
	}
	var slef = this;
	fs.readdir(slef.path,function(err, files) {
		if (err) {
			if (err.code == "ENOENT") {
				callback(no_such_album());
			}
			else {
				callback({error: "file error",
					message: JSON.stringify(err)
				});
			}
			return;
		}
		var dics = []; // 获取的目录信息
		(function iterator(index) {
			if (index == files.length) {
				callback(null, dics);
				return;
			}
			fs.stat(slef.path + "/" + files[index], function(err, status) {
				if (err) {
					callback({err: "file_err", message: JSON.stringify(err)});
					return;
				}
				if (status.isFile()) {
						dics.push(files[index]);
				}
				iterator(index + 1);
			})
		})(0);
			
		}
		)

}

// Album Class定义
exports.create_album = function(path) {
	return new Album(path);
}

function no_such_album() {
	return {error : "no_such_album", 
	message: "指定的目录不存在" };
}