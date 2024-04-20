var Chat_Server = "http://lonelystar.org/";
var InitGame = function() {
	var c = $User.Server,
	b = c.List,
	a = $("dProcess2"); ! $("dText1") && a.insertBefore(NewEle("dText1", "div", 0, {
		innerHTML: '<span style="line-height:23px;font-size:15px;font-family:&#x9ED1;&#x4F53;;color:#F60;top:32px">欢迎来到<span style="font-family:Verdana;font-weight:700">JS</span>版植物大战僵尸,程序是个人作品,与任何公司无关。<span style="font-family:Verdana;font-weight:700">LonelyStar</span>保留对该程序版权所有,素材归POPCAP公司所有</span><br><br><div style="text-align:center"><b><a style="color:#FF0;font-size:15px;text-decoration:none" href="http://www.lonelystar.org/" target="_blank">作者主页</a>&nbsp;&nbsp;&nbsp;<a style="color:#FF0;font-size:15px;text-decoration:none" href="http://blog.lonelystar.org/view" target="_blank">给我留言</a>&nbsp;&nbsp;&nbsp;<a href="http://www.xiazai.com" target="_blank"  style="color:#FF0;font-size:15px;text-decoration: none">合作伙伴:A5下载</a></b></div>'
	}, 0), a.firstChild);

//	$("IF2").src = Chat_Server + "asp/ChatSend.asp?C=0";

	LoadLvl();
};

var $VM = function(Val, Min, Max){
	return Math.max(Math.min(Val, Max), Min);
};



var LevelList = [], BetaLevelList = [], MINIGAME_LIST_TYPE = false;
var GetLevelTable = function(id, name, pic){return {img: pic, title: name, onclickscript: function(){SelectModal(id)}};};
var GetNullTable = function(){return {img: "", title: "", onclickscript: function(){}};};
var NormalLevelInit = function(){
	LevelList.push(GetLevelTable('CanYouDigIt', '攻守兼备', 'images/interface/gongshoujianbei.jpg'));
	LevelList.push(GetLevelTable('TenFlowers', '十朵金花', 'images/interface/shiduojinhua.png'));
	LevelList.push(GetLevelTable('HazeYard', '阴霾小院', 'images/interface/yinmaixiaoyuan.png'));
	LevelList.push(GetLevelTable('NutBowling2', '坚果保龄球 2', 'images/interface/baolingqiu.png'));
	LevelList.push(GetLevelTable('NutBowling', '坚果保龄球', 'images/interface/baolingqiu.png'));
	LevelList.push(GetLevelTable('Boom', '核爆！', 'images/interface/hebao.png'));
	LevelList.push(GetLevelTable('FlightOfFancy', '我心飞翔', 'images/interface/woxinfeixiang.png'));
	LevelList.push(GetLevelTable('DisposableProducts', '一次性消费', 'images/interface/yicixingxiaofei.gif'));
	LevelList.push(GetLevelTable('StrongLevel', '超乎寻常的压力！', 'images/interface/yali.gif'));
	LevelList.push(GetLevelTable('TestUHeart', '你的心脏够强劲吗？', 'images/interface/xinzang.png'));
	LevelList.push(GetLevelTable('ZombieRun', '僵尸快跑！', 'images/interface/jiangshikuaipao.png'));
	LevelList.push(GetLevelTable('PovertyOfTheSoil', '贫瘠之地', 'images/interface/pinjizhidi.png'));
	LevelList.push(GetLevelTable('MassGrave', '乱葬岗', 'images/interface/luanzanggang.png'));
	LevelList.push(GetLevelTable('DependOnHeavenForFood', '靠天吃饭', 'images/interface/kaotianchifan.png'));	
};

var Show_MINI_LIST = function(){
	NormalLevelInit(), LevelList.nowpage = 1;
	LevelList.Title = "迷 你 游 戏", LevelList.Title2 = "小游戏";
	LevelList.push(GetLevelTable('new_level/survival_day', '生存模式（白天）', 'new_skin/Level_View/Survival_Day.png'));
	LevelList.push(GetLevelTable('new_level/PovertyOfTheSoil_2', '贫瘠之地2', 'new_skin/Level_View/PovertyOfTheSoil_2.png'));
	LevelList.push(GetLevelTable('new_level/ViewStar', '观星', 'new_skin/Level_View/ViewStar.jpg'));
	LevelList.push(GetLevelTable('new_level/CardRain', '种子雨', 'new_skin/Level_View/CardRain.png'));
	LevelList.push(GetLevelTable('test_level/Test', '子弹测试', 'new_skin/Level_View/CardRain.png'));

	Set_Next_Page_Minigames(0, true);
};

