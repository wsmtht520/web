
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

/**
 * 左右方向上的匀速动画
 * @param  {[object]} obj  
 * @param  {[number]} target 目标位置值
 * @param  {[number]} speed  
 * @return {[type]}    
 */
function linear (obj,target,speed) {
	// 1. 清除定时器
	clearInterval(obj.timer);
	// 2. 判断方向
	var direction = obj.offsetLeft < target ? speed : -speed;
	// 3. 设置定时器
	obj.timer = setInterval(function () {
		obj.style.left = obj.offsetLeft + direction +"px";

		if (Math.abs(target - obj.offsetLeft) < Math.abs(direction)) {
			clearInterval(obj.timer);
			obj.style.left = target + "px";
		} 
	}, 20)
}

/**
 * 左右方向上的缓动动画
 * @param  {[type]} obj    [description]
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function buffer (obj,target) {
	// 1.清除定时器
	clearInterval(obj.timer);

	// 2.设置定时器
	obj.timer = setInterval(function () {
		// 2.1 求出步长
		var speed = (target - obj.offsetLeft)*0.2;
		// 2.2 判断是否向上取整
		speed = (target > obj.offsetLeft) ? Math.ceil(speed) : Math.floor(speed);
		// 2.3 动起来
		obj.style.left = obj.offsetLeft + speed +"px";
		// 2.4 临界值处理
		if (target === obj.offsetLeft) {
			clearInterval(obj.timer);
		};
	}, 20)
}

function buffer (obj,json,fn) {
	var begin = 0,speed = 0,target = 0;
	// 1.清除定时器
	clearInterval(obj.timer);

	// 2.设置定时器
	obj.timer = setInterval(function () {
		// 旗帜,判断多值全部走完
		var flag = true;
		// 遍历json
		for(var key in json){
			// 2.0 获取初始值
			if ("opacity" === key) { //透明度
				begin = Math.round(parseFloat(getStyleAttr(obj, key)) * 100) || 100;
				target = parseInt(json[key]*100);
			}else if ("scrollTop" === key) { //scrollTop
				begin = Math.ceil(obj.scrollTop);
				target = parseInt(json[key]);
			}else{ //其它情况
				begin = parseInt(getStyleAttr(obj, key)) || 0;
				target = parseInt(json[key]);
			}

			// 2.1 求出步长
			speed = ( target- begin)*0.2;
			// 2.2 判断是否向上取整
			speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

			// 2.3 动起来
			if ("opacity" === key) { //透明度
				// w3c的浏览器
			    obj.style.opacity = (begin + speed) / 100;
			    // ie 浏览器
			    obj.style.filter = 'alpha(opacity:' + (begin + speed) +')';
			}else if ("scrollTop" === key) {
				obj.scrollTop = begin + speed;
			}else{ //其它情况
				obj.style[key] = begin + speed +"px";
			}

			// 2.4 判断
			if (begin !== target) {
				flag = false;
			}
		}

		// 3.清除定时器
		if(flag){
			clearInterval(obj.timer);
			// 判断是否回调
			if (fn) {
				fn();
			}
		}
	}, 20)
}

/**
 * 获取元素的属性值
 * @param  {[object]} obj  
 * @param  {[string]} attr 
 * @return {[type]}     
 */
function getStyleAttr(obj, attr) {
	if(obj.currentStyle){ // IE 和 opera
		return obj.currentStyle[attr];
	}else {
		return window.getComputedStyle(obj, null)[attr];
		}
}
		

