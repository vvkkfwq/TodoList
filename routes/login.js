var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/login', function (req, res, next) {
    // 导入MySql模块
    var mysql = require('mysql');
    var dbConfig = require('../dao/dbConfig');

    // 使用DBConfig.js的配置信息创建一个MySql链接池
    var pool = mysql.createPool(dbConfig.mysql);
    // // 响应一个JSON数据
    // var responseJSON = function (res, ret) {
    //     if (typeof ret === 'undefined') {
    //         res.json({
    //             code: '-200',
    //             msg: '操作失败'
    //         });
    //     } else {
    //         res.json(ret);
    //     }
    // };
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        // var param = req.query || req.params;
        // var UserName = param.userName;
        // var Password = param.userPsw;
        // console.log("ttt");
        // console.log(UserName);
        // console.log(Password);
        // var _res = res;
        var sql = 'select * from User';
        connection.query(sql, function (err, res, result) {
            // var isTrue = false;
            // if(res){ //获取用户列表，循环遍历判断当前用户是否存在
            //     for (var i=0;i<res.length;i++) {
            //         if(res[i].UserName == UserName && res[i].PassWord == Password) {
            //             isTrue = true;
            //         }
            //     }
            // }
            // var data = {};
            // data.isLogin = isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
            // if(isTrue) {
            //     data.userInfo = {};
            //     data.userInfo.userName = UserName;
            //     data.userInfo.PassWord = Password;
            // } //登录成功返回用户信息
            // if(result) {
            //     result = {
            //         code: 200,
            //         msg: 'succeed'
            //     };
            //     data.result = result;
            // }
            // if(err) data.err = err;
            // // 以json形式，把操作结果返回给前台页面
            // responseJSON(_res, data);

            if(res){
                for (var i = 0; i < res.length; i++){
                    console.log(res[i].UserName);
                    console.log(res[i].PassWord);
                }
            }

            // 释放链接
            connection.release();

        });
    });
});


module.exports = router;