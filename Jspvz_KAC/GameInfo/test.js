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
		console.log(Range, AOE_Num, i);
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


// let ret = AI_SelectFlagZombie(oS, oP, oZ, oT, oGd, ArCard, $P, $Z, oGd.$Lf, oGd.$ZF, 10, 100);
// SetTimeout_BotZombie(ret), console.log(ret);



// AI_SelectFlagZombie(oS, oP, oZ, oT, oGd, ArCard, $P, $Z, oGd.$LF, oGd.$ZF, 24, 3)
/*
开局优先进攻边路，水路可以出怪时不停出海豚，有强力植物就在侧路放丑，优先进攻丢车路
开局出小鬼
后面不时气球骚扰（都在边路）



oJackinTheBoxZombie.prototype.Lvl
*/