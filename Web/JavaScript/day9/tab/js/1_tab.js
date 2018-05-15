window.onload =  function(){
	// 获取所需要的标签
	var liNode = $("tab_header").getElementsByTagName("li");
	var domNode = $("tab_content").getElementsByClassName("dom");

	// 遍历监听
	for (var i = 0; i < liNode.length; i++) {
		// 拿到单个li标签
		var li = liNode[i];
		li.index = i;
		console.log(i);
		li.onmouseover = function () {
			// 排他思想
			for (var j = 0; j < liNode.length; j++) {
				liNode[j].className = "";
				domNode[j].style.display = "none";
			}
	
			this.className = "selected";
			domNode[this.index].style.display = "block";
		}
	}
};

function $(id) {
	return typeof id === "string" ? document.getElementById(id) : null;
}