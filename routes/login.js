var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {"message":""});
});

router.post('/index', function (req, res, next) {
    // 导入MySql模块
    var mysql = require('mysql');
    var dbConfig = require('../dao/dbConfig');
    var cookie = require('cookie-parser');
    router.use(cookie());

    // 使用DBConfig.js的配置信息创建一个MySql链接池
    var pool = mysql.createPool(dbConfig.mysql);

    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body;
        var Username = param.userName;
        var Password = param.userPsw;
        var sql = "select * from User where UserName = '" + Username + "' and PassWord = '" + Password + "'";


        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result == '') {
                console.log("帐号密码错误");
                res.render('login', {"message":"账号密码错误"});
            } else {
                console.log("登陆成功");
                res.cookie('uid', result[0].UserId);
                res.render('index');
            }

            // 释放链接
            connection.release();

        });

    });
});

router.get('/index', function(req, res, next){
    res.render('index');
});

router.get('/signup', function(req, res, next){
    res.render('signup');
});

router.post('/sign', function(req, res, next){
// 导入MySql模块
var mysql = require('mysql');
var dbConfig = require('../dao/dbConfig');

// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool(dbConfig.mysql);

pool.getConnection(function (err, connection) {
  // 获取前台页面传过来的参数
  var name = req.body.UserName;
  var psw = req.body.PassWord;
  var sql = "insert into User (UserName, PassWord) values (?, ?)";


  connection.query(sql, [name, psw], function (err, result, fields) {
    if (err) throw err;
    else {
      console.log("注册成功");
      res.send(true);
    }

    // 释放链接
    connection.release();

  });

});
});

module.exports = router;