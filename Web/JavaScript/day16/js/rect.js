function React (option) {
	this._init(option); 
}

React.prototype = {
	// 矩形属性
	_init:function (option) {
		option = option || {};

		// 父标签id
		this.parentId = option.parentId;

		// 位置
		this.left = option.left || 100;
		this.top = option.top || 100;

		// 属性
		this.width = option.width || 100;
		this.height = option.height || 50;
		this.border = option.border || 0;
		this.backgroundColor = option.backgroundColor || "blue";
		this.borderRadius = option.borderRadius || 0;
	},

	// 绘制矩形方法
	render:function () {
		var parentNode = document.getElementById(this.parentId);
		var childNode = document.createElement("div");

		childNode.style.position = "absolute";
		childNode.style.left = this.left +"px";
		childNode.style.top = this.top +"px";

		childNode.style.width = this.width + "px";
		childNode.style.height = this.height + "px";
		childNode.style.border = this.border;
		childNode.style.backgroundColor = this.backgroundColor;
		childNode.style.borderRadius = this.borderRadius + "px";

		parentNode.appendChild(childNode);
	}
}