oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCabbage_Pro],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp],
	PicArr: ["new_skin/Images/InterFace/background_new_3.png"],
	backgroundImage: "new_skin/Images/InterFace/background_new_3.png",
	LevelName: "EX-6 博弈者",
	LvlEName: "EX_New_Pool_6",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 1,
	MusicMode: 1,
	SunNum: 250,
	DKind: 0,
    Coord: 200,
	LF: [0, 1, 1, 1, 1, 1, 1],
	LevelProduce: "六路陆地关，系统会根据每行的强度决定出怪",
	LargeWaveFlag: {
		10: $("imgFlag3"),
		20: $("imgFlag2"),
		30: $("imgFlag1")
	},
	UserDefinedFlagFunc: function(b) {
		let a = oP.FlagZombies, FT = oS.FlagToSumNum_Bot, flag = oP.FlagZombies - 1, Sum = $SSml(flag, FT.a1, FT.a2);
		let ret = AI_SelectFlagZombie(oS, oP, oZ, oT, oGd, ArCard, $P, $Z, oGd.$LF, oGd.$ZF, flag, Sum);
		SetTimeout_BotZombie(ret, (a % 10) ? 50 : 10); // 这里认为十的倍数是大波
	},
	Block_Level_Task: "关卡目标: 与系统对抗，系统决定出怪，您需要赢得这局游戏的胜利",
	LoadAccess: function(start_game){
		$("tGround").innerHTML = oS.GifHTML = '<img style="position:absolute;left:256px;top:266px;clip:rect(5px,720px,163px,5px);filter:alpha(opacity=1);opacity:1;" src="images/New_interface/pool_block.png">';
		NewEle("Div_TimeTask", "div", "display:none;z-index:5;top:10px; left:315px; position:absolute;width:355px;height:35px;background:#000000BB;border-radius:12.5px;opacity:1;cursor:pointer;", {onclick: function(){PauseGamesShowBlock();}}, EDMove);
		NewEle("dTitle_Task", "span", "white-space:pre;display:block;z-index:127;position:absolute;left:12.5px;top:6px;font-size:20px;font-weight:500;font-family:Regular,Briannetod,微软雅黑,Verdana,Tahoma;color:#FFF;pointer-events:none;opacity:1;", "", $("Div_TimeTask"));
		SummonNewBlock(oS.Block_Level_Task, start_game);
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
		SetBlock($("Div_TimeTask")), GameLevelData["Start_Time"] = oSym.Now; // 提示栏、初始数据
		(function(){ // 本关数据中枢
			let A = Get_Hardest();
			$("dTitle_Task").innerText = "Calculate: {Easy: " + A[0] + ",  Hard: " + A[1] + "}";
			oSym.addTask(500, arguments.callee, []);
		})();
	},
	StartGame: function(){
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		// oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);

			for(let i in ArCard) DoCoolTimer(i,0);

			AutoProduceSun(25);

			oSym.addTask(1500, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);

			oS.Summon_Start_Func();

			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "您可以点击上方灰白数据面板重新查看本关信息！"}, EDMove);
			oSym.addTask(250, function() {ClearChild($("DivTeach"));}, []);
		});
	},
	NormalFlagZombieTask: 150, // 平均僵尸出现间隔
	BigFlagZombieTask: 30, // 大波僵尸间隔
	FlagToSumNum_Bot: { // 机器人出怪
		a1: [   1, 3, 5, 7,  9, 10, 13, 15, 16, 17, 18,  19, 20, 22, 24,  26,  27,  28,  29],
		a2: [3, 4, 5, 6, 8, 23, 10, 12, 14, 23, 34, 46, 130, 63, 79, 90, 102, 159, 250, 450]
	}
}, {
	AZ: [[oZombie, 1, 4], [oZombie2, 1, 4], [oZombie3, 1, 4], [oPoleVaultingZombie, 1, 4] , [oConeheadZombie, 1, 2], [oBucketheadZombie, 1, 6], [oNewspaperZombie, 1, 3], [oScreenDoorZombie, 1, 6], [oFootballZombie, 5, 9], [oDancingZombie, 2, 12], [oZomboni, 5, 18], [oJackinTheBoxZombie, 3, 8], [oImp, 1, 1]],
	FlagNum: 30,
	FlagToSumNum: {
		a1: [    9, 10, 19, 20, 29],
		a2: [1, 20, 10, 20, 23, 40]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowFinalWave, 0]
	},
	FlagMaxWaitTime: 1990, // 最多等待 19 秒再出下一波僵尸
	FlagZombieWaitTime: 500, // 如果这一波所有僵尸死亡，那么 5 秒钟内出下一波
	FlagToEnd: function() {
		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		Win_Travel(6, 7);
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

	AI_SelectFlagZombie: (() => { // BOT 生成出怪
		let AllFlagNum = 30, Opening_Flag = 3; // 总波数，定义“后阶段”的波数
		let ret, Arz, Arg;
		let $Sum_Random = (Arr, dSum, dRd) => {dSum = Arr.reduce((a, b) => a + b, 0), dRd = Math.random() * dSum; return ((i = 0) => {while ((dRd -= Arr[i++]) > 0); return --i;})()};
		let Get_Range_R_Strong = () => {
			let $P = Arg[6], oT = Arg[3];
			let Range = Array(oS["R"] + 1).fill(0), AOE_Num = Array(oS["R"] + 1).fill(1); // fill
			for (let i = 1; i <= oS["R"]; ++i) oT["$"][i]["forEach"]((Obj) => {
				let Self_S = $P[Obj[3]]["Judge_Strength"], AOE_Buff = 1 + (($P[Obj[3]]["R"] != i) ? ($P[Obj[3]]["Judge_Strength"]) : (0.5)) * $P[Obj[3]]["Is_AOE"] * $P[Obj[3]]["Judge_Strength"]; // 侧路 AOE 伤害平方
				for (let C = GetC(Obj[0]) + 1; C < GetC(Obj[1]) - 1; ++C) for (let w = 0, p, st; w < MAX_PLT_INDEX; ++w) p = oGd.$[i + "_" + C + "_" + w], st = (p ? ((1 + p.HP / window[p.EName]["prototype"]["HP"]) * p.Judge_Strength) : 1) || 1, Range[i] += AOE_Buff * Self_S * st * (GetX(C + 1) - GetX(C));
				if (GetC(Obj[1]) - GetC(Obj[0]) > 0) Range[i] += AOE_Buff * Self_S * (GetX(GetC(Obj[0]) + 1) - GetC(Obj[0])), Range[i] += AOE_Buff * Self_S * (GetC(Obj[1]) - GetX(GetC(Obj[1]) - 1));
				else Range[i] += AOE_Buff * Self_S * (Obj[1] - Obj[0]);
				AOE_Num[i] += $P[Obj[3]]["Is_AOE"];
			}); // 根据 tirgger 评判难度
			for (let i in $P) Range[$P[i]["R"]] += $P[i]["HP"] * $P[i]["Judge_Strength"], AOE_Num[$P[i]["R"]] += $P[i]["Is_AOE"];
			// for (let i = 1; i <= oS["R"]; ++i) Range[i] *= AOE_Num[i]; // 难度 = 难度 * AOE 数量
			// console.log(Range, AOE_Num, i);
			Range[0] = -Infinity; return Range;
		};
		let oZombie_Chance = {"oJackinTheBoxZombie": [50, 40, 10], "oDancingZombie": [45, 10, 45], "oZomboni": [20, 20, 60], "oFootballZombie": [35, 15, 50], "default": [40, 10, 50]};
		let Rd_Bot = () => { // 前几波均摊出怪即可
			if (Arg[1]["ArZ"]["length"] == 0) return []; // 没有可以出的怪，摆烂
			let Arz = Arg[1]["ArZ"]["concat"]().sort((a, b) => a.prototype.Lvl - b.prototype.Lvl), Sum = Arg[11], retArr = [], o; // 从小到大
			while (Sum >= 0) o = Arz[Math.floor(Math.random() * Arz["length"])], Sum -= o.prototype.Lvl, retArr[retArr["length"]] = [o, Math.floor(1 + Math.random() * oS.R)];
			return retArr;
		};
		let Normal_Bot = () => { // 整句游戏主要使用的 bot
			if (Arg[1]["ArZ"]["length"] == 0) return []; // 没有可以出的怪，摆烂
			let Strong = Get_Range_R_Strong(), StrMpSort = Strong.map((i, j) => [i, j]).sort((a, b) => (a[0] - b[0]) ? (a[0] - b[0]) : (Math.random() - 0.5)), Arz = Arg[1]["ArZ"]["concat"]().sort((a, b) => a.prototype.Lvl - b.prototype.Lvl); // 从小到大
			let Sum = Arg[11], Len = Arz["length"], SliceLen = Len - 1, NowLvl = Arz[SliceLen].prototype.Lvl, ZArz2 = [], RZlen = 0, retArr = [], z, r, l, k = StrMpSort["length"] - 1; // 选择僵尸

			while (Sum > 0) { // 选择僵尸出怪
				if (SliceLen && NowLvl > Sum) {while(--SliceLen && Arz[SliceLen].prototype.Lvl > Sum); Len = SliceLen + 1, b = Arz[SliceLen].prototype.Lvl;};
				Sum -= (ZArz2[RZlen++] = Arz[Math.floor(Math.random() * Len)]).prototype.Lvl;
			}; // 随机选择
			// 选择出现的行
			for (let i = 0; i < RZlen; ++i) z = oZombie_Chance[ZArz2[i]["prototype"]["EName"]] || oZombie_Chance["default"], l = $Sum_Random(z), ((l == 0 && (r = StrMpSort[1][1])) || (l == 2 && (r = StrMpSort[k][1]))) ? (r) : (r = StrMpSort[Math.floor(2 + Math.random() * (k - 1))][1]), retArr[i] = [ZArz2[i], r];
			
			return retArr;
		};
		// oS, oP, oZ, oT, oGd, ArCard, $P, $Z, LF, ZF, Flag, ZombieSunNum
		return (oS, oP, oZ, oT, oGd, ArCard, $P, $Z, LF, ZF, Flag, dSum) => { // 作用域改变
			Arz = oP.ArZ, Arg = [oS, oP, oZ, oT, oGd, ArCard, $P, $Z, LF, ZF, Flag, dSum], ret = (Flag <= Opening_Flag) ? Rd_Bot() : Normal_Bot();
			return ret;
		};
	})(),
	SetTimeout_BotZombie: (b = [], d = 150) => {
		var f = [], c = [], e = 0, g = 0, a = b.length;
		while (e < a) c[e] = (f[e] = new b[e][0]).prepareBirth(g, b[e][1]), g += d, ++e, ++oP.NumZombies;
		asyncInnerHTML(c.join(""), function(k, j) {
			EDPZ.appendChild(k);
			var h = j.length;
			while (h--) j[h].Birth();
		}, f)
	},
	Get_Hardest: () => {
		let Range = Array(oS["R"] + 1).fill(0), AOE_Num = Array(oS["R"] + 1).fill(1), Min = Infinity, Max = -Infinity, Minindex = 0, Maxindex = 0; // fill
		for (let i = 1; i <= oS["R"]; ++i) oT["$"][i]["forEach"]((Obj) => {
			let Self_S = $P[Obj[3]]["Judge_Strength"], AOE_Buff = 1 + (($P[Obj[3]]["R"] != i) ? ($P[Obj[3]]["Judge_Strength"]) : (0.5)) * $P[Obj[3]]["Is_AOE"] * $P[Obj[3]]["Judge_Strength"]; // 侧路 AOE 伤害平方
			for (let C = GetC(Obj[0]) + 1; C < GetC(Obj[1]) - 1; ++C) for (let w = 0, p, st; w < MAX_PLT_INDEX; ++w) p = oGd.$[i + "_" + C + "_" + w], st = (p ? ((1 + p.HP / window[p.EName]["prototype"]["HP"]) * p.Judge_Strength) : 1) || 1, Range[i] += AOE_Buff * Self_S * st * (GetX(C + 1) - GetX(C));
			if (GetC(Obj[1]) - GetC(Obj[0]) > 0) Range[i] += AOE_Buff * Self_S * (GetX(GetC(Obj[0]) + 1) - GetC(Obj[0])), Range[i] += AOE_Buff * Self_S * (GetC(Obj[1]) - GetX(GetC(Obj[1]) - 1));
			else Range[i] += AOE_Buff * Self_S * (Obj[1] - Obj[0]);
			AOE_Num[i] += $P[Obj[3]]["Is_AOE"];
		}); // 根据 tirgger 评判难度
		for (let i in $P) Range[$P[i]["R"]] += $P[i]["HP"] * $P[i]["Judge_Strength"], AOE_Num[$P[i]["R"]] += $P[i]["Is_AOE"];
		for (let i = 1; i <= oS["R"]; ++i) ((Range[i] < Min) && (Min = Range[i], Minindex = i)), ((Range[i] > Max) && (Max = Range[i], Maxindex = i));
		Range[0] = -Infinity; return [Minindex, Maxindex, Range];
	}
});



