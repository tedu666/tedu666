// 简易版，无僵尸罐子、陆地版
let __Template_FlowerVase_RiddleAutoGrow_Easy__ = function() {
	var P = oS.VaseArP, L = P.Left, R = P.Right, GNum = P.GreenNum, VaseList = [], GroundList = [];

	// 生成罐子列表
	for (var O in P.ZombieP) VaseList.push({ "Type": "Zombie", "Value": oS.ZName[P.ZombieP[O]] });
	for (var O in P.PlantP) VaseList.push({ "Type": "Plants", "Value": oS.PName[P.PlantP[O]] });
	for (var O in P.SunP) VaseList.push({ "Type": "SunNum", "Value": P.SunP[O] });

	// 生成格子列表
	for (; L <= R; ++L) for (var Q = 1; Q <= oS.R; ++Q) GroundList.push([Q, L]);

	// 打乱两者
	VaseList.sort(function () { return Math.random() - 0.5; });
	GroundList.sort(function () { return Math.random() - 0.5; });

	// 生成罐子
	while (VaseList.length && GroundList.length) {
		var Top = VaseList[VaseList.length - 1], Pos = GroundList[GroundList.length - 1];

		oFlowerVase.prototype.SpecialBirth(Pos[0], Pos[1], (Top.Type == "Plants"? GNum-- > 0: 0), Top); // 生成罐子

		--VaseList.length, --GroundList.length
	}
};

// 支持水路、支持僵尸罐子
let __Template_FlowerVase_RiddleAutoGrow__ = function() {
	var P = oS.VaseArP, L = P.Left, R = P.Right, GNum = P.GreenNum, ZNum = P.ZombieNum, VaseList = [], GroundList = [];
	var SummonAll = function () { // 生成罐子函数
		while (VaseList.length && GroundList.length) {
			var Top = VaseList[VaseList.length - 1], Pos = GroundList[GroundList.length - 1];

			var ret = oFlowerVase.prototype.SpecialBirth(Pos[0], Pos[1], 0, Top); // 生成罐子

			ret.CardTime = 750, ret.AutoSummonBase = false; // 特殊设置卡片时间 生成底座后，关闭删除该底座的权限

			--VaseList.length, --GroundList.length;
		}
	};

	// 生成水路罐子列表 格子列表（水路） 并打乱 生成
	for (var O in P.WaterZombieP) VaseList.push({ "Type": "Zombie", "Value": oS.ZName[P.WaterZombieP[O]] });
	for (L = P.Left; L <= R; ++L) for (var Q = 1; Q <= oS.R; ++Q) if (oGd.$LF[Q] == 2) GroundList.push([Q, L]);
	VaseList.sort(function () { return Math.random() - 0.5; });
	GroundList.sort(function () { return Math.random() - 0.5; });
	SummonAll(), VaseList.length = 0; // 清空泳池的僵尸


	// 加入植物、阳光罐，顶满泳池 并打乱 生成
	for (var O in P.PlantP) VaseList.push({ "Type": "Plants", "Value": oS.PName[P.PlantP[O]] });
	for (var O in P.SunP) VaseList.push({ "Type": "SunNum", "Value": P.SunP[O] });
	VaseList.sort(function () { return Math.random() - 0.5; });
	GroundList.sort(function () { return Math.random() - 0.5; });
	SummonAll(), GroundList.length = 0; // 如果加入的这些都没有顶满水路，那么直接放弃水路生成


	// 加入陆地僵尸 并加入剩余格子 打乱 生成
	for (var O in P.ZombieP) VaseList.push({ "Type": "Zombie", "Value": oS.ZName[P.ZombieP[O]] });
	for (L = P.Left; L <= R; ++L) for (var Q = 1; Q <= oS.R; ++Q) if (oGd.$LF[Q] != 2) GroundList.push([Q, L]);
	VaseList.sort(function () { return Math.random() - 0.5; });
	GroundList.sort(function () { return Math.random() - 0.5; });
	SummonAll(), VaseList.length = 0;


	// 获取场上所有罐子位置
	for (L = P.Left; L <= R; ++L) for (var Q = 1; Q <= oS.R; ++Q) GroundList.push([Q, L]);
	GroundList.sort(function () { return Math.random() - 0.5; });
	while (GroundList.length && (ZNum > 0 || GNum > 0)) {
		var Pos = GroundList[GroundList.length - 1], Val = oGd.$[Pos[0] + "_" + Pos[1] + "_1"];
		if (Val && Val.EName == "oFlowerVase" && Val.VaseValue.Type == "Zombie" && ZNum > 0) Val.InitImage(2, Val.XRay), Val.CardTime = 500, --ZNum;
		if (Val && Val.EName == "oFlowerVase" && Val.VaseValue.Type == "Plants" && GNum > 0) Val.InitImage(1, Val.XRay), Val.CardTime = 500, --GNum;
		--GroundList.length;
	}
};
