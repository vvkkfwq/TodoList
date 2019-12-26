$(document).ready(function () {
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/index/getList',
        success: function (data) {
            var list = jQuery.parseJSON(data);
            for (var i = 0; i < list.length; i++) {
                $("#list").append("<li class='list-group-item t1'>" + list[i].Todo_Name + "<button type='button' class='btn btn-outline-primary btn-upload align-middle btn-finished' style='float: right'>完成</button><button type='button' class='btn btn-outline-primary btn-upload align-middle btn-delect' style='float: right'>删除</button><button type='button' class='btn btn-outline-primary btn-upload align-middle btn-detail' style='float: right'>详情</button></li>")
            }
        },
        error: function (err) {
            console.log(err)
        }
    });

    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/index/getName',
        success: function (data) {
            var name = data[0].UserName;
            $("#UserName").html(name);
        },
        error: function (err) {
            console.log(err)
        }
    });

    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/index/getFinishedList',
        success: function (data) {
            var list = jQuery.parseJSON(data);
            for (var i = 0; i < list.length; i++) {
                $("#list2").append("<li class='list-group-item t1'>" + list[i].Todo_Name + "<button type='button' class='btn btn-outline-primary btn-upload align-middle btn-delect-finished' style='float: right'>删除</button></li>")
            }
        },
        error: function (err) {
            console.log(err)
        }
    });

    $("#a2").click(function () {
        $("#a1").removeClass("bechosen");
        $("#a2").addClass("bechosen");
    });

    $("#a1").click(function () {
        $("#a2").removeClass("bechosen");
        $("#a1").addClass("bechosen");
    });

    $("#list").on("click", ".btn-detail", function () {
        $("#listDetail").removeClass("hide");
    });

    $(".btn-close").click(function(){
        $("#listDetail").addClass("hide");
    });

    // $("#list").on("click", "li", function(){
    //     $("#listDetail").toggleClass("hide");
    // });

    $("#list").on("click", ".btn-delect", function () {
        var str = $(this).parent().clone().children().remove().end().text();
        var obj = {};
        obj['Todo_Name'] = str;
        $.ajax({
            type: "post",
            url: 'http://localhost:3000/index/deleteList',
            data: obj,
            success: function (data) {
                if (data == "1"){
                    window.location.reload();
                    alert("任务删除成功");
                }else{
                    alert("任务删除失败");
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    });

    $("#list2").on("click", ".btn-delect-finished", function () {
        var str = $(this).parent().clone().children().remove().end().text();
        var obj = {};
        obj['Todo_Name'] = str;
        $.ajax({
            type: "post",
            url: 'http://localhost:3000/index/deleteFinishedList',
            data: obj,
            success: function (data) {
                if (data == "1"){
                    window.location.reload();
                    alert("删除已完成任务成功");
                }else{
                    alert("任务删除失败");
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    });

    $("#list").on("click", ".btn-finished", function () {
        var str = $(this).parent().clone().children().remove().end().text();
        var obj = {};
        obj['Todo_Name'] = str;
        $.ajax({
            type: "post",
            url: 'http://localhost:3000/index/finishedList',
            data: obj,
            success: function (data) {
                if (data == "1"){
                    window.location.reload();
                    alert("任务已完成");
                }else{
                    alert("请重试");
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    });



    $("#a2").click(function(){
        $("#l1").addClass("hide");
        $("#l2").removeClass("hide");
    });

    $("#a1").click(function(){
        $("#l2").addClass("hide");
        $("#l1").removeClass("hide");
    });

    $("#loginOut").click(function(){
        console.log("1");
        $.ajax({
            type:'get',
            // url:'http://localhost:3000/loginOut',
            success:function(data){
                alert("退出成功");
            },
            error:function(err){
                console.log(err);
            }
        })
    });

})