window.onload = function () {
	// 1.实现瀑布流布局
	waterFull("main","box");

	// 2.动态加载图片
	var timer = null;
	window.onscroll = function () {
		// 清除定时器--防止不停地加载图片,隔段时间加载一次
		clearInterval(timer);

		// 设置定时器
		timer = setInterval(function () {
			if (checkWillLoadImg()) {
				// 2.1 造数据
				var dataArr = [
					{"src":"img01.jpg"},
					{"src":"img03.jpg"},
					{"src":"img04.jpg"},
					{"src":"img06.jpg"},
					{"src":"img05.jpg"},
					{"src":"img08.jpg"},
					{"src":"img09.jpg"},
					{"src":"img10.jpg"},
					{"src":"img11.jpg"},
					{"src":"img13.jpg"},
					{"src":"img12.jpg"},
					{"src":"img13.jpg"},
					{"src":"img14.jpg"},
					{"src":"img15.jpg"},
					{"src":"img16.jpg"},
					{"src":"img17.jpg"},
					{"src":"img18.jpg"},
					{"src":"img19.jpg"},
				];
				// 2.2 创建元素
				for (var i = 0; i < dataArr.length; i++) {
					var newBox = document.createElement("div");
					newBox.className = "box";
					$("main").appendChild(newBox);

					var newPic = document.createElement("div");
					newPic.className = "pic";
					newBox.appendChild(newPic);

					var newImg = document.createElement("img");
					newImg.src = "images/"+dataArr[i].src;
					newPic.appendChild(newImg);
				}

				// 2.3 重新布局
				waterFull("main","box");
			}
		}, 200)	 
	}

	// 3.窗口大小发生改变时--防止窗口大小在不停变化时一直加载,隔段时间加载
	var timer2 = null;
	window.onresize = function () {
		clearTimeout(timer2);
		timer2 = setTimeout(function () {
			console.log(1);
			waterFull("main","box");
		}, 200)
	}
}

/**
 * 瀑布流布局
 * @param  parent 
 * @param  child 
 * @return {[type]}
 */
function waterFull (parent,child) {
	// 1.父黑子居中
	// 1.1 获取到所有的子盒子
	var allBox = $(parent).getElementsByClassName(child);
	// 1.2 获取到子盒子的宽度
	var boxWidth = allBox[0].offsetWidth;
	// 1.3 获取到屏幕的宽度
	var screenW = document.documentElement.clientWidth;
	// 1.4 求出盒子的列数
	var colls = parseInt(screenW/boxWidth);
	// 1.5 求出父盒子的宽度
	$(parent).style.width = colls * boxWidth + "px";
	// 1.6 实现父盒子居中
	$(parent).style.margin = "0 auto";

	// 2.子盒子的定位
	// 2.1 定义高度数组
	var heightArr = [],boxHeight = 0,minBoxHeight = 0,minBoxIndex = 0;
	for (var i = 0; i < allBox.length; i++) {
		// 求出每个子盒子的高度
		boxHeight = allBox[i].offsetHeight;
		// 取出第一行的盒子高度放入高度数组
		if(i < colls){ //第一行
			heightArr.push(boxHeight);
			allBox[i].style = ""; //页面窗口大小发生改变时
		}else { //剩余行
			//取出最矮的盒子的高度
			minBoxHeight = _.min(heightArr);
			// 求出最矮盒子的索引
			minBoxIndex = getMinBoxIndex(heightArr,minBoxHeight);
			// minBoxIndex = Math.min.apply(this, heightArr);
			// 子盒子定位
			allBox[i].style.position = "absolute";
			allBox[i].style.left = boxWidth * minBoxIndex + "px";
			allBox[i].style.top = minBoxHeight + "px";

			// 更新数组高度
			heightArr[minBoxIndex] += boxHeight;
		}
	}

	// console.log(heightArr, minBoxHeight, minBoxIndex);
}
/**
 * 求出最矮盒子的索引
 * @param  arr
 * @param  val
 * @return {number}
 */
function getMinBoxIndex (arr,val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return i;
		} 
	}
}


/**
 * 判断是否具备动态加载图片的条件
 * @return {[type]} 
 */
function  checkWillLoadImg () {
	// 1. 获取到最后一个盒子
	var allBox = document.getElementsByClassName("box");
	var lastBox = allBox[allBox.length-1];

	// 2. 求出最后一个盒子自身高度的一半 + offsetTop
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    // 3. 求出屏幕的高度
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;

    // 4. 求出页面偏离浏览器的高度
    var scrollTop = scroll().top;

    return lastBoxDis <= screenW + scrollTop;
}
/**
 * 获取DOM中的id
 * @param  id 
 * @return {[string]}
 */
function $ (id) {
	return typeof id === "string" ? document.getElementById(id):null;
}