var NormalBetaLevelInit = function(){
	BetaLevelList.push(GetLevelTable('test_level/ViewPlants', '不靠谱的阵形', 'new_skin/Level_View/ViewPlants.png'));
	BetaLevelList.push(GetLevelTable('test_level/CardRemake', '卡槽轮班', 'new_skin/Level_View/CardRemake.png'));
	BetaLevelList.push(GetLevelTable('test_level/Protect_Brain', '超乎寻常的战役', 'new_skin/Level_View/Protect_Brain.png'));
	BetaLevelList.push(GetLevelTable('test_level/third_party_level/HELP', '*绝望*', 'new_skin/Level_View/Third_ZombossW.png')); // 第三方关卡 - 白鹤亮翅提供
	BetaLevelList.push(GetLevelTable('test_level/LayDown', '你敢放下它么', 'new_skin/Level_View/LayDwon.png'));
};

var Init_Beta_Level = function(){
	NormalBetaLevelInit();
	let BL = BetaLevelList;
	BL.nowpage = 1, BL.Title = "实 验 室", BL.Title2 = "实验室";
	BL.Line = 3, RiddleLevelList.List = 5;
};

var Set_Next_Page_Minigames = function(DNum = 0, Nd = 0){
	(!Nd) && (PlayAudio("tap"));
	if(isNaN(DNum)) return -1;

	let LB = MINIGAME_LIST_TYPE ? BetaLevelList : LevelList;

	let d = $("dMiniListTable"), p = LB.nowpage, l = LB.length, m = Math.ceil(l / 15);
	p = LB.nowpage = $VM(p + DNum, 1, m);

	$("dMiniSmallTitle").innerHTML = LB.Title + "(第" + p + "页)";

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 5; j++){
			let levelinfo = LB[(p - 1) * 15 + i * 5 + j];
			let nowdiv = d.childNodes[i].childNodes[j];
			(!levelinfo) && (levelinfo = {img:'', title:'', onclickscript: function(){}});
			nowdiv.onclick = levelinfo.onclickscript;
			nowdiv.firstChild.firstChild.src = levelinfo.img;
			nowdiv.lastChild.innerHTML = levelinfo.title;
		};
	};
};

var RESET_BETA_BUTTON = function(d){
	d.innerText = (!MINIGAME_LIST_TYPE ? BetaLevelList : LevelList).Title2;
};








var RiddleLevelList = [];

var NormalLevelInit_RIDDLE = function(){
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKiller1', '花瓶终结者', 'new_skin/Level_View/Vase_Killer.jpg'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKiller2', '一路向左', 'new_skin/Level_View/Vase_Killer.jpg'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKiller3', '第3个花瓶', 'new_skin/Level_View/Vase_Killer.jpg'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKiller4', '连锁反应', 'new_skin/Level_View/Vase_Killer.jpg'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKiller6', '胆怯地制陶工', 'new_skin/Level_View/Vase_Killer.jpg'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKiller7', '戏法时刻', 'new_skin/Level_View/Vase_Killer.jpg'));

	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKillerTwo1', '迷雾砸罐', 'new_skin/Level_View/Vase_Killer_WaterNight.png'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKillerTwo2', '记忆大师', 'new_skin/Level_View/Vase_Killer_WaterNight.png'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKillerTwo3', '加班日', 'new_skin/Level_View/Vase_Killer_WaterDay.png'));
	RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKillerTwo4', '不可犹豫', 'new_skin/Level_View/Vase_Killer_WaterDay.png'));
	// RiddleLevelList.push(GetLevelTable('new_level/VaseKiller/VaseKillerTwo5', '战略游戏', 'new_skin/Level_View/Vase_Killer.jpg'));

	RiddleLevelList.push(GetLevelTable('ImZombie1', '我是僵尸！', 'images/interface/woshijiangshi.png'));
	RiddleLevelList.push(GetLevelTable('ImZombie2', '我也是僵尸！', 'images/interface/woshijiangshi.png'));
	RiddleLevelList.push(GetLevelTable('ImZombie7', '僵尸摇摆', 'images/interface/woshijiangshi.png'));
	RiddleLevelList.push(GetLevelTable('new_level/ImZombie/ImZombie_Water_1', '清爽夏日', 'images/interface/woshijiangshi.png'));
	RiddleLevelList.push(GetLevelTable('new_level/ImZombie/ImZombie_Water_2', '巡航导弹', 'images/interface/woshijiangshi.png'));
	RiddleLevelList.push(GetLevelTable('new_level/ImZombie/ImZombie_Water_3', '泳池奇遇', 'images/interface/woshijiangshi.png'));
