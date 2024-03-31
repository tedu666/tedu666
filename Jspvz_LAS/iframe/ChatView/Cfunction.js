var $ = (a) => document.getElementById(a),
$n = (a) => document.createElement(a), 
ClearChild = function() {
	var a = arguments.length, c;
	while (a--) try { c = arguments[a], c.parentNode.removeChild(c), c = null; } catch(b) {};
}, SetBlock = function() {
	var a = arguments.length; while (a--) arguments[a].style.display = "block";
}, SetNone = function() {
	var a = arguments.length;
	while (a--) arguments[a].style.display = "none";
}, SetHidden = function() {
	var a = arguments.length;
	while (a--) arguments[a].style.visibility = "hidden";
}, SetVisible = function() {
	var a = arguments.length;
	while (a--) arguments[a].style.visibility = "visible";
}, SetAlpha = function(c, b, a) { 
	c.style.opacity = a;
}, SetStyle = function (d, b) {
	var c = d.style, a;
	for (a in b) c[a] = b[a];
	return d
}, NewImg = function(f, e, b, c, d) {
	var a = $n("img"); a.src = e, b && (a.style.cssText = b);
	if (d) for (v in d) a[v] = d[v];
	f && (a.id = f), c && c.appendChild(a);
	return a
}, EditImg = function(e, f, c, b, a) {
	f && (e.id = f), c && (e.src = c), b && SetStyle(e, b), a && a.appendChild(e);
	return e
}, NewEle = function(h, b, d, a, e, f, g, c) {
	g = $n(b), h && (g.id = h), d && (g.style.cssText = d);
	if (a) for (c in a) g[c] = a[c];
	if (f) for (c in f) g.setAttribute(c, f[c]);
	e && e.appendChild(g);
	return g
}, EditEle = function(g, f, a, e, b, c) {
	if (f) for (c in f) g.setAttribute(c, f[c]);
	a && SetStyle(g, a);
	if (b) for (c in b) g[c] = b[c];
	e && e.appendChild(g);
	return g
}, GetRandom = (R = 1e10) => { return Math["floor"](Math["random"]() * R); }, 
VisitorName = "游客" + GetRandom(1e10); // 确定游客 id

Date.prototype.format = function(b) {
	var c = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), S: this.getMilliseconds() };
	if (/(y+)/.test(b)) b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
	for (var a in c) if (new RegExp("(" + a + ")").test(b)) b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length));
	return b
};

var GetOwnName = () => {
	let Info = Store["get"]("__JSPVZ_KAC_UserEXMode_Info"), Name = (Info && Info["UserName"] != "游客") ? Info["UserName"] : VisitorName; return Name["substr"](0, 40);
};

// 以下是发送部分的函数
var ClearScreen = () => { $("dbody")["innerHTML"] = ""; }, 
Monitor = () => { $("btnSend")["value"] = "发送(" + (50000 - $("txtChat")["value"]["length"]) +")"; }, 
SetTextArea_Size = (Kind) => {
	let txtChat = $("txtChat"), tStyle = txtChat["style"];
	(Kind == 1) ? (tStyle["top"] = "-100px", tStyle["height"] = "70px", tStyle["width"] = "600px") : (tStyle["top"] = "0px", tStyle["height"] = "22px", tStyle["width"] = "100%");
}
$("frm")["onsubmit"] = () => {
	var txtChat = $("txtChat"), S = txtChat["value"]; if (S["replace"](/ /g, "")["length"] < 1) return alert("请输入内容！"), false;
	S["length"] > 50000 && (S = S["substr"](0, 50000)), txtChat["value"] = "", $("btnSend")["value"] = "发送(50000)"; // 截断
	OwnCommand["SendChat"](S); // 发送消息
	return false;
};
$("txtChat")["addEventListener"]("keydown", function (Event) {
	if (Event["key"] !== "Enter" || Event["shiftKey"]) return; // 如果不是换行
	if (Event["ctrlKey"] || Event["metaKey"]) return this["value"] += "\n", this["scrollTop"] = this["scrollHeight"], Monitor(); // 如果是功能键，加上 \n
	Event["preventDefault"](), $("frm")["onsubmit"](); // 否则发送
});


// 获取参数
let LocationValue = Object.fromEntries(new URLSearchParams(window["location"]["search"]));


