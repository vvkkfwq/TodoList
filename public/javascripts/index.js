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
        var str = $(this).parent().clone().children().remove().end().text();
        var obj = {};
        obj['Todo_Name'] = str;
        $("#listDetail #TodoName2").html(str);
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/index/getDetail',
            data: obj,
            success: function (data) {
                console.log(data);
                var date = new Date(data[0].Closing_Date);
                var month = date.getMonth() + 1;
                var day = date.getDate();
                month = (month.toString().length == 1) ? ("0" + month) : month;
                day = (day.toString().length == 1) ? ("0" + day) : day;

                var result = date.getFullYear() + '-' + month + '-' + day; //当前日
                if (result != "1970-01-01") {
                    $("#closing-time").val(result);
                }
                else{
                    $("#closing-time").val("");
                }
                $("#txt").val(data[0].Comment);
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $(".btn-close").click(function () {
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
                if (data == "1") {
                    window.location.reload();
                    alert("任务删除成功");
                } else {
                    alert("任务删除失败");
                }
            },
            error: function (err) {
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
                if (data == "1") {
                    window.location.reload();
                    alert("任务已完成");
                } else {
                    alert("请重试");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $("#a2").click(function () {
        $("#l1").addClass("hide");
        $("#l2").removeClass("hide");
    });

    $("#a1").click(function () {
        $("#l2").addClass("hide");
        $("#l1").removeClass("hide");
    });

    $("#loginOut").click(function () {
        $.ajax({
            type: 'post',
            url:'http://localhost:3000/index/loginOut',
            success: function (data) {
                if(data == "1"){
                     alert("退出成功");
                     window.location.href = "/";
                }
               
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $(".btn-update").click(function () {
        var name = $("#listDetail #TodoName2").text();
        var obj = {};
        obj['Todo_Name'] = name;
        obj['Closing_Date'] = $("#closing-time").val();
        obj['Comment'] = $("#txt").val();
        console.log(obj);
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/index/setDetail',
            data: obj,
            success: function (data) {
                if (data) {
                    alert("任务更新成功");
                    window.location.reload();
                } else {
                    alert("任务更新失败");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $(".btn-close").click(function(){
        $("#listDetail").addClass("hide");
    });

    $("#btn-search").click(function () {
        var str = $("#txtSearch").val();
        var obj = {};
        obj['Todo_Name'] = str;
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/index/getDetail',
            data: obj,
            success: function (data) {
                if (data) {
                    var date = new Date(data[0].Closing_Date);
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    month = (month.toString().length == 1) ? ("0" + month) : month;
                    day = (day.toString().length == 1) ? ("0" + day) : day;

                    var result = date.getFullYear() + '-' + month + '-' + day; //当前日
                    if (result != "1970-01-01") {
                        $("#closing-time").val(result);
                    }
                    $("#txt").val(data[0].Comment);
                    $("#listDetail").removeClass("hide");
                    $("#listDetail #TodoName2").html(str);
                }
                else{
                    alert("查询不到此任务名称，请检查再输入");
                    $("#txtSearch").val("");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    })

})