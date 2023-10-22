/*
	显示关卡列表以及读取关卡数据

*/
var Save_EX_2 = function(x){Store.set("__JSPVZ_KAC_UserData__Name_" + x.UserName + "__", x);Store.set("__JSPVZ_KAC_UserEXMode_Info", x);return x;};
var TravelInfo = (function(){
	let s = Store.get("__JSPVZ_KAC_UserEXMode_Info"), o;
	if(s) return (Save_EX_2(s), s);

	o = _Init_User_Data_Obj_();
	return (Save_EX_2(o), o);
})();

var Save_EX = function(){Store.set("__JSPVZ_KAC_UserData__Name_" + $User.Visitor.UserName + "__", TravelInfo);Store.set("__JSPVZ_KAC_UserEXMode_Info", TravelInfo);return TravelInfo;},
	GetEXInfo = function(){return Store.get("__JSPVZ_KAC_UserEXMode_Info")};

var INIT_USER_DATA = function(){
	let Name = TravelInfo.UserName || "游客", adv = TravelInfo.AdvTravel || 1;
	SetUserData(Name, adv);
};


/*
(function(){
	$("Sunflower_trophy_IMG").style.left = "-157px";
	$("Sunflower_trophy_IMG").style.left = "0px";
})();
*/

var EXLevelList = [], EXOnlineLevel = [], EXGAME_LIST_TYPE = 0;
var Init_EXMode_LIST = async function(){
	let info = GetEXInfo() || {}, NowTravelNum = info.NowTravel || 1024;
	let EX = EXLevelList;
	NormalLevelInit_EX(), EX.nowpage = 1;
	EX.Line = 3, EX.List = 5;
	EX.Title = "拓 展 关 卡", EX.SpecialTitle = [], EX.LevelNum = NowTravelNum;

	Set_Next_Page_EXModeList(0, true);

	let OL = EXOnlineLevel;
	OL.nowpage = 1, OL.Line = 3, OL.List = 5, OL.LevelNum = 0;
	OL.Title = "在 线 关 卡", OL.SpecialTitle = [], OL.Timer = null;
	OL.url = await __GetUrl__(); //加密，异步
	NormalLevelInit_OL();
};

var Set_Next_Page_EXModeList = function(DNum = 0, Nd = 0){
	let info = GetEXInfo() || {}, NowTravelNum = info.NowTravel || 1;
	(!Nd) && (PlayAudio("tap"));

	if(isNaN(DNum)) return -1;
	let Ll = (!!EXGAME_LIST_TYPE ? EXOnlineLevel : EXLevelList), r = Ll.Line, c = Ll.List, rc = r * c;
	(!!EXGAME_LIST_TYPE) && (NowTravelNum = Ll.LevelNum); //目前闯关需要特判
	let d = $("dTravelListTbody"), p = Ll.nowpage, l = Ll.length, m = Math.ceil(l / rc);
	p = Ll.nowpage = $VM(p + DNum, 1, Math.min(Math.ceil(NowTravelNum / rc), m));


	let txt = (Ll.SpecialTitle && Ll.SpecialTitle[p]) ? (Ll.SpecialTitle[p]) : ("(第" + p + "页)");
	$("dTravelSmallTitle").innerHTML = Ll.Title + txt, (Ll.LevelNum = NowTravelNum);


	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 5; j++){
			let levelinfo = ((p - 1) * 15 + i * 5 + j < Ll.LevelNum) ? (Ll[(p - 1) * 15 + i * 5 + j]) : null;
			let nowdiv = d.childNodes[i].childNodes[j];
			SetVisible(nowdiv);
			(!levelinfo) && (levelinfo = {img:'', title:'', onclickscript: function(){}}, SetHidden(nowdiv));
			nowdiv.onclick = levelinfo.onclickscript;
			nowdiv.firstChild.firstChild.src = levelinfo.img;
			nowdiv.lastChild.innerHTML = levelinfo.title;
		};
	};
};

var Win_Travel = function(NowLevel = 1, NxtLevel = 2, ret = 0){
	try{
		(!TravelInfo.IsTravel && (TravelInfo.IsTravel = {}));
		TravelInfo.IsTravel[NowLevel] = true; for(let i in TravelInfo.IsTravel) ret++;
		TravelInfo.NowTravel = Math.max(TravelInfo.NowTravel |= 0, NxtLevel |= 0);
		TravelInfo.IsTravelNum = ret;
		Save_EX();
		Set_Next_Page_EXModeList(0, 1);
	}catch (b){
		console.error(b)
	};
};


