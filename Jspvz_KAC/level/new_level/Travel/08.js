oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCabbage_Pro],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie],
	PicArr: ["new_skin/InterFace/background_new_3.png"],
	backgroundImage: "new_skin/InterFace/background_new_3.png",
	LevelName: "EX-8 护时者",
	LvlEName: "EX_New_Pool_8",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 1,
	MusicMode: 1,
	SunNum: 250,
	DKind: 0,
    Coord: 200,
	LF: [0, 1, 1, 2, 2, 1, 1],
	LevelProduce: "泳池关，目标：让僵尸平均死亡间隔时间大于目标时间，尽量拖延时间",
	Task_ZombieDieTime: 10, //目标
	NormalFlagZombieTask: 100, //平均僵尸出现间隔
	BigFlagZombieTask: 5, //大波僵尸间隔
	LargeWaveFlag: {
		10: $("imgFlag3"),
		20: $("imgFlag2"),
		30: $("imgFlag1")
	},
	UserDefinedFlagFunc: function(b) {
		var a = oP.FlagZombies;
		if (a == 8) oS.Task_ZombieDieTime = 8, oS.NormalFlagZombieTask = 200;
		if (a == 15) oS.Task_ZombieDieTime = 7, oS.NormalFlagZombieTask = 150;
		if (a == 18) oS.Task_ZombieDieTime = 6, oS.NormalFlagZombieTask = 100, oS.BigFlagZombieTask = 0;
		if (a == 20) oS.Task_ZombieDieTime = 5, oS.NormalFlagZombieTask = 15;
		if (a == 21) oS.Task_ZombieDieTime = 4, oS.NormalFlagZombieTask = 150, oS.BigFlagZombieTask = 1;
		if (a == 26) oS.Task_ZombieDieTime = 3, oS.NormalFlagZombieTask = 120;
		if (a == 28) oS.Task_ZombieDieTime = 2, oS.NormalFlagZombieTask = 150;
		if (a == 30) oS.Task_ZombieDieTime = 2;
		// a > 3 && AppearTombstones(3, 9, 1);
		// oP.FlagNum == a && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie])
	},
	LoadAccess: function(start_game){
		$("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool.gif">';
		NewEle("Div_TimeTask", "div", "display:none;z-index:5;top:10px; left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;pointer-events:none;opacity:1;", 0, EDAll);
		NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
		SummonNewBlock("本关目标: 让僵尸平均死亡间隔时间大于目标时间", start_game);
	},
	InitLawnMower: function() {
		CustomSpecial(oLawnCleaner_New, 1, -1);
		CustomSpecial(oLawnCleaner_New, 2, -1);
		CustomSpecial(oLawnCleaner_New, 5, -1);
		CustomSpecial(oLawnCleaner_New, 6, -1);
	},
	Summon_Start_Func: function(){
		let id, id2, j = oLilyPad.prototype, i = 1;

		NewImg((id = "oLilyPad_3_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:-100px;top:323px;z-index:8;", EDAll);
		Move(id, -100, 323, GetX(i) + j.GetDX(), GetY(3) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id)),CustomSpecial(oLilyPad, 3, 1);});

		NewImg((id2 = "oLilyPad_4_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:-100px;top:323px;z-index:8;", EDAll);
		Move(id2, -100, 323, GetX(i) + j.GetDX(), GetY(4) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id2)),CustomSpecial(oLilyPad, 4, 1);
	
			(function(){
				let j = oLilyPad.prototype;
				for(let i = 2; i <= 9; i++){
					let id, id2, x2, y2;

					NewImg((id = "oLilyPad_3_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:148px;top:283px;z-index:8;", EDAll);
					Move(id, 148, 283, GetX(i) + j.GetDX(), GetY(3) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id)), CustomSpecial(oLilyPad, 3, i)});

					NewImg((id2 = "oLilyPad_4_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:148px;top:368px;z-index:11;", EDAll);
					Move(id2, 148, 368, GetX(i) + j.GetDX(), GetY(4) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id2)), CustomSpecial(oLilyPad, 4, i)});
				}
			})();

		});
	},
	StartGame: function(){
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		SetBlock($("Div_TimeTask")); //提示栏
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);

			for(let i in ArCard){DoCoolTimer(i,0);};

			AutoProduceSun(25);

			oSym.addTask(2000, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);

			oS.Summon_Start_Func();

			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "本关目标: 让僵尸平均死亡间隔时间大于目标时间！"}, EDAll);
			oSym.addTask(750, function() {ClearChild($("DivTeach"));}, []);
		});

		oSym.addTask(0, function(){ //ctk、检查函数
			let Time = (oSym.Now - GameLevelData["Time"]) / 100, T2 = (Time == Infinity) ? "-" : Time.toFixed(1), KillNum = GameLevelData["Kill_Num"];
			(GameLevelData["Kill_Num"] >= 2) && (GameLevelData["Average_Time"] = (Time / (KillNum - 1)).toFixed(2)); // 100为一秒
			$("dTitle_Task").innerText = "Time: " + GameLevelData["Average_Time"] + "s    Num: " + KillNum + "    All: " + T2 + "s    目标: " + oS.Task_ZombieDieTime + "s";

			//判断
			if (GameLevelData["Average_Time"] <= oS.Task_ZombieDieTime) {
				oSym.addTask(100, GameOver, ["僵尸平均死亡间隔时间未大于 " + oS.Task_ZombieDieTime + " 秒！<br>请再接再厉！"]);
				SetHidden($("dCardList"), $("dSunNum"), $("tdShovel"));
				return;
			};

			oSym.addTask(10, arguments.callee, []);
		}, []);
	},
	Zombies_Die_Func: function(){
		GameLevelData["Kill_Num"] |= 0, ++GameLevelData["Kill_Num"]; // 增加击杀数
		(GameLevelData["LastTime"] == null) && (GameLevelData["Time"] = oSym.Now), GameLevelData["LastTime"] = oSym.Now; // 判断是否开始记时、记录当前时间
	}
}, {
	AZ: [[oZombie, 1, 2], [oZombie2, 1, 3], [oZombie3, 1, 4], [oPoleVaultingZombie, 2, 5], [oConeheadZombie, 2, 1], [oBucketheadZombie, 2, 1], [oNewspaperZombie, 2, 8], [oScreenDoorZombie, 2, 10, [10]], [oFootballZombie, 2, 15, [1]], [oDancingZombie, 1, 20], [oDuckyTubeZombie1, 2, 3], [oDuckyTubeZombie2, 1, 6], [oDuckyTubeZombie3, 1, 9], [oDolphinRiderZombie, 1, 17, [10]], [oSnorkelZombie, 1, 26, [20]], [oZomboni, 1, 24, [10]], [oJackinTheBoxZombie, 1, 28]],
	FlagNum: 30,
	FlagToSumNum: {
		a1: [   1, 3, 5, 7,  9, 10, 13, 15, 16, 17, 18, 19, 20, 22, 24, 26, 27, 28,  29],
		a2: [6, 1, 2, 4, 7, 18,  2,  3,  5, 14, 18, 20, 50, 11, 18, 20, 33,  0, 40, 400]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
 		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDAll);
		NewImg("imgSF", "new_skin/Images/Card/MelonPult.webp", "height:120px;left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDAll, {onclick: function() {GetNewCard(this, oMelonPult_Pro, 0);}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDAll);

		// NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		// NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		Win_Travel(8, 9);
	}
},{
	GameLevelData: {
		"Kill_Num": 0,
		"Time": -Infinity,
		"LastTime": null,
		"AllTime": null,
		"Average_Time": "-"
	},
	DefFuc: (() => {
		let fuc = (x) => {
			if (x > 0.5) {
				return Math.sqrt(1 - Math.pow(2 * (x - 0.5), 2));
			} else if (x >= 0) {
				return 2 - Math.sqrt(1 - Math.pow(x - 0.5, 2));
			} else {
				return 1;
			}
		};

		return (Now, Speed, All) => {
			return Math.min(Now + fuc(Now / All) * Speed, All);
		};
	})(),
	Move: (id, x1, y1, x2, y2, Time = 1, Hz = 1, func) => {
		let now = 0, long = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)), xl = x2 - x1, yl = y2 - y1;
		let Speed = long / (100 / (Hz || 1)) / Time;
		oSym.addTask(1, function(){
			now = DefFuc(now, Speed, long);
			$(id).style.left = x1 + xl * ((now / long) || 0);
			$(id).style.top = y1 + yl * ((now / long) || 0);

			if(now != long) oSym.addTask(Hz, arguments.callee, []);
			else func && func();
		}, []);
	},
	SummonNewBlock: function(a, f) {
		SetHidden($("dLoginDataHTML")), oSym.Stop();
		$("dMsgFailed").innerHTML = a + '<p><p><span style="color:#10AE08">点击开始游戏</span>';
		$("dMsgFailed").onclick = function() {
			SetNone($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed"));
			$("dMsgFailed").onclick = null;
			SetVisible($("dLoginDataHTML")), oSym.Start(), PlayAudio("tap");
			f && f();
		};
		SetBlock($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed"));
	}
});