//	RiddleLevelList.push(GetNullTable(), GetNullTable(), GetNullTable());
};

var Show_RIDDLE_LIST = function(){
	NormalLevelInit_RIDDLE(), RiddleLevelList.nowpage = 1;
	RiddleLevelList.Line = 3, RiddleLevelList.List = 5;
	RiddleLevelList.Title = "益智模式单机版", RiddleLevelList.SpecialTitle = [];

	Set_Next_Page_RiddleList(0, true);
};

var Show_Title_Riddle = function(){
	let Ll = RiddleLevelList, p = Ll.nowpage, txt = (Ll.SpecialTitle && Ll.SpecialTitle[p]) ? (Ll.SpecialTitle[p]) : ("(第" + p + "页)");
	$("dRiddleTitle").innerHTML = Ll.Title + txt;
};

var Set_Next_Page_RiddleList = function(DNum = 0, Nd = 0){
	(!Nd) && (PlayAudio("tap"));
	if(isNaN(DNum)) return -1;
	let Ll = RiddleLevelList, r = Ll.Line, c = Ll.List, rc = r * c;
	let d = $("dRiddleListTable"), p = Ll.nowpage, l = Ll.length, m = Math.ceil(l / rc);
	p = Ll.nowpage = $VM(p + DNum, 1, m);

	(!Nd) && (Show_Title_Riddle());

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 5; j++){
			let levelinfo = Ll[(p - 1) * 15 + i * 5 + j];
			let nowdiv = d.childNodes[i].childNodes[j];
			(!levelinfo) && (levelinfo = {img:'', title:'', onclickscript: function(){}});
			nowdiv.onclick = levelinfo.onclickscript;
			nowdiv.firstChild.firstChild.src = levelinfo.img;
			nowdiv.lastChild.innerHTML = levelinfo.title;
		};
	};
};

var ShowRiddle0 = function() {
	PlayAudio("gravebutton");
	SetNone($("dRiddleInx"));
	SetBlock($("dRiddle0"));
	Show_Title_Riddle();
	Set_Next_Page_RiddleList(0, true);
};


var SetUserData = function(Name = "游客", Pro = 1){
	let Visitor = $User.Visitor, dAdventure = $('dAdventure');
	let UserAuthority = 1, Progress = Pro, UserName = Name;

	if(Pro != 1){
		if (!$('dAdventureBigLvl')) {
			NewEle('dAdventureBigLvl','span','position:absolute;left:152px;top:25px;font-weight:bold;color:#FF0;font-size:12px;text-align:center;font-family:verdana',{'innerHTML' : Math.ceil(Progress / 10)}, dAdventure);
			NewEle('dAdventureSmallLvl','span','position:absolute;left:175px;top:27px;font-weight:bold;color:#FF0;font-size:12px;text-align:center;font-family:verdana',{'innerHTML' : (Progress = Progress - Math.floor(Progress / 10) * 10) ? Progress : Progress + 1}, dAdventure);
		} else {
			$('dAdventureBigLvl').innerHTML = Math.ceil(Progress / 10);
			$('dAdventureSmallLvl').innerHTML = ((Progress = Progress - Math.floor(Progress / 10) * 10) ? Progress : Progress + 1);
		}
		dAdventure.className = 'adventure1';
	}else{
		ClearChild($("dAdventureBigLvl"), $("dAdventureSmallLvl"));
		dAdventure.className = 'adventure0';
	}

	Visitor.Progress = Pro;
	Visitor.UserName = UserName;
	$('dName').innerHTML = UserName;
};


