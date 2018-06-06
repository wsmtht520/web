$(function(){
    //1.轮播图
    $(window).on("resize",function(){
        //1.1 获取当前窗口的宽度
        let clientW = $(window).width();

        //1.2 比较宽度,设置临界值
        let isShowBigImage = clientW >= 800;

        //1.3 获取到所有的item
        let $items = $("#lk_carousel .item");

        //1.4 遍历所有的item
        $items.each(function (index,item) {
            //1.4.1 取出图片的路径
            let src = isShowBigImage ? $(item).data("lg-img") : $(item).data("sm-img");
            let imgUrl = "url('"+src+"')";

            // 1.4.2 设置背景
            $(item).css({
                backgroundImage:imgUrl
            });


            // 1.4.3 设置img标签
            if(!isShowBigImage){
                let $img = "<img src='" + src + "'>";
                $(item).empty().append($img);
            }else {
                $(item).empty();
            }
        });
    });

    $(window).trigger("resize");

    $('[data-toggle="tooltip"]').tooltip();

    //3. 回到顶部
    $("#index_lift .toTop").on("click",function(){
        $("html,body").animate({ scrollTop: 0 }, 1000);
    });

    $(window).scroll(function () {
        if($(this).scrollTop() > 500){
            $("#index_lift").css("display","block");
        }else{
            $("#index_lift").css("display","none");
        }
    });

    $(window).trigger("scroll");

    //4.导航栏
    let allLis = $("#lk_nav li");
    $(allLis).each(function(index,item){
        // console.log($(item));
        $(item).on("click", function () {
            $("html,body").animate({ scrollTop: $("#lk_hot").offset().top }, 1000);
        });
    });
});