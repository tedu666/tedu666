// EX11 已不支持 KAC 版
(() => { 
	let EDGet = () => EDMove, NewSkinUrl = "new_skin/Images/";
	let LevelStore = oLocalVar.GetObj("EX_Pool_11"), CanChange = true;
	let NowLevel = (oS.NowLevel != null) ? (oS.NowLevel) : ("ChooseLevel"); // 当前阶段
	let $FJ = __Template_ReSet_Object__, FullLevelStore = (Obj) => { // 补全当前关卡数据，防止读取错误
		Obj["MaxPlay"] ??= 1;
		oLocalVar["SaveVar"]();
	};

// ====================================================================================================

	let Change_Level = (f) => { // 切换阶段
		if (!CanChange) return; // 已经切换过程中了，禁止切换
		let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 255}, Height: 600, Width: 1800}, EDAll);
		CanChange = false, !f && !isNaN(NowLevel) && ++NowLevel;
		if (oSym.Timer == null) AllAudioPauseCanceled(), oSym.Start();
		oCv["Gradient_Rect"](0, [[1, 125]], oSym["NowStep"], [0, 0, 0], () => {
			SelectModal(oS.Lvl), oS.NowLevel = NowLevel, oCv && oCv["__Delete__"] && oCv["__Delete__"]();
		});
		if (!isNaN(NowLevel)) LevelStore["MaxPlay"] = Math.max(LevelStore["MaxPlay"], NowLevel), oLocalVar["SaveVar"](); // 确认最大游玩关卡
	};

// ====================================================================================================

	let oSys = { // oS初始默认
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro], 
		ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp], 
		PicArr: [NewSkinUrl + "InterFace/background_new_4.png"], backgroundImage: NewSkinUrl + "InterFace/background_new_4.png", 
		LevelName: "EX-11 禁区", LvlEName: "EX_Pool_11", StartGameMusic: "Cherry_Blossoms", 
		GroundType: 1, MusicMode: 1, CanSelectCard: 1, LF: [0, 1, 1, 1, 1, 1, 1], AddZombiesWaitTime: 1500, 
		SunNum: 750, DKind: 0, Coord: 200, LevelProduce: "阶段性挑战，祝君好运", Block_Level_Task: [""],
		LoadAccess: function(Callback_Start) {
			oS.GroundType ? ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);opacity:1;filter:saturate(0%);" src="images/New_interface/pool_block.png">') : ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);opacity:1;filter:saturate(0%);" src="images/New_interface/pool.gif">');
			NewEle("Div_TimeTask", "div", "display:none;z-index:205;top:10px;left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDGet());
			NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
			EDGet().style.left = "115px"; // 调整位置
			let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 24}, Height: 600, Width: 1800}, EDAll);
			oS.DefLoad && oS.DefLoad(), oCv.Gradient_Rect(1, [[1, 5]], oSym["NowStep"], [0,0,0]), SetArrBlockText(oS.Block_Level_Task, () => oCv["Gradient_Rect"](1, [[0, 100]], oSym["NowStep"], [0, 0, 0], () => {oCv && oCv["__Delete__"] && oCv["__Delete__"](), Callback_Start(), oS.DefLoad2 && oS.DefLoad2();}));
		},
		InitLawnMower: function() {
			CustomSpecial(oLawnCleaner_New, 1, -1),	CustomSpecial(oLawnCleaner_New, 2, -1), CustomSpecial(oLawnCleaner_New, 3, -1);
			CustomSpecial(oLawnCleaner_New, 4, -1), CustomSpecial(oLawnCleaner_New, 5, -1), CustomSpecial(oLawnCleaner_New, 6, -1);

			let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;

			for (let i = 1, j; i <= oS.R; ++i) j = oGd.$[i + "_-1_1"], j && oEf.Animate($(j.id), [{"left": "-100px"}, {"left": $(j.id).style.left + "px"}], 1.2 / TimeDouble, "ease-out");
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
				for (let i in ArCard) DoCoolTimer(i,0);
				!oS.RefuseStart && oSym.addTask(oS.AddZombiesWaitTime, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);
				oS.Summon_Start_Func();
			});
		},
		LvlClearFunc: function() { delete oS.NowLevel; },
		NormalFlagZombieTask: 150, BigFlagZombieTask: 30 
	}, oPlt = { // oP初始默认
		FlagMaxWaitTime: 1990, FlagZombieWaitTime: 500, 
		FlagToEnd: Change_Level, 
		AutoStopGame: false
	}, oWin = { // window初始默认
		GameOver: () => Change_Level(true),
		GameLevelData: {},
		Change_Level: Change_Level, 
		SetArrBlockText: function (Arr, f, r1 = "点击开始游戏", r2 = "浏览下一页") {
			let A = 0, len = Arr.length, Q = () => {
				if (A == len) return f && f();
				SummonNewBlock(Arr[A], () => { ++A, Q(); }, (A + 1 == len) ? r1 : r2);
			}; Q(0);
		}, 
		SummonNewBlock: function (a, f, r) {
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
			if (oSym.Timer == null) return false; console.log("暂停了游戏"), AllAudioPaused(), PlayAudio("tap"), SetArrBlockText(oS.Block_Level_Task, AllAudioPauseCanceled, "点击继续游戏");
		}, 
		SummonZombie: function(id, R, C) {  // 僵尸obj，行，列
			var a, e = Math.min(Math.max(R, 1), oS.R), b = Math.min(Math.max(C, -2), 11);
			asyncInnerHTML((a = new id).CustomBirth(e, b, 1, "auto"), function(n, m) { EDPZ.appendChild(n); m.Birth(); },a);
			return ++oP.NumZombies, a; // 返回僵尸数据
		}
	}; 

// ====================================================================================================

	FullLevelStore (LevelStore); // 初始化最大游玩关卡
	if (NowLevel == "ChooseLevel" && LevelStore["MaxPlay"] == 1) NowLevel = 1; // 直接进入第一阶段（剧情未来加）

