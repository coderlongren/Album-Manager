var amgr = require('../lib/albums');


amgr.albums('./', function(err, albums) {
	if (err) {
		console.log("未逾期的错误" + JSON.stringify(err));
		return;
	}
	(function iterator(index) {
		if (index == albums.length) {
			console.log("Done");
			return;
		}
		albums[index].photos(function(err, photos) {
			if (err) {
				console.log("加载相册错误" + JSON.stringify(err));
				return;
			}
			console.log(albums[index].name);
			console.log(photos);
			console.log(";");
			iterator(index + 1);
		})
	})(0)
})