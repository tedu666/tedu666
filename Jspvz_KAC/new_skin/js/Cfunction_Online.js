//修改必究
var OL_PassWord = "", OL_URL = "about:blank", IS_Get = false; //在线版获取列表网址
var __NowVer__ = 20240210; // 二月十日更新版本号

let _AJAX_ = (async function(URL, KIND = "GET", BODY = "", FUNC = (() => {})){await fetch(URL + "?" + Math.random(), {method: KIND, body: KIND == "GET"? null: BODY}).then(res => res.text()).then(res => {FUNC(res);}).catch(why => {console.error(why)});});
let __Ctk_User_PassWord_ = async function(){
	window["OL_PassWord"] = Store.get("OL_PassWord");
	while(!window["OL_PassWord"]) Store.set("OL_PassWord", window["OL_PassWord"] = prompt("请输入在线版密码"));
	await _AJAX_("https://tedu666.rth5.com/php/login.php", "POST", "Password=" + window["OL_PassWord"], function(ret){
		if(ret.indexOf('https://') == 0) OL_URL = ret;
		else OL_URL = "", Store.set("OL_PassWord", ""), alert("密码错误！"), window["close"]();
	});
};

let __GetUrl__ = (async function() {
	return "";
//	return "https://kac-jspvz.rth5.com/online/Level_List.json";
});

//rc4(OnlineUrl_RC4, "");



/*

//检查当前版本
(async function(){
	let NowTime = (new Date()).getTime(), w;
	if (NowTime - Store.get("__JSPVZ_KAC_Version_Check_Time__") < 1000 * 60 * 60 * 24 * 1) return; //一天
	Store.set("__JSPVZ_KAC_Version_Check_Time__", NowTime);
	await _AJAX_("https://tedu666.rth5.com/php/Get_New_Ver.php?ArgMode=JSON&", "POST", "", function(f){
		let DJson = JSON.parse(f), Text = DJson.Text, Func = DJson.Func;

		if (!Text || Text == "") Text = "检测到可能有新版本，是否跳转至下载链接？";
		if (!Func || Func == "") Func = 'window["open"]("https://www.luogu.com/paste/1rhbg5ok");';

		if (Number(DJson.Ver) > Number(__NowVer__)) w = confirm(Text);
		if (w) eval(Func);
	});

	await _AJAX_("https://tedu666.rth5.com/php/Get_Notice.php", "POST", "", function(f){ // 可能会有的公告、补丁
		(f != "") && eval(f);
	});
})();

*/


(async function(){ //条款等
	if (Store.get("__JSPVZ_KAC_Version_Check_Title__") != "2023-1-15") {
		alert("游玩前请仔细阅读相关文档 Readme-CN.txt\n本改版改于LonelyStar的jspvz\n游戏素材来源: LonelyStar、pvz2素材吧、江南游戏\n禁止用于商业用途，本改版完全免费\n素材的使用已获得江南游戏授权，并严格按照长江开源协议执行\n\n本消息仅展示一次。\n您可以点击主界面“关于”查看制作组名单。\n2023/1/15");
		Store.set("__JSPVZ_KAC_Version_Check_Title__", "2023-1-15");
	};
})();