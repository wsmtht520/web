
// 隔行显示不同的颜色,且在页面加载完毕后执行
function changeTableColor () {
	// 获取Table节点
	var nodeTable = document.getElementById("mailTable");
	// 获取到表格的每一行对象
	var nodeTr = nodeTable.rows;
	// 定义样式变量
	var name;
	// 遍历节点
	for (var i = 1; i < nodeTr.length-1; i++) {
		if (i%2==1) {
			nodeTr[i].className = "one";
		} else {
			nodeTr[i].className = "two";
		}

		// 高亮显示所在行
		nodeTr[i].onmouseover = function () {
			// 记住原来的样式
			name = this.className;
			// 新样式
			this.className = "over";
		}

		nodeTr[i].onmouseout = function () {
			this.className = name;
		}
	}
	
}

// 全选box框
function checkAll (node) {
	// 获取到所有的mail节点
	var node_box = document.getElementsByName("mail");
	for (var i = 0; i < node_box.length; i++) {
		node_box[i].checked = node.checked;
	}
}

// 复选框全选，反选，取消选择功能
function checkBox (num) {
	// 获取到所有的mail节点
	var node_box = document.getElementsByName("mail");
	for (var i = 0; i < node_box.length; i++) {
		if (num>1) {
			node_box[i].checked = !node_box[i].checked;
		} else {
			node_box[i].checked = num;
		}
	}
}

// 删除邮件功能
function delMail () {
	// 获取到所有mail节点
	var node_box = document.getElementsByName("mail");
	// 用remove去进行删除时，长度会改变
	for (var i = 0; i < node_box.length; i++) {
		if (node_box[i].checked) {
			// 获取到行节点
			var node_tr = node_box[i].parentNode.parentNode;
			node_tr.parentNode.removeChild(node_tr);
			// 由于remove属性会改变长度，所以每一次后将角标值往前挪
			i--;
		} 
	}
	changeTableColor();
}