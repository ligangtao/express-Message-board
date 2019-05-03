const fs = require('fs');
const path = require('path');
const query = require('querystring');
const template = require('art-template');

// 获取静态页面并且渲染数据
module.exports.getIndex = function (req, res) {
    // 读取 json 文件
    fs.readFile(path.join(__dirname, './db.json'), (err, data) => {
        //转对象
        let jsonObj = JSON.parse(data.toString());
        //渲染页面
        // let htmlStr = template(path.join(__dirname, 'publish/index.html'), jsonObj);
        // res.end(htmlStr);
        res.render('index', jsonObj);
    })
}

// 处理提交留言
module.exports.postData = function (req, res) {
    // 接收参数： 
    // 在 Nodejs 中接收参数通过两个事件： data, end
    let params = '';
    req.on('data', chunck => {
        params += chunck;
    })
    req.on('end', () => {
        // 将编码进行转码
        let paramsStr = decodeURI(params);
        //将参数转成对象
        let paramsObj = query.parse(paramsStr);
        // 将对象添加其余三个属性： img, id， time
        // Date.now 得到当前时戳
        paramsObj.time = Date.now();
        paramsObj.img = 'public/images/timg.jpg';
        // 得到 db.json 中的数据
        fs.readFile(path.join(__dirname, './db.json'), (err, data) => {
            //转对象
            let jsonObj = JSON.parse(data.toString());
            // 得到最后数据的 id
            paramsObj.id = jsonObj.message[jsonObj.message.length - 1].id + 1;
            // 将新增的数据添加到 message 中
            jsonObj.message.push(paramsObj);
            // 重新将对象写入到 db.json 中
            // 转为字符串
            let jsonstr = JSON.stringify(jsonObj, null, ' ');
            //写入
            fs.writeFile(path.join(__dirname, './db.json'), jsonstr, err => {
                if (err) return;
                res.end('<script>alert("add success");window.location = "/";</script>')
            })
        })
    })
}
