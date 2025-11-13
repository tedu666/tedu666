//修改必究
var OL_PassWord = "", OL_URL = "about:blank", IS_Get = false; //在线版获取列表网址
var __NowVer__ = 20240210; // 二月十日更新版本号
var __OnlineUrl_Pre__ = "http://wss.jspvz.com/LAS/GetFile.asp?FileName="; // 获取前缀url

let _AJAX_ = (async function(URL, KIND = "GET", BODY = "", FUNC = (() => {})){await fetch(URL + "?" + Math.random(), {method: KIND, body: KIND == "GET"? null: BODY}).then(res => res.text()).then(res => {FUNC(res);}).catch(why => {console.error(why)});});
let __Ctk_User_PassWord_ = async function(){
	window["OL_PassWord"] = Store.get("OL_PassWord");
	while(!window["OL_PassWord"]) Store.set("OL_PassWord", window["OL_PassWord"] = prompt("请输入在线版密码"));
	await _AJAX_(__OnlineUrl_Pre__ + "tedu666/php/login.php", "POST", "Password=" + window["OL_PassWord"], function(ret){
		if(ret.indexOf('https://') == 0) OL_URL = ret;
		else OL_URL = "", Store.set("OL_PassWord", ""), alert("密码错误！"), window["close"]();
	});
};

let __GetUrl__ = (async function() {
	return __OnlineUrl_Pre__ + "kac-jspvz/online/Level_List.json";
});

//rc4(OnlineUrl_RC4, "");



/*

//检查当前版本
(async function(){
	let NowTime = (new Date()).getTime(), w;
	if (NowTime - Store.get("__JSPVZ_KAC_Version_Check_Time__") < 1000 * 60 * 60 * 24 * 1) return; //一天
	Store.set("__JSPVZ_KAC_Version_Check_Time__", NowTime);
	await _AJAX_(__OnlineUrl_Pre__ + "tedu666/php/Get_New_Ver.php?ArgMode=JSON&", "POST", "", function(f){
		let DJson = JSON.parse(f), Text = DJson.Text, Func = DJson.Func;

		if (!Text || Text == "") Text = "检测到可能有新版本，是否跳转至下载链接？";
		if (!Func || Func == "") Func = 'window["open"]("https://www.luogu.com/paste/1rhbg5ok");';

		if (Number(DJson.Ver) > Number(__NowVer__)) w = confirm(Text);
		if (w) eval(Func);
	});

	await _AJAX_(__OnlineUrl_Pre__ + "tedu666/php/Get_Notice.php", "POST", "", function(f){ // 可能会有的公告、补丁
		(f != "") && eval(f);
	});
})();

*/


(async function(){ //条款等
	let UpdateTime = "2025-8-24", LocalKey = "__JSPVZ_KAC_Version_Check_Title__";
	let GameTerm = [
		"游玩前请仔细阅读相关文档 Readme-CN（试行版）.txt", 
		"本改版源自于LonelyStar的jspvz", 
		"游戏部分素材来源: LonelyStar、pvz2素材吧、江南游戏", 
		"禁止用于商业用途，本改版完全免费", 
		"部分素材的使用已获得江南游戏授权，并严格按照长江开源协议执行", 
		"", 
		"本消息仅展示一次。", 
		"您可以点击主界面“关于”查看制作组名单。", 
		"2025/8/24"
	];
	if (Store.get(LocalKey) != UpdateTime) alert(GameTerm.join("\n")), Store.set(LocalKey, UpdateTime);
})();