(() => { 
	let EDGet = () => EDMove, NewSkinUrl = "new_skin/Images/", StoreName = "EX_Pool_12";
	let LevelStore = oLocalVar.GetObj(StoreName), CanChange = true;
	let NowLevel = (oS.NowLevel != null) ? (oS.NowLevel) : ("ChooseLevel"); // 当前阶段
	let $FJ = __Template_ReSet_Object__, FullLevelStore = (Obj) => { // 补全当前关卡数据，防止读取错误
		Obj["MaxPlay"] ??= 1, Obj["MaxPlay"] = Math["max"](Obj["MaxPlay"], 1);
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
		PicArr: [NewSkinUrl + "InterFace/background_new_3.png"], backgroundImage: NewSkinUrl + "InterFace/background_new_3.png", 
		LevelName: "EX-12 远征", LvlEName: "EX_Pool_12", StartGameMusic: "Cherry_Blossoms", 
		GroundType: 1, MusicMode: 1, CanSelectCard: 1, LF: [0, 1, 1, 1, 1, 1, 1], AddZombiesWaitTime: 1500, 
		SunNum: 750, DKind: 0, Coord: 200, LevelProduce: "阶段性挑战，祝君好运", Block_Level_Task: [""],
		LoadAccess: function(Callback_Start) {
			oS.GroundType ? ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);opacity:1;" src="images/New_interface/pool_block.png">') : ($("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);opacity:1;" src="images/New_interface/pool.gif">');
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
				for (let i in ArCard) DoCoolTimer(i, 0);
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
		SummonZombie: function (id, R, C) {  // 僵尸obj，行，列
			var a, e = Math.min(Math.max(R, 1), oS.R), b = Math.min(Math.max(C, -2), 13);
			asyncInnerHTML((a = new id).CustomBirth(e, b, 1, "auto"), function(n, m) { EDPZ.appendChild(n); m.Birth(); }, a);
			return ++oP.NumZombies, a; // 返回僵尸数据
		}, 
		SummonAppearUpZombie: function (id, R, C, Turn = 0) {
			var f = [new id], d = [f[0].CustomBirth(R, C, 100)];
			oP.AppearUP(d, f, 1); if (Turn) oSym.addTask(1, Refunc, [f[0]]);
			return f[0];
		}, 
		DelayPlaceZombiePos: (Arr, Num, Pos, Delay = 30, Turn = 0) => {
			if (Num <= Arr.length) Arr.sort(() => Math.random() - 0.5); oP.NumZombies += 10000;
			let _ = () => {
				let P = Pos["valueOf"]();
				if ((--Num) < Arr.length) SummonAppearUpZombie(Arr[Num], P[0]["valueOf"](), P[1]["valueOf"](), Turn);
				else SummonAppearUpZombie(Arr[Math.floor(Math.random() * Arr.length)], P[0]["valueOf"](), P[1]["valueOf"](), Turn);
				if (!Num) return (oP.NumZombies -= 10000);
				if (Delay != 0) oSym.addTask(Delay * (Math.random() * 0.2 + 0.9), _), PlayAudio("dirt_rise");
			}; 
			if (Delay == 0) for (let i = (PlayAudio("dirt_rise"), Num); i > 0; --i) _();
			else _();
		}, 
		DelayPlaceZombie: (Arr, Num, R, C, Delay = 30, Turn = 0) => { DelayPlaceZombiePos (Arr, Num, [R, C], Delay, Turn); }, 
		Refunc: (A) => (A.ExchangeLR(A, 1), A.WalkDirection = 1, A.ZX = A.AttackedRX, A.ChkActs = A.ChkActs1), 
		DeadPlants: [], AddDiePlants: () => {}, RemoveDiePlants: () => {}, ChangeCard: () => {}, IgnoreDeadPlants: false
	}; 

// ====================================================================================================

	FullLevelStore(LevelStore); // 初始化最大游玩关卡
	// if (NowLevel == "ChooseLevel" && LevelStore["MaxPlay"] == 1) NowLevel = "ChooseLevel"; // 直接进入第一阶段（剧情未来加）

// ==——特殊对象区——==
	// 定义隐形靶子
	let oTargetZombie = InheritO(oZombie, {
		EName: "oTargetZombie", CName: "僵尸靶子", Tooltip: "充当植物的靶子", Produce: "充当植物的靶子", 
		OSpeed: 0, Speed: 0, Lvl: Infinity, SunNum: 0, HP: Infinity, MaxHP: Infinity,  
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
			f.getHit = f.getHit0 = f.getHit1 = f.getHit2 = f.getHit3 = f.NormalGetHit;
		}, 
		Die: function () {
			let self = this, TimeDouble = 10 / oSym.TimeStep * oSym.NowStep; oP.NumZombies += 2;
			oEf.Animate(self.Ele, { "opacity": "0" }, 0.5 / TimeDouble, "linear", () => {
				oZombie.prototype.DisappearDie.call(self), --oP.NumZombies;
			});
		}, 
		NormalGetHit: function (c, b) {
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
	oInvisibleBean = InheritO(oCoffeeBean, {
		EName: "oInvisibleBean", CName: "隐身豆",
		Tooltip: "可以隐藏植物，使他们不会受到普通僵尸与冰车的伤害", 
		Produce: "可以隐藏植物，使他们不会受到普通僵尸与冰车的伤害", 
		PicArr: ["new_skin/Images/Card/InvisibleBeans.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random], 
		SunNum: 200, coolTime: 5, 
		CanGrow: (a, b) => (b = a[1]) && b.canEat && !a[3], 
		PrivateBirth: function(a) {
			SetHidden($(a.id).firstChild);
			PlayAudio("coffee");
			oSym.addTask(50, function(c) {
				PlayAudio("wakeup"), $P[a.id] && a.Die();
				var d = oGd.$[c]; if (!d) return;
				d.canEat = 0, d.Stature = -1, SetAlpha($(d.id), 70, 0.7);
				d.getHurt = function(e, c, b) {
					var d = this, a = d.id; !(c % 3) && (d.HP -= b) < 1 && d.Die();
				};
			}, [a.R + "_" + a.C + "_1"]);
		}
	}), 
	oReCardBean = InheritO(oCoffeeBean, {
		EName: "oReCardBean", CName: "卡槽豆",
		Tooltip: "使植物变为卡片形态，并恢复初始状态", 
		Produce: "使植物变为卡片形态，并恢复初始状态", 
		PicArr: ["new_skin/Images/Card/ReCardBeans.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random], 
		SunNum: 25, coolTime: 0, 
		CanGrow: (a, b) => (b = a[1]) && !b.VaseValue && !a[3], 
		CardSpecial: { "oGatlingPea": oRepeater, "oTwinSunflower": oSunFlower, "oGloomShroom": oFumeShroom, "oSpikerock": oSpikeweed }, 
		PrivateBirth: function(self) {
			SetHidden($(self.id).firstChild), PlayAudio("coffee");
			oSym.addTask(0, function(c) {
				PlayAudio("wakeup"), $P[self.id] && self.Die();
				var d = oGd.$[c]; if (!d) return; var e = self.CardSpecial[d.EName], X = GetX(d.C) - d.width / 2, Y = GetY(d.R, d.C) - 30;
				if (e) AppearCard(X, Y + 30, window[d.EName], 0, Infinity), AppearCard(X, Y - 10, e, 0, Infinity);
				else AppearCard(X, Y, window[d.EName], 0, Infinity); d.Die(false);
				RemoveDiePlants(window[d.EName]), RemoveDiePlants(e);
			}, [self.R + "_" + self.C + "_1"]);
		}
	}), 
	oRecoverBean = InheritO(oCoffeeBean, {
		EName: "oRecoverBean", CName: "恢复豆",
		Tooltip: "可对植物使用，使其恢复初始状态并获得额外血量", 
		Produce: "可对植物使用，使其恢复初始状态并获得额外血量", 
		PicArr: ["new_skin/Images/Card/RecoverBean.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random], 
		SunNum: 50, coolTime: 5, 
		CanGrow: (a, b) => (b = a[1]) && !b.VaseValue && !a[3], 
		calcf: (x) => (x <= 2000 ? (1.5 * Math.sqrt(2000 * x)) : (1000 + x)), 
		PrivateBirth: function(self) {
			SetHidden($(self.id).firstChild), PlayAudio("coffee");
			oSym.addTask(200, function(c) {
				PlayAudio("wakeup"), $P[self.id] && self.Die();
				var d = oGd.$[c]; if (!d) return; var R = d.R, C = d.C; 
				IgnoreDeadPlants = true;
				d.Die(false), CustomSpecial(window[d.EName], R, C);
				d = oGd.$[c], d.HP = self.calcf(d.HP);
				IgnoreDeadPlants = false;
			}, [self.R + "_" + self.C + "_1"]);
		}
	}), 
	oSuperRecover = InheritO(oRecoverBean, {
		EName: "oSuperRecover", CName: "超级恢复豆",
		Tooltip: "使全场植物恢复其初始状态并获得额外血量", 
		Produce: "使全场植物恢复其初始状态并获得额外血量", 
		PicArr: ["new_skin/Images/Card/SuperRecover.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random], 
		SunNum: 500, coolTime: 50, CanNotGrow: true, CanGrow: (a, b) => false, 
		calcf: (x) => (x <= 2000 ? (1.5 * Math.sqrt(2000 * x)) : (1000 + x)), 
		SpecialChose: function () {
			let self = this; IgnoreDeadPlants = true;
			for (let R = 1, O; R <= oS.R; ++R) 
				for (let C = 1; C <= oS.C; ++C) 
					if ((O = oGd.$[R + "_" + C + "_1"]) && !O.VaseValue) {
						O.Die(false), CustomSpecial(window[O.EName], O.R, O.C);
						O = oGd.$[R + "_" + C + "_1"], O.HP = self.calcf(O.HP);
					}
			IgnoreDeadPlants = false;
			console.log("超级恢复豆使用成功！");
		}
	}), 
	oReviveBean = InheritO(oRecoverBean, {
		EName: "oReviveBean", CName: "复活豆",
		Tooltip: "使所有死去的植物变为掉落的卡槽形式复活", 
		Produce: "使所有死去的植物变为掉落的卡槽形式复活", 
		PicArr: ["new_skin/Images/Card/ReviveBean.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random], 
		SunNum: 500, coolTime: 50, CanNotGrow: true, CanGrow: (a, b) => false, 
		calcf: (x) => (x <= 2000 ? (1.5 * Math.sqrt(2000 * x)) : (1000 + x)), 
		SpecialChose: function () {
			let self = this, rPos = $$Pos([1, oS.R], [1, oS.C]), P, X, Y;
			for (let o of DeadPlants) {
				P = rPos["valueOf"]();
				X = GetX(P[1]) - o["prototype"]["width"] / 2;
				Y = GetY(P[0], P[1]) - 50;
				AppearCard(X, Y, o, 0, Infinity);
			}
			DeadPlants.length = 0, ChangeCard();
			console.log("复活豆使用成功！");
		}
	}), 
	$$Pos = (RRange, CRange) => {
		let Arr = [], $Add = () => { for (let R = RRange[0]; R <= RRange[1]; ++R) for (let C = CRange[0]; C <= CRange[1]; ++C) Arr.push([R, C]); Arr = Arr.sort(() => Math.random() - 0.5); };
		return { valueOf: (ret) => { if (!Arr.length) $Add(); ret = Arr[Arr.length - 1]; return --Arr.length, ret; } };
	};

// ==——关卡区——==
	$SEql(NowLevel, { // 每个阶段对应不同函数
		// 远征 - 第一天
		1: () => {
			let oStarfruit_EX12 = InheritO(oStarfruit, { SunNum: 200, EName: "oStarfruit_EX12", coolTime: 7.5 }), 
				oSplitPea_EX12 = InheritO(oSplitPea, { SunNum: 225, EName: "oSplitPea_EX12", coolTime: 7.5 }), 
				oGatlingPea_EX12 = InheritO(oGatlingPea_Pro, { SunNum: 275, EName: "oGatlingPea_EX12", coolTime: 7.5 }), 
				oTorchwood_EX12 = InheritO(oTorchwood_Pro, { SunNum: 175, EName: "oTorchwood_EX12", coolTime: 7.5 }), 
				oIceShroom_EX12 = InheritO(oIceShroom, { EName: "oIceShroom_EX12", coolTime: 25 }), 
				oJalapeno_EX12 = InheritO(oJalapeno, { EName: "oJalapeno_EX12", coolTime: 25 });

			oS.Init($FJ(oSys, {
				PName: [oSunFlower, oTwinSunflower, oStarfruit_EX12, oSnowPea, oSplitPea_EX12, oGatlingPea_EX12, oTorchwood_EX12, oBlover, oIceShroom_EX12, oJalapeno_EX12],
				ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oFootballZombie, oDancingZombie, oBalloonZombie, oImp, oDiggerZombie, oTargetZombie], 
				Block_Level_Task: ["<a style=\"font-size:18px;line-height:1.5;position:relative;top:-3px;\">远征 第一天</a><br><a style=\"font-size:15px;line-height:1.5;\">1.欢迎来到远征第一天，你的场地将会被划分为左右两半，你只能在右半场种植植物，左半场将会出现僵尸<br>2.因当地习俗，在场地右侧会有打不中的靶子僵尸吸引植物火力，同时你需要阻止僵尸突破左侧高坚果防线<br>3.因当地天气恶劣，所有子弹将会受大风影响向左飞行</a><a style=\"font-size:16px;line-height:1.8;\"><br>失败将从当前阶段重新开始<br><br></a>"],
				CanSelectCard: 0, MusicMode: 0, 
				LevelName: "EX-12 远征 - 第一天", SelectCardList: [], StartGameMusic: "EX12-1-Music",
				DefLoad2: () => { 
					let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;
					for (let i of oS.SelectCardList) SelectCard(i, 1); 
				}, 
				DefLoad: () => {
					delete oAudio["EX12-1-Music"];
					NewURLAudio({ url: "https://music.163.com/song/media/outer/url?id=1488796978.mp3", audioname: "EX12-1-Music", loop: true }, { volume: 0.75 });

					AppearTombstones(1, 4, 24), EDPZ.style.left = EDMove.style.left = "115px"; // 提前移动

					for (let i = 1, j; i <= oS.R; ++i) {
						CustomSpecial(oTallNut, i, 0), (j = oGd.$[i + "_0_1"]).pixelLeft = 65, $(j.id).style.left = "65px", j.AttackedRX = 150, j.AttackedLX = 50, j.HP *= 2.5;
						TargetList[i] = SummonZombie(oTargetZombie, i, 9), --oP.NumZombies;
						BanBlockEleList[i] = ___Template__Summon_Ban_Block___(i, 5);
						BanBlockEleList[i].style.left = "465px";
					}

					setTimeout(() => { // 调整靶子僵尸的状态
						for (let i = 1; i <= oS.R; ++i) try {
							let Z = TargetList[i], Ele = Z.Ele;
							Ele.firstChild.style.left = "0px";
							Ele.style.left = "870px", Ele.style.opacity = "0.5";
							Z.AttackedLX = GetX(9) - 10, Z.AttackedRX = GetX(11), Z.X = 870, Z.IgnoreHit = true;
						} catch {};
					}, 0);

					oP.NumZombies = 0; // 归位
				}, 
				DefStartLoad: () => { 
					oScreen.MakeWidth(), SetBlock($("Div_TimeTask"), $("Div_Start")); // 提示栏、初始数据
					setTimeout(() => oEf.Animate($("Div_TimeTask"), { "left": "260px", "width": "405px" }, 0.8, "cubic-bezier(0.8,0.4,0.2,0.6)"), 800);
					(function(){ // 本关数据中枢
						let ZNum = 0, Time = (Math.floor(Math.max(0, oSym.Now - GameLevelData.StartTime) / 10) / 10).toFixed(1);
						for (let i in $Z) if (!$Z[i].IgnoreHit) ++ZNum;
						$("dTitle_Task").innerText = "FlagNum: " + oP["FlagNum"] + "     NowFlag: " + oP["FlagZombies"] + "     ZombieNum:" + ZNum + (Time > 0 ? ("     Time: " + Time + "s") : (""));
						oSym.addTask(5, arguments.callee, []);
					})();
				}, 
				LF: [0, 1, 1, 1, 1, 1, 1], RefuseStart: false, AddZombiesWaitTime: 4500, Cheat_Mode: false,
				GroundType: 1, SunNum: 500, LargeWaveFlag: { 10: $("imgFlag2"), 20: $("imgFlag1") }, 
				UserDefinedFlagFunc: function() {
					$SEql(oP.FlagZombies, Object.assign(oS.UserFlagMonitor, { "default": () => {}, }))();
				}, 
				Summon_Start_Func: function() {
					AutoProduceSun(25), GameLevelData.StartTime = oSym.Now;
					oGT.On("BulletBirth", (self) => {
						self["Border"][0] = [-100, 2000];						
						self["Weight"][0] += 0.05, self["Gravity"][0] -= 1, self["MinSpeed"][0] = -10;
						if (self["Speed"][2] < 0) self["Weight"][2] += 0.05, self["Gravity"][2] += 0.95, self["MaxSpeed"][2] = 0;
						if (self["Speed"][2] > 0) self["Weight"][2] += 0.05, self["Gravity"][2] -= 0.95, self["MinSpeed"][2] = 0;
						self["SpecialCheckZombie"] = (Z) => !(Z.IgnoreHit ?? false);
					}); // 子弹回飞，且不碰到僵尸
				}, 
				NormalFlagZombieTask: 175, BigFlagZombieTask: 30, 
				UserFlagMonitor: {
					1: () => {
						DelayPlaceZombiePos([oImp], 8, $$Pos([1, oS.R], [1, 2]), 0);
					}, 
					2: () => {
						DelayPlaceZombiePos([oPoleVaultingZombie], 5, $$Pos([1, oS.R], [2, 3]), 20);
					}, 
					3: () => {
						SummonAppearUpZombie(oDancingZombie, 2, 5);
						SummonAppearUpZombie(oDancingZombie, 5, 5);
						PlayAudio("dirt_rise");
					}, 
					4: () => {
						for (let i = 1; i <= oS.R; ++i) SummonAppearUpZombie(oBalloonZombie, i, 11);
						DelayPlaceZombiePos([oConeheadZombie], 7, $$Pos([1, oS.R], [2, 3]), 20);
						DelayPlaceZombiePos([oZombie, oZombie2, oZombie3], 8, $$Pos([1, oS.R], [1, 2]), 20);
					}, 
					5: () => {
						for (let i = 1; i <= oS.R; ++i) SummonAppearUpZombie(oBalloonZombie, i, 11);
						DelayPlaceZombiePos([oFootballZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie], 6, $$Pos([1, oS.R], [4, 4]), 30);
					}, 
					6: () => {
						for (let i = 1; i <= oS.R; ++i) SummonAppearUpZombie(oBalloonZombie, i, 11);
						SummonAppearUpZombie(oDancingZombie, 2, 5);
						SummonAppearUpZombie(oDancingZombie, 5, 5);
						SummonAppearUpZombie(oFootballZombie, 1, 4);
						SummonAppearUpZombie(oFootballZombie, 3, 4);
						SummonAppearUpZombie(oFootballZombie, 4, 4);
						SummonAppearUpZombie(oFootballZombie, 6, 4);
						PlayAudio("dirt_rise");
					}, 
					7: () => {
						for (let i = 1; i <= oS.R; ++i) SummonAppearUpZombie(oBalloonZombie, i, 11);
						DelayPlaceZombiePos([oBucketheadZombie], 8, $$Pos([1, oS.R], [4, 4]), 30);
					}, 
					8: () => {
						for (let i = 1; i <= oS.R; ++i) SummonAppearUpZombie(oBalloonZombie, i, 11);
						DelayPlaceZombiePos([oFootballZombie], 4, $$Pos([1, oS.R], [4, 4]), 30);
						DelayPlaceZombiePos([oPoleVaultingZombie], 6, $$Pos([1, oS.R], [2, 3]), 40);
					}, 
					9: () => {
						for (let i = 1; i <= oS.R; ++i) SummonAppearUpZombie(oBalloonZombie, i, 11);
						DelayPlaceZombiePos([oBucketheadZombie], 5, $$Pos([1, oS.R], [4, 4]), 50);						
						SummonAppearUpZombie(oDancingZombie, 2, 5), SummonAppearUpZombie(oDancingZombie, 5, 5);
						oSym.addTask(40, SummonAppearUpZombie, [oDancingZombie, 2, 5]);
					}, 
					10: () => {
						oP.SetTimeoutSkyZombie(5, 5, 6, [oBalloonZombie]);
						oP.SetTimeoutSkyZombie(11, 11, 6, [oBucketheadZombie]);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie, oPoleVaultingZombie, oFootballZombie], 12, $$Pos([1, oS.R], [3, 4]), 50);
					}, 
					11: () => {
						oEf.Animate(BanBlockEleList[1], {"opacity": "0"}, 0.5, "ease-in-out"), oEf.Animate(BanBlockEleList[3], {"opacity": "0"}, 0.5, "ease-in-out");
						oEf.Animate(BanBlockEleList[4], {"opacity": "0"}, 0.5, "ease-in-out"), oEf.Animate(BanBlockEleList[6], {"opacity": "0"}, 0.5, "ease-in-out");
						oGd.$Creator_Def["1_5"] = null, oGd.$Creator_Def["3_5"] = null, oGd.$Creator_Def["4_5"] = null, oGd.$Creator_Def["6_5"] = null;
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie, oPoleVaultingZombie, oFootballZombie], 6, $$Pos([1, oS.R], [3, 4]), 50);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie], 6, $$Pos([1, oS.R], [3, 4]), 50, 1);
					}, 
					12: () => {
						DelayPlaceZombiePos([oDiggerZombie], 6, $$Pos([1, oS.R], [3, 4]), 30);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie, oPoleVaultingZombie, oFootballZombie], 6, $$Pos([1, oS.R], [3, 4]), 50);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie], 6, $$Pos([1, oS.R], [3, 4]), 50, 1);
						oP.SetTimeoutSkyZombie(11, 11, 6, [oBucketheadZombie]);
					}, 
					13: () => {
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie, oPoleVaultingZombie, oFootballZombie], 7, $$Pos([1, oS.R], [3, 4]), 50);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie], 6, $$Pos([1, oS.R], [3, 4]), 50, 1);
						DelayPlaceZombiePos([oDiggerZombie], 6, $$Pos([1, oS.R], [4, 4]), 30);
					}, 
					14: () => {
						oP.SetTimeoutSkyZombie(11, 11, 6, [oBucketheadZombie, oFootballZombie]);
						oP.SetTimeoutTomZombie([oBucketheadZombie, oFootballZombie]);
					}, 
					15: () => {
						DelayPlaceZombiePos([oFootballZombie], 5, $$Pos([1, oS.R], [4, 4]), 30);
						SummonAppearUpZombie(oDancingZombie, 2, 5), SummonAppearUpZombie(oDancingZombie, 5, 5);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie, oPoleVaultingZombie], 8, $$Pos([1, oS.R], [2, 3]), 50);
					}, 
					16: () => {
						DelayPlaceZombiePos([oDiggerZombie], 8, $$Pos([2, 5], [1, 4]), 10);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie], 8, $$Pos([2, 5], [2, 4]), 20);
						DelayPlaceZombiePos([oBucketheadZombie, oConeheadZombie], 8, $$Pos([1, 6], [2, 4]), 20, 1);
						oP.SetTimeoutSkyZombie(11, 11, 9, [oDancingZombie, oBucketheadZombie]);
					}, 
					17: () => {
						SummonAppearUpZombie(oDancingZombie, 2, 5), SummonAppearUpZombie(oDancingZombie, 5, 5);
						DelayPlaceZombiePos([oFootballZombie], 6, $$Pos([1, 6], [3, 4]), 0, 1);
						DelayPlaceZombiePos([oZombie, oConeheadZombie], 8, $$Pos([1, 6], [1, 2]), 0, 1);
					}, 
					18: () => {
						DelayPlaceZombiePos([oBucketheadZombie], 8, $$Pos([1, 6], [1, 2]), 0, 1);
						DelayPlaceZombiePos([oFootballZombie], 7, $$Pos([1, 6], [3, 4]), 0, 1);
						DelayPlaceZombiePos([oConeheadZombie], 8, $$Pos([1, 6], [3, 4]), 0);
						oP.SetTimeoutSkyZombie(11, 11, 6, [oFootballZombie]);
					}, 
					19: () => {
						oP.NumZombies += 10;
						oSym.addTask(0, DelayPlaceZombiePos, [[oBucketheadZombie], 8, $$Pos([1, 6], [1, 1]), 10, 1]);
						oSym.addTask(200, DelayPlaceZombiePos, [[oFootballZombie], 7, $$Pos([1, 6], [2, 2]), 10, 1]);
						oSym.addTask(600, DelayPlaceZombiePos, [[oBucketheadZombie], 7, $$Pos([1, 6], [3, 3]), 10, 0]);
						oSym.addTask(700, DelayPlaceZombiePos, [[oFootballZombie], 7, $$Pos([1, 6], [4, 4]), 10, 0]);
						oSym.addTask(700, () => { oP.NumZombies -= 10; }, []);
					}, 
					20: () => {
						oP.NumZombies += 10;
						for (let i = 1; i <= oS.R; ++i) SummonZombie(oFootballZombie, i, 12);
						oSym.addTask(0, DelayPlaceZombiePos, [[oBucketheadZombie], 24, $$Pos([1, 6], [1, 4]), 0, 1]);
						oSym.addTask(1400, () => {
							DelayPlaceZombiePos([oBucketheadZombie], 6, $$Pos([1, 6], [1, 4]), 20, 1);
							oP.SetTimeoutTomZombie([oConeheadZombie, oBucketheadZombie, oFootballZombie]);
							oP.SetTimeoutSkyZombie(5, 5, 6, [oBalloonZombie]);
							oP.SetTimeoutSkyZombie(6, 9, 13, [oDancingZombie, oConeheadZombie]);
							oP.NumZombies -= 10;
						}, []);
					}
				}
			}), $FJ(oPlt, {
				FlagMaxWaitTime: 4490, FlagZombieWaitTime: 540,
				AZ: [
						[oImp, 3, 1], 
						[oZombie, 1, 1], 
						[oZombie2, 1, 1], 
						[oZombie3, 1, 1], 
						[oConeheadZombie, 2, 100], 
						[oPoleVaultingZombie, 2, 100], 
						[oBucketheadZombie, 2, 100], 
						[oFootballZombie, 2, 100], 
						[oDancingZombie, 1, 100], 
						[oBalloonZombie, 2, 100], 
						[oDiggerZombie, 2, 100]
					],
				FlagNum: 20, FlagToSumNum: {
					a1: [   19],
					a2: [0,  0]
				}, 
				FlagToMonitor: {
					2: [() => {
						AppearTombstones(5, 5, 2, (R, C) => (R == 2 || R == 5));
					}, 0], 
					9: [ShowLargeWave, 0], 
					19: [ShowFinalWave, 0], 
				}, 
				FlagToEnd: () => { 
					LevelStore["MaxPlay"] = Math.max(LevelStore["MaxPlay"], 2), oLocalVar["SaveVar"](); // 确认最大游玩关卡
					oSym.addTask(100, () => { NowLevel = "ChooseLevel", Change_Level(1); }, [])
				}
			}), $FJ(oWin, {
				GameLevelData: { StartTime: Infinity }, TargetList: [], BanBlockEleList: [], 
				oTargetZombie: oTargetZombie, 
				$$Pos: $$Pos
			}));
		}, 


		// 远征 - 第二天
		2: () => {
			let oIceShroom_EX12 = InheritO(oIceShroom, { EName: "oIceShroom_EX12", coolTime: 50, SunNum: 250 }), 
				oCherryBomb_EX12 = InheritO(oCherryBomb, { EName: "oCherryBomb_EX12", coolTime: 75, SunNum: 350 });

			let rChosePlant = window["ChosePlant"];
			window["ChosePlant"] = (h, d) => {
				let CardObj = ArCard[d], Plant = CardObj.PName.prototype; // 获取卡片，若可以种植则直接调用原函数
				if (!Plant.CanNotGrow) return rChosePlant(h, d);
				if (!(CardObj.CDReady && CardObj.SunReady)) return PlayAudio("seedlift");
				innerText(ESSunNum, oS.SunNum -= Plant.SunNum), $(CardObj.DID).childNodes[0].style.top = "-60px";
				CardObj.CDReady = 0, DoCoolTimer(d, Plant.coolTime), CancelPlant();
				Plant.SpecialChose(), PlayAudio("diamond");
			};

			// 返回出气球最优的行数（优先避开没有仙人掌的那路）
			let GetCactusR = (EName = "oCactus") => {
				let Ret = [], HasRet = [], f, o;
				for (let R = 1; R <= oS.R; ++R) {
					f = true; for (let C = 1; C <= oS.C; ++C) if ((o = oGd.$[R + "_" + C + "_1"]) && o.EName == EName) f = false;
					if (f) Ret.push(R); else HasRet.push(R);
				}
				Ret.sort(() => Math.random() - 0.5), HasRet.sort(() => Math.random() - 0.5);
				return Ret.concat(HasRet);
			}, GetRangeDiff = () => {
				let Range = Array(oS["R"] + 1).fill(0), Ret, AOE_Num = Array(oS["R"] + 1).fill(1), Min = Infinity, Max = -Infinity, Minindex = 0, Maxindex = 0; // fill
				for (let i = 1; i <= oS["R"]; ++i) oT["$"][i]["forEach"]((Obj) => {
					let Self_S = $P[Obj[3]]["Judge_Strength"], AOE_Buff = 1 + (($P[Obj[3]]["R"] != i) ? ($P[Obj[3]]["Judge_Strength"]) : (0.5)) * $P[Obj[3]]["Is_AOE"] * $P[Obj[3]]["Judge_Strength"]; // 侧路 AOE 伤害平方
					for (let C = GetC(Obj[0]) + 1; C < GetC(Obj[1]) - 1; ++C) for (let w = 0, p, st; w < MAX_PLT_INDEX; ++w) p = oGd.$[i + "_" + C + "_" + w], st = (p ? ((1 + p.HP / window[p.EName]["prototype"]["HP"]) * p.Judge_Strength) : 1) || 1, Range[i] += AOE_Buff * Self_S * st * (GetX(C + 1) - GetX(C));
					if (GetC(Obj[1]) - GetC(Obj[0]) > 0) Range[i] += AOE_Buff * Self_S * (GetX(GetC(Obj[0]) + 1) - GetC(Obj[0])), Range[i] += AOE_Buff * Self_S * (GetC(Obj[1]) - GetX(GetC(Obj[1]) - 1));
					else Range[i] += AOE_Buff * Self_S * (Obj[1] - Obj[0]);
					AOE_Num[i] += $P[Obj[3]]["Is_AOE"];
				}); // 根据 tirgger 评判难度
				for (let i in $P) Range[$P[i]["R"]] += $P[i]["HP"] * $P[i]["Judge_Strength"], AOE_Num[$P[i]["R"]] += $P[i]["Is_AOE"];
				for (let i = 1; i <= oS["R"]; ++i) ((Range[i] < Min) && (Min = Range[i], Minindex = i)), ((Range[i] > Max) && (Max = Range[i], Maxindex = i));
				Range[0] = -Infinity, Ret = Range.map((i, j) => [i, j]).sort((a, b) => (a[0] - b[0]) ? (a[0] - b[0]) : (Math.random() - 0.5))
				return Ret;
			}, WaitGameTime = (Time) => new Promise((R) => oSym.addTask(Time, R)), 
			SetZombieStyle = (Z, Style) => setTimeout(() => { for (let o in Style) Z.Ele.style[o] = Style[o].toString(); }, 0), 
			RedFilter = [`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="red-filter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1.25 0 0 0 0 0 0.75 0 0 0 0 0 0.75 0 0 0 0 0 1 0"/></filter></svg>#red-filter')`, 
						`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="red-filter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1.5 0 0 0 0 0 0.75 0 0 0 0 0 0.75 0 0 0 0 0 1 0"/></filter></svg>#red-filter')`, 
						`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="red-filter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1.15 0 0 0 0 0 0.85 0 0 0 0 0 0.85 0 0 0 0 0 1 0"/></filter></svg>#red-filter')`], 
			SetZombieRed = (Z, type) => SetZombieStyle(Z, { filter: RedFilter[type ?? 0] });

			oS.Init($FJ(oSys, {
				PName: [oReCardBean, oRecoverBean, oSuperRecover, oInvisibleBean, oReviveBean, oIceShroom_EX12, oCherryBomb_EX12],
				ZName: [oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oScreenDoorZombie, oFootballZombie, oJackinTheBoxZombie, oDancingZombie, oBalloonZombie, oZomboni, oDiggerZombie, oBackupDancer, oTargetZombie], 
				PicArr: [NewSkinUrl + "InterFace/background_new_4.png"], backgroundImage: NewSkinUrl + "InterFace/background_new_4.png", 
				Block_Level_Task: ["<a style=\"font-size:18px;line-height:1.5;position:relative;top:-3px;\">远征 第二天</a><br><a style=\"font-size:14px;line-height:1.5;\">1.欢迎来到远征第二天，场地上已布满植物，请注意查收<br>2.因不可抗力因素影响，场地内会随机出现靶子僵尸阻挡火力，你需要随机应变，并守护好你的防线<br>3.本关将赋予你五种特殊卡片，其中卡槽豆可以使植物变为卡槽形式转移，其余卡片对应效果请自行查看说明</a><a style=\"font-size:10px;line-height:0.1;\"><br></a><a style=\"font-size:16px;line-height:1.3;\"><br>失败将从当前阶段重新开始<br><br></a>"],
				CanSelectCard: 0, MusicMode: 0, 
				LevelName: "EX-12 远征 - 第二天", SelectCardList: [], StartGameMusic: "EX12-2-Music",
				DefLoad2: () => { 
					let TimeDouble = 10 / oSym.TimeStep * oSym.NowStep;
					for (let i of oS.SelectCardList) SelectCard(i, 1); 
				}, 
				DefLoad: () => {
					delete oAudio["EX12-2-Music"];
					NewURLAudio({ url: "https://music.163.com/song/media/outer/url?id=1488804226.mp3", audioname: "EX12-2-Music", loop: true }, { volume: 1 });

					$("tGround").firstChild.style.filter = "saturate(0%)", EDPZ.style.left = EDMove.style.left = "115px"; // 提前移动

					/* 
						for (let i = 1, j; i <= oS.R; ++i) TargetList[i] = SummonZombie(oTargetZombie, i, 9), --oP.NumZombies;

						setTimeout(() => { // 调整靶子僵尸的状态
							for (let i = 1; i <= oS.R; ++i) try {
								let Z = TargetList[i], Ele = Z.Ele;
								Ele.firstChild.style.left = "0px";
								Ele.style.left = "870px", Ele.style.opacity = "0.5";
								Z.AttackedLX = GetX(9) - 10, Z.AttackedRX = GetX(11), Z.X = 870, Z.IgnoreHit = true;
							} catch {};
						}, 0);
					*/

					oP.NumZombies = 0; // 归位

					let PltArr = [oTallNut, oWallNut, oWallNut, oGatlingPea_Pro, oRepeater, oSplitPea, oTorchwood_Pro, oSnowPea, oMelonPult_Pro, oWinterMelon_Pro, oGloomShroom, oFumeShroom, oCactus, oThreepeater, oStarfruit, oChomper, oGarlic, oCabbage_Pro], rPos = $$Pos([1, 6], [1, 3]);
					let VaseArr = [oTwinSunflower, oTwinSunflower, oSunFlower, oSunFlower, oSunFlower, oSpikerock, oSpikeweed, oSpikerock, oSpikeweed, oSpikeweed, oPotatoMine, oSquash], vPos = $$Pos([1, 6], [4, 5]), tPos;
					for (let o of PltArr) tPos = rPos["valueOf"](), CustomSpecial(o, tPos[0], tPos[1]);
					for (let o of VaseArr) tPos = vPos["valueOf"](), oFlowerVase_New.prototype.SpecialBirth(tPos[0], tPos[1], 1, { "Type": "Plants", "Value": o }, (OBJ) => (OBJ.CardTime = Infinity, OBJ.XRay = 1, OBJ.AutoSetXRay = 0));

					NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:250", 0, EDAll);
				}, 
				DefStartLoad: () => { 
					oS.InitLawnMower(), ClearChild($("DivA")), ChangeCard();
					oScreen.MakeWidth(), SetBlock($("Div_TimeTask"), $("Div_Start")); // 提示栏、初始数据
					setTimeout(() => oEf.Animate($("Div_TimeTask"), { "left": "260px", "width": "405px" }, 0.8, "cubic-bezier(0.8,0.4,0.2,0.6)"), 800);
					(function(){ // 本关数据中枢
						let ZNum = 0, Time = (Math.floor(Math.max(0, oSym.Now - GameLevelData.StartTime) / 10) / 10).toFixed(1);
						for (let i in $Z) if (!$Z[i].IgnoreHit) ++ZNum;
						$("dTitle_Task").innerText = "FlagNum: " + oP["FlagNum"] + "     NowFlag: " + oP["FlagZombies"] + "     ZombieNum:" + ZNum + (Time > 0 ? ("     Time: " + Time + "s") : (""));
						oSym.addTask(5, arguments.callee, []);
					})();

					let IgnorePlants = { "oFlowerVase": true, "oIceShroom_EX12": true, "oCherryBomb_EX12": true }, CardSpecial = { "oGatlingPea": oRepeater, "oTwinSunflower": oSunFlower, "oGloomShroom": oFumeShroom, "oSpikerock": oSpikeweed };
					oGT.On("PlantBirth", (self, R, C, PKind) => { 
						if (R < 1 || R > oS.R || C < 1 || C > oS.C) return;
						if (CardSpecial[self["EName"]]) RemoveDiePlants(CardSpecial[self["EName"]]); 
					});
					oGT.On("PlantDie", (self, R, C, PKind) => {
						if (R < 1 || R > oS.R || C < 1 || C > oS.C) return;
						if (self.PKind != 1 || IgnorePlants[self["EName"]]) return;
						AddDiePlants(window[self["EName"]]), AddDiePlants(CardSpecial[self["EName"]]);
					});
				}, 
				LF: [0, 1, 1, 1, 1, 1, 1], RefuseStart: false, AddZombiesWaitTime: 3000, Cheat_Mode: false,
				GroundType: 1, SunNum: 1000, LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag2"), 25: $("imgFlag1") }, 
				UserDefinedFlagFunc: function() {
					$SEql(oP.FlagZombies, Object.assign(oS.UserFlagMonitor, { "default": () => {}, }))();
				}, 
				Summon_Start_Func: function() {
					GameLevelData.StartTime = oSym.Now;
				}, 
				NormalFlagZombieTask: 175, BigFlagZombieTask: 30, 
				LvlClearFunc: function () { oSys["LvlClearFunc"](), window["ChosePlant"] = rChosePlant; }, 
				UserFlagMonitor: {
					1: async () => {
						let aCattail = GetCactusR();
						SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12);
						SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12);
						SummonAppearUpZombie(oBalloonZombie, aCattail[2], 12);
						SummonAppearUpZombie(oBalloonZombie, aCattail[5], 12);
					}, 
					2: async () => {
						let Arr = GetRangeDiff(), MaxR = Arr[6][1];
						for (let C = 1, o; C <= oS.C; ++C) o = TargetList["Flag2_" + C] = SummonAppearUpZombie(oTargetZombie, MaxR, C), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(10);
						SummonAppearUpZombie(oFootballZombie, MaxR, 11);
						DelayPlaceZombiePos([oConeheadZombie], 2, $$Pos([1, 6], [11, 11]), 20);
					}, 
					3: async () => {
						for (let C = 1, o; C <= oS.C; ++C) if (o = TargetList["Flag2_" + C]) o.Die(), delete TargetList["Flag2_" + C];
						for (let R = 1, o; R <= oS.R; ++R) o = TargetList["Flag3_" + R] = SummonAppearUpZombie(oTargetZombie, R, 3), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(10);
						DelayPlaceZombiePos([oDancingZombie], 2, $$Pos([1, 6], [11, 11]), 20);
						DelayPlaceZombiePos([oFootballZombie], 1, $$Pos([1, 6], [12, 12]), 20);
					}, 
					4: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(); oP.NumZombies += 10;
						SummonAppearUpZombie(oBalloonZombie, aCattail[0], 11);
						SummonAppearUpZombie(oBalloonZombie, aCattail[1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oFootballZombie, DifArr[1][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oFootballZombie, DifArr[2][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oBucketheadZombie, DifArr[3][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oBucketheadZombie, DifArr[4][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oBucketheadZombie, DifArr[5][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oBucketheadZombie, DifArr[6][1], 11);
						oP.NumZombies -= 10;
					}, 
					5: async () => {
						let DifArr = GetRangeDiff(); oP.NumZombies += 10;
						SummonZombie(oZomboni, DifArr[1][1], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[2][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[4][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[5][1], 11), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[6][1], 12), oP.NumZombies -= 10;
					}, 
					6: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(); oP.NumZombies += 10;
						for (let R = 1, o; R <= oS.R; ++R) if (o = TargetList["Flag3_" + R]) o.Die(), delete TargetList["Flag3_" + R];
						for (let R = 0; R <= 3; ++R) SummonAppearUpZombie(oBalloonZombie, aCattail[R], 12);
						await WaitGameTime(20), SummonAppearUpZombie(oPoleVaultingZombie, DifArr[1][1], 11), SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[3][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oPoleVaultingZombie, DifArr[2][1], 11), SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[4][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oFootballZombie, DifArr[3][1], 11), SummonAppearUpZombie(oFootballZombie, DifArr[6][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oFootballZombie, DifArr[4][1], 11), SummonAppearUpZombie(oFootballZombie, DifArr[5][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[5][1], 11), SummonAppearUpZombie(oFootballZombie, DifArr[2][1], 11);
						await WaitGameTime(20), SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[6][1], 11), SummonAppearUpZombie(oFootballZombie, DifArr[1][1], 11);
						oP.NumZombies -= 10;
					}, 
					7: async () => {
						let DifArr = GetRangeDiff(); oP.NumZombies += 10;
						for (let C = 6, o; C <= 9; ++C) for (let R = 1; R <= oS.R; ++R) o = TargetList[`Flag7_${R}_${C}`] = SummonAppearUpZombie(oTargetZombie, R, C), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(5);
						SummonAppearUpZombie(oDancingZombie, DifArr[1][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oDancingZombie, DifArr[2][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oDancingZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[4][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[5][1], 12), await WaitGameTime(20);						
						SummonZombie(oZomboni, DifArr[6][1], 12), oP.NumZombies -= 10;
					}, 
					8: async () => {
						let DifArr = GetRangeDiff(); oP.NumZombies += 10;
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[1][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[6][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[2][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[5][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oPoleVaultingZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oPoleVaultingZombie, DifArr[4][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, 1, 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, 2, 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, 5, 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, 6, 11), oP.NumZombies -= 10;
					}, 
					9: async () => {
						let DifArr = GetRangeDiff(); oP.NumZombies += 10;
						SummonZombie(oZomboni, DifArr[4][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[5][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[6][1], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[4][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[5][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oPoleVaultingZombie, DifArr[1][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oPoleVaultingZombie, DifArr[2][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oBucketheadZombie, DifArr[4][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oBucketheadZombie, DifArr[6][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oPoleVaultingZombie, DifArr[6][1], 11), oP.NumZombies -= 10;
					}, 
					10: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(); oP.NumZombies += 10;
						SummonZombie(oZomboni, DifArr[4][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[5][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[6][1], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[4][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[5][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[6][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[1][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[1][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[2][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[2][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oBalloonZombie, aCattail[2], 12), await WaitGameTime(20);
						SummonAppearUpZombie(oBalloonZombie, aCattail[2], 12), oP.NumZombies -= 10;	
					}, 
					11: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), TimeDouble = 10 / oSym.TimeStep * oSym.NowStep, o; oP.NumZombies += 10;
						let DivTeach = NewEle("DivTeach", "div", "pointer-events:none;opacity:0;width:1000px;left:-55px;text-align:center;line-height:45px;", {innerHTML: "此刻起部分僵尸将会被加强，可根据颜色判断僵尸强度，请格外留意！"}, EDMove);
						await oEf.AnimatePromise(DivTeach, { "opacity": "1" }, 0.25 / TimeDouble, "linear");
						for (let C = 1, o; C <= 9; ++C) for (let R = 1; R <= oS.R; ++R) if (o = TargetList[`Flag7_${R}_${C}`]) o.Die(), delete TargetList[`Flag7_${R}_${C}`];
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[5], 12), o.OrnHP = 100, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[5], 12), o.OrnHP = 100, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, aCattail[0], 11), o.OrnHP *= 100, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, aCattail[1], 11), o.OrnHP *= 100, SetZombieRed(o), await WaitGameTime(100);
						oP.NumZombies -= 10, await WaitGameTime(1000);
						await oEf.AnimatePromise(DivTeach, { "opacity": "0" }, 0.25 / TimeDouble, "linear"), ClearChild($("DivTeach"));
					}, 
					12: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [6, 7]), o; oP.NumZombies += 10;
						for (let i = 1, o, p; i <= 3; ++i) p = dPos["valueOf"](), o = TargetList[`Flag12_` + i] = SummonAppearUpZombie(oTargetZombie, p[0], p[1]), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[5], 12), o.OrnHP = 80, SetZombieRed(o), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12), o.OrnHP = 80, SetZombieRed(o), await WaitGameTime(20);
						for (let R = 1, o; R <= 3; ++R) o = SummonAppearUpZombie(oFootballZombie, R, 11), o.OrnHP = 2800, o.OSpeed = o.Speed = 1.9, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 4, o; R <= 6; ++R) o = SummonAppearUpZombie(oPoleVaultingZombie, R, 11), o.HP = 1250, o.OSpeed = o.Speed = 2.1, SetZombieRed(o), await WaitGameTime(30);
						DelayPlaceZombiePos([oDancingZombie], 3, $$Pos([1, 6], [11, 11]), 20), oP.NumZombies -= 10;
					}, 
					13: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [8, 9]), o; oP.NumZombies += 10;
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), o.OrnHP = 100, SetZombieRed(o), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12), o.OrnHP = 100, SetZombieRed(o), await WaitGameTime(20);
						for (let i = 1, o, p; i <= 2; ++i) p = dPos["valueOf"](), o = TargetList[`Flag13_` + i] = SummonAppearUpZombie(oTargetZombie, p[0], p[1]), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(20);
						for (let R = 1, o; R <= oS.R; ++R) o = SummonZombie(oZomboni, DifArr[R][1], 12), SetZombieRed(o), await WaitGameTime(20);
						for (let R = oS.R, o; R >= 1; --R) o = SummonAppearUpZombie(oDancingZombie, DifArr[R][1], 11), o.HP = 1200, SetZombieRed(o), await WaitGameTime(20);
						for (let R = 1, o; R <= 3; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 800, o.OSpeed = o.Speed = 1.6, SetZombieRed(o), await WaitGameTime(30);
						DelayPlaceZombiePos([oConeheadZombie], 5, $$Pos([1, 6], [11, 11]), 20), oP.NumZombies -= 10;
					}, 
					14: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [1, 9]), o; oP.NumZombies += 10;
						for (let d in TargetList) if (o = TargetList[d]) o.Die(), delete TargetList[d];
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 300, o.OSpeed = o.Speed = 5.6, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 1200, o.OSpeed = o.Speed = 1.5, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 450, o.OSpeed = o.Speed = 4.2, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 1000, o.OSpeed = o.Speed = 2.1, SetZombieRed(o), await WaitGameTime(30);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), o.OrnHP = 160, SetZombieRed(o), oP.NumZombies -= 10;
					}, 
					15: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [1, 9]), o; oP.NumZombies += 10;
						o = SummonZombie(oDiggerZombie, DifArr[6][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[5][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[1][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[2][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						DelayPlaceZombiePos([oBucketheadZombie], 6, $$Pos([1, 6], [11, 11]), 20), oP.NumZombies -= 10;
					}, 
					16: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [1, 9]), o; oP.NumZombies += 10;
						o = SummonZombie(oDiggerZombie, DifArr[3][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[4][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), o.OrnHP = 80, SetZombieRed(o, 2), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12), o.OrnHP = 80, SetZombieRed(o, 2), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[4][1], 12), await WaitGameTime(40);
						SummonZombie(oZomboni, DifArr[5][1], 12), await WaitGameTime(40);
						SummonZombie(oZomboni, DifArr[6][1], 12), await WaitGameTime(40);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[1][1], 11), await WaitGameTime(30);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[3][1], 11), await WaitGameTime(30);
						SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[6][1], 11), await WaitGameTime(30);
						SummonAppearUpZombie(oFootballZombie, DifArr[2][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[4][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oDancingZombie, DifArr[1][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oDancingZombie, DifArr[5][1], 11), oP.NumZombies -= 10;
					}, 
					17: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [1, 3]), o; oP.NumZombies += 10;
						for (let i = 1, o, p; i <= 5; ++i) p = dPos["valueOf"](), o = TargetList[`Flag17_` + i] = SummonAppearUpZombie(oTargetZombie, p[0], p[1]), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(20);
						o = SummonZombie(oDiggerZombie, DifArr[5][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[5][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), o.OrnHP = 60, SetZombieRed(o, 2), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12), o.OrnHP = 60, SetZombieRed(o, 2), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[2], 12), o.OrnHP = 60, SetZombieRed(o, 2), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[3], 12), o.OrnHP = 60, SetZombieRed(o, 2), await WaitGameTime(20);
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 750, o.OSpeed = o.Speed = 3, SetZombieRed(o), await WaitGameTime(30);
						SummonAppearUpZombie(oDancingZombie, DifArr[2][1], 11), oP.NumZombies -= 10;
					}, 
					18: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [7, 9]), o; oP.NumZombies += 10;
						for (let i = 1, o, p; i <= 6; ++i) p = dPos["valueOf"](), o = TargetList[`Flag18_` + i] = SummonAppearUpZombie(oTargetZombie, p[0], p[1]), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(10);
						o = SummonZombie(oDiggerZombie, DifArr[4][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[6][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[1][1], 12), o.HP = 400, SetZombieRed(o, 2), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[2][1], 12), o.HP = 400, SetZombieRed(o, 2), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[3][1], 12), o.HP = 400, SetZombieRed(o, 2), await WaitGameTime(100);
						o = SummonZombie(oDiggerZombie, DifArr[5][1], 12), o.HP = 400, SetZombieRed(o, 2), await WaitGameTime(100);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), o.OrnHP = 200, SetZombieRed(o, 1), await WaitGameTime(20);
						SummonAppearUpZombie(oFootballZombie, DifArr[6][1], 11), await WaitGameTime(20);
						DelayPlaceZombiePos([oConeheadZombie, oBucketheadZombie], 10, $$Pos([1, 6], [11, 11]), 20), oP.NumZombies -= 10;
					}, 
					19: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [4, 6]), o; oP.NumZombies += 10;
						for (let i = 1, o, p; i <= 6; ++i) p = dPos["valueOf"](), o = TargetList[`Flag19_` + i] = SummonAppearUpZombie(oTargetZombie, p[0], p[1]), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(10);
						o = SummonZombie(oDiggerZombie, DifArr[1][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(40);
						o = SummonZombie(oDiggerZombie, DifArr[2][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(40);
						o = SummonZombie(oDiggerZombie, DifArr[3][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(40);
						o = SummonZombie(oDiggerZombie, DifArr[4][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(40);
						o = SummonZombie(oDiggerZombie, DifArr[5][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(40);
						o = SummonZombie(oDiggerZombie, DifArr[6][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(40);
						DelayPlaceZombiePos([oConeheadZombie, oBucketheadZombie], 10, $$Pos([1, 6], [11, 11]), 10);
						DelayPlaceZombiePos([oBalloonZombie], 6, $$Pos([1, 6], [12, 12]), 30), oP.NumZombies -= 10;
					}, 
					20: async () => {
						oP.FlagMaxWaitTime = 4450, oP.FlagZombieWaitTime = 240;
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [6, 9]), o; oP.NumZombies += 10;
						for (let d in TargetList) if (o = TargetList[d]) o.Die(), delete TargetList[d]; await WaitGameTime(20);
						for (let i = 1, o, p; i <= 8; ++i) p = dPos["valueOf"](), o = TargetList[`Flag20_` + i] = SummonAppearUpZombie(oTargetZombie, p[0], p[1]), o.IgnoreHit = 1, --oP.NumZombies, SetZombieStyle(o, { opacity: 0.5 }), await WaitGameTime(10);
						SummonZombie(oZomboni, DifArr[1][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[2][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[3][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[4][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[5][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[6][1], 12), await WaitGameTime(20);
						DelayPlaceZombiePos([oJackinTheBoxZombie], 5, $$Pos([1, 6], [11, 11]), 30);
						oP.NumZombies -= 10;
					}, 
					21: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [6, 9]), o; oP.NumZombies += 10;
						SummonZombie(oBalloonZombie, DifArr[6][1], 12), await WaitGameTime(20);
						SummonZombie(oBalloonZombie, DifArr[5][1], 12), await WaitGameTime(20);
						SummonZombie(oBalloonZombie, DifArr[4][1], 12), await WaitGameTime(20);
						SummonZombie(oBalloonZombie, DifArr[3][1], 12), await WaitGameTime(20);
						SummonZombie(oBalloonZombie, DifArr[2][1], 12), await WaitGameTime(20);
						SummonZombie(oBalloonZombie, DifArr[1][1], 12), await WaitGameTime(20);
						DelayPlaceZombiePos([oConeheadZombie, oBucketheadZombie], 6, $$Pos([1, 6], [11, 11]), 30);
						oP.NumZombies -= 10;
					}, 
					22: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [6, 9]), o; oP.NumZombies += 10;
						o = SummonZombie(oDiggerZombie, DifArr[3][1], 12), o.HP = 1000, SetZombieRed(o), await WaitGameTime(40);
						o = SummonZombie(oDiggerZombie, DifArr[4][1], 12), o.HP = 1000, SetZombieRed(o), await WaitGameTime(40);
						o = SummonZombie(oDiggerZombie, DifArr[5][1], 12), o.HP = 1000, SetZombieRed(o), await WaitGameTime(40);
						oP.SetTimeoutSkyZombie(5, 9, 13, [oDancingZombie, oConeheadZombie, oBucketheadZombie]);
						oP.NumZombies -= 10;
					}, 
					23: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [6, 9]), o; oP.NumZombies += 10;
						DelayPlaceZombiePos([oFootballZombie, oDancingZombie, oPoleVaultingZombie, oDiggerZombie], 15, $$Pos([1, 6], [11, 11]), 30);
						await WaitGameTime(1000), aCattail = GetCactusR(), DifArr = GetRangeDiff();
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[1][1], 11), o.OrnHP *= 100, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[2][1], 11), o.OrnHP *= 100, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[5][1], 11), o.OrnHP *= 100, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[6][1], 11), o.OrnHP *= 100, SetZombieRed(o), await WaitGameTime(100);
						SummonZombie(oZomboni, DifArr[2][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[3][1], 12), await WaitGameTime(20);
						SummonZombie(oZomboni, DifArr[4][1], 12), await WaitGameTime(20);
						oP.NumZombies -= 10;
					}, 
					24: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [6, 9]), o; oP.NumZombies += 10;
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 500, o.OSpeed = o.Speed = 6, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 6, o; R >= 1; --R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 500, o.OSpeed = o.Speed = 6, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 1200, o.OSpeed = o.Speed = 1.4, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 6, o; R >= 1; --R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 1200, o.OSpeed = o.Speed = 1.4, SetZombieRed(o), await WaitGameTime(30);
						oP.NumZombies -= 10;
					}, 
					25: async () => {
						let aCattail = GetCactusR(), DifArr = GetRangeDiff(), dPos = $$Pos([1, 6], [6, 9]), o; oP.NumZombies += 10;
						for (let d in TargetList) if (o = TargetList[d]) o.Die(), delete TargetList[d]; await WaitGameTime(20);
						DelayPlaceZombiePos([oFootballZombie, oConeheadZombie], 11, $$Pos([1, 6], [11, 11]), 30);
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[1][1], 11), o.OrnHP *= 100, o.HP *= 3, o.OSpeed = o.Speed = 1, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[2][1], 11), o.OrnHP *= 100, o.HP *= 3, o.OSpeed = o.Speed = 1, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[5][1], 11), o.OrnHP *= 100, o.HP *= 3, o.OSpeed = o.Speed = 1, SetZombieRed(o), await WaitGameTime(100);
						o = SummonAppearUpZombie(oScreenDoorZombie, DifArr[6][1], 11), o.OrnHP *= 100, o.HP *= 3, o.OSpeed = o.Speed = 1, SetZombieRed(o), await WaitGameTime(100);
						for (let R = 1, o; R <= 6; ++R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 300, o.OSpeed = o.Speed = 6, SetZombieRed(o), await WaitGameTime(30);
						for (let R = 6, o; R >= 1; --R) o = SummonAppearUpZombie(oJackinTheBoxZombie, DifArr[R][1], 11), o.HP = 250, o.OSpeed = o.Speed = 6.2, SetZombieRed(o), await WaitGameTime(30);
						o = SummonZombie(oDiggerZombie, DifArr[2][1], 12), o.HP = 1000, SetZombieRed(o, 1), await WaitGameTime(40);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[0], 12), o.OrnHP = 80, SetZombieRed(o, 2), await WaitGameTime(20);
						o = SummonAppearUpZombie(oBalloonZombie, aCattail[1], 12), o.OrnHP = 80, SetZombieRed(o, 2), await WaitGameTime(20);
						SummonAppearUpZombie(oPoleVaultingZombie, DifArr[3][1], 11), await WaitGameTime(20);
						SummonAppearUpZombie(oPoleVaultingZombie, DifArr[4][1], 11), await WaitGameTime(20);
						DelayPlaceZombiePos([oConeheadZombie, oPoleVaultingZombie, oScreenDoorZombie], 11, $$Pos([1, 6], [11, 11]), 30), oP.NumZombies -= 10;
					}
				}
			}), $FJ(oPlt, {
				FlagMaxWaitTime: Infinity, FlagZombieWaitTime: 540,
				AZ: [
						[oPoleVaultingZombie, 1, 1], 
						[oConeheadZombie, 1, 1], 
						[oBucketheadZombie, 2, 1], 
						[oFootballZombie, 2, 100], 
						[oScreenDoorZombie, 1, 100], 
						[oJackinTheBoxZombie, 1, 100], 
						[oDancingZombie, 2, 100], 
						[oBalloonZombie, 1, 100], 
						[oDiggerZombie, 1, 100], 
						[oZomboni, 2, 100] 
					],
				FlagNum: 25, FlagToSumNum: {
					a1: [   24],
					a2: [0,  0]
				}, 
				FlagToMonitor: {
					9: [ShowLargeWave, 0], 
					19: [ShowLargeWave, 0], 
					24: [ShowFinalWave, 0]
				}, 
				FlagToEnd: () => { 
					LevelStore["MaxPlay"] = Math.max(LevelStore["MaxPlay"], 3), oLocalVar["SaveVar"](); // 确认最大游玩关卡
					oSym.addTask(100, () => { NowLevel = "ChooseLevel", Change_Level(1); }, [])
				}
			}), $FJ(oWin, {
				DeadPlants: [], IgnoreDeadPlants: false, 
				AddDiePlants: (o) => (!IgnoreDeadPlants && o && DeadPlants.push(o), ChangeCard()), 
				RemoveDiePlants: (o, d) => (!IgnoreDeadPlants && ((d = DeadPlants["indexOf"](o)) != -1) && (DeadPlants.splice(d, 1)), ChangeCard()), 
				ChangeCard: () => {
					let CardObj = null, Plant = null, Did = null; 
					for (let o in ArCard) if (ArCard[o]["PName"]["prototype"]["EName"] == "oReviveBean") CardObj = ArCard[o], Did = o;
					if (!CardObj) return; Plant = CardObj.PName.prototype;
					Plant.SunNum = DeadPlants.length * 50, MonitorCard();
					$("sSunNum" + Did).innerHTML = Plant.SunNum;
				}, 
				GameLevelData: { StartTime: Infinity }, TargetList: {}, 
				oTargetZombie: oTargetZombie, 
				oInvisibleBean: oInvisibleBean, oReCardBean: oReCardBean, 
				oRecoverBean: oRecoverBean, oSuperRecover: oSuperRecover, 
				GetCactusR: GetCactusR, GetRangeDiff: GetRangeDiff, 
				$$Pos: $$Pos, 
			}));
		}, 



		// 关卡选择界面
		"ChooseLevel": () => {
			let dOpenButtonStatus = "";

			oS.Init($FJ(oSys, {
				AutoPlayMusic: false, ZName: [oZombie], 
				LoadAccess: function () {
					delete oAudio["EX12-WaitMusic"];
					// https://music.163.com/song?id=399367379&uct2=U2FsdGVkX18RW4VszAzC7t9+wvn3vf5ZziUvcigNLPs=
					// https://music.163.com/song?id=2014549476&uct2=U2FsdGVkX19mo/exWNDx8mq/EwXtuHchHPVvsXeutWA=
					// https://music.163.com/song?id=408277643&uct2=U2FsdGVkX19uAWeWK26Zr0xPrq+8bgv38EN43XOeSuc=
					// 确定开场歌曲
					let WaitBGM = [
							["2040895574", "废墟 - TDX"], 
							["408277643", "Explorers - Hinkik"], 
							["1371757760", "生命流 - 塞壬唱片-MSR/BaoUner"], 
							["2014549476", "Make It (Main Menu Theme) - Packeting"], 
							["2121150589", "焰火 - 猎豹游戏/木木夕水可"]
						], WaitChoseBGMID = (LevelStore["MaxPlay"] - 1), WaitBGMData = WaitBGM[WaitChoseBGMID];
					NewURLAudio({ url: "https://music.163.com/song/media/outer/url?id=" + WaitBGMData[0] + ".mp3", audioname: "EX12-WaitMusic", loop: true }, { volume: 0.6 });
					StopMusic(), PlayMusic(oS.LoadMusic = "EX12-WaitMusic");

					// 选关界面（第一部分 ~ 第二部分）
					let dChooseLevelBox = NewEle("dChooseLevelBox", "div", "position:absolute;left:0px;top:0px;z-index:100;", 0, EDAll);
					let dChosePanel1 = NewEle("dChosePanel1", "div", "display:block;position:absolute;left:0px;top:0px", 0, dChooseLevelBox, {"class":"Almanac_ZombieBack"});
					let dChoseTitle1 = NewEle("dChoseTitle1", "div", "position:relative;text-align:center;line-height:88px;height:88px;left:35%;width:30%;font-size:30px;font-weight:bold;font-family:黑体;color:#fff;cursor:pointer;", { innerHTML: "选 择 阶 段", onclick: () => window["open"]("https://www.bilibili.com/video/av1006246402/"), "title": "Before I Rise" }, dChosePanel1, { "class":"dRiddleTitle" });
					let dBack1 = NewEle("dBack1", "div", "position:absolute;width:89px;height:26px;top:564px;left:700px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && (SelectModal(__Normal_Start_Room__), HiddenOptions(), SetBlock($('dSurface'), $('iSurfaceBackground')), ShowNameDiv()); }, innerText: "返 回" }, dChooseLevelBox, {"class": "button"});
					let dStaffDiv = NewEle("dStaffDiv1", "input", "position:absolute;left:650px;top:85px;width:225px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible;white-space:pre;", {"onclick": () => GotoStaffLevel() }, dChooseLevelBox, {"type": "button", "value": "点击查看制作者名单"});

					// 彩蛋按钮检测部分
					let dOpenHBR = NewEle("dOpenHBR", "div", "position:absolute;width:90px;height:25px;top:625px;left:100px;background-position:center top;background:url(images/interface/Almanac_CloseButton.png);cursor:pointer;text-align:center;line-height:26px;color:#000080;font-size:12px;", { onmouseover: function() { this.style.backgroundPosition='bottom'; }, onmouseout: function() { this.style.backgroundPosition='top'; }, onclick: function() { CanChange && SurpriseOpen(); }, innerText: "启 动" }, dChooseLevelBox, {"class": "button"});
					EDAll.addEventListener("mousemove", oS.MouseEventFunc);

					let dLevelADiv = NewEle("dLevelADiv", "div", "background-image:url(" + NewSkinUrl + "InterFace/background_new_3.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);border-radius:15px;background-clip:padding-box;", { onclick: function() { CanChange && (NowLevel = 1), Change_Level(1); } }, dChooseLevelBox);
					let dLevelATXT = NewEle("dLevelATXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#EFEBEF;position:relative;top:15px;", { innerHTML: "远征 - 第一天<br><font style=\"font-size:20px\">点此旅行</font>" }, dLevelADiv);

					let dLevelBDiv = NewEle("dLevelBDiv", "div", "background-image:url(" + NewSkinUrl + "InterFace/background_new_4.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);;border-radius:15px;background-clip:padding-box;", { onclick: function() { CanChange && (NowLevel = 2), Change_Level(1); } }, dChooseLevelBox);
					let dLevelBTXT = NewEle("dLevelBTXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#EFEBEF;position:relative;top:15px;", { innerHTML: "远征 - 第二天<br><font style=\"font-size:20px\">点此旅行</font>" }, dLevelBDiv);

					let dLevelCDiv = NewEle("dLevelBDiv", "div", "background-image:url(" + NewSkinUrl + "InterFace/background_new_5.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);;border-radius:15px;background-clip:padding-box;", { onclick: function() { CanChange && (NowLevel = 3), Change_Level(1); } }, dChooseLevelBox);
					let dLevelCTXT = NewEle("dLevelBTXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#8F1FFF;position:relative;top:15px;", { innerHTML: "远征 - 第三天<br><font style=\"font-size:20px\">点此旅行</font>" }, dLevelCDiv);

					let dLevelDDiv = NewEle("dLevelBDiv", "div", "background-image:url(" + NewSkinUrl + "InterFace/background_th14_2.png);display:block;position:absolute;z-index:100;cursor:pointer;background-position:-12.5px,0px;background-size:324px,139px;background-repeat:no-repeat;width:300px;height:139px;border:5px solid rgba(255,255,255,0.5);;border-radius:15px;background-clip:padding-box;", { onclick: function() { CanChange && (NowLevel = 4), Change_Level(1); } }, dChooseLevelBox);
					let dLevelDTXT = NewEle("dLevelBTXT", "div", "text-align:center;line-height:60px;font-size:30px;font-weight:bold;font-family:黑体;color:#EFEBEF;position:relative;top:15px;", { innerHTML: "远征 - 第四天<br><font style=\"font-size:20px\">点此旅行</font>" }, dLevelDDiv);

					// 左上角选歌按钮
					let dMusicChosen = NewEle("", "div", "position:absolute;left:25px;top:85px;", {}, dChooseLevelBox);
					let sChooseWaitMusic = NewEle("sChooseWaitMusic", "select", "height:30px;width:305px;text-align:center;border-radius:10px;background:rgba(0,0,0,0.733);color:rgb(255,255,255);white-space:pre;font-family:宋体;font-size:15px;", {}, dMusicChosen, { size:1, title:"当前播放的音乐" });
					for (let i = 0, o; i < Math.min(WaitBGM.length, LevelStore["MaxPlay"]); ++i) o = WaitBGM[i], sChooseWaitMusic.add(new Option(o[1], o[0])); // 给歌曲列表添加选项
					sChooseWaitMusic.selectedIndex = WaitChoseBGMID;
					sChooseWaitMusic.onchange = function () {
						let NewBGMID = this.options[this.selectedIndex].value;
						StopMusic(), delete oAudio["EX12-WaitMusic"];
						NewURLAudio({ url: "https://music.163.com/song/media/outer/url?id=" + NewBGMID + ".mp3", audioname: "EX12-WaitMusic", loop: true }, { volume: 0.6 });
						PlayMusic(oS.LoadMusic = "EX12-WaitMusic");
					};

					// 黑屏开场过渡、元素位置调整
					let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 230}, Height: 600, Width: 900}, EDAll), oCvCallBack = () => {};
					let Sleep = (T) => new Promise((R) => setTimeout(R, T));

					if (LevelStore["MaxPlay"] == 1) {
						// 是否跳过动画
						if (LevelStore["AlreadyPlayAnimation-1"]) {
							SetBlock(dLevelADiv), SetNone(dLevelBDiv, dLevelCDiv, dLevelDDiv);
							dLevelADiv["style"]["left"] = "300px", dLevelADiv["style"]["top"] = "225px";
						} else {
							SetBlock(dLevelADiv), SetNone(dLevelBDiv, dLevelCDiv, dLevelDDiv);
							dLevelADiv["style"]["left"] = "300px", dLevelADiv["style"]["top"] = "225px";
							dLevelADiv["style"]["transform"] = "scale(0, 0)";
							dStaffDiv["style"]["opacity"] = "0";
							oCvCallBack = async () => {
								await oEf.AnimatePromise(dLevelADiv, { "transform": "scale(1, 1)" }, 0.58, "cubic-bezier(0.3,2,0.9,1.1)");
								await oEf.AnimatePromise(dLevelADiv, { "transform": "scale(0.85, 0.85)" }, 0.33, "cubic-bezier(0.5,1.8,1,1)");
								await oEf.AnimatePromise(dLevelADiv, { "transform": "scale(1, 1)" }, 0.34, "cubic-bezier(0.5,1.5,0.7,1)");
								oEf.Animate(dStaffDiv, { "opacity": "1" }, 1, "linear");
								LevelStore["AlreadyPlayAnimation-1"] = true, oLocalVar["SaveVar"]();
								let Ver = oSym.RunningVer;
								while (Ver == oSym.RunningVer) {
									await oEf.AnimatePromise(dLevelATXT, { "opacity": "0.5" }, 1.5, "linear");
									await oEf.AnimatePromise(dLevelATXT, { "opacity": "1" }, 1.5, "linear");
								}
							};
						}
					} else if (LevelStore["MaxPlay"] == 2) {
						if (LevelStore["AlreadyPlayAnimation-2"]) {
							SetBlock(dLevelADiv, dLevelBDiv), SetNone(dLevelCDiv, dLevelDDiv);
							dLevelADiv["style"]["left"] = "100px", dLevelADiv["style"]["top"] = "225px";
							dLevelBDiv["style"]["left"] = "487.5px", dLevelBDiv["style"]["top"] = "225px";
							dLevelATXT["style"]["color"] = "00FF00";
						} else {
							SetBlock(dLevelADiv, dLevelBDiv), SetNone(dLevelCDiv, dLevelDDiv);
							dLevelADiv["style"]["left"] = "300px", dLevelADiv["style"]["top"] = "225px";
							dLevelBDiv["style"]["left"] = "487.5px", dLevelBDiv["style"]["top"] = "225px";
							dLevelBDiv["style"]["transform"] = "scale(0, 0)";
							dStaffDiv["style"]["opacity"] = "0";
							oCvCallBack = async () => {
								await oEf.AnimatePromise(dLevelADiv, { "left": "100px", "top": "225px" }, 1, "cubic-bezier(0.7,0,0.3,1)");
								await oEf.AnimatePromise(dLevelATXT, { "opacity": "0" }, 1, "linear");
								await oEf.AnimatePromise(dLevelATXT, { "color": "#00FF00", "opacity": "1" }, 1, "linear");
								await Sleep(250);
								await oEf.AnimatePromise(dLevelBDiv, { "transform": "scale(1, 1)" }, 0.464, "cubic-bezier(0.3,2,0.9,1.1)");
								await oEf.AnimatePromise(dLevelBDiv, { "transform": "scale(0.85, 0.85)" }, 0.264, "cubic-bezier(0.5,1.8,1,1)");
								await oEf.AnimatePromise(dLevelBDiv, { "transform": "scale(1, 1)" }, 0.272, "cubic-bezier(0.5,1.5,0.7,1)");
								oEf.Animate(dStaffDiv, { "opacity": "1" }, 1, "linear");
								LevelStore["AlreadyPlayAnimation-2"] = true, oLocalVar["SaveVar"]();
								let Ver = oSym.RunningVer;
								while (Ver == oSym.RunningVer) {
									await oEf.AnimatePromise(dLevelBTXT, { "opacity": "0.5" }, 1.5, "linear");
									await oEf.AnimatePromise(dLevelBTXT, { "opacity": "1" }, 1.5, "linear");
								}
							};
						}
					} else {
						if (LevelStore["AlreadyPlayAnimation-3"]) {
							SetBlock(dLevelADiv, dLevelBDiv, dLevelCDiv), SetNone(dLevelDDiv);
							dLevelADiv["style"]["left"] = "100px", dLevelADiv["style"]["top"] = "150px";
							dLevelBDiv["style"]["left"] = "487.5px", dLevelBDiv["style"]["top"] = "150px";
							dLevelCDiv["style"]["left"] = "295px", dLevelCDiv["style"]["top"] = "350px";
							dLevelATXT["style"]["color"] = "00FF00", dLevelBTXT["style"]["color"] = "00FF00";
						} else {
							SetBlock(dLevelADiv, dLevelBDiv, dLevelCDiv), SetNone(dLevelDDiv);
							dLevelADiv["style"]["left"] = "100px", dLevelADiv["style"]["top"] = "225px";
							dLevelBDiv["style"]["left"] = "487.5px", dLevelBDiv["style"]["top"] = "225px";
							dLevelCDiv["style"]["left"] = "295px", dLevelCDiv["style"]["top"] = "350px";
							dLevelATXT["style"]["color"] = "00FF00", dLevelCDiv["style"]["transform"] = "scale(0, 0)";
							dStaffDiv["style"]["opacity"] = "0";
							oCvCallBack = async () => {
								oEf.AnimatePromise(dLevelADiv, { "left": "100px", "top": "150px" }, 1, "cubic-bezier(0.7,0,0.3,1)");
								oEf.AnimatePromise(dLevelBDiv, { "left": "487.5px", "top": "150px" }, 1, "cubic-bezier(0.7,0,0.3,1)");
								await Sleep(1000);
								await oEf.AnimatePromise(dLevelBTXT, { "opacity": "0" }, 1, "linear");
								await oEf.AnimatePromise(dLevelBTXT, { "color": "#00FF00", "opacity": "1" }, 1, "linear");
								await Sleep(250);
								await oEf.AnimatePromise(dLevelCDiv, { "transform": "scale(1, 1)" }, 0.464, "cubic-bezier(0.3,2,0.9,1.1)");
								await oEf.AnimatePromise(dLevelCDiv, { "transform": "scale(0.85, 0.85)" }, 0.264, "cubic-bezier(0.5,1.8,1,1)");
								await oEf.AnimatePromise(dLevelCDiv, { "transform": "scale(1, 1)" }, 0.272, "cubic-bezier(0.5,1.5,0.7,1)");
								oEf.Animate(dStaffDiv, { "opacity": "1" }, 1, "linear");
								LevelStore["AlreadyPlayAnimation-3"] = true, oLocalVar["SaveVar"]();
								let Ver = oSym.RunningVer;
								while (Ver == oSym.RunningVer) {
									await oEf.AnimatePromise(dLevelCTXT, { "opacity": "0.5" }, 1.5, "linear");
									await oEf.AnimatePromise(dLevelCTXT, { "opacity": "1" }, 1.5, "linear");
								}
							};
						}

					}

					SetVisible($("dMenu")); // 显示菜单按钮

					CanChange = false, oCv["Gradient_Rect"](1, [[0, 100]], oSym["NowStep"], [0, 0, 0], () => { oCv["__Delete__"](), CanChange = true, oCvCallBack(); });

				}, 
				MouseEventFunc: (Event) => {
					let EDAllRect = EDAll.getBoundingClientRect();
					let mX = Event.clientX, mY = Event.clientY;
					let aX = mX - EDAllRect.left, aY = mY - EDAllRect.top;
					let Top = 500, Bottom = 600, Left = 0, Right = 250, ButtonWidth = 90, ButtonHeight = 25;
					let InRange = (Left <= aX && aX <= Right && Top <= aY && aY <= Bottom);

					if (InRange && dOpenButtonStatus != "MoveUp") dOpenButtonStatus = "MoveUp1", oEf.Animate($("dOpenHBR"), { "left": Math.max(0, Math.min(aX - 40, 160)) + "px", "top": Math.max(500, aY - 10) + "px" /*"564px"*/ }, 0.4, "ease-out", () => {});
					if (!InRange && dOpenButtonStatus != "MoveDown") dOpenButtonStatus = "MoveDown", oEf.Animate($("dOpenHBR"), { "left": "100px", "top": "625px" }, 0.4, "ease-in", () => {});
				}, 
				LvlClearFunc: function () {
					oSys["LvlClearFunc"]();
					EDAll.removeEventListener("mousemove", oS.MouseEventFunc);
				}
			}), $FJ(oPlt, {}), $FJ(oWin, {
				"SurpriseOpen": () => {
					if (!CanChange) return;
					let oCv = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 115}, Height: 600, Width: 1800}, EDAll);
					console.log("红烧天堂，启动！"), StopMusic(), CanChange = false, oCv.Gradient_Rect(0, [[1, 150]], oSym["NowStep"], [255, 255, 255], () => {
						oScreen.EasyMakeWidth(1068, 1000);
						setTimeout(() => {
							NewEle("dVideo", "video", "position:absolute;width:1068px;height:600px;top:0px;left:0px;z-index: 125", { preload: "auto", autoplay: "autoplay", controlsList: "nodownload nofullscreen noremoteplayback", src: __OnlineUrl_Pre__ + "kac-jspvz/online/audio/HBR启动.mp4", onended: () => {
								let oCv2 = new oEffect({Dev_Style: {width: 1800, height: 600, zIndex: 130}, Height: 600, Width: 1800}, EDAll);
								oCv2.Gradient_Rect(0, [[1, 300]], oSym["NowStep"], [0, 0, 0], () => SelectModal(__Normal_Start_Room__));
							}}, EDAll);
						}, 1000);
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

		"default": () => ( oS.Init({ LvlClearFunc: function() {delete oS.NowLevel;} }, {}, {}), SelectModal(__Normal_Start_Room__), true)
	})();
})();
