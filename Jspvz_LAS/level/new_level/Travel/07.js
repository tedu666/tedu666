oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCabbage],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie],
	PicArr: ["new_skin/InterFace/background_new_3.png"],
	backgroundImage: "new_skin/InterFace/background_new_3.png",
	LevelName: "EX-7 追赶者",
	LvlEName: "EX_New_Pool_7",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 1,
	MusicMode: 1,
	SunNum: 450,
	DKind: 0,
    Coord: 200,
	LF: [0, 1, 1, 2, 2, 1, 1],
	Is_End: false,
	LevelProduce: "泳池关，目标：	1.必须在 25 分钟内通关; 2.阳光数不得大于 1000; 3.游戏结束时阳光数不得低于 750; 4.不得拥有超过 15 株植物;\n特性: 这一波僵尸不打完几乎不会出现下一波。",
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
	LoadAccess: function(start_game){
		$("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool.gif">';
		NewEle("Div_TimeTask", "div", "display:none;z-index:5;top:10px; left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDMove);
		NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
		SummonNewBlock("<font size=\"4\" style=\"line-height:2.25\">关卡目标: 1.必须在 25 分钟内通关<br>2.阳光数不得大于 1000<br>3.游戏结束时阳光数不得低于 750<br>4.不得拥有超过 15 株植物<br><br></font>", start_game);
	},
	InitLawnMower: function() {
		CustomSpecial(oLawnCleaner_New, 1, -1);
		CustomSpecial(oLawnCleaner_New, 2, -1);
		CustomSpecial(oLawnCleaner_New, 5, -1);
		CustomSpecial(oLawnCleaner_New, 6, -1);
	},
	Summon_Start_Func: function(){
		let id, id2, j = oLilyPad.prototype, i = 1;

		NewImg((id = "oLilyPad_3_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:-100px;top:323px;z-index:8;", EDMove);
		Move(id, -100, 323, GetX(i) + j.GetDX(), GetY(3) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id)),CustomSpecial(oLilyPad, 3, 1);});

		NewImg((id2 = "oLilyPad_4_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:-100px;top:323px;z-index:8;", EDMove);
		Move(id2, -100, 323, GetX(i) + j.GetDX(), GetY(4) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id2)),CustomSpecial(oLilyPad, 4, 1);
			let j = oLilyPad.prototype;
			for(let i = 2; i <= 5; i++){ // 第五列，顶满
				let id, id2, x2, y2;
				NewImg((id = "oLilyPad_3_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:148px;top:283px;z-index:8;", EDMove);
				Move(id, 148, 283, GetX(i) + j.GetDX(), GetY(3) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id)), CustomSpecial(oLilyPad, 3, i)});
				NewImg((id2 = "oLilyPad_4_" + i + "_IMG"), "images/Plants/LilyPad/LilyPad.gif", "position:absolute;left:148px;top:368px;z-index:11;", EDMove);
				Move(id2, 148, 368, GetX(i) + j.GetDX(), GetY(4) - j.height + j.GetDY(), 1, 1, () => {ClearChild($(id2)), CustomSpecial(oLilyPad, 4, i)});
			}
		}); // 免费坑爹荷叶（笑）


		SetBlock($("Div_TimeTask")), GameLevelData["Start_Time"] = oSym.Now; // 提示栏、初始数据
		(function(){ // 本关数据中枢
			GameLevelData["Can_Use_Time"] = (GameLevelData["Task_Time"] - (oSym.Now - GameLevelData["Start_Time"])) / 100, GameLevelData["Sum_Num"] = oS.SunNum;
			GameLevelData["Plants_Num"] = (function(count = 0) {for (let i in $P) count += ((i = $P[i]) != null && i["C"] >= 1 && i["C"] <= oS.C && i["R"] >= 1 && i["R"] <= oS.R); return count;})();

			$("dTitle_Task").innerText = "Time: " + GameLevelData["Can_Use_Time"].toFixed(1) + "s    Plants: " + GameLevelData["Plants_Num"] + "    Sun: " + GameLevelData["Sum_Num"];
	
			if (GameLevelData["Can_Use_Time"] <= 0) return SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), GameOver("您未在规定时间内完成关卡<br>请再接再厉"); // 超时
			if (GameLevelData["Sum_Num"] > GameLevelData["Task_Sun"]) return SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), GameOver("阳光数不得大于 " + GameLevelData["Task_Sun"] + " <br>请再接再厉"); // 阳光太多
			if (GameLevelData["Plants_Num"] > GameLevelData["Task_Plant"]) return SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), GameOver("场上植物数量不得大于 " + GameLevelData["Task_Plant"] + " 株 <br>请再接再厉"); // 植物太多

			! oS.Is_End && oSym.addTask(10, arguments.callee, []);
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

			AutoProduceSun(25);

			oSym.addTask(1000, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);

			oS.Summon_Start_Func();

			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "您可以点击上方灰白数据面板重新查看本关目标！"}, EDMove);
			oSym.addTask(250, function() {ClearChild($("DivTeach"));}, []);
		});
	},
	NormalFlagZombieTask: 100, //平均僵尸出现间隔
	BigFlagZombieTask: 10 //大波僵尸间隔
}, {
	AZ: [[oZombie, 1, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], [oPoleVaultingZombie, 2, 3] , [oConeheadZombie, 2, 4], [oBucketheadZombie, 2, 6], [oNewspaperZombie, 2, 10], [oScreenDoorZombie, 3, 1, [1, 10]], [oFootballZombie, 2, 11, [1, 10, 11]], [oDancingZombie, 2, 15], [oDuckyTubeZombie1, 2, 1], [oDuckyTubeZombie2, 1, 4], [oDuckyTubeZombie3, 1, 6], [oDolphinRiderZombie, 1, 10, [10, 10]], [oSnorkelZombie, 1, 5, [8]], [oZomboni, 1, 20, [10, 20]], [oJackinTheBoxZombie, 1, 15, [10]]],
	FlagNum: 30,
	FlagToSumNum: {
		a1: [    1, 3, 5, 7,  9, 10, 13, 15, 16, 17, 18,  19, 20, 22,  24,  26,  27,  28,  29],
		a2: [11, 5, 6, 8, 9, 39, 13, 17, 24, 30, 37, 46, 150, 59, 83, 109, 139, 160, 190, 600]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowFinalWave, 0]
	},
	FlagMaxWaitTime: 1000000, // 最多等待 10000 秒再出下一波僵尸
	FlagZombieWaitTime: 100, // 如果这一波有僵尸死亡，那么 1 秒钟内出下一波
	FlagToEnd: function() {
		GameLevelData["Can_Use_Time"] = (GameLevelData["Task_Time"] - (oSym.Now - GameLevelData["Start_Time"])) / 100, GameLevelData["Sum_Num"] = oS.SunNum, oS.Is_End = true;
		GameLevelData["Plants_Num"] = (function(count = 0) {for (let i in $P) count += ((i = $P[i]) != null && i["C"] >= 1 && i["C"] <= oS.C && i["R"] >= 1 && i["R"] <= oS.R); return count;})();

		$("dTitle_Task").innerText = "Time: " + GameLevelData["Can_Use_Time"].toFixed(1) + "s    Plants: " + GameLevelData["Plants_Num"] + "    Sun: " + GameLevelData["Sum_Num"];

		$("DivA") && SetNone($("DivA"));
	
		if (GameLevelData["Can_Use_Time"] <= 0) return SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), GameOver("您未在规定时间内完成关卡<br>请再接再厉"); // 超时
		if (GameLevelData["Sum_Num"] > GameLevelData["Task_Sun"]) return SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), GameOver("阳光数不得大于 " + GameLevelData["Task_Sun"] + " <br>请再接再厉"); // 阳光太多
		if (GameLevelData["Sum_Num"] < GameLevelData["Task_FlagEndSun"]) return SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), GameOver("您所拥有阳光数量未达标 <br>请再接再厉"); // 阳光太少
		if (GameLevelData["Plants_Num"] > GameLevelData["Task_Plant"]) return SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), GameOver("场上植物数量不得大于 " + GameLevelData["Task_Plant"] + " 株 <br>请再接再厉"); // 植物太多

		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDMove, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDMove);
		Win_Travel(7, 8);
	}
},{
	GameLevelData: {
		"Plants_Num": 0,
		"Sum_Num": 0,
		"Can_Use_Time": Infinity,
		"Start_Time": 0,
		"Task_FlagEndSun": 750,
		"Task_Sun": 1000,
		"Task_Plant": 15,
		"Task_Time": 25 * 60 * 100
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
		console.log("暂停了游戏"), AllAudioPaused(), PlayAudio("tap"), SummonNewBlock("<font size=\"4\" style=\"line-height:2.25\">关卡目标: 1.必须在 25 分钟内通关<br>2.阳光数不得大于 1000<br>3.游戏结束时阳光数不得低于 750<br>4.不得拥有超过 15 株植物<br><br></font>", AllAudioPauseCanceled, "点击继续游戏");
	}
});



/*
追赶者
关卡目标：
	1.必须在 25 分钟内通关
	2.阳光数不得大于 1000
	3.游戏结束时阳光数不得低于 750
	4.不得拥有超过 15 株植物

关卡特性：
	1.不打完本波僵尸将不会出下一波
	2.本关出怪量巨大
*/