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
