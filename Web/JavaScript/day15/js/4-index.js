window.onload = function () {
	// 1.获得所需要的标签
	var slider = $("slider");
	var slider_main = $("slider_main");
	var slider_main_img = slider_main.children;
	var slider_control_page = $("slider_control_page");
	var slider_control_direction =$("slider_control_direction");

	// 记录当前可视区域内的图片索引值
	var index = 0;

	// 2.动态创建页码指示器
	for (var i = 0; i < slider_main_img.length; i++) {
		var span = document.createElement("span");
		span.className = "slider-control-icon";
		span.innerText = i ;
		slider_control_page.appendChild(span);
	}

	// 3.让第一个页码选中
	slider_control_page.children[0].className = "slider-control-icon current";

	// 4.让滚动的内容归位--让其它图片在旁边
	var scrollW = slider.offsetWidth;
	for (var i = 1; i < slider_main_img.length; i++) {
		slider_main_img[i].style.left = scrollW + "px";
	}

	// 5.上下按钮点击事件
	var control_dir = slider_control_direction.children;
	for (var i = 0; i < control_dir.length; i++) {
		control_dir[i].onmousedown = function () {
			if (this.className === "slider-control-prev") { //左边--上一张
                 /*
                 1.当前可视区域的图片快速右移;
                 2.上一张图片快速出现在可视区域的左边
                 3.让这张图片做动画进入
                */
			   console.log(index);
               buffer(slider_main_img[index],{"left":scrollW});
               index--;
               if (index < 0) { //播放最后一张
               	   index = slider_main_img.length - 1;
               }
               slider_main_img[index].style.left = -scrollW + "px";
               buffer(slider_main_img[index],{"left":0});
			} else { //右边--下一张
				/*
                1.当前可视区域的图片快速左移;
                2.下一张图片快速出现在可视区域的右边
                3.让这张图片做动画进入
                */
				autoPlay();
			}
			changeIndex();
		}
	}

	//6.页码点击事件
	var page = slider_control_page.children;
	for (var i = 0; i < page.length; i++) {
	 	(function (i) {
	 		page[i].onmousedown = function () {
	 		/*
            1.用当前点击的索引和选中索引对比
            2.点击的 > 选中的, 相当于点击了右边的按钮
            3.点击的 < 选中的, 相当于点击了左边的按钮
            */
	           	if(i > index){ //右边--下一张
	           		buffer(slider_main_img[index],{"left":-scrollW});
	           		slider_main_img[i].style.left = scrollW + "px";
	           	}else if ( i < index) { //左边--上一张
	           		buffer(slider_main_img[index],{"left":scrollW});
	           		slider_main_img[i].style.left = -scrollW + "px";

	           	}
	           	index = i;
              	buffer(slider_main_img[i],{"left":0});
              	changeIndex();
	 		}
	 	})(i);
	}

	// 7.切换索引
	function changeIndex () {
		for (var i = 0; i < page.length; i++) {
			page[i].className = "slider-control-icon";
		}

		page[index].className = "slider-control-icon current";
	}

	// 8.图片自动播放
	var timer = setInterval(autoPlay, 1000);
	function autoPlay () {
		/*
        1.当前可视区域的图片快速左移;
        2.下一张图片快速出现在可视区域的右边
        3.让这张图片做动画进入
        */
        buffer(slider_main_img[index],{"left":-scrollW});
		index++;
		if(index >= slider_main_img.length){
			index = 0;
		}
		slider_main_img[index].style.left = scrollW + "px";
        buffer(slider_main_img[index],{"left":0});

        changeIndex();
	}

	//9.设置与清除定时器
	slider.onmouseover = function () {
		clearInterval(timer);
	}

	slider.onmouseout = function () {
		timer = setInterval(autoPlay, 1000);
	}
}