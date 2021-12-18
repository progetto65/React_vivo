const express = require('express');
const router = express.Router();
module.exports = router;
const {
  query
} = require("../db/index.js");
const userRouter = require('./user')
const categoryRouter = require('./category')


router.use(express.urlencoded({extended:true}));
router.use(express.json())

// 用户
router.use('/user', userRouter)
router.use('/category', categoryRouter)


router.get("/search", function (req, res) {
  const msg = req.query.msg
  let sqlStr = `select * from phone where skuName like '%${msg}%'`;
  (async function () {
    const data = await query(sqlStr);
    res.send(data);
  })();
});