var SaveUserPosition = function(Name){
	(!isNaN(Name) && Name != 0) && (TravelInfo.AdvTravel = Name, Store.set("__JSPVZ_KAC_UserEXMode_Info", TravelInfo), $User.Visitor.Progress = Name);
};


var _Init_User_Data_Obj_ = function(){
	return {
		NowTravel: 1,
		UserName: "游客",
		AdvTravel: 1,
		IsTravel: {},
		IsTravelNum: 0
	};
};

var GameLogin = function(h) {
	let Name = $("txtName").value, d = TravelInfo;
	if(!Name || Name.length >= 100) return (alert("不正确的用户名！"), -1);
	TravelInfo.UserName = Name;

	if(h){
		Store.set("__JSPVZ_KAC_UserData__Name_" + Name + "__", TravelInfo);
	}else{
		d = Store.get("__JSPVZ_KAC_UserData__Name_" + Name + "__");
		if(!d) d = _Init_User_Data_Obj_(), d.UserName = Name, alert("并未查询到该用户数据！");
	};

	TravelInfo = d, SetUserData(Name, TravelInfo.AdvTravel), Store.set("__JSPVZ_KAC_UserEXMode_Info", TravelInfo);
	Set_Next_Page_EXModeList(0, 1);
	SetNone($('dShowMsgLogin'));
};

var GameLogout = function() {
	let Name = $("txtName").value || $User.Visitor.UserName, d = TravelInfo;

	d = _Init_User_Data_Obj_(), d.UserName = Name;
	Store.set("__JSPVZ_KAC_UserData__Name_" + Name + "__", d), Store.set("__JSPVZ_KAC_UserEXMode_Info", d);
	oLocalVar["LevelVars"][Name] = {}, oLocalVar.SaveVar();

	TravelInfo = d, SetUserData(Name, TravelInfo.AdvTravel);
	Set_Next_Page_EXModeList(0, 1);
	SetNone($("dShowMsgLogin"));
};


var MurmurHash3 = function(string) {
	let i = 0, hash;
	for (i, hash = 1779033703 ^ string.length; i < string.length; i++) {
		let bitwise_xor_from_character = hash ^ string.charCodeAt(i);
		hash = Math.imul(bitwise_xor_from_character, 3432918353);
		hash = hash << 13 | hash >>> 19;
	} return () => {
	   // Return the hash that you can use as a seed
		hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
		hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
		return (hash ^= hash >>> 16) >>> 0;
	}
};
var Mulberry32 = function(string) {
	return () => {
		let for_bit32_mul = string += 0x6D2B79F5;
		let cast32_one = for_bit32_mul ^ for_bit32_mul >>> 15;
		let cast32_two = for_bit32_mul | 1;
		for_bit32_mul = Math.imul(cast32_one, cast32_two);
		for_bit32_mul ^= for_bit32_mul + Math.imul(for_bit32_mul ^ for_bit32_mul >>> 7, for_bit32_mul | 61);
		return ((for_bit32_mul ^ for_bit32_mul >>> 14) >>> 0) / 4294967296;
	}
};
//let Generate_Seed = MurmurHash3(OWEA(__Today_Date__)), Seed_Random = Mulberry32(Generate_Seed());


var oLocalVar = { // 处理所有关卡的变量的
	StoreName: "__JSPVZ_KAC_AllLevel_Info", LevelVars: {}, 
	GetObj: function (Name = oS.LvlEName) {
		let self = this, UName = TravelInfo.UserName, Var, Obj; // 单独把每个玩家数据隔离开来
		self.SaveVar(), Var = Store.get(self.StoreName) ?? {}, PlayerOwn = Var[UName] ?? {}, Obj = PlayerOwn[Name] ?? {}; // 先保存防止多次获取
		self.LevelVars[UName] ??= {}, self.LevelVars[UName][Name] ??= {};
		for (let Did in self.LevelVars[UName][Name]) delete self.LevelVars[UName][Name][Did];
		for (let Did in Obj) self.LevelVars[UName][Name][Did] = Obj[Did]; 
		return self.LevelVars[UName][Name];
	}, 
	SaveVar: function () {
		let self = this, Name = self.StoreName, Var = self.LevelVars;
		Store.set(Name, Object.assign(Store.get(Name) ?? {}, Var));
	}
};