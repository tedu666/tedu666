(function(){
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
		CanChange = false, !f && ++NowLevel, AllAudioPauseCanceled(), oSym.Start(), oCv["Gradient_Rect"](0, [[1, 150]], oSym["NowStep"], [0, 0, 0], () => {
			SelectModal(oS.Lvl), oS.NowLevel = NowLevel, oS.Plant_Ground = PG, oCv && oCv["__Delete__"] && oCv["__Delete__"]();
		});
		LevelStore["MaxPlay"] = Math.max(LevelStore["MaxPlay"], NowLevel), oLocalVar["SaveVar"](); // 确认最大游玩关卡
	};

// ====================================================================================================

	let oSys = { // oS初始默认
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage, oMelonPult],
		ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp],
		PicArr: ["new_skin/InterFace/background_new_3.png"], backgroundImage: "new_skin/InterFace/background_new_3.png",
		LevelName: "EX-10 勇闯者", LvlEName: "EX_End_Pool_10", StartGameMusic: "nice_graveyard",
		GroundType: 1, MusicMode: 1, CanSelectCard: 1, LF: [0, 1, 1, 1, 1, 1, 1], AddZombiesWaitTime: 1500, 
		SunNum: 750, DKind: 0, Coord: 200, LevelProduce: "阶段性挑战，祝君好运", Block_Level_Task: "",
		LoadAccess: function(Callback_Start) {
			oS.GroundType ? ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool_block.png">') : ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool.gif">');
			NewEle("Div_TimeTask", "div", "display:none;z-index:205;top:10px;left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDMove);
			NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
			
			if ($User.VersionName == "LAS") EDMove.style.left = "115px"; // LAS特有版本判断;
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
			oS.Plant_Ground && (() => {let i, t; for (i in oS.Plant_Ground) t = oS.Plant_Ground[i], t[2] >= -1 && CustomSpecial(t[0], t[1], t[2], true);})();
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
				PName: [oPeashooter, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage, oMelonPult],
				Block_Level_Task: "<a style=\"font-size:18px;line-height:2.25;\">阶段目标: 1.场上植物不得超过 7 种<br>2.每行不得超过 6 棵植物<br>2.每列与每条斜线不得超过 5 棵植物<br>失败将从当前阶段重新开始<br><br></a>",
				LevelName: "EX-10 勇闯者 - 什伍连坐", SelectCardList: [], DefLoad2: () => { for (let i of oS.SelectCardList) SelectCard(i, 1); },
				DefStartLoad: () => { },
				LF: [0, 1, 1, 2, 2, 1, 1], RefuseStart: true, Cheat_Mode: false,
				GroundType: 0, SunNum: 4000, LargeWaveFlag: { 15: $("imgFlag1") },
				Summon_Start_Func: function() {
					oS.Cheat_Mode = true; // 无冷却
					NewEle("DivTeach", "div", "pointer-events:none;line-height:40px;", {innerHTML: "先种植植物，准备好后点击右上角开始按钮开始战斗！"}, EDMove);
					oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
					// 开始战斗按钮
					NewEle("Div_Start", "div", "display:none;z-index:205;top:50px;left:735px;position:absolute;width:157.5px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){ SetNone($("Div_Start")), oP.AddZombiesFlag(), SetVisible($("dFlagMeterContent")), StopMusic(), PlayMusic(oS.LoadMusic = "True_Admin"), oS.Cheat_Mode = false; }}, EDMove);
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
				PName: [oLandTool, oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage, oMelonPult], 
				ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oNewspaperZombie, oScreenDoorZombie, oDancingZombie, oBucketheadZombie, oZomboni, oPoleVaultingZombie, oJackinTheBoxZombie, oFootballZombie, oImp, oDiggerZombie, oBackupDancer], 
				Block_Level_Task: "<a style=\"font-size:15px;line-height:1.8;position:relative;top:-10px;\">领地争霸：1.需要用道具清理霉菌扩充领地，扩充仅能扩充领地周围的霉菌，失去后可重新扩充<br>2.当僵尸踩踏到领地时，将占领该格并摧毁你的领地，若有植物优先摧毁植物，摧毁后才能占领该格。<br>4.第五列三四行为大本营，若领地不与大本营联通将直接失去该领地并摧毁领地上植物，大本营不会被摧毁。<br>失败将从当前阶段重新开始<br></a>",
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
				FlagToEnd: () => { Change_Level(0); }, 
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
				关键词: 砸罐子、耐久赛、超长赛、僵尸按规定死亡获得一定阳光
				玩法: 砸罐子，共100轮，每轮需要以特定方式杀死僵尸获得阳光，收集 1000 阳光通关
	
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
				第十关: 6 ~ 9列僵尸罐子: { 路障: 1, 3, 4, 6 + 路障: 2_5, 5_5 + 撑杆: 2_6, 5_6 } + 植物罐子透视: { 大喷菇 * 2 + 曾哥 * 2 }

				// 第三小节: 随机排列
				第十一关: 6 ~ 9列, 普通罐子: { 普僵 * 2 + 路障 * 2 + 小丑 * 1 + 反向双发 * 5 + 火炬树桩 * 3 + 高坚果 * 3 + 倭瓜 * 3 } + 植物罐子: { 路灯花 * 2 } + 僵尸罐子: { 铁桶 * 3 }
				第十二关: 6 ~ 9列, 普通罐子: { 小丑 * 2 + 铁桶 * 1 + 路障 * 3 + 普僵 * 5 + 反向双发 * 6 + 坚果 * 1 } + 植物罐子: { 大嘴花 * 2 + 土豆地雷 * 1 } + 僵尸罐子: { 橄榄球 * 2 + 舞王 * 1 }
				第十三关: 3 ~ 9列, 普通罐子: { 小丑 * 12 + 铁桶 * 3 + 普僵 * 2 + 路障 * 3 + 坚果 * 4 + 大嘴花 * 6 + 地刺 * 3 + 杨桃 * 2 + 胆小 * 2 } + 植物罐子: { 寒冰蘑 * 2 } + 僵尸罐子: { 舞王 * 3 }
				第十四关: 3 ~ 9列, 普通罐子: {  } + 植物罐子: {  } + 僵尸罐子: {  }
				第十五关: 2 ~ 9列, 普通罐子: {  } + 植物罐子: {  } + 僵尸罐子: {  }


				// 第四小节: 迷雾砸罐（盲砸）

				4 * 6 = 24 罐子

			当局者迷，旁观者清。 ——创作者注
		*/
		3: () => {
			oS.Init($FJ(oSys, {
				PName: [oPeashooter, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage, oMelonPult],
				Block_Level_Task: "<a style=\"font-size:18px;line-height:2.25;\">阶段目标: 1.场上植物不得超过 7 种<br>2.每行不得超过 6 棵植物<br>2.每列与每条斜线不得超过 5 棵植物<br>失败将从当前阶段重新开始<br><br></a>",
				LevelName: "EX-10 勇闯者 - 铁人得智", SelectCardList: [], DefLoad2: () => { for (let i of oS.SelectCardList) SelectCard(i, 1); },
				DefStartLoad: () => { },
				LF: [0, 1, 1, 2, 2, 1, 1], RefuseStart: true, Cheat_Mode: false,
				GroundType: 0, SunNum: 4000, LargeWaveFlag: { 15: $("imgFlag1") },
				Summon_Start_Func: function() {
					oS.Cheat_Mode = true; // 无冷却
					NewEle("DivTeach", "div", "pointer-events:none;line-height:40px;", {innerHTML: "先种植植物，准备好后点击右上角开始按钮开始战斗！"}, EDMove);
					oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
					// 开始战斗按钮
					NewEle("Div_Start", "div", "display:none;z-index:205;top:50px;left:735px;position:absolute;width:157.5px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){ SetNone($("Div_Start")), oP.AddZombiesFlag(), SetVisible($("dFlagMeterContent")), StopMusic(), PlayMusic(oS.LoadMusic = "True_Admin"), oS.Cheat_Mode = false; }}, EDMove);
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

/*
			alert("恭喜您通过了本关的第一、第二部分！\n未来会制作第三部分，所以游戏已经保存了您的进度啦！\n未来直接进入本关选择第三部分即可！\n感谢您的支持！");
			oS.Init({ LvlClearFunc: () => {delete oS.NowLevel; delete oS.Plant_Ground;} }, {}, {});
			SelectModal(__Normal_Start_Room__);
*/
		}, 
		4: () => { // 原本的僵尸半场可能会推迟到第四部分

		}, 
		"ChooseLevel": () => {
			oS.Init($FJ(oSys, {
				AutoPlayMusic: false, 
				LoadAccess: function () {
					NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=22636605.mp3", audioname: "EX10-WaitMusic", loop: true});
					StopMusic(), PlayMusic(oS.LoadMusic = "EX10-WaitMusic");

					NewEle("dChosePanel", "div", "display:block;position:absolute;left:0px;top:0px", 0, EDAll, {"class":"Almanac_ZombieBack"});
					NewEle("dChoseTitle", "div", "position:relative;text-align:center;line-height:88px;height:88px;left:35%;width:30%;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;cursor:pointer;", { innerHTML: "选 择 阶 段", onclick: () => window["open"]("https://www.bilibili.com/video/av680890718/"), "title": "幻想万花镜" }, $("dChosePanel"), { "class":"dRiddleTitle" });

					NewEle("dBack", "div", "position:absolute;width:89px;height:26px;top:564px;left:700px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && SelectModal(__Normal_Start_Room__); }, innerText: "返 回" }, EDAll, {"class": "button"});
					NewEle("dOpen", "div", "position:absolute;width:89px;height:26px;top:564px;left:100px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { Genshin_Open(); }, innerText: "启 动" }, EDAll, {"class": "button"});

					NewEle("dLevelADiv", "div", "left:100px;top:225px;background-image:url(new_skin/InterFace/background_new_3.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;", { onclick: function() { CanChange && (NowLevel = 1), Change_Level(1); } }, EDAll);
					NewEle("dLevelATXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;position:relative;top:15px;", { innerHTML: "第一部分: 什伍连坐<br><font style=\"font-size:20px\">点此进入</font>" }, $("dLevelADiv"));

					NewEle("dLevelBDiv", "div", "left:487.5px;top:225px;background-image:url(new_skin/InterFace/background_new_3.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;", { onclick: function() { CanChange && (NowLevel = 2), Change_Level(1); } }, EDAll);
					NewEle("dLevelBTXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;position:relative;top:15px;", { innerHTML: "第二部分: 领地争霸<br><font style=\"font-size:20px\">点此进入</font>" }, $("dLevelBDiv"));

					SetVisible($("dMenu")); // 显示菜单按钮
				}
			}), $FJ(oPlt, {}), $FJ(oWin, {
				"Genshin_Open": () => {
					if (!CanChange) return;
					let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 115}, Height: 600, Width: 1800}, EDAll);
					console.log("原神，启动！"), StopMusic(), CanChange = false, oCv.Gradient_Rect(0, [[1, 300]], oSym["NowStep"], [255, 255, 255], () => {
						NewEle("dVideo", "video", "position:absolute;width:1100px;height:600px;top:0px;left:-100px;z-index: 125", { preload: "auto", autoplay: "autoplay", controlsList: "nodownload nofullscreen noremoteplayback", src: "https://kac-jspvz.rth1.app/online/audio/启动.mp4", onended: () => {
							let oCv2 = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 130}, Height: 600, Width: 1800}, EDAll);
							oCv2.Gradient_Rect(0, [[1, 300]], oSym["NowStep"], [0, 0, 0], () => SelectModal(__Normal_Start_Room__));
						}}, EDAll);
					});
				}
			}));
		}, 
		"default": () => (oS.Init({ LvlClearFunc: function() {delete oS.NowLevel; delete oS.Plant_Ground;} }, {}, {}), SelectModal(__Normal_Start_Room__), true)
	})();

	// (NowLevel <= 5) && (SelectModal(oS.Lvl), oS.NowLevel = NowLevel); // 下一阶段
})();