/*
博弈者
关卡目标：
	1.打败系统出怪
*/




/*
let AI_SelectFlagZombie = (() => {
	let AllFlagNum = 30, Opening_Flag = 3; // 总波数，定义“后阶段”的波数
	let ret, Arz, Arg;
	let $Sum_Random = (Arr, dSum, dRd) => {dSum = Arr.reduce((a, b) => a + b, 0), dRd = Math.random() * dSum; return ((i = 0) => {while ((dRd -= Arr[i++]) > 0); return --i;})()};
	let Get_Range_R_Strong = () => {
		let $P = Arg[6], oT = Arg[3];
		let Range = Array(oS["R"] + 1).fill(0), AOE_Num = Array(oS["R"] + 1).fill(1); // fill
		for (let i = 1; i <= oS["R"]; ++i) oT["$"][i]["forEach"]((Obj) => {
			let Self_S = $P[Obj[3]]["Judge_Strength"], AOE_Buff = 1 + (($P[Obj[3]]["R"] != i) ? ($P[Obj[3]]["Judge_Strength"]) : (0.5)) * $P[Obj[3]]["Is_AOE"] * $P[Obj[3]]["Judge_Strength"]; // 侧路 AOE 伤害平方
			for (let C = GetC(Obj[0]) + 1; C < GetC(Obj[1]) - 1; ++C) for (let w = 0, p, st; w < MAX_PLT_INDEX; ++w) p = oGd.$[i + "_" + C + "_" + w], st = (p ? ((1 + p.HP / window[p.EName]["prototype"]["HP"]) * p.Judge_Strength) : 1) || 1, Range[i] += AOE_Buff * Self_S * st * (GetX(C + 1) - GetX(C));
			if (GetC(Obj[1]) - GetC(Obj[0]) > 0) Range[i] += AOE_Buff * Self_S * (GetX(GetC(Obj[0]) + 1) - GetC(Obj[0])), Range[i] += AOE_Buff * Self_S * (GetC(Obj[1]) - GetX(GetC(Obj[1]) - 1));
			else Range[i] += AOE_Buff * Self_S * (Obj[1] - Obj[0]);
			AOE_Num[i] += $P[Obj[3]]["Is_AOE"];
		}); // 根据 tirgger 评判难度
		for (let i in $P) Range[$P[i]["R"]] += $P[i]["HP"] * $P[i]["Judge_Strength"], AOE_Num[$P[i]["R"]] += $P[i]["Is_AOE"];
		// for (let i = 1; i <= oS["R"]; ++i) Range[i] *= AOE_Num[i]; // 难度 = 难度 * AOE 数量
		// console.log(Range, AOE_Num, i);
		Range[0] = -Infinity; return Range;
	};
	let oZombie_Chance = {"oJackinTheBoxZombie": [80, 10, 10], "oDancingZombie": [50, 20, 30], "oZomboni": [40, 20, 40], "default": [50, 20, 30]};
	let Rd_Bot = () => { // 前几波均摊出怪即可
		if (Arg[1]["ArZ"]["length"] == 0) return []; // 没有可以出的怪，摆烂
		let Arz = Arg[1]["ArZ"]["concat"]().sort((a, b) => a.prototype.Lvl - b.prototype.Lvl), Sum = Arg[11], retArr = [], o; // 从小到大
		while (Sum >= 0) o = Arz[Math.floor(Math.random() * Arz["length"])], Sum -= o.prototype.Lvl, retArr[retArr["length"]] = [o, Math.floor(1 + Math.random() * oS.R)];
		return retArr;
	};
	let Normal_Bot = () => { // 整句游戏主要使用的 bot
		if (Arg[1]["ArZ"]["length"] == 0) return []; // 没有可以出的怪，摆烂
		let Strong = Get_Range_R_Strong(), StrMpSort = Strong.map((i, j) => [i, j]).sort((a, b) => (a[0] - b[0]) ? (a[0] - b[0]) : (Math.random() - 0.5)), Arz = Arg[1]["ArZ"]["concat"]().sort((a, b) => a.prototype.Lvl - b.prototype.Lvl); // 从小到大
		let Sum = Arg[11], Len = Arz["length"], SliceLen = Len - 1, NowLvl = Arz[SliceLen].prototype.Lvl, ZArz2 = [], RZlen = 0, retArr = [], z, r, l, k = StrMpSort["length"] - 1; // 选择僵尸

		while (Sum > 0) { // 选择僵尸出怪
			if (SliceLen && NowLvl > Sum) {while(--SliceLen && Arz[SliceLen].prototype.Lvl > Sum); Len = SliceLen + 1, b = Arz[SliceLen].prototype.Lvl;};
			Sum -= (ZArz2[RZlen++] = Arz[Math.floor(Math.random() * Len)]).prototype.Lvl;
		}; // 随机选择
		// 选择出现的行
		for (let i = 0; i < RZlen; ++i) z = oZombie_Chance[ZArz2[i]["prototype"]["EName"]] || oZombie_Chance["default"], l = $Sum_Random(z), ((l == 0 && (r = StrMpSort[1][1])) || (l == 2 && (r = StrMpSort[k][1]))) ? (r) : (r = StrMpSort[Math.floor(2 + Math.random() * (k - 1))][1]), retArr[i] = [ZArz2[i], r];
		
		return retArr;
	};
	// oS, oP, oZ, oT, oGd, ArCard, $P, $Z, LF, ZF, Flag, ZombieSunNum
	return (oS, oP, oZ, oT, oGd, ArCard, $P, $Z, LF, ZF, Flag, dSum) => { // 作用域改变
		Arz = oP.ArZ, Arg = [oS, oP, oZ, oT, oGd, ArCard, $P, $Z, LF, ZF, Flag, dSum], ret = (Flag <= Opening_Flag) ? Rd_Bot() : Normal_Bot();
		return ret;
	};
})();



let SetTimeout_BotZombie = (b = [], d = 150) => {
	var f = [], c = [], e = 0, g = 0, a = b.length;
	while (e < a) c[e] = (f[e] = new b[e][0]).prepareBirth(g, b[e][1]), g += d, ++e, ++oP.NumZombies;
	asyncInnerHTML(c.join(""), function(k, j) {
		EDPZ.appendChild(k);
		var h = j.length;
		while (h--) j[h].Birth();
	}, f)
}


let Get_Hardest = () => {
	let Range = Array(oS["R"] + 1).fill(0), AOE_Num = Array(oS["R"] + 1).fill(1), Min = Infinity, Max = -Infinity, Minindex = 0, Maxindex = 0, StrMpSort; // fill
	for (let i = 1; i <= oS["R"]; ++i) oT["$"][i]["forEach"]((Obj) => {
		let Self_S = $P[Obj[3]]["Judge_Strength"], AOE_Buff = 1 + (($P[Obj[3]]["R"] != i) ? ($P[Obj[3]]["Judge_Strength"]) : (0.5)) * $P[Obj[3]]["Is_AOE"] * $P[Obj[3]]["Judge_Strength"]; // 侧路 AOE 伤害平方
		for (let C = GetC(Obj[0]) + 1; C < GetC(Obj[1]) - 1; ++C) for (let w = 0, p, st; w < MAX_PLT_INDEX; ++w) p = oGd.$[i + "_" + C + "_" + w], st = (p ? ((1 + p.HP / window[p.EName]["prototype"]["HP"]) * p.Judge_Strength) : 1) || 1, Range[i] += AOE_Buff * Self_S * st * (GetX(C + 1) - GetX(C));
		if (GetC(Obj[1]) - GetC(Obj[0]) > 0) Range[i] += AOE_Buff * Self_S * (GetX(GetC(Obj[0]) + 1) - GetC(Obj[0])), Range[i] += AOE_Buff * Self_S * (GetC(Obj[1]) - GetX(GetC(Obj[1]) - 1));
		else Range[i] += AOE_Buff * Self_S * (Obj[1] - Obj[0]);
		AOE_Num[i] += $P[Obj[3]]["Is_AOE"];
	}); // 根据 tirgger 评判难度
	for (let i in $P) Range[$P[i]["R"]] += $P[i]["HP"] * $P[i]["Judge_Strength"], AOE_Num[$P[i]["R"]] += $P[i]["Is_AOE"];
	for (let i = 1; i <= oS["R"]; ++i) ((Range[i] < Min) && (Min = Range[i], Minindex = i)), ((Range[i] > Max) && (Max = Range[i], Maxindex = i));
	Range[0] = -Infinity, StrMpSort = Range["concat"]().map((i, j) => [i, j]).sort((a, b) => (a[0] - b[0]) ? (a[0] - b[0]) : (Math.random() - 0.5))
	return [StrMpSort, Range];
};
*/