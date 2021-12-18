const express = require("express");
const router = express.Router();
const { query } = require("../db/index.js");
const { formData } = require("../utils");

module.exports = router;

// 查询所有用户
router.get('/list',function(req,res){
    const params = req.query;
    const page = params.page;
    const size = params.size;
    let sqlStr
    if(page && size){
        sqlStr = `select * from user limit ${(page-1)*10},${size}`
    }else{
        sqlStr = `select * from user `;
    }
    (async function () {
        const data = await query(sqlStr);
        res.send(data);
      })();
})

// 查询单个用户
router.get('/:name',function(req,res){
    const name = req.params.name
    let sqlStr = `select username from user where username='${name}'`;  // select name from user where name='maoyun';
    (async function () {
        const data = await query(sqlStr);
        const newData = formData(data, { name: "name" }).data[0];
        if (newData) {
        res.send({code:400,data:newData,msg:'已注册'});
        }else{
        res.send({code:200,data:newData,msg:'未注册'});
        }
    })();
})

// 登录
router.post("/login", function (req, res) {
    const params = req.body
    let sqlStr = `select username,password from user where username='${params.username}' and password='${params.password}'`;
    (async function () {
        const data = await query(sqlStr);
        if(data.length>0){
            res.send({code: '登录成功',data});
        }else{
            res.send({code:'登录失败'})
        }
    })();
});

// 注册 //插入
router.post("/reg", function (req, res) {
    const params = req.body;
    console.log(params);
    let sqlStr = `insert into user (username,password)
    values ('${params.username}','${params.password}');
                `;
    (async function () {
        const data = await query(sqlStr);
        res.send({code:'注册成功',data});
    })();
});