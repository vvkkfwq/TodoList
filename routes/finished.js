var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('finished');
})

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

//删除已完成任务
router.post('/deleteFinishedList', function (req, res, next) {

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
        var sql = 'delete from Finishedlist where Todo_Name = ?';

        connection.query(sql, [todo], function (err, result, fields) {
            if (err) throw err;
            else {
                console.log("删除已完成任务成功");
                res.send("1");
            }

            // 释放链接
            connection.release();

        });
    });
});

//获取已完成任务列表
router.post('/getFinishedList', function (req, res, next) {

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
        var sql = "select * from FinishedList where UserId = '" + uid + "'";


        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result == '') {
                console.log("获取已完成任务列表失败");
                res.render('index');
            } else {
                console.log("获取已完成任务列表成功");
                var reponse = JSON.stringify(result);
                res.send(reponse);
            }

            // 释放链接
            connection.release();

        });

    });

});

module.exports = router;