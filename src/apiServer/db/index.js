const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  // port: '3306',
  database: "vue_vivo",
  // multipleStatements: true;
});

// 返回查询数据库的结果
module.exports = {
  query: (sql) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },
};