/*
	关卡列表以及显示
*/
var Def_LvlList = function(ID, SHOW, SLvl1, SLvl2, Letter, L2){
	let s = '';
	for(let i = SLvl1; i <= SLvl2; i++){
		s += '<span class="lvl" onclick="StartAdventure(\'' + (ID + (L2 ? StringNumFix(i, L2) : (i))) + '\')">' + (SHOW + (Letter ? StringNumFix(i, Letter) : (i))) + '</span>';
	};
	document.write(s);
};
var HiddenTravelGame = function(a) { 
	!a && PlayAudio("tap");
	SetNone($("dTravelSmallContainer"));
	PauseAudio("pure_snows"), AllAudioPauseCanceled();
};
var ShowTravelGame = function(a) {
	AllAudioPaused(), !a && PlayAudio("tap"), PlayAudio("pure_snows"); //gravebutton
	SetBlock($("dTravelSmallContainer"));
};




function NormalLevelInit_EX(){
	EXLevelList.push(GetLevelTable('new_level/Travel/01', '新家园', 'new_skin/Level_View/New_Home.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/02', '护花者', 'new_skin/Level_View/New_Home.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/03', '寻路者', 'new_skin/Level_View/New_Home.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/04', '守护者', 'new_skin/Level_View/New_Home.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/05', '捍卫者', 'new_skin/Level_View/New_Home.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/06', '博弈者', 'new_skin/Level_View/New_Pool.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/07', '追赶者', 'new_skin/Level_View/New_Pool.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/08', '护时者', 'new_skin/Level_View/New_Pool.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/09', '珍惜者', 'new_skin/Level_View/New_Pool.png'));
	EXLevelList.push(GetLevelTable('new_level/Travel/10', '勇闯者', 'new_skin/Level_View/New_Pool.png'));
	NewURLAudio({url: "new_skin/Sounds/nice_graveyard.mp3", audioname: "nice_graveyard", loop: true});
	NewURLAudio({url: "new_skin/Sounds/pure snows.mp3", audioname: "pure_snows", loop: true});
	NewURLAudio({url: "new_skin/Sounds/Waterflame - Glorious Morning.mp3", audioname: "Glorious_Morning", loop: true});
	NewURLAudio({url: "new_skin/Sounds/True_Admin.mp3", audioname: "True_Admin"}, { buffer: true, preload: true, onend: function (Id) { let self = this; self["seek"](12.0, Id), self["play"](Id); } });
	NewURLAudio({url: "new_skin/Sounds/2.75.mp3", audioname: "2.75"}, { buffer: true, preload: true, onend: function (Id) { let self = this; self["seek"](10.05, Id), self["play"](Id); } });
};


var GetLevelTable_OL = function(id, name, pic){return {img: pic, title: name, onclickscript: function(){SelectModal(id, true)}};};
function NormalLevelInit_OL(){
	let OL = EXOnlineLevel;
	clearTimeout(OL.Timer);
	OL.Timer = setTimeout(function(){
		Ajax(OL.url + "?" + Math.random(), "get", "", function(arr){
			let OnLineArr = JSON.parse(arr);
			OL.length = 0, OL.LevelNum = OnLineArr.length;
			for(let i in OnLineArr){
				let id = OnLineArr[i].Id, img = OnLineArr[i].Img, title = OnLineArr[i].Title;
				OL.push(GetLevelTable_OL(id, title, img));
			};
			Set_Next_Page_EXModeList(0, 1);
		});
	}, 500);
};

var InitHandBookTRCard = function() {
	PlayAudio("gravebutton");
	var d = "",
	g, f, e = [oFlowerVase, oRepeater2, oGatlingPea_Pro, oTorchwood_Pro],
	a = e.length, b = 0, c;
	while (b < a) {
		g = e[b]; c = g.prototype; f = c.EName;
		d += '<div class="span1" onclick="ViewProducePlant(' + f + ')"><img src="' + c.PicArr[0] + '"><div class="span2">' + c.SunNum + "</div></div>";
		b++%6 == 5 && (d += "<br>")
	}
	$("dHandBookPCard").innerHTML = d;
	ViewProducePlant(e[0]);
	$("dHandBookPZ").className = "WindowFrame Almanac_PlantBack";
	SetVisible($("dHandBookPZ"));
	SetNone($("dHandBookZ"));
	SetBlock($("dHandBookP"));
}


var Set_Change_EXModeList = function(){
	EXGAME_LIST_TYPE = !EXGAME_LIST_TYPE;
	$("minigame_Change_Mode2").innerText = (EXGAME_LIST_TYPE ? "拓展关卡" : "在线关卡");
	(EXGAME_LIST_TYPE ? SetBlock($("dTravelChange")) : SetNone($("dTravelChange")));
	Set_Next_Page_EXModeList(0);
}