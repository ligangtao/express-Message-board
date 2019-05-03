const express = require('express');
const process = require('./process.js');

//创建外置路由对象
const router = express.Router();

//设置
router.get('/', (req, res) => {
    process.getIndex(req, res);
})
router.post('/postData', (req, res) => {
    process.postData(req, res);
})
//处理静态资源


//暴露
module.exports = router;