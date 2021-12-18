const express = require('express');
const router = require('./router')
const path = require('path')

const server = express();
// --------------------------------------------
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  // 处理复杂跨域中的预检请求
  if(req.method=="OPTIONS") {
    console.log(req.method);
      res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
      res.sendStatus(200);/*让options请求快速返回*/
  } else{
      next();
  }
});
// ------------------------------------------

// 创建静态服务器
server.use(express.static(path.join(__dirname, '/public')));


server.use('/api',router)

// 监听窗口
server.listen(3001,function() {
    console.log('server is running');
})