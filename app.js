const express = require('express');
const router = require('./router.js');
const templateTmp = require('express-art-template');
const app = express();
//使用
app.use(router);
//设置
app.set('view engine', 'html');
app.engine('html', templateTmp);
//配置静态文件的方法
app.use('/public', express.static('views'));
app.listen(3000, () => {
    console.log('running');
})