// ==——特殊对象区——==
	// 定义僵尸靶子 Lv.1
	let oTargetZombie1 = InheritO(oZombie, {
		EName: "oTargetZombie", CName: "僵尸靶子 Lv.1", Tooltip: "充当植物的靶子<br>Lv.1: 50000HP", Produce: "充当植物的靶子<br>Lv.1: 50000HP", 
		OSpeed: 0, Speed: 0, Lvl: Infinity, SunNum: 150, HP: 50000, MaxHP: 50000, IgnoreDie: true, 
		PicArr: (function() {
			var a = "new_skin/Images/Zombies/TargetZombie/";
			return [a + "TargetCard.png", a + "0.gif", a + "1.gif", a + "Damage1.gif", a + "Damage2.gif", a + "Damage3.gif", a + "BoomDie.gif" + $Random, a + "ZombieDie.gif" + $Random, "images/Zombies/Zombie/ZombieHead.gif" + $Random];
		})(), 
		CardGif: 0, StaticGif: 1, NormalGif: 2, StandGif: 2, AttackGif: 2, __Percent: 1, 
		BoomDieGif: 6, HeadGif: 8, DieGif: 6, ShowTooltip: true, ConnectPlants: null, 
		width: 105, height: 138, beAttackedPointL: 25, beAttackedPointR: 100, 
		HeadTargetPosition: [{x: 35, y: 30}, {x: 35, y: 30}], 
		GetDX: () => -60, GetDY: () => 5, CanGrow: CPlants.prototype.CanGrow, 
		getCrushed: () => false, JudgeAttack: () => {}, 
		getThump: function () { this.getHit0(this, 1800, 0); }, 
		ExplosionDie: function () { this.getHit0(this, 1800, 0); }, 
		getRaven: function() { return this.getHit0(this, 100, 0), 0; }, 
		bedevil: () => {}, JudgeAttackH: () => {}, JudgeAttackH1: () => {}, 
		AttackZombie: () => {}, AttackZombie2: () => {}, NormalAttack: () => {}, 
		GoingDie: function (...Arr) {
			let self = this, BoomDieGif = NewImg("", "images/Zombies/JackinTheBoxZombie/Boom.gif", "width:306px;height:300px;left:" + (self.X - 84) + "px;top:" + (self.pixelTop - 100) + "px;z-index:20", EDPZ);
			self.SetAlpha(self, self.EleBody, 100, 1), oP.NumZombies += 2;
			self.ConnectPlants && self.ConnectPlants.Die("ZombieDie");
			oSym.addTask(70, ClearChild, [BoomDieGif]), PlayAudio('explosion');
			oZombie.prototype.ExplosionDie.call(self, ...Arr), --oP.NumZombies;
		}, 
		BirthCallBack: function (f) {
			var e = f.delayT, d = f.id, c = f.Ele = $(d);
			f.EleShadow = c.firstChild;
			f.EleBody = c.childNodes[1];
			e ? oSym.addTask(e, function(h, g) {
					var i = $Z[h];
					i && (i.FreeSetbodyTime = 0, SetBlock(g))
				}, [d, c]) : SetBlock(c);

			// 绑定受伤函数
			f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = f.NormalGetHit;

			// 绑定植物
			f.ConnectPlants = new oTargetPlants;
			f.ConnectPlants.Birth(0, 0, f.R, GetC(f.ZX), [], null);
			f.ConnectPlants.Connect(f), SetHidden($(f.ConnectPlants.Pid));
		}, 
		NormalGetHit: function (c, b) {
			if (!c.IgnoreDie) oGT.OnTrigger("ZombieInjured", c, b); // 在受伤前触发
			if ((c.HP -= b) < c.BreakPoint) {
				c.GoingDie(c.PicArr[[c.LostHeadGif, c.LostHeadAttackGif][c.isAttacking]]);
				c.getHit = c.getHit0 = c.getHit1 = c.getHit2 = c.getHit3 = c.GoingDieGetHit;
				return;
			}
			let HPPercent = c.HP / c.MaxHP;
			switch (true) {
				case HPPercent < 0.25 && c.__Percent > 0.25: c.__Percent = 0.25, c.EleBody.src = c.PicArr[5]; break;
				case HPPercent < 0.5 && c.__Percent > 0.5: c.__Percent = 0.5, c.EleBody.src = c.PicArr[4]; break;
				case HPPercent < 0.75 && c.__Percent > 0.75: c.__Percent = 0.75, c.EleBody.src = c.PicArr[3]; break;
			}
			c.SetAlpha(c, c.EleBody, 50, 0.5);
			oSym.addTask(10, function(e, d) { (d = $Z[e]) && d.SetAlpha(d, d.EleBody, 100, 1); }, [c.id]);
		}
	}), 
	oTargetPlants = InheritO(CPlants, {
		EName: "oTargetPlants", CName: "靶子僵尸附件", 
		canEat: 0, CanSelect: 0, canTrigger: 0, ConnectZombie: null, Stature: -1, 
		PicArr: (function() {
			var a = "new_skin/Images/Zombies/TargetZombie/";
			return [a + "TargetCard.png", a + "0.gif", a + "1.gif"];
		})(), 
		Connect: function (f) {
			let self = this;
			self.Pid = self.id, self.ConnectZombie = f, self.id = f.id;
		}, 
		Die: function (Reason) {
			let self = this; 
			self.id = self.Pid, CPlants.prototype.Die.call(self);
			if (Reason == "ZombieDie") return;
			self.ConnectZombie && (oP.NumZombies += 2, self.ConnectZombie.DisappearDie(), --oP.NumZombies);
		}
	}), 
	oTargetZombie2 = InheritO(oTargetZombie1, {
		CName: "僵尸靶子 Lv.2", 
		Tooltip: "充当植物的靶子<br>Lv.2: 500000HP", 
		Produce: "充当植物的靶子<br>Lv.2: 500000HP", 
		SunNum: 100, HP: 500000, MaxHP: 500000, 
	}), 
	oInvisibleBean = InheritO(oCoffeeBean, {
		EName: "oInvisibleBean", CName: "隐身豆",
		Tooltip: "可以隐藏植物，使他们不会受到普通僵尸与冰车的伤害", 
		Produce: "可以隐藏植物，使他们不会受到普通僵尸与冰车的伤害", 
		PicArr: ["new_skin/Images/Card/InvisibleBeans.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random], 
		SunNum: 250, coolTime: 20, 
		CanGrow: (a, b) => (b = a[1]) && b.canEat && !a[3], 
		PrivateBirth: function(a) {
			SetHidden($(a.id).firstChild);
			PlayAudio("coffee");
			oSym.addTask(200, function(c) {
				var d = oGd.$[c]; if (d) d.canEat = 0, d.Stature = -1, SetAlpha($(d.id), 70, 0.7);
				d.getHurt = function(e, c, b) {
					var d = this, a = d.id; !(c % 3) && (d.HP -= b) < 1 && d.Die();
				};
				PlayAudio("wakeup"), $P[a.id] && a.Die();
			}, [a.R + "_" + a.C + "_1"]);
		}
	}), 
	___MaskCSS = `
		#DivSPEF {
			position: absolute; top: 0px; left: 0px;
			width: 1800px; height: 600px;
			background-color: rgba(0, 0, 0, 0);
			z-index: 22; pointer-events: none;
		}
		#DivSPEFMask {
			position: absolute; top: 0px; left: 0px;
			width: 1800px; height: 600px;
			background-color: transparent;
			z-index: 23; pointer-events: none;
			mix-blend-mode: color;
		}
		#DivSPEFMask::before {
			content: ''; position: absolute;
			top: 0px; left: 0px;
			width: 100%; height: 100%;
			background: transparent;
			box-shadow: 0 0 0 9999px rgba(0, 0, 80, 0.8);
		}
	`;


// ==——关卡区——==
	$SEql(NowLevel, { // 每个阶段对应不同函数
		// 禁区 - 第一天
		1: () => {
			oS.Init($FJ(oSys, {
				PName: [oTargetZombie1, oInvisibleBean, oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro],
				ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp], 
				Block_Level_Task: ["<a style=\"font-size:18px;line-height:1.5;position:relative;top:-3px;\">禁区 第一天</a><br><a style=\"font-size:15px;line-height:2;\">1.病毒蔓延严重，现划分安全区与禁区，禁区将会有文字及滤镜指示，请时刻留意禁区变化<br>2.僵尸已变异，在禁区的僵尸受伤将加血（灰烬除外）<br>3.植物不受安全区禁区影响，您可以使用靶子集中火力</a><a style=\"font-size:16px;line-height:1.8;\"><br>失败将从当前阶段重新开始<br><br></a>"],
				LevelName: "EX-11 禁区 - 第一天", SelectCardList: [], DefLoad2: () => { 
					let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;
					oEf.Animate($("NewPoolDayBG"), {opacity: 0}, 1.5 / TimeDouble, "ease-in-out", () => { ClearChild($("NewPoolDayBG")); });
					oEf.Animate($("NewPoolDayPool"), {opacity: 0}, 1.5 / TimeDouble, "ease-in-out", () => { ClearChild($("NewPoolDayPool")); });
					for (let i of oS.SelectCardList) SelectCard(i, 1); 
				}, 
				DefLoad: () => {
					AppearTombstones(8, 9, 3), AppearTombstones(2, 4, 2), AppearTombstones(1, 1, 3);

					for (let R = 1; R <= oS.R; ++R) for (let C = 1; C <= oS.C; ++C) {
						BanBlockEleList[R + "_" + C] = ___Template__Summon_Ban_Block___(R, C);
						BanBlockEleList[R + "_" + C].style.filter = "saturate(20%) hue-rotate(290deg)";
						BanBlockEleList[R + "_" + C].style.opacity = "0";
						BanBlockEleList[R + "_" + C].style.pointerEvents = "none";
						oGd.$Creator_Def[R + "_" + C] = null;
					}

					EDPZ.style.left = EDMove.style.left = "115px"; // 提前移动
					NewImg("NewPoolDayBG", NewSkinUrl + "InterFace/background_new_3.png", "opacity:1;left:-115;z-index:2;pointer-events:none", EDMove);
					NewImg("NewPoolDayPool", "images/New_interface/pool_block.png", "position:absolute;left:141px;top:266px;clip:rect(5px,720px,163px,5px);opacity:1;z-index:3;pointer-events:none", EDMove);

					for (let i = 1; i <= oS.R; ++i) CustomSpecial(oGatlingPea_Pro, i, 5), CustomSpecial(oTorchwood, i, 6), CustomSpecial(oTallNut, i, 7);

					let DivStyleSPEF = NewEle("DivStyleB", "style", "", { "innerHTML": ___MaskCSS }, EDAll);
				}, 
				DefStartLoad: () => { 
					// 生成滤镜
					window["DivSPEF"] = NewEle("DivSPEF", "div", "top:0px; left:0px; width:1800px; height:600px;", 0, EDAll);
					window["DivSPEFMask"] = NewEle("DivSPEFMask", "div", "top:0px; left:0px; width:1000px; height:600px;", 0, EDAll);
					ChangeSaveRange(1, 2, 6, 4, 1.8);

					oS.InitLawnMower(); 

					// 僵尸加血逻辑
					oGT.On("ZombieInjured", (self, d) => {
						if (!self.PZ) return; // 如果僵尸被魅惑了，直接扣血不加血
						let R = self.R, C = GetC(self.ZX), { R1, R2, C1, C2 } = GameLevelData;
						if (R < R1 || R > R2 || C < C1 || C > C2) self.HP += 2.5 * d;
					});
				},
				LF: [0, 1, 1, 1, 1, 1, 1], RefuseStart: false, AddZombiesWaitTime: 4500, Cheat_Mode: false,
				GroundType: 1, SunNum: 1500, LargeWaveFlag: { 
					10: $("imgFlag6"), 20: $("imgFlag5"), 30: $("imgFlag4"), 
					35: $("imgFlag3"), 40: $("imgFlag2"), 45: $("imgFlag1") 
				},
				Summon_Start_Func: function() {
					SetBlock($("Div_TimeTask"), $("Div_Start")); // 提示栏、初始数据
					(function(){ // 本关数据中枢
						let {R1, C1, R2, C2} = GameLevelData;
						$("dTitle_Task").innerText = "Row: [" + R1 + " ~ " + R2 + "]      Column: [" + C1 + " ~ " + C2 + "]      NowFlag: " + oP["FlagZombies"];
						oSym.addTask(10, arguments.callee, []);
					})();
				}, 
				NormalFlagZombieTask: 175, BigFlagZombieTask: 30
			}), $FJ(oPlt, {
				FlagMaxWaitTime: 3490, FlagZombieWaitTime: 540,
				AZ: [
						[oImp, 3, 100, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4, 4, 4, 4, 9, 9, 9, 11, 11, 11, 11, 11, 17, 17, 17, 23, 23, 29, 29, 29, 29, 29, 29, 29, 29]], 
						[oZombie, 1, 100, [3, 4, 8, 10, 12, 12, 12, 18, 27, 27, 27, 28]], 
						[oZombie2, 1, 100, [8, 12, 15, 27]], 
						[oZombie3, 1, 100, [10, 15, 27, 28]], 
						[oConeheadZombie, 2, 1, [6, 6, 10, 10, 10, 10, 13, 13, 13, 17, 17, 17, 17, 29]], 
						[oPoleVaultingZombie, 2, 10, [2, 6, 15, 16, 16, 28, 28, 29, 29, 29, 30, 30]], 
						[oBucketheadZombie, 2, 20, [9, 17, 22, 22, 22, 28, 28, 28]], 
						[oNewspaperZombie, 2, 2, [2, 4, 4, 6 ,6]], 
						[oScreenDoorZombie, 2, 8, [3, 3, 14]], 
						[oFootballZombie, 2, 23, [5, 7, 10, 19, 22, 22, 26, 26, 28, 28, 28, 30, 30, 30]], 
						[oDancingZombie, 1, 14, [3, 9, 9, 10, 16, 21, 21, 21, 21, 24, 24, 28]], 
						[oZomboni, 1, 25, [5, 9, 20, 20, 24, 24, 25, 25, 25, 27, 29, 29]], 
						[oJackinTheBoxZombie, 1, 12, [2, 15, 21, 21, 21, 26, 26, 26, 26, 26, 28, 30, 30, 30, 30]], 
						[oBalloonZombie, 3, 6, [5, 5, 5, 5, 14, 23, 23, 23, 23, 23, 25, 25, 25, 25, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 29, 29, 29, 29, 29, 30, 30]]
					],
				FlagNum: 45, FlagToSumNum: {
					a1: [   2, 7, 13, 23, 29, 30, 34, 35, 39, 40, 44],
					a2: [0, 4, 7, 12, 15, 70, 32, 78, 37, 85, 47, 100]
				}, 
				FlagToMonitor: {
					// 阶段 1
					5: [() => AppearTombstones(7, 9, 2), 0], 
					7: [() => AppearTombstones(1, 9, 3), 0], 
					9: [ShowLargeWave, 0], 
					10: [() => ChangeSaveRange(1, 3, 6, 8, 1), 0], 
					16: [() => AppearTombstones(1, 2, 2), AppearTombstones(7, 9, 3), 0], 
					18: [() => AppearTombstones(3, 6, 3), AppearTombstones(5, 9, 2), 0], 
					19: [ShowLargeWave, 0], 
					20: [() => ChangeSaveRange(1, 1, 6, 3, 1), 0], 
					25: [() => ChangeSaveRange(1, 1, 6, 4, 1), 0], 
					27: [() => AppearTombstones(1, 9, 8), 0], 
					// 阶段 2
					29: [ShowLargeWave, 0], 
					30: [() => ChangeSaveRange(1, 3, 6, 9, 1), 0], 
					34: [ShowLargeWave, 0], 
					35: [() => ChangeSaveRange(4, 1, 6, 9, 1), 0], 
					36: [() => ChangeSaveRange(1, 1, 3, 9, 1), 0], 
					37: [() => ChangeSaveRange(1, 1, 6, 9, 1), 0], 
					39: [() => (ChangeSaveRange(1, 1, 6, 9, 1), ShowLargeWave()), 0], 
					40: [() => ChangeSaveRange(2, 2, 5, 5, 1), 0], 
					41: [() => ChangeSaveRange(2, 5, 4, 8, 1), 0], 
					42: [() => ChangeSaveRange(3, 2, 6, 5, 1), 0], 
					43: [() => ChangeSaveRange(2, 2, 5, 5, 1), 0], 
					44: [() => (ChangeSaveRange(1, 1, 6, 2, 1), ShowFinalWave()), 0], 
				}, 
				FlagToEnd: () => { Change_Level(0); }
			}), $FJ(oWin, {
				GameLevelData: { R1: 1, C1: 1, R2: 6, C2: 9 },
				DivSPEF: null, DivSPEFMask: null, BanBlockEleList: {}, 
				ChangeSaveRange: (R1 = 1, C1 = 1, R2 = oS.R, C2 = oS.C, Time = 1) => {
					let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;
					let X1 = GetX1X2(C1), Y1 = GetY1Y2(R1), X2 = GetX1X2(C2), Y2 = GetY1Y2(R2);
					let dMap = {}; Time /= TimeDouble;

					GameLevelData["R1"] = R1, GameLevelData["C1"] = C1, GameLevelData["R2"] = R2, GameLevelData["C2"] = C2;

					for (let R = R1; R <= R2; ++R) for (let C = C1; C <= C2; ++C) dMap[R + "_" + C] = true, oEf.Animate(BanBlockEleList[R + "_" + C], {"opacity": "0"}, Time * 0.9, "ease-in-out");
					for (let R = 1; R <= oS.R; ++R) for (let C = 1; C <= oS.C; ++C) if (dMap[R + "_" + C] != true) oEf.Animate(BanBlockEleList[R + "_" + C], {"opacity": "0.4"}, Time * 0.9, "ease-in-out");

					oEf.Animate(DivSPEFMask, {
						"left": X1[0] + "px", 
						"top":  Y1[0] + "px", 
						"width": (X2[1] - X1[0]) + "px", 
						"height": (Y2[1] - Y1[0]) + "px"
					}, Time, "ease-in-out");
				}, 
				oTargetZombie: oTargetZombie1, 
				oTargetPlants: oTargetPlants, 
				oInvisibleBean: oInvisibleBean
			}));
		}, 



		// 禁区 - 第二天
		2: () => {
			// 基本函数
			let $Rand = (l, r) => (l + Math.random() * (r - l));
			let $RandInt = (l, r) => Math.floor($Rand(l, r));
			let $RandArr = (Arr) => Arr[$RandInt(0, Arr.length)];
			let dV = 0.075, SetVolume1 = (Volume = (oAudio?.[oS.LoadMusic]?.Sound?._volume) ?? 1) => {
				let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;
				for (let V of oAudio[oS.LoadMusic].Lines) oAudio[oS.LoadMusic].volume(Math.max(0, Volume), V);
				if (Volume > 0) oSym.addTask(10, SetVolume1, [Volume - TimeDouble * dV]);
			}, SetVolume2 = (Volume = 0) => {
				let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;
				for (let V of oAudio[oS.LoadMusic].Lines) oAudio[oS.LoadMusic].volume(Math.min(1, Volume), V);
				if (Volume < 1) oSym.addTask(10, SetVolume2, [Volume + TimeDouble * dV]);
			};

			// 封装原版僵尸的部分函数，来达到拓展的功能
			let ChangeObjList = { 
				"SaveDieZombie": {
					"TriggerFunc": ["getThump", "CrushDie", "getRaven", "ExplosionDie"], 
					"List": [CZombies, oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp], 
					"func": function (...Arg) { let self = this; self.IgnoreDie = true; }
				}, 
			}, BuildFunction = () => {
				for (let Key in ChangeObjList) {
					let _ = ChangeObjList[Key];
					for (let O of _["List"]) { // 先备份
						_[O.prototype.EName] = {};
						for (let Did of _["TriggerFunc"]) _[O.prototype.EName][Did] = O["prototype"][Did];
					}
					for (let O of _["List"]) for (let Did of _["TriggerFunc"]) { // 再修改
						O["prototype"][Did] = (() => {
							let OriginalFunction = _[O.prototype.EName][Did], NewFunc = _["func"];
							return function (...Arg) { return NewFunc.call(this, ...Arg), OriginalFunction.call(this, ...Arg); };
						})();
					}
				}
			}, Reduction = () => {
				for (let Key in ChangeObjList) {
					let _ = ChangeObjList[Key];
					for (let O of _["List"]) for (let FName in _[O.prototype.EName]) O["prototype"][FName] = _[O.prototype.EName][FName];
				}
			};

			NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=2119781867.mp3", audioname: "EX11_StageMusic_2A", loop: true},  { volume: 0.6 });
			oAudio["EX11_StageMusic_2A"].Sound.load(), oAudio["Cherry_Blossoms"].Sound.load(); // 预加载
			BuildFunction();

			oS.Init($FJ(oSys, {
				PName: [oTargetZombie2, oInvisibleBean, oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro],
				ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oBalloonZombie, oJackinTheBoxZombie, oImp], 
				Block_Level_Task: ["<a style=\"font-size:18px;line-height:1.5;position:relative;top:-3px;\">禁区 第二天</a><br><a style=\"font-size:15px;line-height:2;\">1.疫情愈发严重，现再划分安全区与禁区，禁区将会有文字及滤镜指示，请时刻留意禁区变化！<br>2.为防止病毒扩散，必须在安全区内杀死僵尸！<br>3.靶子已升级，其余设定与第一天无异</a><a style=\"font-size:16px;line-height:1.8;\"><br>请注意本关特殊设定，防止出现意外情况<br><br></a>", 
					"<a style=\"font-size:18px;line-height:1.5;position:relative;top:-3px;\">禁区 第二天：特殊规则</a><br><a style=\"font-size:15px;line-height:2;\">1.可以使用倭瓜、大嘴花、推车、灰烬杀死禁区内僵尸<br>2.靶子僵尸、被魅惑的僵尸在禁区内死亡不判失败<br>3.杀死舞王僵尸时请格外注意，避免失败<br>4.请善用本关的靶子僵尸与隐身豆，时刻留意场上状态</a><a style=\"font-size:16px;line-height:1.8;\"><br>失败将从本天重新开始，请注意安全<br><br></a>"],
				LevelName: "EX-11 禁区 - 第二天", SelectCardList: ["oTargetZombie", "oGarlic"], DefLoad2: () => { for (let i of oS.SelectCardList) SelectCard(i, 1); }, 
				LvlClearFunc: function() { delete oS.NowLevel, Reduction(); },
				DefLoad: () => {
					AppearTombstones(4, 9, 5), AppearTombstones(1, 5, 5);

					for (let R = 1; R <= oS.R; ++R) for (let C = 1; C <= oS.C; ++C) {
						BanBlockEleList[R + "_" + C] = ___Template__Summon_Ban_Block___(R, C);
						BanBlockEleList[R + "_" + C].style.filter = "saturate(20%) hue-rotate(290deg)";
						BanBlockEleList[R + "_" + C].style.opacity = "0";
						BanBlockEleList[R + "_" + C].style.pointerEvents = "none";
						oGd.$Creator_Def[R + "_" + C] = null;
					}

					EDPZ.style.left = EDMove.style.left = "115px"; // 提前移动

					let DivStyleSPEF = NewEle("DivStyleB", "style", "", { "innerHTML": ___MaskCSS }, EDAll);
				}, 
				DefStartLoad: () => { 
					// 生成滤镜
					window["DivSPEF"] = NewEle("DivSPEF", "div", "top:0px; left:0px; width:1800px; height:600px;", 0, EDAll);
					window["DivSPEFMask"] = NewEle("DivSPEFMask", "div", "top:0px; left:0px; width:1000px; height:600px;", 0, EDAll);
					ChangeSaveRange(2, 1, 5, 5, 1.8);

					oS.InitLawnMower(); 

					// 僵尸检测逻辑
					oGT.On("ZombieInjured", (self, d) => {
						if (!self.PZ) return; // 如果僵尸被魅惑了，直接扣血不加血
						let R = self.R, C = GetC(self.ZX), { R1, R2, C1, C2 } = GameLevelData;
						if (R < R1 || R > R2 || C < C1 || C > C2) self.HP += 0.70 * d; // 减免 70% 的伤害
					}); // 为防止玩家快速暴毙，选择给僵尸加血
					oGT.On("ZombieDie", (self) => {
						if (!self.PZ || self.IgnoreDie) return; // 判断僵尸是否符合逻辑
						let R = self.R, lC = GetC(self.ZX - 50), rC = GetC(self.ZX + 50), { R1, R2, C1, C2 } = GameLevelData;
						if (R < 1 || R > oS.R || lC < 1 || rC > oS.C) return; // 出界了，饶恕僵尸
						if (R < R1 || R > R2 || rC < C1 || lC > C2) GameOver(); 
					}); // 僵尸死亡
				},
				LF: [0, 1, 1, 1, 1, 1, 1], RefuseStart: false, AddZombiesWaitTime: 6000, Cheat_Mode: false,
				GroundType: 1, SunNum: 2000, MaxSunNum: Infinity, LargeWaveFlag: { 
					10: $("imgFlag5"), 20: $("imgFlag4"), 30: $("imgFlag3"), 
					40: $("imgFlag2"), 50: $("imgFlag1")
				},
				Summon_Start_Func: function() {
					SetBlock($("Div_TimeTask"), $("Div_Start")); // 提示栏、初始数据
					(function(){ // 本关数据中枢
						let {DataShowMode, StartTimer, EndTimer} = GameLevelData;
						let {R1, C1, R2, C2} = GameLevelData;

						if (DataShowMode == 1) {
							if (oSym.Now > EndTimer) GameLevelData["DataShowMode"] = 0;
							else $("dTitle_Task").innerText = "Row: [" + R1 + " ~ " + R2 + "]    Column: [" + C1 + " ~ " + C2 + "]    CountDown: " + ((EndTimer - oSym.Now) / 100).toFixed(1) + "s";
						} else $("dTitle_Task").innerText = "Row: [" + R1 + " ~ " + R2 + "]      Column: [" + C1 + " ~ " + C2 + "]      NowFlag: " + oP["FlagZombies"];

						oSym.addTask(10, arguments.callee, []);
					})();
				}, 
				NormalFlagZombieTask: 125, BigFlagZombieTask: 30, 
				UserDefinedFlagFunc: function() {
					$SEql(oP.FlagZombies, Object.assign(oS.UserFlagMonitor, { "default": () => {}, }))();
				}, 
				UserFlagMonitor: {
					1: () => { for (let i = 1; i <= 10; ++i) SummonZombie(oImp, $RandInt(1, 6), 11); }, 
					2: () => { for (let i = 1; i <= oS.R; ++i) SummonZombie(oPoleVaultingZombie, i, 11); }, 
					3: () => { SummonZombie(oDancingZombie, $RandArr([1, 2]), 11), SummonZombie(oDancingZombie, $RandArr([3, 4]), 11), SummonZombie(oDancingZombie, $RandArr([5, 6]), 11); }, 
					4: () => { for (let i = 1; i <= 3; ++i) SummonZombie(oBucketheadZombie, $RandInt(1, 6), 11); for (let i = 1; i <= 2; ++i) SummonZombie(oFootballZombie, $RandInt(1, 6), 11); }, 
					5: () => { for (let i = 1; i <= 4; ++i) SummonZombie(oZomboni, $RandInt(1, 6), 11); }, 
					6: () => { for (let i = 1; i <= 8; ++i) SummonZombie(oZombie, $RandInt(1, 6), 11); for (let i = 1; i <= 4; ++i) SummonZombie(oConeheadZombie, $RandInt(1, 6), 11); }, 
					7: () => { for (let i = 1; i <= 2; ++i) SummonZombie(oFootballZombie, $RandInt(1, 6), 11); for (let i = 1; i <= 2; ++i) SummonZombie(oDancingZombie, $RandInt(1, 6), 11); }, 
					8: () => { for (let i = 1; i <= 6; ++i) SummonZombie(oImp, $RandInt(1, 6), 11); for (let i = 1; i <= 2; ++i) SummonZombie(oDancingZombie, $RandInt(1, 6), 11); }, 
					9: () => { for (let i = 1; i <= 2; ++i) SummonZombie(oFootballZombie, $RandInt(1, 6), 11); for (let i = 1; i <= 4; ++i) SummonZombie(oPoleVaultingZombie, $RandInt(1, 6), 11); }, 
					10: () => { AppearTombstones(1, 9, 3), SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 

					11: () => { AppearTombstones(1, 9, 1), SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					12: () => { AppearTombstones(1, 9, 2), SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					13: () => { AppearTombstones(1, 9, 1), SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 
					14: () => { AppearTombstones(1, 9, 2), SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 
					15: () => { AppearTombstones(1, 9, 3), SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					16: () => { AppearTombstones(1, 9, 2), SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 
					17: () => { AppearTombstones(1, 9, 1), SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 
					18: () => { AppearTombstones(1, 9, 2); for (let i = 1; i <= 2; ++i) SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 
					19: () => { AppearTombstones(1, 9, 1), SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					20: () => { AppearTombstones(1, 9, 3); for (let i = 1; i <= 3; ++i) SummonZombie(oZomboni, $RandInt(2, 5), 11); for (let i = 1; i <= 8; ++i) SummonZombie(oBalloonZombie, $RandInt(2, 5), 11); }, 

					21: () => { AppearTombstones(1, 7, 3); for (let i = 1; i <= 2; ++i) SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					23: () => { AppearTombstones(1, 7, 3); for (let i = 1; i <= 2; ++i) SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 
					25: () => { AppearTombstones(1, 9, 3); for (let i = 1; i <= 2; ++i) SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					27: () => { AppearTombstones(1, 9, 3); for (let i = 1; i <= 2; ++i) SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 
					28: () => { AppearTombstones(1, 9, 2); for (let i = 1; i <= 3; ++i) SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					29: () => { AppearTombstones(1, 9, 2); for (let i = 1; i <= 2; ++i) SummonZombie(oBalloonZombie, $RandInt(1, 6), 11); }, 
					30: () => { AppearTombstones(1, 7, 3); for (let i = 1; i <= 3; ++i) SummonZombie(oZomboni, $RandInt(2, 5), 11); }, 

					"30FlagEndEvent": async () => {
						oP.FlagMaxWaitTime = 6000 - 10, oP.FlagZombieWaitTime = 550 - 10, StopMusic();

						let Sleep = (_) => new Promise(Q => setTimeout(Q, _));
						let TimeDouble = { "valueOf": () => (10 / oSym.TimeStep * oSym.NowStep) };
						let TextBoxDiv = NewEle("TextBoxDiv", "div", "position:absolute;width:900px;height:600px;background:#000000;opacity:0;z-index:250;pointer-events:none;", 0, EDAll);
						let TextDiv = NewEle("TextDiv", "div", "text-align:center;line-height:50px;font-size:40px;font-family:RanTian,Briannetod,微软雅黑,Verdana,Tahoma;color:rgb(255,255,255);position:relative;top:255px;opacity:0;", {"innerHTML": "Test"}, TextBoxDiv);

						await oEf.AnimatePromise($("dCardList"), [{"opacity": 1}, {"opacity": 0}], 0.5 / TimeDouble, "ease-out"); SetHidden($("dCardList"));
						await oEf.AnimatePromise(TextBoxDiv, [{"opacity": 0}, {"opacity": 1}], 2.5 / TimeDouble, "ease-out"); 

						let TextList = ["「够了，这样下去永远不会结束的。」", "「我去解决掉它们。」", "你要干什么？", ["「进入禁区，争取时间。」", 2.5]];

						for (let Text of TextList) {
							if (Array.isArray(Text)) TextDiv["innerHTML"] = Text[0];
							else TextDiv["innerHTML"] = Text;
							await oEf.AnimatePromise(TextDiv, [{"opacity": 0}, {"opacity": 1}], 1 / TimeDouble, "ease-out"); 
							await Sleep((Array.isArray(Text) ? Text[1] : 1.5) * 1000 / TimeDouble);
							await oEf.AnimatePromise(TextDiv, [{"opacity": 1}, {"opacity": 0}], 1 / TimeDouble, "ease-in"); 
						}

						AppearTombstones(1, 8, 8);

						await oEf.AnimatePromise(TextBoxDiv, [{"opacity": 1}, {"opacity": 0}], 2.5 / TimeDouble, "ease-in"); 
						ClearChild(TextBoxDiv), SetVisible($("dCardList"));
						await oEf.AnimatePromise($("dCardList"), [{"opacity": 0}, {"opacity": 1}], 0.5 / TimeDouble, "ease-in"); 

						let DivTeach = NewEle("DivTeach", "div", "pointer-events:none;line-height:45px;", {innerHTML: "现在你有一些准备的时间，准备结束后，请在尽可能短的时间内击败余下的僵尸！"}, EDAll);
						oSym.addTask(550, ClearChild, [DivTeach]);
						PlayMusic(oS.LoadMusic = "EX11_StageMusic_2A");
						ChangeSaveRange(1, 1, 6, 7, 2), AppearTombstones(9, 9, oS.R);
						oP.NumZombies -= 1000000; // 别忘了把加的数量减回来，防止刷波
					}, 

					31: async () => {
						let Sleep = (_) => new Promise(Q => setTimeout(Q, _));
						let RainBlackDiv = NewEle("RainBlackDiv", "div", "position:absolute;width:900px;height:600px;background:#000000;opacity:0;z-index:250;pointer-events:none;", 0, EDAll);
						await oEf.AnimatePromise(RainBlackDiv, [{"opacity": 0}, {"opacity": 1}], 0.5 / oSym.NowSpeed, "ease-out"); 
						PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]), await Sleep(1000);

						window["RainCanvas"] = oEf.BgParticle({
							style: "z-index:200", url: "images/ALLPNG_GIF/Rain.png", timeout: 4,
							move: (i) => (i.left -= 4.5 * oSym.NowSpeed, i.top += 6 * oSym.NowSpeed),
							size: { width: 140, height: 140 }
						});

						oGT.On("BulletBirth", (self) => {
							if (!window["RainCanvas"]) return;
							self["Weight"][0] += 0.0162, self["Gravity"][0] += -0.5;
							self["Weight"][0] += 0.0162, self["Gravity"][0] += -0.5;
							self["MinSpeed"][0] = -7.5;
						}); // 模拟风力，子弹回飞

						await oEf.AnimatePromise(RainBlackDiv, [{"opacity": 1}, {"opacity": 0.2}], 0.5 / oSym.NowSpeed, "ease-in"); 
						oSym.addTask(100, PlayAudio, ["thunder"]);
					}, 

					32: () => {
						PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]);
						oP.FlagMaxWaitTime = 12000 - 10, oP.FlagZombieWaitTime = 600 - 10;
						let CountSave = (C) => {
							for (let _ = oS.C; _ > C; --_) AppearTombstones(_, _, oS.R);
							ChangeSaveRange(1, 1, 6, Math.min(7, C), 1);
							if (C > 1) oSym.addTask(5 * 60 * 100, CountSave, [C - 1]);
						};
						CountSave(8);
					}, 

					35: () => { PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]); }, 
					38: () => { PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]); }, 
					40: () => { PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]); }, 
					42: () => { PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]); }, 
					45: () => { PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]); }, 
					48: () => { PlayAudio("thunder"), oSym.addTask(60, PlayAudio, ["thunder"]); }, 

					50: async () => { 
						await oEf.AnimatePromise(window["RainCanvas"], [{"opacity": 1}, {"opacity": 0}], 3.5 / oSym.NowSpeed, "ease-out");
						await oEf.AnimatePromise($("RainBlackDiv"), [{"opacity": 0.2}, {"opacity": 0}], 0.5 / oSym.NowSpeed, "ease-out");
						ClearChild(window["RainCanvas"], $("RainBlackDiv")), delete window["RainCanvas"]; 
					}, 
				}, 
			}), $FJ(oPlt, {
				FlagMaxWaitTime: 6000 - 10, FlagZombieWaitTime: 550 - 10, AutoStopGame: false, 
				AZ: [
						[oZombie, 1, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], 
						[oConeheadZombie, 1, 4], [oBucketheadZombie, 2, 6], [oPoleVaultingZombie, 2, 3], 
						[oScreenDoorZombie, 1, 30], [oFootballZombie, 2, 11], [oDancingZombie, 2, 8], 
						[oZomboni, 1, 31], [oBalloonZombie, 2, 13], [oImp, 1, 10000] 
					], 
				FlagNum: 50, FlagToSumNum: {
					a1: [    9, 10, 14, 19, 20, 24, 29, 30, 33, 36, 39, 40, 43, 47,  49],
					a2: [0, 30, 15, 20, 40, 25, 32, 70, 38, 42, 48, 90, 52, 57, 60, 101]
				}, 
				FlagToMonitor: {
					2: [() => ChangeSaveRange(1, 8, 6, 9, 1), 0], 
					4: [() => ChangeSaveRange(1, 9, 6, 9, 1), 0], 
					5: [() => ChangeSaveRange(1, 5, 6, 6, 1), 0], 
					6: [() => ChangeSaveRange(1, 7, 6, 8, 1), 0], 
					7: [() => ChangeSaveRange(1, 7, 6, 9, 1), 0], 
					8: [() => ChangeSaveRange(1, 6, 6, 8, 1), 0], 
					9: [() => (ChangeSaveRange(1, 5, 6, 9, 1), ShowLargeWave()), 0], 

					10: [() => ChangeSaveRange(2, 5, 5, 9, 1), 0], 
					19: [() => ShowLargeWave(), 0], 

					20: [() => ChangeSaveRange(2, 4, 5, 8, 1), 0], 
					29: [() => {
						let F = 1000000; oP.NumZombies += F;
						let WaitTime = 18000, StM = false, Ctk = () => {
							if (oP.NumZombies <= F + 10 && !StM) StM = true, SetVolume1();
							if (oP.NumZombies == F + 0) oS["UserFlagMonitor"]["30FlagEndEvent"]();
							else oSym.addTask(10, Ctk, []);
						};
						GameLevelData["DataShowMode"] = 1, GameLevelData["StartTimer"] = oSym.Now, GameLevelData["EndTimer"] = oSym.Now + WaitTime + 1500;
						oP.FlagMaxWaitTime = WaitTime, oP.FlagZombieWaitTime = WaitTime;
						ShowLargeWave(), oSym.addTask(1000, Ctk, []);
					}, 0], // 从此刻起等待 4 分钟

					39: [() => ShowLargeWave(), 0], 
					49: [() => ShowFinalWave(), 0], 
				}, 
				FlagToEnd: async () => { 
					Win_Travel(11, 12);

					let Sleep = (_) => new Promise(Q => setTimeout(Q, _));
					let TimeDouble = { "valueOf": () => (10 / oSym.TimeStep * oSym.NowStep) };
					let TextBoxDiv = NewEle("TextBoxDiv", "div", "position:absolute;width:900px;height:600px;background:#000000;opacity:0;z-index:250;pointer-events:none;", 0, EDAll);
					let TextDiv = NewEle("TextDiv", "div", "text-align:center;line-height:50px;font-size:40px;font-family:RanTian,Briannetod,微软雅黑,Verdana,Tahoma;color:rgb(255,255,255);position:relative;top:255px;opacity:0;", {"innerHTML": "Test"}, TextBoxDiv);

					await oEf.AnimatePromise($("dCardList"), [{"opacity": 1}, {"opacity": 0}], 0.5 / TimeDouble, "ease-out"); SetHidden($("dCardList"));
					await oEf.AnimatePromise(TextBoxDiv, [{"opacity": 0}, {"opacity": 1}], 2.5 / TimeDouble, "ease-out"); 

					let TextList = [["谢谢你，有缘再见。", 5]];

					for (let Text of TextList) {
						if (Array.isArray(Text)) TextDiv["innerHTML"] = Text[0];
						else TextDiv["innerHTML"] = Text;
						await oEf.AnimatePromise(TextDiv, [{"opacity": 0}, {"opacity": 1}], 1 / TimeDouble, "ease-out"); 
						await Sleep((Array.isArray(Text) ? Text[1] : 1.5) * 1000 / TimeDouble);
						await oEf.AnimatePromise(TextDiv, [{"opacity": 1}, {"opacity": 0}], 1 / TimeDouble, "ease-in"); 
					}

					// 正常的泳池图片
					NewImg("NewPoolDayBG", NewSkinUrl + "InterFace/background_new_3.png", "opacity:1;left:-115;z-index:100;pointer-events:none", EDMove);
					NewImg("NewPoolDayPool", "images/New_interface/pool_block.png", "position:absolute;left:141px;top:266px;clip:rect(5px,720px,163px,5px);opacity:1;z-index:101;pointer-events:none", EDMove);
					SetHidden(DivSPEFMask, DivSPEF);

					await oEf.AnimatePromise(TextBoxDiv, [{"opacity": 1}, {"opacity": 0}], 2.5 / TimeDouble, "ease-in"); 
					ClearChild(TextBoxDiv), SetVisible($("dCardList"));
					await oEf.AnimatePromise($("dCardList"), [{"opacity": 0}, {"opacity": 1}], 0.5 / TimeDouble, "ease-in"); 
					await Sleep(5000 / TimeDouble);

					NowLevel = "Staff", Change_Level(1), CanChange = false;
				}
			}), $FJ(oWin, {
				GameLevelData: { 
					DataShowMode: 0, StartTimer: 0, EndTimer: 0, 
					R1: 1, C1: 1, R2: 6, C2: 9, 
				},
				BanBlockEleList: {}, 
				DivSPEF: null, DivSPEFMask: null, RainCanvas: null, 
				ChangeSaveRange: (R1 = 1, C1 = 1, R2 = oS.R, C2 = oS.C, Time = 1) => {
					let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;
					let X1 = GetX1X2(C1), Y1 = GetY1Y2(R1), X2 = GetX1X2(C2), Y2 = GetY1Y2(R2);
					let dMap = {}; Time /= TimeDouble;

					GameLevelData["R1"] = R1, GameLevelData["C1"] = C1, GameLevelData["R2"] = R2, GameLevelData["C2"] = C2;

					for (let R = R1; R <= R2; ++R) for (let C = C1; C <= C2; ++C) dMap[R + "_" + C] = true, oEf.Animate(BanBlockEleList[R + "_" + C], {"opacity": "0"}, Time * 0.9, "ease-in-out");
					for (let R = 1; R <= oS.R; ++R) for (let C = 1; C <= oS.C; ++C) if (dMap[R + "_" + C] != true) oEf.Animate(BanBlockEleList[R + "_" + C], {"opacity": "0.4"}, Time * 0.9, "ease-in-out");

					oEf.Animate(DivSPEFMask, {
						"left": X1[0] + "px", 
						"top":  Y1[0] + "px", 
						"width": (X2[1] - X1[0]) + "px", 
						"height": (Y2[1] - Y1[0]) + "px"
					}, Time, "ease-in-out");
				}, 
				oTargetZombie: oTargetZombie2, 
				oTargetPlants: oTargetPlants, 
				oInvisibleBean: oInvisibleBean, 
			}));
		}, 



		// 关卡选择界面
		"ChooseLevel": () => {
			let dOpenButtonStatus = "";

			oS.Init($FJ(oSys, {
				AutoPlayMusic: false, ZName: [oZombie], 
				LoadAccess: function () {
					delete oAudio["EX11-WaitMusic"];
					NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=1470569954.mp3", audioname: "EX11-WaitMusic", loop: true});
					// NewURLAudio({srcArr: ["https://www.chosic.com/wp-content/uploads/2021/12/Towards-The-Horizon(chosic.com).mp3", "https://music.163.com/song/media/outer/url?id=1470569954.mp3"], audioname: "EX11-WaitMusic", loop: true});
					StopMusic(), PlayMusic(oS.LoadMusic = "EX11-WaitMusic");

					// 选关界面（第一部分 ~ 第二部分）
					let dChooseLevelBox = NewEle("dChooseLevelBox", "div", "position:absolute;left:0px;top:0px;z-index:100;", 0, EDAll);
					let dChosePanel1 = NewEle("dChosePanel1", "div", "display:block;position:absolute;left:0px;top:0px", 0, dChooseLevelBox, {"class":"Almanac_ZombieBack"});
					let dChoseTitle1 = NewEle("dChoseTitle1", "div", "position:relative;text-align:center;line-height:88px;height:88px;left:35%;width:30%;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;cursor:pointer;", { innerHTML: "选 择 阶 段", onclick: () => window["open"]("https://www.savelife.org.cn/"), "title": "尊重·奉献·传承·希望" }, dChosePanel1, { "class":"dRiddleTitle" });
					let dBack1 = NewEle("dBack1", "div", "position:absolute;width:89px;height:26px;top:564px;left:700px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && (SelectModal(__Normal_Start_Room__), HiddenOptions(), SetBlock($('dSurface'), $('iSurfaceBackground')), ShowNameDiv()); }, innerText: "返 回" }, dChooseLevelBox, {"class": "button"});
					let dStaffDiv = NewEle("dStaffDiv1", "input", "position:absolute;left:650px;top:85px;width:225px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;white-space:pre;", {"onclick": () => GotoStaffLevel() }, dChooseLevelBox, {"type": "button", "value": "点击查看制作者名单"});

					// 彩蛋按钮检测部分
					let dOpen1 = NewEle("dOpen1", "div", "position:absolute;width:89px;height:26px;top:625px;left:100px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && SurpriseOpen(); }, innerText: "启 动" }, dChooseLevelBox, {"class": "button"});
					EDAll.addEventListener('mousemove', oS.MouseEventFunc);

					let dLevelADiv = NewEle("dLevelADiv", "div", "left:100px;top:225px;background-image:url(" + NewSkinUrl + "InterFace/background_new_4.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(125,112,55,0.5);border-radius:15px;background-clip:padding-box;", { onclick: function() { CanChange && (NowLevel = 1), Change_Level(1); } }, dChooseLevelBox);
					let dLevelATXT = NewEle("dLevelATXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#FF0A0A;position:relative;top:15px;", { innerHTML: "禁区 - 第一天<br><font style=\"font-size:20px\">点此回溯</font>" }, $("dLevelADiv"));

					let dLevelBDiv = NewEle("dLevelBDiv", "div", "left:487.5px;top:225px;background-image:url(" + NewSkinUrl + "InterFace/background_new_4.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(25,22,25,0.5);border-radius:15px;background-clip:padding-box;", { onclick: function() { CanChange && (NowLevel = 2), Change_Level(1); } }, dChooseLevelBox);
					let dLevelBTXT = NewEle("dLevelBTXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#FF1515;position:relative;top:15px;", { innerHTML: "禁区 - 第二天<br><font style=\"font-size:20px\">点此回溯</font>" }, $("dLevelBDiv"));

					// 请预留未来的剧情入口 
					dLevelADiv["style"]["left"] = "100px", dLevelADiv["style"]["top"] = "225px";
					dLevelBDiv["style"]["left"] = "487.5px", dLevelBDiv["style"]["top"] = "225px";

					SetVisible($("dMenu")); // 显示菜单按钮
				}, 
				MouseEventFunc: (Event) => {
					let EDAllRect = EDAll.getBoundingClientRect();
					let mX = Event.clientX, mY = Event.clientY;
					let aX = mX - EDAllRect.left, aY = mY - EDAllRect.top;
					let Top = 500, Bottom = 600, Left = 0, Right = 250;
					let InRange = (Left <= aX && aX <= Right && Top <= aY && aY <= Bottom);

					if (InRange && dOpenButtonStatus != "MoveUp") dOpenButtonStatus = "MoveUp1", oEf.Animate($("dOpen1"), { "left": Math.max(0, aX - 40) + "px", "top": Math.max(500, aY - 10) + "px" /*"564px"*/ }, 0.4, "ease-out", () => {});
					if (!InRange && dOpenButtonStatus != "MoveDown") dOpenButtonStatus = "MoveDown", oEf.Animate($("dOpen1"), { "left": "100px", "top": "625px" }, 0.4, "ease-in", () => {});
				}, 
				LvlClearFunc: function () {
					oSys["LvlClearFunc"]();
					EDAll.removeEventListener('mousemove', oS.MouseEventFunc);
				}
			}), $FJ(oPlt, {}), $FJ(oWin, {
				"SurpriseOpen": () => {
					if (!CanChange) return;
					let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 115}, Height: 600, Width: 1800}, EDAll);
					console.log("原神，启动！"), StopMusic(), CanChange = false, oCv.Gradient_Rect(0, [[1, 150]], oSym["NowStep"], [255, 255, 255], () => {
						NewEle("dVideo", "video", "position:absolute;width:1100px;height:600px;top:0px;left:-100px;z-index: 125", { preload: "auto", autoplay: "autoplay", controlsList: "nodownload nofullscreen noremoteplayback", src: __OnlineUrl_Pre__ + "kac-jspvz/online/audio/启动.mp4", onended: () => {
							let oCv2 = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 130}, Height: 600, Width: 1800}, EDAll);
							oCv2.Gradient_Rect(0, [[1, 300]], oSym["NowStep"], [0, 0, 0], () => SelectModal(__Normal_Start_Room__));
						}}, EDAll);
					});
				}, 
				"ChooseSaves": () => {
					if (!CanChange) return; CanChange = false, PlayAudio("tap");
					oEf.Animate($("dChooseSavesBox"), { "left": "0px" }, 0.6, "cubic-bezier(0.0, 0.0, 0.3, 1)", () => {
						$("dChooseLevelBox").style.left = "-900px", $("dChooseSavesBox").style.left = "0px", CanChange = true;
					});
				}, 
				"ChooseSavesCancel": () => {
					if (!CanChange) return; CanChange = false, PlayAudio("tap");
					$("dChooseLevelBox").style.left = "0px";
					oEf.Animate($("dChooseSavesBox"), { "left": "900px" }, 0.6, "cubic-bezier(0.3, 0.0, 0.6, 1)", () => {
						$("dChooseLevelBox").style.left = "0px", $("dChooseSavesBox").style.left = "900px", CanChange = true;
					});
				}, 
				"GotoStaffLevel": () => { // 去致谢名单关卡
					if (CanChange == false) return;
					NowLevel = "Staff", Change_Level(1), CanChange = false;
				}
			}));
		}, 



		// EX11 致谢名单界面
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
					AllAudioStop(), Play2("2119780859");
				},
				Staff_HTML: [
					'<!-- 制作名单 -->',
					'<a style="font-size:100px;-webkit-text-stroke-width:4px;"><br><br>EX11 致谢<br><br><br></a><br><br><br>',
					'<a style="font-size:30px;-webkit-text-stroke-width:1px;">（请用鼠标下滑查看）<br><br><br><br><br><br><br><br><br><br></a>',
					'',
					'<!-- EX11 - 1 关卡策划 -->',
					'<a style="font-size:70px;-webkit-text-stroke-width:2px;">EX11 - 1</a><br><a style="font-size:20px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">策划</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">创意 & 设计</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅   snz<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">程序</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">测试</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;word-spacing:1em;">我是帅 snz 白鹤亮翅<br>寒冰投手 B站的J 嘿嘿黑黑 SN0SE<br></a><br><a style="font-size:15px;">（排名不分先后，下同）</a><br>',
					'<a style="font-size:350px;"><br></a>',
					'',
					'<!-- EX11 - 2 关卡策划 -->',
					'<a style="font-size:70px;-webkit-text-stroke-width:2px;">EX11 - 2</a><br><a style="font-size:20px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">策划</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">创意 & 设计</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅   snz<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">程序</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;">我是帅<br></a><br><a style="font-size:60px;"><br></a>',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">测试</a><br><a style="font-size:5px;"><br></a>',
					'<a style="font-size:40px;line-height:1.3;word-spacing:1em;">我是帅 snz 白鹤亮翅<br>寒冰投手 B站的J 嘿嘿黑黑 SN0SE<br></a><br>',
					'<a style="font-size:350px;"><br></a>',
					'',
					'<!-- 特别感谢 -->',
					'<a style="font-size:65px;line-height:1.25;-webkit-text-stroke-width:2px;">特别感谢</a><br>',
					'<a style="font-size:35px;line-height:1.5;word-spacing:1em;">snz 江南游戏 白鹤亮翅 嘿嘿黑黑<br>寒冰投手 B站的J rtty 小南漂<br>SN0SE<br>屏幕前的你</a><br><a style="font-size:225px;"><br></a>',
					'<a style="font-size:350px;"><br></a>',
					'',
					'<!-- 音乐列表，可以点击音乐播放 -->',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;">本关音乐列表</a><br><br>',
					'<a style="font-size:25px;line-height:1.3;cursor:pointer;" onclick="Play(\'Cherry_Blossoms\')">死霊の夜桜  ——  上海アリス幻樂団</a><br>',
					'<a style="font-size:25px;line-height:1.3;cursor:pointer;" onclick="Play2(\'1470569954\')">Towards the Horizon  ——  Alexander Nakarada</a><br>',
					'<a style="font-size:25px;line-height:1.3;cursor:pointer;" onclick="Play2(\'2119781867\')">変貌する大地 -破-  ——  MANYO</a><br>',
					'<a style="font-size:25px;line-height:1.3;cursor:pointer;" onclick="Play2(\'2119780859\')">Light Years -farewell ver.-  ——  麻枝准 / MANYO</a><br>',
					'<a style="font-size:250px;"><br></a> <!-- 大跨度 -->',
					'',
					'<!-- 免责声明等 -->',
					'<a style="font-size:55px;-webkit-text-stroke-width:2px;color:#FF4141">版权与免责声明</a><br><br><br><br>',
					'<a style="font-size:25px;line-height:1.4;">为了追求游戏内体验，本关中部分素材来自于原游戏、江南游戏</a><br>',
					'<a style="font-size:25px;line-height:1.4;">以及互联网，部分音乐源自于网络，并在未授权的情况下以非商业用途</a><br>',
					'<a style="font-size:25px;line-height:1.4;">使用，且在歌曲列表里注明了歌曲信息，如有版权问题请及时联系我们。</a><br>',
					'<a style="font-size:25px;line-height:1.4;">感谢您的谅解，也感谢不知情的艺术家们的创作。</a><br>',
					'<a style="font-size:250px;"><br></a> <!-- 大跨度 -->',
					'',
					'<a style="font-size:70px;-webkit-text-stroke-width:2px;">EX11</br></a>',
					'<a style="font-size:60px;-webkit-text-stroke-width:2px;">2024 - 2025</br></a>',
					'<a style="font-size:250px;"><br></a>',
					''
				],
			}, {}, {
				"Play": (N) => (StopMusic(oS.LoadMusic), PlayMusic(oS.LoadMusic = N)), // 播放音乐
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

		"default": () => ( oS.Init({ LvlClearFunc: function() {delete oS.NowLevel;} }, {}, {}), SelectModal(__Normal_Start_Room__), true)
	})();
})();


