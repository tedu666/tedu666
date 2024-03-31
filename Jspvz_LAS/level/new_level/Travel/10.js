(function(){
	let EDGet = () => $User.VersionName == "LAS" ? EDMove : EDAll;
	let NewSkinUrl = $User.VersionName == "LAS" ? "new_skin/Images/" : "new_skin/";
	let LevelStore = oLocalVar.GetObj("EX_End_Pool_10"), CanChange = true;
	let NowLevel = (oS.NowLevel != null) ? (oS.NowLevel) : ("ChooseLevel"); // 当前等级
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
		if (!CanChange) return; // 已经切换过程中了，禁止切换
		let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 255}, Height: 600, Width: 1800}, EDAll), PG = oS.Plant_Ground;
		// !f && (oS.Plant_Ground = Object["values"]($P)["map"]((f) => [window[f.EName], f.R, f.C]));
		CanChange = false, !f && ++NowLevel, AllAudioPauseCanceled(), oSym.Start(), oCv["Gradient_Rect"](0, [[1, 125]], oSym["NowStep"], [0, 0, 0], () => {
			SelectModal(oS.Lvl), oS.NowLevel = NowLevel, oS.Plant_Ground = PG, oCv && oCv["__Delete__"] && oCv["__Delete__"]();
		});
		if (!isNaN(NowLevel)) LevelStore["MaxPlay"] = Math.max(LevelStore["MaxPlay"], NowLevel), oLocalVar["SaveVar"](); // 确认最大游玩关卡
	};

// ====================================================================================================

	let oSys = { // oS初始默认
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro],
		ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp],
		PicArr: [NewSkinUrl + "InterFace/background_new_3.png"], backgroundImage: NewSkinUrl + "InterFace/background_new_3.png",
		LevelName: "EX-10 勇闯者", LvlEName: "EX_End_Pool_10", StartGameMusic: "nice_graveyard",
		GroundType: 1, MusicMode: 1, CanSelectCard: 1, LF: [0, 1, 1, 1, 1, 1, 1], AddZombiesWaitTime: 1500, 
		SunNum: 750, DKind: 0, Coord: 200, LevelProduce: "阶段性挑战，祝君好运", Block_Level_Task: "",
		LoadAccess: function(Callback_Start) {
			oS.GroundType ? ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool_block.png">') : ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool.gif">');
			NewEle("Div_TimeTask", "div", "display:none;z-index:205;top:10px;left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDGet());
			NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
			
			if ($User.VersionName == "LAS") EDGet().style.left = "115px"; // LAS特有版本判断;
			let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 24}, Height: 600, Width: 1800}, EDAll);
			oS.DefLoad && oS.DefLoad(), oCv.Gradient_Rect(1, [[1, 5]], oSym["NowStep"], [0,0,0]), SummonNewBlock(oS.Block_Level_Task, () => oCv["Gradient_Rect"](1, [[0, 100]], oSym["NowStep"], [0, 0, 0], () => {oCv && oCv["__Delete__"] && oCv["__Delete__"](), Callback_Start(), oS.DefLoad2 && oS.DefLoad2();}));
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
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			PrepareGrowPlants(function() {
				(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic)), oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
				for(let i in ArCard) DoCoolTimer(i,0);
				!oS.RefuseStart && oSym.addTask(oS.AddZombiesWaitTime, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]); oS.Summon_Start_Func();
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
			if (a == "") return f && f();
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
		}, 
		Change_Level: Change_Level
	}; 

// ====================================================================================================

	LevelStore["MaxPlay"] ??= 1; // 确认最大游玩关卡
	if (NowLevel == "ChooseLevel" && LevelStore["MaxPlay"] == 1) {
		NowLevel = 1;
		// let ret = Number(prompt("检测到您之前打到了本关第 " + LevelStore["MaxPlay"] + " 部分，现您可以选择跳转到 1 ~ " + LevelStore["MaxPlay"] + " 部分。\n请输入跳转部分的数字以跳转，取消或填写内容不对默认继续第一部分。"));
		// if (ret >= 1 && ret <= LevelStore["MaxPlay"]) NowLevel = ret;
	}


