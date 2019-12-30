$(document).ready(function(){
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/finished/getFinishedList',
        success: function (data) {
            var list = jQuery.parseJSON(data);
            for (var i = 0; i < list.length; i++) {
                $("#list").append("<li class='list-group-item t1'>" + list[i].Todo_Name + "<button type='button' class='btn btn-outline-primary btn-upload align-middle btn-delect-finished' style='float: right'>删除</button></li>")
            }
        },
        error: function (err) {
            console.log(err)
        }
    });

    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/finished/getName',
        success: function (data) {
            var name = data[0].UserName;
            $("#UserName").html(name);
        },
        error: function (err) {
            console.log(err)
        }
    });

    $("#list").on("click", ".btn-delect-finished", function () {
        var str = $(this).parent().clone().children().remove().end().text();
        var obj = {};
        obj['Todo_Name'] = str;
        $.ajax({
            type: "post",
            url: 'http://localhost:3000/finished/deleteFinishedList',
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
})