/*


难度倍率: 1/ln(e + e^-0.5 * x)


EX11 设计方案备选（二选一或都选）: 
	新增关卡特殊道具：靶子，植物会攻击靶子
	1. 必须在指定范围内杀死僵尸，否则失败
	2. 必须在指定范围内攻击僵尸才有效，否则僵尸加血

EX11 剧情设计方案：
	Day1 故事背景: 2024年日本核污水排海，过了若干年，海洋中产生了一种病毒
		随着时间的推移，它传播到了陆地上，并不断产生新的变异病毒，病毒的传播能力很强，
		僵尸感染了该病毒，如果不在隔离区内击打僵尸，那么僵尸是不会受到伤害的
		换言之，在隔离区外的僵尸如果受伤了，空气中的病毒会自动修复伤口并加强僵尸血量
		只有在隔离区内攻打僵尸，才能让僵尸伤口无法恢复
		但是很明显，因为病毒的强大性，我们的隔离区不可能一直那么大，因此游戏过程中
		隔离区也就是范围会变化。
		但是我们的植物并不知道这一切，它们并不会被感染，它们
		也不会管僵尸是否在范围之外，因此我们研发出了一种靶子
		可以帮助玩家挡子弹，需要花费 150 阳光，50000 血（耐久）

	Day2 故事背景: 随着时间的推移，病毒不断变异，病毒的修补能力减弱了
		但是传播能力增加了，如果僵尸在隔离区外死亡，那么身上的病毒会直接向四周喷射
		如同破片手榴弹一样，届时，我们会失去我们的安全区
		因此，玩家必须得在范围内杀死僵尸，否则游戏失败
		而在病毒变异期间，我们的技术也不断增强
		尤其是挡子弹的靶子，只需花费 100 阳光，500000 血（耐久）
		为了在这个世界寻找出路，我们只能不断击杀僵尸，并不断
		寻找僵尸所携带的远古技术，或者自己研发、测试产品

	DayEnd 故事背景: 好在，我们挺过了病毒最强的一段时期
		我们暂时不用担心杀死僵尸后病毒是否会造成严重后果了
		因为我们的植物配备上了我们新一代消毒剂
		可以使僵尸体内的病毒失去传播能力
		我们安全了，暂时的


音乐备选：
	快节奏的：https://music.163.com/#/song?id=509034
	慢节奏的：https://music.163.com/#/song?id=509002


方案一：
	ClearChild($("DivA"));

	let DivA = NewEle("DivA", "div", "position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:rgba(0,0,0,0.8);z-index:100;pointer-events:none;", 0, EDAll);
	let X = 50, Y = 50, Height = 40, Width = 40, GetMask = () => "linear-gradient(to right, transparent " + Width + "px, black 0px) " + X + "px " + Y + "px, linear-gradient(to bottom, transparent " + Height + "px, black 0px) " + X + "px " + Y + "px";
	DivA.style.mask = GetMask();


	X = 50, Y = 50, Height = 0, Width = 0;
	await oEf.AnimatePromise(DivA, { "mask" : GetMask() }, 2, "ease-in-out");

方案二：
	ClearChild($("StyleA"), $("DivA"), $("DivB"), $("DivMask"));
	let StyleA = NewEle("StyleA", "style", "", {
		"innerHTML": `
			body {
				margin: 0;
				overflow: hidden;
			}
			#DivA {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0);
				z-index: 100;
				pointer-events: none;
			}
			#DivB {
				position: fixed;
				top: 100px;
				left: 100px;
				width: 200px; 
				height: 200px;
				background-color: transparent;
				z-index: 101;
			}
			#DivB::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: transparent;
				box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
			}
		`
	}, EDAll);
	let DivA = NewEle("DivA", "div", "", 0, EDAll);
	let DivB = NewEle("DivB", "div", "", 0, EDAll);

	await oEf.AnimatePromise(DivB, { 
		"top": "30px", 
		"left": "30px", 
		"width": "150px", 
		"height": "600px"
	}, 3, "ease-in-out");

// ——————————————————————————————————————————————————————————————————————————

	ClearChild($("StyleA"), $("DivA"), $("DivB"), $("DivMask"));
	let StyleA = NewEle("StyleA", "style", "", {
		"innerHTML": `
			body {
				margin: 0;
				overflow: hidden;
			}
			#DivA {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0);
				z-index: 100;
				pointer-events: none;
			}
			#DivB {
				position: fixed;
				top: 100px;
				left: 100px;
				width: 200px;
				height: 200px;
				background-color: transparent;
				border-radius: 50%;
				z-index: 101;
				// mix-blend-mode: color;
			}
			#DivB::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: transparent;
				border-radius: 50%;
				box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
			}
		`
	}, EDAll);
	let DivA = NewEle("DivA", "div", "", 0, EDAll);
	let DivB = NewEle("DivB", "div", "", 0, EDAll);


	await oEf.AnimatePromise(DivB, { 
		"top": "200px", 
		"left": "400px", 
		"width": "150px", 
		"height": "150px"
	}, 2, "ease-in-out");

// ——————————————————————————————————————————————————————————————————————————

	ClearChild($("StyleA"), $("DivA"), $("DivB"), $("DivMask"));
	let StyleA = NewEle("StyleA", "style", "", {
		"innerHTML": `
			body {
				margin: 0;
				overflow: hidden;
			}
			#DivA {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0);
				z-index: 100;
				pointer-events: none;
			}
			#DivB {
				position: fixed;
				top: 100px;
				left: 100px;
				width: 200px;
				height: 200px;
				background-color: transparent;
				border-radius: 50%;
				z-index: 101;
				mix-blend-mode: color;
			}
			#DivB::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: transparent;
				border-radius: 50%;
				box-shadow: 0 0 0 9999px rgba(75, 10, 0, 0.5);
				// box-shadow: 0 0 0 9999px rgba(75, 10, 70, 0.4);
			}
		`
	}, EDAll);
	let DivA = NewEle("DivA", "div", "", 0, EDAll);
	let DivB = NewEle("DivB", "div", "", 0, EDAll);

// ——————————————————————————————————————————————————————————————————————————

	ClearChild($("DivStyleA"), $("DivA"), $("DivAMask"), $("DivStyleB"), $("DivB"), $("DivBMask"));
	let DivStyleA = NewEle("DivStyleA", "style", "", {
		"innerHTML": `
			#DivA {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0);
				z-index: 100;
				pointer-events: none;
			}
			#DivAMask {
				position: fixed;
				top: 100px;
				left: 100px;
				width: 200px;
				height: 200px;
				background-color: transparent;
				border-radius: 50%;
				z-index: 101;
				mix-blend-mode: color;
			}
			#DivAMask::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: transparent;
				border-radius: 50%;
				box-shadow: 0 0 0 9999px rgba(75, 10, 0, 0.5);
			}
		`
	}, EDAll);
	let DivA = NewEle("DivA", "div", "", 0, EDAll);
	let DivAMask = NewEle("DivAMask", "div", "", 0, EDAll);

	let DivStyleSPEF = NewEle("DivStyleB", "style", "", {
		"innerHTML": `
			#DivSPEF {
				position: fixed; top: 0px; left: 0px;
				width: 1800px; height: 600px;
				background-color: rgba(0, 0, 0, 0);
				z-index: 98; pointer-events: none;
			}
			#DivSPEFMask {
				position: fixed; top: 0px; left: 0px;
				width: 1800px; height: 600px;
				background-color: transparent;
				z-index: 99; pointer-events: none;
				mix-blend-mode: color;
			}
			#DivSPEFMask::before {
				content: ''; position: absolute;
				top: 0px; left: 0px;
				width: 100%; height: 100%;
				background: transparent;
				box-shadow: 0 0 0 9999px rgba(0, 0, 80, 0.8);
			}
		`
	}, EDAll);
	let DivSPEF = NewEle("DivSPEF", "div", "top:0px; left:0px; width:1800px; height:600px;", 0, EDAll);
	let DivSPEFMask = NewEle("DivSPEFMask", "div", "top:0px; left:0px; width:1800px; height:600px;", 0, EDAll);


oGT.On("ZombieInjured", (...Arr) => console.log(...Arr));


for (let R = 1; R <= oS.R; ++R) {
	for (let C = 1; C <= oS.C; ++C) ___Template__Summon_Ban_Block___(R, C), $(oGd.$Creator_Def[R + "_" + C].id).style.filter = "saturate(20%) hue-rotate(290deg)", $(oGd.$Creator_Def[R + "_" + C].id).style.opacity = "0.4";
}
*/