/*
$("dShowMsgLogin").onmousedown = function(j){
	this._ = true;
	var d = j.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft, b = j.clientY + EBody.scrollTop || EElement.scrollTop;
	this._left = d - this.offsetLeft;
	this._top = b - this.offsetTop;
	// this._left = this._top = 100;
	console.log("按下去了", this.scrollLeft)
}
$("dShowMsgLogin").onmouseup = function(){
	this._ = false;
	console.log("抬起来了")
}
$("dShowMsgLogin").onmousemove = function(j){
	// console.log(j);
	j = window.event || j;
	var d = j.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft, b = j.clientY + EBody.scrollTop || EElement.scrollTop;
	if(this._ == true) {
		this.style.marginLeft = (d - this._left) + "px";
		this.style.marginTop = (b - this._top) + "px";
	}
	// console.log(this._, this._left, this._top, this.style.left, this.style.top, this.offsetLeft, this.offsetTop, d, b);
}
*/


/*
let DefFuc = (() => {
	let fuc = (x) => {
		if (x > 0.5) {
			return Math.sqrt(1 - Math.pow(2 * (x - 0.5), 2));
		} else if (x >= 0) {
			return 2 - Math.sqrt(1 - Math.pow(x - 0.5, 2));
		} else {
			return 1;
		}
	};

	return (Now, Speed, All) => {
		return Math.min(Now + fuc(Now / All) * Speed, All);
	};
})();


let Move = (id, x1, y1, x2, y2, Time = 1, Hz = 1, func) => {
	let now = 0, long = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)), xl = x2 - x1, yl = y2 - y1;
	let Speed = long / (100 / (Hz || 1)) / Time;
	oSym.addTask(1, function(){
		now = DefFuc(now, Speed, long);
		$(id).style.left = x1 + xl * ((now / long) || 0);
		$(id).style.top = y1 + yl * ((now / long) || 0);

		if(now != long) oSym.addTask(Hz, arguments.callee, []);
		else func && func();
	}, []);
}

for(let i = 0; i < ArCard.length; i++){
	let id = "MovePlant" + Math.random(), Z = oZombie, j = ArCard[i].PName.prototype;
	let x2 = GetX(Math.floor(Math.random() * 9 + 1));
	let y2 = GetY(Math.floor(Math.random() * 5 + 1));
	x2 += j.GetDX(), y2 = y2 - j.height + j.GetDY(0, 0, []);
	NewImg(id, j.PicArr[j.StaticGif], "left:0px;top:0px;z-index:254", EDAll).cloneNode(false);
	Move(id, 0, 0, x2, y2, 1, 1, () => {console.log(1)});

}




for(let i = 0; i < ArCard.length; i++){
	let x1 = $(ArCard[i].DID).offsetLeft, y1 = $(ArCard[i].DID).offsetTop, x2 = Math.random() * 700, y2 = Math.random() * 600;
	Move(ArCard[i].DID, 0, 0, x2, y2, 1, 1, () => {console.log(1)});
}
*/