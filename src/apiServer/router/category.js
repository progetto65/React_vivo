const express = require("express");
const router = express.Router();
const {
  query
} = require("../db/index.js");

module.exports = router;

// 全部
router.get("/list", function (req, res) {
  const params = req.query
  const page = params.page
  const size = params.size
  let sqlStr 
  console.log(page);
  if(page && size) {
   sqlStr = `select * from phone limit ${(page-1)*10},${size} `;
  }else {
    sqlStr = `select * from phone `;
  }
 
  (async function () {
    const data = await query(sqlStr);
    res.send(data);
  })();
});

// NEX
router.get("/NEX", function (req, res) {
  let sqlStr = `select * from phone where skuName like '%NEX%'`;
  (async function () {
    const data = await query(sqlStr);
    //   const newData = formData(data, { username: "name" });
    res.send(data);
  })();
});


// 详情
router.get("/details", function (req, res) {
  const {
    id
  } = req.query
  let sqlStr = `select * from phone where skuID=${id}`;
  (async function () {
    const data = await query(sqlStr);
    res.send({
      type: '详情',
      data: data
    });
  })();
});


//分类
router.get("/sort", function (req, res) {
  const sort = req.query.sort
  let sqlStr = `select * from phone where sort='${sort}'`;
  (async function () {
    const data = await query(sqlStr);
    res.send({
      type: '分类',
      data
    });
  })();
});


