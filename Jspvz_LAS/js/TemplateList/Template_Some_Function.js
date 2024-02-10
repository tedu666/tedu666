let __Template_ReSet_Object__ = function(a, b){
	let ret = {};
	for(let i in a) ret[i] = a[i];
	for(let i in b) ret[i] = b[i];
	return ret;
};

let DownloadFile = (FileName, Content, ContentType = "application/octet-stream; Charset=utf-8") => {
	var a = document["createElement"]("a"), blob = new Blob([Content], { "type": ContentType });
	a["href"] = window["URL"]["createObjectURL"](blob), a["download"] = FileName, a["click"]();
}, UpLoadFile = async (ContentType = "application/x-www-form-urlencoded; Charset=utf-8") => new Promise((Resolve, Error) => {
	var Input = document["createElement"]("input");
	Input["type"] = "file", Input["accept"] = ContentType, Input["multiple"] = false, Input["click"]();
	Input["onchange"] = () => Input["files"][0]["text"]()["then"]((Data) => Resolve(Data))["catch"]((Reason) => Error(Reason));
});

let GetAllSaves = () => {
	let ret = {};
	Store["each"]((Val, Key) => {
		if (Key["slice"](0, 12) === "__JSPVZ_KAC_") ret[Key] = Store["get"](Key);
	});
	return ret;
}, DownLoadSaves = (FileName = `[JSPVZ - ${$User["VersionName"]}] 存档文件 ${(new Date())["toLocaleString"]()}.json`) => {
	DownloadFile(FileName, JSON["stringify"](GetAllSaves()))
}, UpLoadSaves = async (SetJson) => {
	let Json = SetJson ?? JSON["parse"](await UpLoadFile());

	// 清除所有 KAC 原有数据
	Store["each"]((Val, Key) => { 
		if (Key["slice"](0, 12) === "__JSPVZ_KAC_") Store["remove"](Key);
	});

	// 覆盖所有 JSON 数据
	for (let O in Json) Store["set"](O, Json[O]);
	
	return Json;
};

let __AddConfirm = (TEXT = "输入 “JSPVZ-LAS” 确认删除", Value = "JSPVZ-LAS", CallBack = () => {}, Ele = EDAll) => { // 在游戏内显示一个输入框来让用户确认重要信息
	let DivA = NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:240;left:0px;top:0px;", 0, Ele);
	let dConfirm = NewEle("dConfirm", "div", "position:fixed;float:center;width:550px;height:275px;background:rgba(0,0,0,0.733);top:150px;left:0px;right:0px;margin:0 auto;border-radius:15px;z-index:250", 0, Ele);
	let dConfirmText = NewEle("dConfirmText", "div", "position:absolute;left:25px;top:30px;font-size:23px;font-family:Regular;color:#FFFFFF;white-space:pre;", { innerHTML: TEXT }, dConfirm);
	let dConfirmInput = NewEle("dConfirmInput", "textarea", "position:absolute;left:25px;top:130px;height:40px;width:500px;font-size:20px;font-family:Regular;color:#000000;resize:none;background-color:rgb(255,255,255,0.9);border-radius:10px;line-height:1;text-align:left;padding:10px;overflow:hidden;", {}, dConfirm, { type: "text", name: "txtChat", wrap: "off", placeholder: "点击输入文字" });
	let dConfirmAccept = NewEle("dConfirmAccept", "input", "width:150px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;position:absolute;left:300px;top:210px;color:#00FF00;width:100px;", {}, dConfirm, { class: "ButtonStyle", value: "确认", type: "button" });
	let dConfirmCancel = NewEle("dConfirmCancel", "input", "width:150px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;position:absolute;left:425px;top:210px;color:#FF0000;width:100px;", {}, dConfirm, { class: "ButtonStyle", value: "取消", type: "button" });
	if (Value === "") SetHidden(dConfirmInput);
	dConfirmAccept["onclick"] = dConfirmAccept["click"] = () => { PlayAudio("tap"); if (dConfirmInput["value"] == Value) ClearChild(dConfirm, DivA), CallBack(true); };
	dConfirmCancel["onclick"] = dConfirmCancel["click"] = () => { PlayAudio("tap"), ClearChild(dConfirm, DivA), CallBack(false); };
}, __AddConfirmPromise = (TEXT = "输入 “JSPVZ-LAS” 确认删除", Value = "JSPVZ-LAS", Ele = EDAll) => {
	return new Promise((Resolve) => { __AddConfirm(TEXT, Value, Resolve, Ele); });
};