// ——关卡区——
	$SEql(NowLevel, { // 每个阶段对应不同函数

		// 第一部分 什伍连坐
		1: () => {
			oS.Init($FJ(oSys, {
				PName: [oPeashooter, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro],
				Block_Level_Task: "<a style=\"font-size:18px;line-height:2.25;\">阶段目标: 1.场上植物不得超过 7 种<br>2.每行不得超过 6 棵植物<br>3.每列与每条斜线不得超过 5 棵植物<br>失败将从当前阶段重新开始<br><br></a>",
				LevelName: "EX-10 勇闯者 - 什伍连坐", SelectCardList: [], DefLoad2: () => { for (let i of oS.SelectCardList) SelectCard(i, 1); },
				DefStartLoad: () => { },
				LF: [0, 1, 1, 2, 2, 1, 1], RefuseStart: true, Cheat_Mode: false,
				GroundType: 0, SunNum: 4000, LargeWaveFlag: { 15: $("imgFlag1") },
				Summon_Start_Func: function() {
					oS.Cheat_Mode = true; // 无冷却
					NewEle("DivTeach", "div", "pointer-events:none;line-height:40px;", {innerHTML: "先种植植物，准备好后点击右上角开始按钮开始战斗！"}, EDGet());
					oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
					// 开始战斗按钮
					NewEle("Div_Start", "div", "display:none;z-index:205;top:50px;left:735px;position:absolute;width:157.5px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){ SetNone($("Div_Start")), oP.AddZombiesFlag(), SetVisible($("dFlagMeterContent")), StopMusic(), PlayMusic(oS.LoadMusic = "True_Admin"), oS.Cheat_Mode = false; }}, EDGet());
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
					a2: [0, 20, 40, 50, 70, 110, 150, 180, 270]
				},
				FlagToMonitor: {
					14: [ShowFinalWave, 0]
				},
				FlagToEnd: () => { Change_Level(0); }
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


		// 第二部分 领地争霸
		/*
			设计思路: 为每个格子创建霉菌图
			通过改变霉菌图的隐藏情况来处理其显示问题，随后就是僵尸和植物的领地占领问题，对于道具直接占用你一个卡槽，也就是玩家必须9槽通关。
		*/
		2: () => { 
			let oLandTool = InheritO(oFlowerPot, {
				EName: "oLandTool", CName: "扩充领地", HP: Infinity,
				Tooltip: "可以花费阳光扩充领地", SunNum: 200, coolTime: 0, CanSelect: 1, 
				CanGrow: () => true, 
				PrivateBirth: function (self) {
					SetFieldBlock(self.R, self.C, true);

					oSym.addTask(0, () => { // 异步执行
 						self.Die(false), OwnLand[self.R + "_" + self.C] = "Free";
						for (let Q = 0; Q < MAX_PLT_INDEX; ++Q) { // 判断是否还有其他植物
							let Obj = oGd.$[self.R + "_" + self.C + "_" + Q], Ele = $(Obj?.id); if (!Obj) continue;
							OwnLand[self.R + "_" + self.C] = "Planting";
						}
					});
				} 
			});

			oS.Init($FJ(oSys, {
				PName: [oLandTool, oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro], 
				ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oNewspaperZombie, oScreenDoorZombie, oDancingZombie, oBucketheadZombie, oZomboni, oPoleVaultingZombie, oJackinTheBoxZombie, oFootballZombie, oImp, oDiggerZombie, oBackupDancer], 
				Block_Level_Task: "<a style=\"font-size:15px;line-height:1.8;position:relative;top:-10px;\">领地争霸：1.需要用道具清理霉菌扩充领地，扩充仅能扩充领地周围的霉菌，失去后可重新扩充<br>2.当僵尸踩踏到领地时，将占领该格并摧毁你的领地，若有植物优先摧毁植物，摧毁后才能占领该格。<br>3.第五列三四行为大本营，若领地不与大本营联通将直接失去该领地并摧毁领地上植物，大本营不会被摧毁。<br>失败将从当前阶段重新开始<br></a>",
				LevelName: "EX-10 勇闯者 - 领地争霸", SelectCardList: ["oLandTool"], AddZombiesWaitTime: 4500, 
				DefLoad: () => {
					for (let R = 1; R <= oS.R; ++R) {
						for (let C = 1; C <= oS.C; ++C) ___Template__Summon_Ban_Block___(R, C), BanBlockEleList[R + "_" + C] = $(oGd.$Creator_Def[R + "_" + C].id), oGd.$Creator_Def[R + "_" + C] = null
					}
					AppearTombstones(7, 7, 3), AppearTombstones(4, 4, 2);
				}, 
				DefLoad2: () => { 
					for (let O in OwnLand) FadeImg(BanBlockEleList[O], 0);

					CtkConnect(); // 检查连通性

					for (let i of oS.SelectCardList) SelectCard(i, 1); 
				},
				DefStartLoad: () => { oS.InitLawnMower(); },
				LF: [0, 1, 1, 1, 1, 1, 1], RefuseStart: false, Cheat_Mode: false,
				GroundType: 1, SunNum: 2000, LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag2"), 30: $("imgFlag1") },
				Summon_Start_Func: function() {
					SetBlock($("Div_TimeTask"), $("Div_Start")); // 提示栏、初始数据

					let StartTime = oSym.Now;

					(function(){ // 本关数据中枢
						for (let O in $Z) { // 遍历每个僵尸
							let Z = $Z[O], R = Z.R, C = GetC(Z.ZX), Str = R + "_" + C; // 确定格子
							if (OwnLand[Str] == "Free" && Z.Altitude == 1) DestoryPlnats(R, C), delete OwnLand[Str], FadeImg(BanBlockEleList[Str], 1);
						}

						CtkConnect(); // 检查连通性

						let A = Object.keys(OwnLand).length, B = ((oSym.Now - StartTime) / 100).toFixed(1);

						$("dTitle_Task").innerText = "领地数量: " + A + "        Time: " + B + "s        NowFlag: " + oP["FlagZombies"];

						oSym.addTask(10, arguments.callee, []);
					})();
				}, 
				UserDefinedFlagFunc: function () {
					var a = oP.FlagZombies;
					switch (a) {
						case 1: oP.SetTimeoutTomZombie([oImp, oConeheadZombie]); break;
						case 10: AppearTombstones(4, 7, 1); break;
						case 20: AppearTombstones(6, 9, 1); break;
						case 25: AppearTombstones(6, 9, 3); break;
						case 27: AppearTombstones(1, 9, 3); break;
						case 28: oP.SetTimeoutTomZombie([oPoleVaultingZombie]); break;
						case 30: oP.SetTimeoutTomZombie([oPoleVaultingZombie, oFootballZombie, oBucketheadZombie]); break;
					}
				}
			}), $FJ(oPlt, {				
				AZ: [
						[oZombie, 1, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], [oConeheadZombie, 2, 1], 
						[oNewspaperZombie, 1, 5], [oScreenDoorZombie, 2, 8, [6, 6, 6]], [oDancingZombie, 2, 11, [11]], 
						[oBucketheadZombie, 3, 15], [oZomboni, 1, 19, [8, 16, 20]], [oPoleVaultingZombie, 2, 18, [3, 10, 10, 10]], 
						[oJackinTheBoxZombie, 2, 20, [8, 10, 20, 20, 20, 20, 20]], [oFootballZombie, 2, 24, [10, 10, 10, 24, 24, 24, 24]], 
						[oDiggerZombie, 3, 100, [7, 7, 7, 7, 7, 7, 9, 9, 9, 21, 21, 21, 21, 21, 21, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]], [oImp, 1, 100]
					],
				FlagNum: 30, FlagToSumNum: {
					a1: [   1, 2, 4,  5, 6,  7,  9, 10, 11, 14, 15, 16, 19, 20, 21, 23, 24, 25, 26, 27, 28,  29],
					a2: [0, 5, 7, 9, 15, 0, 15, 40, 15, 22, 26, 28, 30, 52, 30, 33, 36, 20, 40, 46, 50, 55, 110]
				},
				FlagToMonitor: {
					9: [ShowLargeWave, 0], 
					19: [ShowLargeWave, 0], 
					29: [ShowFinalWave, 0]
				},
				FlagToEnd: () => {
					oLocalVar.GetObj("EX_End_Pool_10")["NowVaseLvl"] = "01";
					oLocalVar.SaveVar();
					Change_Level(0); 
				}, 
				FlagMaxWaitTime: 4500, 
			}), $FJ(oWin, {
				BanBlockEleList: {}, OwnLand: { "3_5": "Const", "4_5": "Const" }, 
				InitLawnMower: () => {
					for (let i = 1; i <= 6; ++i) CustomSpecial(oLawnCleaner_New, i, -1);
				}, 
				FadeImg: (Ele, Kind, CallBack = () => {}) => {
					if ($User.VersionName == "LAS") {
						SetVisible(Ele), oEf.Animate(Ele, [{ "opacity": (Kind ? 0: 1) }, { "opacity": (Kind ? 1: 0) }], 0.2, "linear", () => {
							(Kind ? SetVisible(Ele) : SetHidden(Ele)), Ele.style.opacity = 1, CallBack();
						});
					} else (Kind ? SetVisible(Ele) : SetHidden(Ele)), CallBack();
				}, 
				Trigger_Ctk_Plt: (L, R, C, Obj) => {
					if (Obj.EName != "oLandTool") return !!OwnLand[R + "_" + C];
					let Ret = false, TW = [[1, 0], [0, 1], [-1, 0], [0, -1]];
					for (let O of TW) {
						if (OwnLand[(R + O[0]) + "_" + (C + O[1])]) Ret = true;
					}
					return Ret && !OwnLand[R + "_" + C];
				}, 
				Trigger_Plants_Birth: (Obj, R, C, Kind) => {
					if (OwnLand[R + "_" + C] != "Const") OwnLand[R + "_" + C] = "Planting";
				}, 
				Trigger_Plants_Die: (Obj, R, C, Kind) => {
					if (OwnLand[R + "_" + C] == "Const") return OwnLand[R + "_" + C] = "Const";
					if (OwnLand[R + "_" + C] && OwnLand[R + "_" + C] != "Const") OwnLand[R + "_" + C] = "Free";
					for (let Q = 0; Q < MAX_PLT_INDEX; ++Q) { // 判断是否还有其他植物
						let Obj = oGd.$[R + "_" + C + "_" + Q], Ele = $(Obj?.id); if (!Obj) continue;
						OwnLand[R + "_" + C] = "Planting";
					}
				}, 
				DestoryPlnats: (R, C) => { // 摧毁植物
					for (let Q = 0; Q < MAX_PLT_INDEX; ++Q) {
						let Obj = oGd.$[R + "_" + C + "_" + Q], Ele = $(Obj?.id); if (!Obj) continue;
						if (!Ele || $User.VersionName != "LAS") Obj.Die(false);
						else FadeImg(Ele, 0, () => Obj.Die(false));						
					}
				}, 
				CtkConnect: () => { // 检查连通性
					let Queue = [], Top = 0, Back = 0, TW = [[1, 0], [0, 1], [-1, 0], [0, -1]], RetMap = {};
					Queue[Back++] = [3, 5], Queue[Back++] = [4, 5];
					while (Top != Back) { // BFS;
						let T = Queue[Top++], R = T[0], C = T[1];
						if (R > oS.R || C > oS.C || R < 1 || C < 1 || !OwnLand[R + "_" + C] || RetMap[R + "_" + C]) continue;
						RetMap[R + "_" + C] = true;
						for (let O of TW) Queue[Back++] = [R + O[0], C + O[1]];				
					}
					for (let O in OwnLand) {
						if (!RetMap[O] && OwnLand[O] != "Const") DestoryPlnats(O[0], O[2]), delete OwnLand[O], FadeImg(BanBlockEleList[O], 1);
					}
				}, 
				SetFieldBlock: (R, C, Type) => { // 强制设置格子，一方面方便调试
					let Str = R + "_" + C;
					if (Type) OwnLand[Str] ??= "Free", FadeImg(BanBlockEleList[Str], 0);
					else (OwnLand[Str] != "Const") && (DestoryPlnats(R, C), delete OwnLand[Str], FadeImg(BanBlockEleList[Str], 1));
					CtkConnect(); // 检查连通性
				}, 
				oLandTool: oLandTool
			}));
		}, 


		// 第三部分 铁人得智 铁人夺冠
		/*
			EX10-3 设计概念: 
				落选关键词: 砸罐子、耐久赛、超长赛、僵尸按规定死亡获得一定阳光
				落选玩法: 砸罐子，共100轮，每轮需要以特定方式杀死僵尸获得阳光，收集 1000 阳光通关
	

				具体玩法: 共30关（目前共设计15关），玩家需要一关一关打下去，中途设有存档点
				存档点设置规则: 
					第一小节允许设置第 1 关为存档点
					第二小节允许设置第 6, 10 关为存档点
					第三小节允许设置第 11, 14, 15 关为存档点
					第四小节允许设置第 16 关为存档点

					若中途退出，那么只保留最近的一个存档点
					若玩家失败了，可以选择从最近的存档点复活继续
					若到了选关界面，玩家可以选择一个存档点往下玩

				// 第一小节: 策略（固定）
				第一关: 6 ~ 9列僵尸罐子: { 全普僵 } + 植物罐子透视: { 樱桃炸弹 * 2 }
				第二关: 6 ~ 9列僵尸罐子: { 全普僵 } + 植物罐子透视: { 火爆辣椒 + 樱桃炸弹 + 大蒜 * 3 }
				第三关: 6 ~ 9列僵尸罐子: { 全普僵 } + 植物罐子透视: { 土豆雷 + 地刺 * 2 + 南瓜头 * 3 + 大蒜 * 3 }
				第四关: 6 ~ 9列僵尸罐子: { 全气球 + 一撑杆 } + 植物罐子透视: { 三叶草 + 魅惑菇 }
				第五关: 5 ~ 7列僵尸罐子: { 全小丑 } + 植物罐子透视: { 樱桃炸弹 * 2 + 大嘴花 * 2 } + 场地植物: { 脑子: 3_6, 4_6 + 路灯花: 2_4, 5_4, 2_8, 5_8 }
	
				// 第二小节: 加入攻击性植物（固定）
				第六关: 6 ~ 9列僵尸罐子: { 全普僵 } + 植物罐子透视: { 三线射手 * 2 }
				第七关: 6 ~ 9列僵尸罐子: { 全普僵 } + 植物罐子透视: { 大蒜 * 2 + 三线射手 + 双发射手 }
				第八关: 7 ~ 9列僵尸罐子: { 普僵: 1行, 3行, 4行, 6行 + 铁桶: 2_9, 5_9 } + 植物罐子透视: { 西瓜 * 2 }
				第九关: 6 ~ 9列僵尸罐子: { 普僵: 2, 5 + 路障: 1, 3, 4, 6 } + 植物罐子透视: { 大喷菇 * 2 + 曾哥 * 2 }
				第十关: 6 ~ 9列僵尸罐子: { 路障: 1, 3, 4, 6 + 路障: 2_6, 5_6 + 撑杆: 2_7, 5_7 } + 植物罐子透视: { 大喷菇 * 2 + 曾哥 * 2 }

				// 第三小节: 随机排列
				第十一关: 6 ~ 9列, 普通罐子: { 普僵 * 2 + 路障 * 2 + 小丑 * 1 + 反向双发 * 5 + 火炬树桩 * 3 + 高坚果 * 3 + 倭瓜 * 3 } + 植物罐子: { 路灯花 * 2 } + 僵尸罐子: { 铁桶 * 3 }
				第十二关: 6 ~ 9列, 普通罐子: { 小丑 * 2 + 铁桶 * 1 + 路障 * 3 + 普僵 * 5 + 反向双发 * 6 + 坚果 * 1 } + 植物罐子: { 大嘴花 * 2 + 土豆地雷 * 1 } + 僵尸罐子: { 橄榄球 * 2 + 舞王 * 1 }
				第十三关: 3 ~ 9列, 普通罐子: { 小丑 * 12 + 铁桶 * 3 + 普僵 * 2 + 路障 * 3 + 坚果 * 4 + 大嘴花 * 6 + 地刺 * 3 + 杨桃 * 2 + 胆小 * 2 } + 植物罐子: { 寒冰蘑 * 2 } + 僵尸罐子: { 舞王 * 3 }
				第十四关: 3 ~ 9列, 普通罐子: { 寒冰射手 * 6 + 高坚果 * 2 + 南瓜头 * 2 + 地刺 * 4 + 双发 * 3 + 反向双发 * 3 + 普通僵尸 * 4 + 路障僵尸 * 2 + 小丑僵尸 * 2 + 铁桶僵尸 * 1 + 小鬼僵尸 * 1 + 撑杆僵尸 * 2 + 铁门僵尸 * 2 + 报纸僵尸 * 2 } + 植物罐子: { 大嘴花 * 2 } + 僵尸罐子: { 冰车僵尸 * 2 + 舞王僵尸 * 2 }
				第十五关: 2 ~ 9列, 普通罐子: { 大嘴花 * 1 + 魅惑菇 * 9 + 高坚果 * 1 + 倭瓜 * 2 + 地刺 * 2 + 反向双发 * 2 + 樱桃炸弹 * 1 + 双发 * 1 + 小喷菇 * 2 + 普通僵尸 * 4 + 路障僵尸 * 1 + 小丑僵尸 * 2 + 铁桶僵尸 * 2 + 撑杆僵尸 * 2 + 铁门僵尸 * 2 + 报纸 * 4 + 冰车 * 1 + 舞王 * 2 } + 植物罐子: { 土豆雷 * 3 } + 僵尸罐子: { 橄榄球僵尸 * 3 + 小鬼僵尸 * 1 }

				// 第四小节: 泳池砸罐
				第十六关: 5 ~ 9列, 普通罐子: { 反向双发 * 4 + 双发 * 3 + 寒冰 * 2 + 坚果 * 1 + 土豆雷 * 1 } + 植物罐子: { 荷叶 * 4 } + 僵尸罐子: { 撑杆 * 2 + 小鬼 * 2 + 路障 * 1 + 水路障 * 2 + 铁门 * 3 + 小丑 * 1 + 铁桶 * 1 + 水路铁桶 * 1 + 水路僵尸 * 2 }
				第十七关: 5 ~ 9列, 普通罐子: { 反向双发 * 3 + 双发 * 1 + 寒冰 * 2 + 坚果 * 1 + 窝瓜 * 1 + 三线 * 2 } + 植物罐子: { 荷叶 * 2 + 水草 * 1 } + 僵尸罐子: { 撑杆 * 2 + 小鬼 * 2 + 路障 * 1 + 铁门 * 2 + 小丑 * 1 + 铁桶 * 2 + 潜水 * 2 + 海豚 * 1 + 水路路障 * 2 + 水路铁桶 * 1 + 橄榄 * 1 }
				第十八关: 3 ~ 9列, 普通罐子: { 反向双发 * 3 + 双发 * 3 + 寒冰 * 3 + 三线 * 3 + 荷叶 * 4 } + 植物罐子: { 窝瓜 * 2 + 辣椒 * 1 } + 僵尸罐子: { 撑杆 * 4 + 小鬼 * 4 + 小丑 * 3 + 海豚 * 4 + 潜水 * 4 + 橄榄 * 2 + 舞王 * 2 }
				第十九关: 3 ~ 9列, 普通罐子: { 双发 * 4 + 寒冰 * 3 + 三线 * 3 + 荷叶 * 4 + 地刺 * 4 + 坚果 * 3 } + 植物罐子: { 高坚果 * 2 } + 僵尸罐子: { 撑杆 * 4 + 铁桶 * 2 + 小丑 * 3 + 海豚 * 3 + 铁门 * 4 + 橄榄 * 3 + 冰车 * 3 + 水路铁桶 * 3 }
				第二十关: 2 ~ 9列, 普通罐子: { 反向双发 * 3 + 双发 * 2 + 三线 * 2 + 荷叶 * 4 + 火树 * 2 + 地刺 * 2 + 坚果 * 2 + 高坚果 * 1 + 水草 * 1 } + 植物罐子: { 窝瓜 * 1 + 辣椒 * 1 } + 僵尸罐子: { 撑杆 * 4 + 小鬼 * 2 + 小丑 * 3 + 海豚 * 3 + 潜水 * 3 + 橄榄 * 3 + 舞王 * 3 + 冰车 * 2 + 铁桶 * 2 + 水路铁桶 * 2 }

				// 第五小节: 迷雾砸罐（盲砸）
				第二一关: 6 ~ 9列, F(7列, 5s), 普通罐子: {  } + 植物罐子: {  } + 僵尸罐子: {  }

			当局者迷，旁观者清。 
		*/
		3: () => {
			oLocalVar.GetObj("EX_End_Pool_10")["NowVaseLvl"] ??= "01";
			let EnterID = oLocalVar.GetObj("EX_End_Pool_10")["NowVaseLvl"]["toString"]()["padStart"](2, "0");
			let SavePart = ["01", "06", "09", "11", "14", "15", "16", "17", "18", "19", "20", Infinity]; // 存档点编号
			oLocalVar.GetObj("EX_End_Pool_10")["NowVaseLvl"] = Number(oLocalVar.GetObj("EX_End_Pool_10")["NowVaseLvl"]), oLocalVar.SaveVar();

			// 加载音乐
			let RandMusic = (ED) => ED ? ("EX10-3MusicED_" + Math.floor(Math.random() * 4 + 1)) : ("EX10-3Music0" + Math.floor(Math.random() * 2 + 1));

			NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=1990182380.mp3", audioname: "EX10-3Music01", loop: true}, { volume: 0.6 });
			NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=1990182378.mp3", audioname: "EX10-3Music02", loop: true}, { volume: 0.6 });

			NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=1990182377.mp3", audioname: "EX10-3MusicED_1", loop: true}, { volume: 0.7 });
			NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=28561005.mp3", audioname: "EX10-3MusicED_2", loop: true}, { volume: 1 });
			NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=494992638.mp3", audioname: "EX10-3MusicED_3", loop: true}, { volume: 1 });
			NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=760280.mp3", audioname: "EX10-3MusicED_4", loop: true}, { volume: 0.8 });

			oS.Init($FJ(oSys, {
				PName: [oPeashooter, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro],
				// Block_Level_Task: "<a style=\"font-size:18px;line-height:2.25;\">阶段目标: 1.场上植物不得超过 7 种<br>2.每行不得超过 6 棵植物<br>3.每列与每条斜线不得超过 5 棵植物<br>失败将从当前阶段重新开始<br><br></a>",
				Block_Level_Task: (EnterID == "01" ? "<a style=\"font-size:15px;line-height:1.8;position:relative;top:-10px;\">铁人夺冠：1.欢迎来到铁人夺冠罐子马拉松项目，您需要经理重重考验，不断通关砸罐子关卡来通过此项目。<br>2.马拉松设有存档点，若该小节为存档点标题结尾将会携带“（存档点）”字样，请注意留意。<br>3.若您中途退出游戏，可以进行选择存档点到您最近的存档点开始游玩，不必担心从头开始的问题。<br>失败将从最近的存档点重新开始，祝君好运<br></a>" : ""), 
				LevelName: "EX-10 勇闯者 - 铁人夺冠: 第 " + EnterID + " 节" + (SavePart["includes"](EnterID) ? "（存档点）" : ""), SelectCardList: [], DefLoad2: () => { for (let i of oS.SelectCardList) SelectCard(i, 1); },
				DefLoad: () => { oS.RiddleAutoGrow(); NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:250", 0, EDAll); }, 
				LF: [0, 1, 1, 1, 1, 1, 1], GroundType: 1, SunNum: 0, DKind: 0, ShowScroll: false, ProduceSun: false, StartGameMusic: RandMusic(false), 
				RiddleAutoGrow: function () {
					let Data = LevelList[EnterID];

					if (Data == null) return oS.DefLoad2 = ShowWinText, oS.StartGame = () => { ClearChild($("DivA")), StopMusic(), PlayMusic(oS.LoadMusic = oS.StartGameMusic = RandMusic(true)); };

					switch (Data["ReadType"]) {
						case 0: 
							{
								let [Left, Right] = Data["Range"], ZList = Data["ZList"], Plants = Data["Plants"], XRay = Data["XRay"];
								let ZKeys = Object.keys(ZList), GetRandom = (Arr) => Arr[Math.floor(Math.random() * Arr.length)], Index;
								for (let Str in Plants) { // 生成植物
									let [R, C, Grow] = Str["split"]("_")["map"]((X) => Number(X)), Val = Plants[Str];
									if (Grow) CustomSpecial(Val, R, C);
									else oFlowerVase_New.prototype.SpecialBirth(R, C, 1, { "Type": "Plants", "Value": Val }, (OBJ) => (OBJ.CardTime = 10000, OBJ.XRay = XRay[1], OBJ.AutoSetXRay = !XRay[1])); // 生成罐子
								}
								for (let C = Left; C <= Right; ++C) { // 生成僵尸
									for (let R = 1; R <= oS.R; ++R) {
										if (oGd.$[R + "_" + C + "_1"] != null) continue;
										Index = GetRandom(ZKeys), oFlowerVase_New.prototype.SpecialBirth(R, C, 2, { "Type": "Zombie", "Value": window[Index] }, (OBJ) => (OBJ.CardTime = 10000, OBJ.XRay = XRay[2], OBJ.AutoSetXRay = !XRay[2])); // 生成罐子
										if (--ZList[Index] <= 0) delete ZList[Index], ZKeys["splice"](ZKeys["findIndex"]((ID) => ID == Index), 1); // 删除该品种的僵尸
									}
								}
							}
							break;

						case 1:
							{
								let [Left, Right] = Data["Range"], Zombies = Data["Zombies"], Plants = Data["Plants"], XRay = Data["XRay"];
								for (let Str in Plants) { // 生成植物
									let [R, C, Grow] = Str["split"]("_")["map"]((X) => Number(X)), Val = Plants[Str];
									if (Grow) CustomSpecial(Val, R, C);
									else oFlowerVase_New.prototype.SpecialBirth(R, C, 1, { "Type": "Plants", "Value": Val }, (OBJ) => (OBJ.CardTime = 10000, OBJ.XRay = XRay[1], OBJ.AutoSetXRay = !XRay[1])); // 生成罐子
								}
								for (let Str in Zombies) { // 生成僵尸
									let [R, C] = Str["split"]("_")["map"]((X) => Number(X)), Val = Zombies[Str];
									if (Str[0] == "L") for (let I = Left; I <= Right; ++I) oFlowerVase_New.prototype.SpecialBirth(Number(Str[1]), I, 2, { "Type": "Zombie", "Value": Val }, (OBJ) => (OBJ.CardTime = 10000, OBJ.XRay = XRay[2], OBJ.AutoSetXRay = !XRay[2]));
									else oFlowerVase_New.prototype.SpecialBirth(R, C, 2, { "Type": "Zombie", "Value": Val }, (OBJ) => (OBJ.CardTime = 10000, OBJ.XRay = XRay[2], OBJ.AutoSetXRay = !XRay[2]));
								}
							}
							break;

						case 2:
							{	
								let [Left, Right] = Data["Range"], Zombies = Data["Zombies"], Plants = Data["Plants"], Greens = Data["Greens"], Blacks = Data["Blacks"], XRay = Data["XRay"];
								let LeftRound = []; for (let C = Left; C <= Right; ++C) for (let R = 1; R <= oS.R; ++R) LeftRound.push([R, C]);
								LeftRound.sort(() => Math.random() - 0.5); // 随机排序
								for (let Str in Zombies) while (--Zombies[Str] >= 0) {
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 0, { "Type": "Zombie", "Value": Val }, (OBJ) => (OBJ.CardTime = 2000, OBJ.XRay = XRay[0], OBJ.AutoSetXRay = !XRay[0]));
								}
								for (let Str in Plants) while (--Plants[Str] >= 0) {
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 0, { "Type": "Plants", "Value": Val }, (OBJ) => (OBJ.CardTime = 2000, OBJ.XRay = XRay[0], OBJ.AutoSetXRay = !XRay[0]));
								}
								for (let Str in Greens) while (--Greens[Str] >= 0) {
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 1, { "Type": "Plants", "Value": Val }, (OBJ) => (OBJ.CardTime = 2000, OBJ.XRay = XRay[1], OBJ.AutoSetXRay = !XRay[1]));
								}
								for (let Str in Blacks) while (--Blacks[Str] >= 0) {
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 2, { "Type": "Zombie", "Value": Val }, (OBJ) => (OBJ.CardTime = 2000, OBJ.XRay = XRay[2], OBJ.AutoSetXRay = !XRay[2]));
								}
							}
							break;

						case 3: 
							{
								$("tGround")["innerHTML"] = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool.gif">'; // 换成泳池
								oGd.$LF = [0, 1, 1, 2, 2, 1, 1], oGd.$ZF = [0, 1, 1, 2, 2, 1, 1]; // 设置水路
								let [Left, Right] = Data["Range"], Zombies1 = Data["Zombies1"], Zombies2 = Data["Zombies2"], Plants = Data["Plants"], Greens = Data["Greens"], XRay = Data["XRay"], KeepLilyPad = Data["KeepLilyPad"];
								let LeftRound = []; for (let C = Left; C <= Right; ++C) for (let R = 1; R <= oS.R; ++R) if (oGd.$LF[R] == 2) LeftRound.push([R, C]);
								LeftRound.sort(() => Math.random() - 0.5); // 随机排序
								for (let Str in Zombies2) while (LeftRound["length"] && --Zombies2[Str] >= 0) { // 水路僵尸处理
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 0, { "Type": "Zombie", "Value": Val }, (OBJ) => (OBJ.CardTime = 2500, OBJ.XRay = XRay[0], OBJ.AutoSetXRay = !XRay[0])).AutoSummonBase = !KeepLilyPad;
								}
								for (let Str in Plants) while (LeftRound["length"] && --Plants[Str] >= 0) { // 普通植物选择
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 0, { "Type": "Plants", "Value": Val }, (OBJ) => (OBJ.CardTime = 2500, OBJ.XRay = XRay[0], OBJ.AutoSetXRay = !XRay[0])).AutoSummonBase = !KeepLilyPad;
								}
								for (let C = Left; C <= Right; ++C) for (let R = 1; R <= oS.R; ++R) if (oGd.$LF[R] != 2) LeftRound.push([R, C]);
								LeftRound.sort(() => Math.random() - 0.5); // 随机排序
								for (let Str in Greens) while (LeftRound["length"] && --Greens[Str] >= 0) {
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 1, { "Type": "Plants", "Value": Val }, (OBJ) => (OBJ.CardTime = 2500, OBJ.XRay = XRay[1], OBJ.AutoSetXRay = !XRay[1])).AutoSummonBase = !KeepLilyPad;
								}
								for (let Str in Plants) while (LeftRound["length"] && --Plants[Str] >= 0) { // 普通植物选择
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 0, { "Type": "Plants", "Value": Val }, (OBJ) => (OBJ.CardTime = 2500, OBJ.XRay = XRay[0], OBJ.AutoSetXRay = !XRay[0])).AutoSummonBase = !KeepLilyPad;
								}
								for (let Str in Zombies1) while (LeftRound["length"] && --Zombies1[Str] >= 0) { // 水路僵尸处理
									let [R, C] = LeftRound[0], Val = window[Str]; LeftRound["splice"](0, 1);
									oFlowerVase_New.prototype.SpecialBirth(R, C, 0, { "Type": "Zombie", "Value": Val }, (OBJ) => (OBJ.CardTime = 2500, OBJ.XRay = XRay[0], OBJ.AutoSetXRay = !XRay[0])).AutoSummonBase = !KeepLilyPad;
								}
							}
					}
				}, 
				StartGame: function() {
					ClearChild($("DivA")), oP.Monitor(), SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
					StopMusic(), PlayMusic(oS.LoadMusic = oS.StartGameMusic);
					for (var i in ArCard) DoCoolTimer(i, 0);

					var f = function () { // 检测这一部分是否结束
						if (oFlowerVase.prototype.GetLevelStatus()) oP.FlagToEnd();
						else oSym.addTask(100, f, []);
					};

					f(); // f 的调用一定要在生成罐子后面
				}, 
			}), $FJ(oPlt, {
				FlagToEnd: () => { let Stores = oLocalVar.GetObj("EX_End_Pool_10"); Stores["NowVaseLvl"] = Number(Stores["NowVaseLvl"]) + 1, Stores["MaxVaseLvl"] = Math.max(Stores["NowVaseLvl"], Stores["MaxVaseLvl"]), oLocalVar.SaveVar(), Change_Level(1); }
			}), $FJ(oWin, {
				AutoSelectCard: () => SelectCard(oCherryBomb.prototype.EName), 
				LevelList: { // 存储所有关卡的信息
					// 第一部分 —— 弈
					"01": { "ReadType": 0, Range: [6, 9], ZList: { "oZombie": Infinity }, Plants: { "2_1": oCherryBomb, "5_1": oCherryBomb }, XRay: [0, 1, 1], }, 
					"02": { "ReadType": 0, Range: [6, 9], ZList: { "oZombie": Infinity }, Plants: { "1_1": oGarlic, "2_1": oGarlic, "3_1": oJalapeno, "4_1": oCherryBomb, "5_1": oFlowerPot, "6_1": oGarlic, }, XRay: [0, 1, 1], }, 
					"03": { "ReadType": 0, Range: [6, 9], ZList: { "oZombie": Infinity }, Plants: { "1_1": oPumpkinHead, "2_1": oGarlic, "3_1": oPumpkinHead, "4_1": oGarlic, "5_1": oPumpkinHead, "6_1": oGarlic, "2_2": oPotatoMine, "3_2": oSpikeweed, "4_2": oSpikeweed, "5_2": oSpikerock }, XRay: [0, 1, 1], }, 
					"04": { "ReadType": 0, Range: [6, 9], ZList: { "oBalloonZombie": 4 * 6, "oPoleVaultingZombie": 1 }, Plants: { "2_1": oBlover, "5_1": oHypnoShroom }, XRay: [0, 1, 1], }, 
					"05": { "ReadType": 0, Range: [5, 7], ZList: { "oJackinTheBoxZombie": Infinity }, Plants: { "1_1": oCherryBomb, "2_1": oCherryBomb, "5_1": oChomper, "6_1": oChomper, "3_6_1": oBrains, "4_6_1": oBrains }, XRay: [0, 1, 1], }, 

					// 第二部分 —— 战
					"06": { "ReadType": 1, Range: [6, 9], Zombies: { "L1": oZombie, "L2": oZombie, "L3": oZombie, "L4": oZombie, "L5": oZombie, "L6": oZombie }, Plants: { "2_1": oThreepeater, "5_1": oThreepeater }, XRay: [0, 1, 1], }, 
					"07": { "ReadType": 1, Range: [6, 9], Zombies: { "L1": oZombie, "L2": oZombie, "L3": oZombie, "L4": oZombie, "L5": oZombie, "L6": oZombie }, Plants: { "1_1": oGarlic, "2_1": oThreepeater, "5_1": oRepeater, "6_1": oGarlic }, XRay: [0, 1, 1], }, 
					"08": { "ReadType": 1, Range: [7, 9], Zombies: { "L1": oZombie, "L3": oZombie, "L4": oZombie, "L6": oZombie, "2_9": oBucketheadZombie, "5_9": oBucketheadZombie }, Plants: { "2_1": oMelonPult_Pro, "5_1": oMelonPult_Pro }, XRay: [0, 1, 1], }, 
					"09": { "ReadType": 1, Range: [6, 9], Zombies: { "L1": oConeheadZombie, "L2": oZombie, "L3": oConeheadZombie, "L4": oConeheadZombie, "L5": oZombie, "L6": oConeheadZombie }, Plants: { "1_1": oFumeShroom, "2_1": oGloomShroom, "5_1": oGloomShroom, "6_1": oFumeShroom }, XRay: [0, 1, 1], }, 
					"10": { "ReadType": 1, Range: [6, 9], Zombies: { "L1": oConeheadZombie, "L3": oConeheadZombie, "L4": oConeheadZombie, "L6": oConeheadZombie, "2_6": oConeheadZombie, "5_6": oConeheadZombie, "2_7": oPoleVaultingZombie, "5_7": oPoleVaultingZombie }, Plants: { "1_1": oGloomShroom, "2_1": oFumeShroom, "5_1": oFumeShroom, "6_1": oGloomShroom }, XRay: [0, 1, 1], }, 

					// 第三部分 —— 勇
					"11": { "ReadType": 2, Range: [6, 9], Zombies: { "oZombie": 2, "oConeheadZombie": 2, "oJackinTheBoxZombie": 1 }, Plants: { "oRepeater2": 5, "oTorchwood": 3, "oTallNut": 3, "oSquash": 3 }, Greens: { "oPlantern": 2 }, Blacks: { "oConeheadZombie": 3 }, XRay: [0, 1, 1], }, 
					"12": { "ReadType": 2, Range: [6, 9], Zombies: { "oJackinTheBoxZombie": 2, "oBucketheadZombie": 1, "oConeheadZombie": 3, "oZombie": 5 }, Plants: { "oRepeater2": 6, "oWallNut": 1 }, Greens: { "oChomper": 2, "oPotatoMine": 1 }, Blacks: { "oFootballZombie": 2, "oDancingZombie": 1 }, XRay: [0, 1, 1], }, 
					"13": { "ReadType": 2, Range: [3, 9], Zombies: { "oJackinTheBoxZombie": 12, "oBucketheadZombie": 3, "oZombie": 2, "oConeheadZombie": 3 }, Plants: { "oWallNut": 4, "oChomper": 6, "oSpikeweed": 3, "oStarfruit": 2, "oScaredyShroom": 2 }, Greens: { "oIceShroom": 2 }, Blacks: { "oDancingZombie": 3 }, XRay: [0, 1, 1], }, 
					"14": { "ReadType": 2, Range: [3, 9], Zombies: { "oZombie": 4, "oConeheadZombie": 2, "oJackinTheBoxZombie": 2, "oBucketheadZombie": 1, "oImp": 1, "oPoleVaultingZombie": 2, "oScreenDoorZombie": 2, "oNewspaperZombie": 2 }, Plants: { "oSnowPea": 6, "oTallNut": 2, "oPumpkinHead": 2, "oSpikeweed": 4, "oRepeater": 3, "oRepeater2": 3 }, Greens: { "oChomper": 2 }, Blacks: { "oZomboni": 2, "oDancingZombie": 2 }, XRay: [0, 1, 1], }, 
					"15": { "ReadType": 2, Range: [2, 9], Zombies: { "oZombie": 4, "oConeheadZombie": 1, "oJackinTheBoxZombie": 2, "oBucketheadZombie": 2, "oPoleVaultingZombie": 2, "oScreenDoorZombie": 2, "oNewspaperZombie": 4, "oZomboni": 1, "oDancingZombie": 2 }, Plants: { "oChomper": 1, "oHypnoShroom": 9, "oTallNut": 1, "oSquash": 2, "oSpikeweed": 2, "oRepeater2": 2, "oCherryBomb": 1, "oRepeater": 1, "oPuffShroom": 2 }, Greens: { "oPotatoMine": 3 }, Blacks: { "oFootballZombie": 3, "oImp": 1 }, XRay: [0, 1, 1], }, 

					// 第四部分 —— 斗
					"16": { "ReadType": 3, Range: [5, 9], Zombies1: { "oPoleVaultingZombie": 2, "oImp": 2, "oConeheadZombie": 1, "oScreenDoorZombie": 3, "oJackinTheBoxZombie": 1, "oBucketheadZombie": 1 }, Zombies2: { "oDuckyTubeZombie1": 2, "oDuckyTubeZombie2": 2, "oDuckyTubeZombie3": 1 }, Plants: { "oRepeater": 3, "oRepeater2": 4, "oSnowPea": 2, "oWallNut": 1, "oPotatoMine": 1 }, Greens: { "oLilyPad": 4 }, XRay: [0, 0, 0], KeepLilyPad: false }, 
					"17": { "ReadType": 3, Range: [5, 9], Zombies1: { "oPoleVaultingZombie": 2, "oImp": 2, "oConeheadZombie": 1, "oScreenDoorZombie": 2, "oJackinTheBoxZombie": 1, "oBucketheadZombie": 2, "oFootballZombie": 1 }, Zombies2: { "oDuckyTubeZombie2": 2, "oDuckyTubeZombie3": 1, "oDolphinRiderZombie": 1, "oSnorkelZombie": 2 }, Plants: { "oRepeater": 1, "oRepeater2": 3, "oSnowPea": 2, "oWallNut": 1, "oSquash": 1, "oThreepeater": 2 }, Greens: { "oLilyPad": 2, "oTangleKelp": 1 }, XRay: [0, 0, 0], KeepLilyPad: false }, 
					"18": { "ReadType": 3, Range: [3, 9], Zombies1: { "oPoleVaultingZombie": 4, "oImp": 4, "oJackinTheBoxZombie": 3, "oFootballZombie": 2, "oDancingZombie": 2 }, Zombies2: { "oDolphinRiderZombie": 4, "oSnorkelZombie": 4 }, Plants: { "oRepeater": 3, "oRepeater2": 3, "oSnowPea": 3, "oThreepeater": 3, "oLilyPad": 4 }, Greens: { "oSquash": 2, "oJalapeno": 1 }, XRay: [0, 0, 0], KeepLilyPad: false }, 
					"19": { "ReadType": 3, Range: [3, 9], Zombies1: { "oPoleVaultingZombie": 4, "oBucketheadZombie": 2, "oJackinTheBoxZombie": 3, "oScreenDoorZombie": 4, "oFootballZombie": 3, "oZomboni": 3 }, Zombies2: { "oDuckyTubeZombie3": 3, "oDolphinRiderZombie": 3 }, Plants: { "oRepeater": 4, "oSnowPea": 3, "oThreepeater": 3, "oLilyPad": 4, "oSpikeweed": 4, "oWallNut": 3 }, Greens: { "oTallNut": 2 }, XRay: [0, 0, 0], KeepLilyPad: false }, 
					"20": { "ReadType": 3, Range: [2, 9], Zombies1: { "oPoleVaultingZombie": 4, "oImp": 2, "oJackinTheBoxZombie": 3, "oFootballZombie": 3, "oDancingZombie": 3, "oZomboni": 2, "oBucketheadZombie": 2 }, Zombies2: { "oDuckyTubeZombie3": 2, "oDolphinRiderZombie": 3, "oSnorkelZombie": 3 }, Plants: { "oRepeater": 2, "oRepeater2": 3, "oThreepeater": 2, "oLilyPad": 4, "oTorchwood": 2, "oSpikeweed": 2, "oWallNut": 2, "oTallNut": 1, "oTangleKelp": 1 }, Greens: { "oSquash": 1, "oJalapeno": 1 }, XRay: [0, 0, 0], KeepLilyPad: false }, 

				}, 
				AddConfirm: (TEXT = "输入 “JSPVZ-LAS” 确认删除", Value = "JSPVZ-LAS", CallBack = () => {}) => { // 在游戏内显示一个输入框来让用户确认重要信息
					HiddenLevel(), HiddenMiniGame(1), HiddenRiddleGame(1), HiddenTravelGame(1), SetNone($("dShowMsgLogin")), SetNone($('dSurface')); // 隐藏所有界面
					let ButtonCSS = "width:150px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;";
					let DivA = NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:240", 0, EDAll);
					let dConfirm = NewEle("dConfirm", "div", "position:fixed;float:center;width:550px;height:275px;background:rgba(0,0,0,0.733);top:150px;left:0px;right:0px;margin:0 auto;border-radius:15px;z-index:250", 0, EDAll);
					let dConfirmText = NewEle("dConfirmText", "div", "position:absolute;left:25px;top:30px;font-size:23px;font-family:Regular;color:#FFFFFF;white-space:pre;", { innerHTML: TEXT }, dConfirm);
					let dConfirmInput = NewEle("dConfirmInput", "textarea", "position:absolute;left:25px;top:130px;height:40px;width:500px;font-size:20px;font-family:Regular;color:#000000;resize:none;background-color:rgb(255,255,255,0.9);border-radius:10px;line-height:1;text-align:left;padding:10px;overflow:hidden;", {}, dConfirm, { type: "text", name: "txtChat", wrap: "off", placeholder: "点击输入文字" });
					let dConfirmAccept = NewEle("dConfirmAccept", "input", ButtonCSS + "position:absolute;left:300px;top:210px;color:#00FF00;width:100px;", {}, dConfirm, { class: "ButtonStyle", value: "确认", type: "button" });
					let dConfirmCancel = NewEle("dConfirmCancel", "input", ButtonCSS + "position:absolute;left:425px;top:210px;color:#FF0000;width:100px;", {}, dConfirm, { class: "ButtonStyle", value: "取消", type: "button" });
					if (Value === "") SetHidden(dConfirmInput);
					dConfirmAccept["onclick"] = dConfirmAccept["click"] = () => { PlayAudio("tap"); if (dConfirmInput["value"] == Value) ClearChild(dConfirm, DivA), CallBack(true); };
					dConfirmCancel["onclick"] = dConfirmCancel["click"] = () => { PlayAudio("tap"), ClearChild(dConfirm, DivA), CallBack(false); };
				}, 
				AddConfirmPromise: (TEXT = "输入 “JSPVZ-LAS” 确认删除", Value = "JSPVZ-LAS") => {
					return new Promise((Resolve) => { AddConfirm(TEXT, Value, Resolve); });
				}, 
				ShowWinText: async () => {
					let Stores = oLocalVar.GetObj("EX_End_Pool_10"); 
					let Result = await AddConfirmPromise("提示: 恭喜！\n您已成功通过目前更新的所有关卡！\n游玩记录已保存，若未来有新关卡更新，\n您可以重新进入本关继续游玩！\n感谢您的支持！\n您可以按“确认”进入致谢者名单！", "");
					Stores["NowVaseLvl"] = 21, Stores["MaxVaseLvl"] = Math.max(Stores["NowVaseLvl"], Stores["MaxVaseLvl"]), oLocalVar.SaveVar(); // 保存进度
					let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 130}, Height: 600, Width: 1800}, EDAll);
					if (Result) oCv.Gradient_Rect(0, [[1, 100]], oSym["NowStep"], [0, 0, 0], () => { NowLevel = "Staff", Change_Level(1), CanChange = false; });
					else oCv.Gradient_Rect(0, [[1, 300]], oSym["NowStep"], [0, 0, 0], () => SelectModal(__Normal_Start_Room__));
				}, 

				// 存档点
				SavePart: SavePart, 
				GameOver: () => { // 当玩家失败时，跳转到最近的一个存档点
					let Stores = oLocalVar.GetObj("EX_End_Pool_10"), Index = SavePart["map"]((X) => Number(X))["findIndex"]((A) => A > Number(Stores["NowVaseLvl"])) - 1; 
					Stores["NowVaseLvl"] = Number(SavePart[Index]), Stores["MaxVaseLvl"] = Math.max(Number(Stores["NowVaseLvl"]), Stores["MaxVaseLvl"]), oLocalVar.SaveVar(), Change_Level(1);
				},
			}));
		}, 


		// 关卡选择界面
		"ChooseLevel": () => {
			oS.Init($FJ(oSys, {
				AutoPlayMusic: false, 
				LoadAccess: function () {
					NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=22636605.mp3", audioname: "EX10-WaitMusic", loop: true});
					StopMusic(), PlayMusic(oS.LoadMusic = "EX10-WaitMusic");

					// 选关界面（第一部分 ~ 第三部分）
					let dChooseLevelBox = NewEle("dChooseLevelBox", "div", "position:absolute;left:0px;top:0px;z-index:100;", 0, EDAll);
					let dChosePanel1 = NewEle("dChosePanel1", "div", "display:block;position:absolute;left:0px;top:0px", 0, dChooseLevelBox, {"class":"Almanac_ZombieBack"});
					let dChoseTitle1 = NewEle("dChoseTitle1", "div", "position:relative;text-align:center;line-height:88px;height:88px;left:35%;width:30%;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;cursor:pointer;", { innerHTML: "选 择 阶 段", onclick: () => window["open"]("https://www.bilibili.com/video/av680890718/"), "title": "幻想万花镜" }, dChosePanel1, { "class":"dRiddleTitle" });
					let dBack1 = NewEle("dBack1", "div", "position:absolute;width:89px;height:26px;top:564px;left:700px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && SelectModal(__Normal_Start_Room__); }, innerText: "返 回" }, dChooseLevelBox, {"class": "button"});
					let dOpen1 = NewEle("dOpen1", "div", "position:absolute;width:89px;height:26px;top:564px;left:100px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && Genshin_Open(); }, innerText: "启 动" }, dChooseLevelBox, {"class": "button"});
					let dStaffDiv = NewEle("dStaffDiv1", "input", "position:absolute;left:650px;top:85px;width:225px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;white-space:pre;", {"onclick": () => GotoStaffLevel() }, dChooseLevelBox, {"type": "button", "value": "点击查看制作者名单"});

					let dLevelADiv = NewEle("dLevelADiv", "div", "left:100px;top:225px;background-image:url(" + NewSkinUrl + "InterFace/background_new_3.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;", { onclick: function() { CanChange && (NowLevel = 1), Change_Level(1); } }, dChooseLevelBox);
					let dLevelATXT = NewEle("dLevelATXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;position:relative;top:15px;", { innerHTML: "第一部分: 什伍连坐<br><font style=\"font-size:20px\">点此进入</font>" }, $("dLevelADiv"));

					let dLevelBDiv = NewEle("dLevelBDiv", "div", "left:487.5px;top:225px;background-image:url(" + NewSkinUrl + "InterFace/background_new_3.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;", { onclick: function() { CanChange && (NowLevel = 2), Change_Level(1); } }, dChooseLevelBox);
					let dLevelBTXT = NewEle("dLevelBTXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;position:relative;top:15px;", { innerHTML: "第二部分: 领地争霸<br><font style=\"font-size:20px\">点此进入</font>" }, $("dLevelBDiv"));

					let dLevelCDiv = NewEle("dLevelCDiv", "div", "left:487.5px;top:225px;background-image:url(" + NewSkinUrl + "InterFace/background_new_3.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;", { onclick: function() { CanChange && ChooseSaves(); } }, dChooseLevelBox);
					let dLevelCTXT = NewEle("dLevelCTXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;position:relative;top:15px;", { innerHTML: "第三部分: 铁人夺冠<br><font style=\"font-size:20px\">点此进入</font>" }, $("dLevelCDiv"));



					// 选择第三部分存档点
					let dChooseSavesBox = NewEle("dChooseSavesBox", "div", "position:absolute;left:900px;top:0px;z-index:105;", 0, EDAll);
					let dChosePanel2 = NewEle("dChosePanel2", "div", "display:block;position:absolute;left:0px;top:0px", 0, dChooseSavesBox, {"class":"Almanac_ZombieBack"});
					let dChoseTitle2 = NewEle("dChoseTitle2", "div", "position:relative;text-align:center;line-height:88px;height:88px;left:35%;width:30%;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;cursor:pointer;", { innerHTML: "选 择 存 档", onclick: () => window["open"]("https://www.bilibili.com/video/av216455442/"), "title": "星之终途" }, dChosePanel2, { "class":"dRiddleTitle" });
					let dBack2 = NewEle("dBack2", "div", "position:absolute;width:89px;height:26px;top:564px;left:700px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && ChooseSavesCancel(); }, innerText: "返 回" }, dChooseSavesBox, {"class": "button"});
					SummonVaseList(dChooseSavesBox);


					if (LevelStore["MaxPlay"] <= 2) { // 解锁到第二关布局
						SetHidden(dLevelCDiv, dStaffDiv);
						dLevelADiv["style"]["left"] = "100px", dLevelADiv["style"]["top"] = "225px";
						dLevelBDiv["style"]["left"] = "487.5px", dLevelBDiv["style"]["top"] = "225px";
					} else if (LevelStore["MaxPlay"] >= 3) { // 解锁到第三关布局
						dLevelADiv["style"]["left"] = "295px", dLevelADiv["style"]["top"] = "130px";
						dLevelBDiv["style"]["left"] = "100px", dLevelBDiv["style"]["top"] = "330px";
						dLevelCDiv["style"]["left"] = "487.5px", dLevelCDiv["style"]["top"] = "330px";
					}

					SetVisible($("dMenu")); // 显示菜单按钮
				}
			}), $FJ(oPlt, {}), $FJ(oWin, {
				"Genshin_Open": () => {
					if (!CanChange) return;
					let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 115}, Height: 600, Width: 1800}, EDAll);
					console.log("原神，启动！"), StopMusic(), CanChange = false, oCv.Gradient_Rect(0, [[1, 300]], oSym["NowStep"], [255, 255, 255], () => {
						NewEle("dVideo", "video", "position:absolute;width:1100px;height:600px;top:0px;left:-100px;z-index: 125", { preload: "auto", autoplay: "autoplay", controlsList: "nodownload nofullscreen noremoteplayback", src: "https://kac-jspvz.rth5.com/online/audio/启动.mp4", onended: () => {
							let oCv2 = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 130}, Height: 600, Width: 1800}, EDAll);
							oCv2.Gradient_Rect(0, [[1, 300]], oSym["NowStep"], [0, 0, 0], () => SelectModal(__Normal_Start_Room__));
						}}, EDAll);
					});
				}, 
				"ChooseSaves": () => {
					if (!CanChange) return; CanChange = false, PlayAudio("tap");
					if ($User.VersionName == "LAS") {
						oEf.Animate($("dChooseSavesBox"), { "left": "0px" }, 0.6, "cubic-bezier(0.0, 0.0, 0.3, 1)", () => {
							$("dChooseLevelBox").style.left = "-900px", $("dChooseSavesBox").style.left = "0px", CanChange = true;
						});
					} else $("dChooseLevelBox").style.left = "-900px", $("dChooseSavesBox").style.left = "0px", CanChange = true;
				}, 
				"ChooseSavesCancel": () => {
					if (!CanChange) return; CanChange = false, PlayAudio("tap");
					$("dChooseLevelBox").style.left = "0px";
					if ($User.VersionName == "LAS") {
						oEf.Animate($("dChooseSavesBox"), { "left": "900px" }, 0.6, "cubic-bezier(0.3, 0.0, 0.6, 1)", () => {
							$("dChooseLevelBox").style.left = "0px", $("dChooseSavesBox").style.left = "900px", CanChange = true;
						});
					} else $("dChooseLevelBox").style.left = "0px", $("dChooseSavesBox").style.left = "900px", CanChange = true;
				}, 
				VaseSaveList: {
					"第一小节 —— 弈: ": ["01"], 
					"第二小节 —— 战: ": ["06", "09"], 
					"第三小节 —— 勇: ": ["11", "14", "15"], 
					"第四小节 —— 斗: ": ["16", "17", "18", "19", "20"],  
				}, 
				"SummonVaseList": (Ele) => { // 生成目前关卡所对应的选关
					let Part = 1, Top = 150, Left = 50; LineWei = 75, MaxValPlay = Number(LevelStore["MaxVaseLvl"]) || 1;
					for (let Val in VaseSaveList) {
						let Title = Val, Value = VaseSaveList[Val], BtnLeft = Left + 170, BtnAdd = 127.5;
						if (Number(Value[0]) > MaxValPlay) return; // 如果超过了，直接取消生成接下来的按钮
						NewEle("dPart" + Part, "div", "position:absolute;left:" + Left + "px;top:" + Top + "px;font-size:25px;font-family:Regular;color:rgb(44,35,24);white-space:pre;", { "innerHTML": Title }, Ele);
						for (let ID of Value) {
							if (Number(ID) > MaxValPlay) return; // 如果超过了，直接取消生成接下来的按钮
							let BtnEle = NewEle("dPartBtn" + Part + ID, "input", "width:120px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;position:absolute;left:" + BtnLeft + "px;top:" + (Top - 5) + "px;color:#FFFFFF;", 0, Ele, { class: "ButtonStyle", value: "第 " + ID + " 小节", type: "button" });
							BtnLeft += BtnAdd, BtnEle.onclick = (() => {
								let LvlID = Number(ID);
								return () => {
									if (!CanChange) return;
									LevelStore["NowVaseLvl"] = LvlID, oLocalVar.SaveVar(); // 保存当前 ID
									NowLevel = 3, Change_Level(1), CanChange = false;
								}
							})();
						}
						Top += LineWei, ++Part;
					}
				}, 
				"GotoStaffLevel": () => { // 去致谢名单关卡
					if (CanChange == false) return;
					NowLevel = "Staff", Change_Level(1), CanChange = false;
				}
			}));
		}, 


		// EX10 致谢名单界面
		"Staff": () => {
			oS.Init({
				PicArr: [NewSkinUrl + "InterFace/Travel_Background.png"],
				backgroundImage: NewSkinUrl + "InterFace/Travel_Background.png",
				LvlClearFunc: oSys["LvlClearFunc"], CanStartLevel: false, 
				LoadAccess: function() {
					let Staff = oS["Staff_HTML"]["join"]("");
					$("tGround")["style"] = "background:url(" + NewSkinUrl + "InterFace/Travel_Background.png) no-repeat;left:0px;top:-100px;width:900px;height:730px;background-size:100% 100%;visibility:visible;"; // 背景图片
					NewEle("dStaff_Block", "div", "visibility:visible;height:100%;width:100%;z-index:100;display:block;overflow:auto;white-space:pre;", {"className": "WindowFrame Hidden_Container Not_Chose"}, EDAll); // pointer-events:none;
					NewEle("dStaff_HTML", "div", "line-height:1;text-align:center;color:#FFFFFF;font-size:15px;font-family:RanTian,Regular,Briannetod,微软雅黑,Verdana,Tahoma;-webkit-text-stroke-width:0px;-webkit-text-stroke-color:#000000;word-break:break-all;white-space:pre;tab-size:1;", {"innerHTML": Staff}, $("dStaff_Block"));
					NewEle("dReturn", "input", "position:absolute;left:25px;top:550px;width:150px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;white-space:pre;z-index:120", {"onclick": () => GotoChooseLevel() }, EDAll, {"type": "button", "value": "返回选关"});
					let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 150}, Height: 600, Width: 900}, EDAll);
					oCv["Gradient_Rect"](1, [[0, 100]], oSym["NowStep"], [0, 0, 0], () => { oCv["__Delete__"](), SetVisible($("dMenu")), PlayAudio("tap"), oS["CanStartLevel"] = true; } );
					AllAudioStop(), PlayMusic(oS.LoadMusic = "pure_snows");
				},
				Staff_HTML: [
					'<!-- 制作名单 -->',
					'<a style="font-size:100px;-webkit-text-stroke-width:4px;"><br><br>EX10 致谢<br><br><br></a><br><br><br>',
					'<a style="font-size:30px;-webkit-text-stroke-width:1px;">（请用鼠标下滑查看）<br><br><br><br><br><br><br><br><br><br></a>',
					'',
					'<!-- EX10 - 1 关卡策划 -->',
					'<a style="font-size:70px;-webkit-text-stroke-width:2px;">EX10 - 1</a><br><a style="font-size:20px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">策划</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">创意</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">程序</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">测试</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅   snz   白鹤亮翅<br></a><br><a style="font-size:15px;">（排名不分先后，下同）</a><br>',
					'<a style="font-size:350px;"><br></a>',
					'',
					'<!-- EX10 - 2 关卡策划 -->',
					'<a style="font-size:70px;-webkit-text-stroke-width:2px;">EX10 - 2</a><br><a style="font-size:20px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">策划</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">创意</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">程序</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">测试</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅   snz   白鹤亮翅   B站的J<br></a><br>',
					'<a style="font-size:350px;"><br></a>',
					'',
					'<!-- EX10 - 3 关卡策划 -->',
					'<a style="font-size:70px;-webkit-text-stroke-width:2px;">EX10 - 3</a><br><a style="font-size:20px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">策划</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">创意</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:35px;line-height:1.3;">我是帅:  第 01 ~ 11、13 小节</a><br>', 
					'<a style="font-size:35px;line-height:1.3;">B站的J:  第 12、14、15 小节</a><br>', 
					'<a style="font-size:35px;line-height:1.3;">snz:  第 16 ~ 20 小节</a><br>', 
					'<a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">程序</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">测试</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅   snz   白鹤亮翅   B站的J<br></a><br>',
					'<a style="font-size:350px;"><br></a>',
					'',
					'<!-- 特别感谢 -->',
					'<a style="font-size:65px;line-height:1.25;-webkit-text-stroke-width:2px;">特别感谢</a><br>',
					'<a style="font-size:35px;line-height:1.5;word-spacing:1em;">snz jspvz低玩 江南游戏 白鹤亮翅<br>寒冰投手 B站的J<br>屏幕前的你</a><br><a style="font-size:225px;"><br></a>',
					'<a style="font-size:350px;"><br></a>',
					'',
					'<!-- 音乐列表，可以点击音乐播放 -->',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">本关音乐列表</a><br><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play(\'pure_snows\')">pure snows ~  ——  水月陵</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play(\'nice_graveyard\')">素敵な墓場で暮しましょ  ——  上海アリス幻樂団</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play(\'True_Admin\')">聖徳伝説 ～ True Administrator  ——  上海アリス幻樂団</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(\'22636605\')">青空の影  ——  上海アリス幻樂団</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(\'1990182380\')">Odyssey  ——  Ice</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(\'1990182378\')">Vast Forests  ——  Ice</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(\'1990182377\')">White Flower  ——  Ice</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(\'28561005\')">one\'s future  ——  Key Sounds Label</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(\'494992638\')">白色  ——  灰澈</a><br>',
					'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(\'760280\')">Saya\'s Melody  ——  麻枝准</a><br>',
					'<a style="font-size:250px;"><br></a> <!-- 大跨度 -->',
					'',
					'<a style="font-size:70px;-webkit-text-stroke-width:2px;">EX10</br></a>',
					'<a style="font-size:60px;-webkit-text-stroke-width:2px;">2023 - 2024</br></a>',
					'<a style="font-size:250px;"><br></a>',
					''
				],
			}, {}, {
				"Play": (N) => (StopMusic(oS.LoadMusic), PlayMusic(oS.LoadMusic = N)), // 播放音乐
				"Internet_URL_Music_List": ["761323", "22706973", "760979", "1319520140", "471936", "786262", "22765919", "857905", "471834", "495562302", "28219117", "461074907", "1312561189"],
				"Can_Play_Internet": true,
				"Play2": function (ID) { // 网络音乐
					if (window["Can_Play_Internet"] == false) return alert("您点击的速度太快了，请稍后再试！");
					window["Can_Play_Internet"] = false, setTimeout(() => (Can_Play_Internet = true), 2500); // 2.5秒间隔
					StopMusic(oS.LoadMusic), (delete oAudio["_OL_STAFF_Music_"]);
					NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=" + ID + ".mp3", audioname: "_OL_STAFF_Music_", loop: true}), PlayMusic(oS.LoadMusic = "_OL_STAFF_Music_");
				}, 
				"GotoChooseLevel": () => { // 返回选关界面
					if (!oS["CanStartLevel"]) return;
					console.log("感谢您的游玩！"), SelectModal(oS.Lvl), PlayAudio("tap");
				}
			});

		}, 

		"default": () => ( oS.Init({ LvlClearFunc: function() {delete oS.NowLevel; delete oS.Plant_Ground;} }, {}, {}), SelectModal(__Normal_Start_Room__), true)
	})();

	// (NowLevel <= 5) && (SelectModal(oS.Lvl), oS.NowLevel = NowLevel); // 下一阶段
})();