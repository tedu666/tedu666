(function(){
	let NowLevel = (oS.NowLevel != null) ? (oS.NowLevel) : (1); // 当前等级
	let $FJ = __Template_ReSet_Object__, Full_Json = (f, s, dep = 0) => { // 丰富数组
		if(dep > 16) return f;
		for (let _ in s) {
			if (f[_] == null) f[_] = s[_];
			else if(typeof(f[_]) !== "string") Full_Json(f[_], s[_], dep + 1);
		};
		return f;
	};

// ====================================================================================================

	let Change_Level = (f) => { // 切换阶段
		let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 255}, Height: 600, Width: 1800}, EDAll), PG = oS.Plant_Ground;
		// !f && (oS.Plant_Ground = Object["values"]($P)["map"]((f) => [window[f.EName], f.R, f.C]));
		!f && ++NowLevel, AllAudioPauseCanceled(), oSym.Start(), oCv["Gradient_Rect"](0, [[1, 150]], oSym["NowStep"], [0, 0, 0], () => {
			SelectModal(oS.Lvl), oS.NowLevel = NowLevel, oS.Plant_Ground = PG, oCv && oCv["__Delete__"] && oCv["__Delete__"]();
		});
	};

// ====================================================================================================

	let oSys = { // oS初始默认
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage, oMelonPult],
		ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp],
		PicArr: ["new_skin/InterFace/background_new_3.png"], backgroundImage: "new_skin/InterFace/background_new_3.png",
		LevelName: "EX-10 勇闯者", LvlEName: "EX_End_Pool_10", StartGameMusic: "nice_graveyard",
		GroundType: 1, MusicMode: 1, CanSelectCard: 1, LF: [0, 1, 1, 1, 1, 1, 1],
		SunNum: 750, DKind: 0, Coord: 200, LevelProduce: "阶段性挑战，祝君好运", Block_Level_Task: "",
		LoadAccess: function(Callback_Start) {
			oS.GroundType ? ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool_block.png">') : ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool.gif">');
			NewEle("Div_TimeTask", "div", "display:none;z-index:205;top:10px;left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDAll);
			NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
			let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 24}, Height: 600, Width: 1800}, EDAll);
			oS.DefLoad && oS.DefLoad(), oCv.Gradient_Rect(1, [[1, 5]], 5, [0,0,0]), SummonNewBlock(oS.Block_Level_Task, () => oCv["Gradient_Rect"](1, [[0, 100]], oSym["NowStep"], [0, 0, 0], () => {oCv && oCv["__Delete__"] && oCv["__Delete__"](), Callback_Start(), oS.DefLoad2 && oS.DefLoad2();}));
		},
		InitLawnMower: function() {
			CustomSpecial(oLawnCleaner_New, 1, -1),	CustomSpecial(oLawnCleaner_New, 2, -1), CustomSpecial(oLawnCleaner_New, 3, -1);
			CustomSpecial(oLawnCleaner_New, 4, -1), CustomSpecial(oLawnCleaner_New, 5, -1), CustomSpecial(oLawnCleaner_New, 6, -1);
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
			oS.DefStartLoad && oS.DefStartLoad(), StopMusic(), (!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
			oS.Plant_Ground && (() => {let i, t; for (i in oS.Plant_Ground) t = oS.Plant_Ground[i], t[2] >= -1 && CustomSpecial(t[0], t[1], t[2], true);})();
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			PrepareGrowPlants(function() {
				(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic)), oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
				for(let i in ArCard) DoCoolTimer(i,0);
				!oS.RefuseStart && oSym.addTask(1500, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]); oS.Summon_Start_Func();
			});
		},
		LvlClearFunc: function() {
			delete oS.NowLevel; delete oS.Plant_Ground;
		},
		NormalFlagZombieTask: 150, // 平均僵尸出现间隔
		BigFlagZombieTask: 30 // 大波僵尸间隔
	}, oPlt = { // oP初始默认
		FlagMaxWaitTime: 1990, // 最多等待 19 秒再出下一波僵尸
		FlagZombieWaitTime: 500, // 如果这一波所有僵尸死亡，那么 3 秒钟内出下一波
		FlagToEnd: Change_Level
	}, oWin = { // window初始默认
		GameOver: () => Change_Level(true),
		GameLevelData: {},
		SummonNewBlock: function(a, f, r) {
			SetHidden($("dLoginDataHTML")), oSym.Stop();
			$("dMsgFailed").innerHTML = a + '<p><p><span style="color:#15B70C">' + (r ? r : '点击开始游戏') +  '</span>';
			$("dMsgFailed").onclick = function() {
				SetNone($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed")); $("dMsgFailed").onclick = null;
				SetVisible($("dLoginDataHTML")), oSym.Start(), PlayAudio("tap"); f && f();
			};
			SetBlock($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed"));
		},
		PauseGamesShowBlock: function() {
			if (oSym.Timer == null) return false; console.log("暂停了游戏"), AllAudioPaused(), PlayAudio("tap"), SummonNewBlock(oS.Block_Level_Task, AllAudioPauseCanceled, "点击继续游戏");
		}
	}; 

// ====================================================================================================


// ——关卡区——
	$SEql(NowLevel, { // 每个阶段函数
		1: () => {
			oS.Init($FJ(oSys, {
				PName: [oPeashooter, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage, oMelonPult],
				Block_Level_Task: "<a style=\"font-size:18px;line-height:2.25;\">阶段目标: 1.场上植物不得超过 7 种<br>2.每行不得超过 6 棵植物<br>2.每列与每条斜线不得超过 5 棵植物<br>失败将从当前阶段重新开始<br><br></a>",
				SelectCardList: [], DefLoad2: () => { for (let i of oS.SelectCardList) SelectCard(i, 1); },
				DefStartLoad: () => { },
				LF: [0, 1, 1, 2, 2, 1, 1], RefuseStart: true, Cheat_Mode: false,
				GroundType: 0, SunNum: 4000, LargeWaveFlag: { 15: $("imgFlag1") },
				Summon_Start_Func: function() {
					oS.Cheat_Mode = true; // 无冷却
					NewEle("DivTeach", "div", "pointer-events:none;line-height:40px;", {innerHTML: "先种植植物，准备好后点击右上角开始按钮开始战斗！"}, EDAll);
					oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
					// 开始战斗按钮
					NewEle("Div_Start", "div", "display:none;z-index:205;top:50px;left:735px;position:absolute;width:157.5px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){ SetNone($("Div_Start")), oP.AddZombiesFlag(), SetVisible($("dFlagMeterContent")), StopMusic(), PlayMusic(oS.LoadMusic = "True_Admin"), oS.Cheat_Mode = false; }}, EDAll);
					NewEle("dTitle_Start", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", {innerText: "———开始战斗———"}, $("Div_Start"));

					SetBlock($("Div_TimeTask"), $("Div_Start")); // 提示栏、初始数据
					(function(){ // 本关数据中枢
						let A = GameLevelData["RL_Num"], B = GameLevelData["CL_Num"], C = GameLevelData["WL_Num"], D = GameLevelData["MaxNum"], E = GameLevelData["KindNum"];
						$("dTitle_Task").innerText = "Kind: " + E + "    Row: " + A + "    Column: " + B + "    Diagonal:" + C + "    Max:" + D;
						if (A > 6 || B > 5 || E > 7 || C > 5) return GameOver(); // 判断失败
						oSym.addTask(10, arguments.callee, []);
					})();
				},
				NormalFlagZombieTask: 0, BigFlagZombieTask: 0
			}), $FJ(oPlt, {
				FlagMaxWaitTime: 990, FlagZombieWaitTime: 90,
				AZ: [[oZombie, 1, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], [oPoleVaultingZombie, 2, 1], [oConeheadZombie, 2, 1], [oBucketheadZombie, 2, 1], [oNewspaperZombie, 2, 2], [oScreenDoorZombie, 2, 3], [oFootballZombie, 2, 5, [1, 1, 1, 3, 3, 3, 5, 5, 6, 9, 9, 10, 10, 15, 15, 15]], [oDancingZombie, 1, 6, [6, 10, 15]], [oDuckyTubeZombie1, 2, 1], [oDuckyTubeZombie2, 1, 1], [oDuckyTubeZombie3, 1, 1], [oDolphinRiderZombie, 1, 7, [3]], [oSnorkelZombie, 1, 5, [5]], [oZomboni, 1, 10, [1, 4, 5, 10, 15]], [oJackinTheBoxZombie, 1, 8, [1, 2, 3, 4, 5, 6, 7]], [oBalloonZombie, 3, 5, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]],
				FlagNum: 15, FlagToSumNum: {
/*
					a1: [    1,  3,  5,   7,   9,  10,  13,  14],
					a2: [0, 20, 40, 60, 100, 130, 170, 200, 312]
*/
					a1: [    1,  3,  5,  7,   9,  10,  13,  14],
					a2: [0, 20, 40, 50, 70, 100, 140, 180, 250]
				},
				FlagToMonitor: {
					14: [ShowFinalWave, 0]
				},
				FlagToEnd: () => {Change_Level(0);}
			}), $FJ(oWin, {
				GameLevelData: { "RL_Num": 0, "CL_Num": 0, "WL_Num": 0, "MaxNum": 0, "KindNum": 0 },
				Change_Plt: () => {
					let A = 0, B = 0, C = 0, D = 0, E = 0, F = {};
					let RL_Num = Array(20)["fill"](0), CL_Num = Array(20)["fill"](0), WL_Num = Array(20)["fill"](0), WR_Num = Array(30)["fill"](0);
					for (let _ in $P) { let i = $P[_], R = i.R, C = i.C; if (C < 1 || C > oS.C || R < 1 || R > oS.R) continue; F[i.EName] = true, ++RL_Num[R], ++CL_Num[C], ++WL_Num[C - R + 10], ++WR_Num[oS.C - oS.R - C - R + 15]; }
					for (let i of RL_Num) A = Math.max(A, i); for (let i of CL_Num) B = Math.max(B, i);
					for (let i of WL_Num) C = Math.max(C, i); for (let i of WR_Num) D = Math.max(D, i);
					E = Math.max(A, B);
					GameLevelData["RL_Num"] = A, GameLevelData["CL_Num"] = B, GameLevelData["WL_Num"] = Math.max(C, D), GameLevelData["MaxNum"] = E, GameLevelData["KindNum"] = Object["keys"](F)["length"];
				},
				Trigger_Plants_Birth: () => Change_Plt(),
				Trigger_Plants_Die: () => Change_Plt(),
				GrowPlant: function(l, d, c, e, b) {
					var j = oS.ChoseCard, f = ArCard[j], h = f.PName, k = h.prototype, i = k.coolTime, a, g = oGd.$LF[e];
					k.CanGrow(l, e, b) && Trigger_Ctk_Plt(l, e, b, k) && (PlayAudio(g != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water"), !k.CardKind ? (new h).Birth(d, c, e, b, l, oS.Cheat_Mode) : asyncInnerHTML((a = new h).CustomBirth(e, b, 0, "auto"), function(n, m) { EDPZ.appendChild(n), m.Birth(); }, a), innerText(ESSunNum, oS.SunNum -= k.SunNum), !oS.Cheat_Mode && i && (f.CDReady = 0, DoCoolTimer(j, k.coolTime)), oSym.addTask(20, SetHidden, [SetStyle(g != 2 ? $("imgGrowSoil") : $("imgGrowSpray"), { left: d - 30 + "px", top: c - 30 + "px", zIndex: 3 * e + 1, visibility: "visible" })]));
					CancelPlant();
				}
			}));
		}, 
		"default": () => (oS.Init({LvlClearFunc: function() {delete oS.NowLevel; delete oS.Plant_Ground;}}, {}, {}), SelectModal(0), true)
	})();

	// (NowLevel <= 5) && (SelectModal(oS.Lvl), oS.NowLevel = NowLevel); // 下一阶段
})();


var ff = () => {

oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCabbage, oMelonPult, oCattail],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp],
	PicArr: ["new_skin/InterFace/background_new_3.png"],
	backgroundImage: "new_skin/InterFace/background_new_3.png",
	LevelName: "EX-10 勇闯者",
	LvlEName: "EX_New_Pool_10",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 1,
	MusicMode: 1,
	SunNum: 750,
	DKind: 0,
	Coord: 200,
	LF: [0, 1, 1, 1, 1, 1, 1],
	LevelProduce: "六路陆地关",
	LargeWaveFlag: {
		10: $("imgFlag3"),
		20: $("imgFlag2"),
		30: $("imgFlag1")
	},
	UserDefinedFlagFunc: function(b) {
		var a = oP.FlagZombies;
		// a > 3 && AppearTombstones(3, 9, 1);
		// oP.FlagNum == a && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie])
	},
	Block_Level_Task: "<a style=\"font-size:18px;line-height:2.25;\">关卡说明: 1.每格仅允许种植一棵植物<br>2.失去植物后其所在格将无法种植植物<br>3.乌云密布，但植物仍能照亮自己<br>4.若黑暗降临，您将无法看到场地状况<br><br></a>",
	LoadAccess: function(Callback_Start) {
		return alert("未完待续，新年快乐！"), SelectModal(0); // 新年快乐！

		$("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool_block.png">';
		NewEle("Div_TimeTask", "div", "display:none;z-index:205;top:10px;left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDAll);
		NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
		SummonNewBlock(oS.Block_Level_Task, Callback_Start);
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
	NormalFlagZombieTask: 150, // 平均僵尸出现间隔
	BigFlagZombieTask: 50, // 大波僵尸间隔
	LvlClearFunc: function() {}
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
		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		Win_Travel(10, 11);
	}
},{
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
	}
});


};