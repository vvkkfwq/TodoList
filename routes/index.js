var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/getName', function (req, res, next) {
  // 导入MySql模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');
  var cookie = require('cookie-parser');
  router.use(cookie());

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var uid = req.cookies.uid;
    var sql = "select UserName from User where UserId = '" + uid + "'";


    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result == '') {
        console.log("获取用户名失败");
        res.send(false);
      } else {
        console.log("获取用户名成功");
        res.send(result);
      }

      // 释放链接
      connection.release();

    });

  });
});



//获取所有任务列表
router.post('/getList', function (req, res, next) {

  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());

  // 导入MySql模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var uid = req.cookies.uid;
    var sql = "select * from MyList where UserId = '" + uid + "'";


    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result == '') {
        console.log("获取任务列表失败");
        res.render('index');
      } else {
        console.log("获取任务列表成功");
        var reponse = JSON.stringify(result);
        res.send(reponse);
      }

      // 释放链接
      connection.release();

    });

  });

});

//获取项目列表
router.post('/getProject', function (req, res, next) {

  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());

  // 导入MySql模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var uid = req.cookies.uid;
    var sql = "select * from MyProject where UserId = '" + uid + "'";


    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result == '') {
        console.log("获取项目列表失败");
        res.render('index');
      } else {
        console.log("获取项目列表成功");
        var reponse = JSON.stringify(result);
        res.send(reponse);
      }

      // 释放链接
      connection.release();

    });

  });

});

//添加任务
router.post('/addList', function (req, res, next) {

  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());

  // 导入MySql模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var str = req.body.txtTodoName;
    var uid = req.cookies.uid;
    var sql = "insert into MyList (Todo_Name, UserId) values (?, ?)";


    connection.query(sql, [str, uid], function (err, result, fields) {
      if (err) throw err;
      else {
        console.log("添加任务成功");
        res.redirect('/index');
      }

      // 释放链接
      connection.release();

    });

  });

});

//完成任务
router.post('/finishedList', function (req, res, next) {
  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());
  var uid = req.cookies.uid;

  // 导入MySql模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var todo = req.body.Todo_Name;
    var sql = 'delete from Mylist where Todo_Name = ?';
    var sql2 = 'insert into FinishedList (Todo_Name, UserId) values (?, ?)';

    connection.query(sql, [todo], function(err, result, fields){
      if (err) throw err;
      else{
        console.log("删除任务成功");
      }

    });

    connection.query(sql2, [todo, uid], function(err, result, fields){
      if(err) throw err;
      else{
        console.log("已完成添加成功");
        res.send("1");
      }
      
      // 释放链接
      connection.release();

    })
  });
});

//删除任务
router.post('/deleteList', function (req, res, next) {

  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());

  // 导入MySql模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var todo = req.body.Todo_Name;
    var sql = 'delete from Mylist where Todo_Name = ?';

    connection.query(sql, [todo], function(err, result, fields){
      if (err) throw err;
      else{
        console.log("删除任务成功");
        res.send("1");
      }

      // 释放链接
      connection.release();

    });
  });
});

//获取任务详情
router.post('/getDetail', function(req, res, next){
  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());

  //导入MySQL模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
      // 获取前台页面传过来的参数
      var uid = req.cookies.uid;
      var name = req.body.Todo_Name;
      var sql = "select * from MyList where UserId = '" + uid + "' and Todo_Name = '" + name + "'";


      connection.query(sql, function (err, result, fields) {
          if (err) throw err;
          if (result == '') {
              console.log("获取任务详情失败");
              res.send(false);
          } else {
              console.log("获取任务详情成功");
              res.send(result);
          }

          // 释放链接
          connection.release();

      });

  });

});

//更新任务详情
router.post('/setDetail', function(req, res, next){
  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());

  //导入MySQL模块
  var mysql = require('mysql');
  var dbConfig = require('../dao/dbConfig');

  // 使用DBConfig.js的配置信息创建一个MySql链接池
  var pool = mysql.createPool(dbConfig.mysql);

  pool.getConnection(function (err, connection) {
      // 获取前台页面传过来的参数
      var uid = req.cookies.uid;
      var name = req.body.Todo_Name;
      var updateDate = req.body.Closing_Date;
      var updateComment = req.body.Comment; 
      if (updateDate == ""){
        updateDate = null;
      }
      var sql = "update MyList set Closing_Date = ?, Comment = ? where UserId = '" + uid + "' and Todo_Name = '" + name + "'";


      connection.query(sql, [updateDate, updateComment], function (err, result, fields) {
          if (err) throw err;
          else {
              console.log("更新任务详情成功");
              res.send(true);
          }

          // 释放链接
          connection.release();

      });

  });

});

router.post('/loginOut', function(req, res, next){
  //使用cookie
  var cookie = require('cookie-parser');
  router.use(cookie());
  res.clearCookie('uid');
  res.send("1");
});



module.exports = router;