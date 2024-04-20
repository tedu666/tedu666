oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCabbage_Pro, oMelonPult_Pro],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp],
	PicArr: ["new_skin/InterFace/background_new_3.png"],
	backgroundImage: "new_skin/InterFace/background_new_3.png",
	LevelName: "EX-9 珍惜者",
	LvlEName: "EX_New_Pool_9",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 1,
	MusicMode: 1,
	SunNum: 750,
	DKind: 0,
	Coord: 200,
	HaveFog: 8, FogKind: 1,
	LF: [0, 1, 1, 1, 1, 1, 1],
	LevelProduce: "六路陆地关，关卡目标: 1.每格仅允许种植一棵植物; 2.失去植物后其所在格将无法种植植物; 3.乌云下，植物仍能照亮自己; 4.若黑暗降临，您将无法看到场地状况",
	LargeWaveFlag: {
		10: $("imgFlag3"),
		20: $("imgFlag2"),
		30: $("imgFlag1")
	},
	UserDefinedFlagFunc: function(b) {
		var a = oP.FlagZombies;
		if (a % 5 == 0 && Level_Canvas["Can_Draw"]) {
			Level_Canvas["Gradient_Rect"](0.2, [[1, 10]], oSym["NowStep"], [0, 0, 0], () => oSym.addTask((a / 10) * 1000, () => {
				Level_Canvas["Gradient_Rect"](1, [[0.2, 20]], oSym["NowStep"], [0, 0, 0]);
			}, []));
		};
		if (a % 4 == 0) AppearTombstones(6, 9, 1); // 墓碑
		if (a == 10) oP.SetTimeoutTomZombie([oPoleVaultingZombie, oNewspaperZombie, oScreenDoorZombie]);
		if (a == 20) oP.SetTimeoutTomZombie([oPoleVaultingZombie, oNewspaperZombie, oConeheadZombie, oBucketheadZombie]);
		if (a == 25) oP.SetTimeoutTomZombie([oDancingZombie, oJackinTheBoxZombie]);
		if (a == 30) oP.SetTimeoutTomZombie([oDancingZombie, oJackinTheBoxZombie, oFootballZombie]);
		// a > 3 && AppearTombstones(3, 9, 1);
		// oP.FlagNum == a && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie])
	},
	Block_Level_Task: "<a style=\"font-size:18px;line-height:2.25;\">关卡说明: 1.每格仅允许种植一棵植物<br>2.失去植物后其所在格将无法种植植物<br>3.乌云密布，但植物仍能照亮自己<br>4.若黑暗降临，您将无法看到场地状况<br><br></a>",
	LoadAccess: function(Callback_Start) {
		Level_Canvas = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 24}, Height: 600, Width: 1800}, EDAll); // 画笔
		$("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool_block.png">';
		NewEle("Div_TimeTask", "div", "display:none;z-index:205;top:10px;left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDAll);
		NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
		SummonNewBlock(oS.Block_Level_Task, () => {
			Level_Canvas["Gradient_Rect"](0, [[0.5, 100], [0.2, 200]], oSym["NowStep"], [0, 0, 0]), Callback_Start();
		});
	},
	InitLawnMower: function() {
		CustomSpecial(oLawnCleaner_New, 1, -1);
		CustomSpecial(oLawnCleaner_New, 2, -1);
		CustomSpecial(oLawnCleaner_New, 3, -1);
		CustomSpecial(oLawnCleaner_New, 4, -1);
		CustomSpecial(oLawnCleaner_New, 5, -1);
		CustomSpecial(oLawnCleaner_New, 6, -1);
	},
	Summon_Start_Func: function(){
		SetBlock($("Div_TimeTask")); // 提示栏、初始数据
		(function(){ // 本关数据中枢
			let ZNum = 0; for (let i in $Z) ++ZNum;
			$("dTitle_Task").innerText = "FlagNum: " + oP["FlagNum"] + "    NowFlag: " + oP["FlagZombies"] + "    ZombieNum:" + ZNum;
			oSym.addTask(25, arguments.callee, []);
		})();
	},
	StartGame: function(){
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);

			for(let i in ArCard) DoCoolTimer(i,0);

			// AutoProduceSun(25);

			oSym.addTask(1500, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);

			oS.Summon_Start_Func();

			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "您可以点击上方灰白数据面板重新查看本关信息！"}, EDAll);
			oSym.addTask(250, function() {ClearChild($("DivTeach"));}, []);
		});
	},
	NormalFlagZombieTask: 100, // 平均僵尸出现间隔
	BigFlagZombieTask: 10, // 大波僵尸间隔
	LvlClearFunc: function() {window["Level_Canvas"] && window["Level_Canvas"]["__Delete__"] && window["Level_Canvas"]["__Delete__"]();} // 清除 Canvas
}, {
	AZ: [[oPoleVaultingZombie, 1, 5, [1, 3]] , [oConeheadZombie, 1, 7, [2]], [oBucketheadZombie, 1, 9, [5]], [oNewspaperZombie, 1, 1, [2]], [oScreenDoorZombie, 1, 9, [3, 5]], [oFootballZombie, 1, 13, [10]], [oDancingZombie, 1, 10, [10]], [oZomboni, 1, 23, [10, 15, 20, 30]], [oJackinTheBoxZombie, 1, 10, [6, 8, 10]], [oImp, 1, 100, [3, 4, 5, 6]]],
	FlagNum: 30,
	FlagToSumNum: {
		a1: [   3, 5, 7,  9, 10, 13, 16, 18, 19, 20, 22, 25, 27, 28,  29],
		a2: [2, 3, 4, 6, 20,  8, 13, 16, 22, 80, 26, 32, 40, 51, 70, 250]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowFinalWave, 0]
	},
	FlagMaxWaitTime: 1990, // 最多等待 19 秒再出下一波僵尸
	FlagZombieWaitTime: 300, // 如果这一波所有僵尸死亡，那么 3 秒钟内出下一波
	FlagToEnd: function() {
 		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDAll);
		NewImg("imgSF", "images/Card/Plants/Catttail.png", "height:120px;left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDAll, {onclick: function() {GetNewCard(this, oCattail, 0);}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDAll);

		// NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		// NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		Win_Travel(9, 10);
	}
},{
	Level_Canvas: null, // 本关Canvas
	GameLevelData: {
		"Save_Plants": {},
		"Ban_Block": {}
	},
	DefFuc: (() => {
		let fuc = (x) => {
			if (x > 0.5) return Math.sqrt(1 - Math.pow(2 * (x - 0.5), 2));
			else if (x >= 0) return 2 - Math.sqrt(1 - Math.pow(x - 0.5, 2));
			else return 1;
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
	SummonNewBlock: function(a, f, r) {
		SetHidden($("dLoginDataHTML")), oSym.Stop();
		$("dMsgFailed").innerHTML = a + '<p><p><span style="color:#15B70C">' + (r ? r : '点击开始游戏') +  '</span>';
		$("dMsgFailed").onclick = function() {
			SetNone($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed"));
			$("dMsgFailed").onclick = null;
			SetVisible($("dLoginDataHTML")), oSym.Start(), PlayAudio("tap");
			f && f();
		};
		SetBlock($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed"));
	},
	PauseGamesShowBlock: function() {
		if (oSym.Timer == null) return false;
		console.log("暂停了游戏"), AllAudioPaused(), PlayAudio("tap"), SummonNewBlock(oS.Block_Level_Task, AllAudioPauseCanceled, "点击继续游戏");
	},
	Show_Ban_Block: function(r, c){
		return false; // 暂不使用
		let Img = "new_skin/InterFace/Ban.png", height = 77, width = 74;
		let id = "dBan_" + Math.random(), rc = r + "_" + c;
		let wid = Math.max(GetX(c) - GetX(c - 1), width + 10), hei = (GetY(r) - GetY(r - 1)) - 15;
		let left = GetX(c) - width / 2 - (wid - width), top = GetY(r) - height - (hei - height);
		NewImg(id, Img, "top:" + top + "px;left:" + left + "px;width:" + wid + ";height:" + hei, EDAll);
	},
	Trigger_Plants_Birth: function (Obj, R, C, Kind) {
		(C >= 1) && (oGd.GatherFog(R, C, 1, 1, 0), oGd.$Creator_Def[R + "_" + C] = true); // 生成
	},
	Trigger_Plants_Die: function (Obj, R, C, Kind) {
		(C >= 1) && (oGd.GatherFog(R, C, 1, 1, 1), Show_Ban_Block(R, C)); // 嗝屁
	}
});


/*
珍惜者
关卡目标：
	1.每格仅允许种植一棵植物
	2.失去植物后其所在格将无法种植植物
	3.乌云下，植物仍能照亮自己
	4.若黑暗降临，您将无法看到场地状况
*/