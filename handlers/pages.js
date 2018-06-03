
var helpers = require('./helpers.js'),
    fs = require('fs');


exports.version = "0.1.0";


exports.generate = function (req, res) {

    var page = req.params.page_name;
    console.log("读取basic.html文件成功");
    fs.readFile(
        'basic.html',
        function (err, contents) {
            if (err) {
                helpers.send_failure(res, 500, err);
                return;
            }

            contents = contents.toString('utf8');
            console.log(contents);
            // 取代 基本页面里面的 Page_name
            contents = contents.replace('{{PAGE_NAME}}', page);
            console.log(contents);
            res.writeHead(200, {"Content-Type": "text/html" });
            res.end(contents);
        }
    );
};
