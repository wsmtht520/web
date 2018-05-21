
/**
 * scroll().left scroll().top
 * 获取向上滚动与向左滚动的距离
 * @return {[type]} 
 */
function scroll () {
	if (window.pageYOffset !== null) {
		return{
			top : window.pageYOffset,
			left : window.pageXOffset,
		}
	} else if (document.compatMode === "CSS1Compat") {
		return{
			top : document.documentElement.scrollTop,
			left : document.documentElement.scrollLeft,
		}
	} else {
		return{
			top : document.body.scrollTop,
			left : document.body.scrollLeft,
		}
	}
}

/**
 * client().width client().height
 * 获得可视区域屏幕的宽度与高度
 * @return {[type]} 
 */
function client () {
	if(window.innerWidth){ //IE9及最新浏览器
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	}else if (window.compatMode === "CSS1Compat") { //W3C最新标准
		return{
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	} else{
		return{
			width : document.body.clientWidth,
			height : document.body.clientHeight
		}	
	}
}

/**
 * 获取DOM中的id
 * @param  id 
 * @return {[string]}
 */
function $ (id) {
	return typeof id === "string" ? document.getElementById(id):null;
}

/**
 * display显示与隐藏
 * @param  obj 
 * @return      
 */
function show (obj) {
	return obj.style.display = "block";
}
function hidden (obj) {
	return obj.style.display = "none";
}