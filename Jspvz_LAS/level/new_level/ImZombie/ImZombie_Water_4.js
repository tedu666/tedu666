/*
	关卡设计者: 我是帅
*/
 
oS.Init({
	PName: [oSunFlower, oSnowPea, oFumeShroom, oScaredyShroom, oSquash, oStarfruit, oGloomShroom, oGatlingPea, oPumpkinHead, oHypnoShroom, oSpikerock, oSplitPea, oPlantern, oTallNut, oWallNut],
	ZName: [oFlagZombie, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oFootballZombie, oDuckyTubeZombie2, oDuckyTubeZombie3, oScreenDoorZombie, oNewspaperZombie, oDancingZombie, oBackupDancer, oJackinTheBoxZombie],
	PicArr: ["images/interface/background4.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
	backgroundImage: "images/interface/background4.jpg",
	Coord: 2, DKind: 0, LF: [0, 1, 1, 2, 2, 1, 1],
	ShowScroll: false, ProduceSun: false,
	SunNum: 450, HaveFog: 9, BrainsNum: 6, CardKind: 1,
	LevelName: "解谜模式：盲盒",
	LvlEName: "ImZombiePool2",
	LoadMusic: "Mountains", StartGameMusic: "Mountains",
	ArP: {
		ArC: [1, 4], ArR: [1, 6], Auto: 1,
		P: {
			Arr: [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 9], 
			Arr1: [10, 10], Arr2: [8, 8]
		}
	},
	RandomGrow: function(Point, Arr) {
		Point.sort(function () { return Math.random() - 0.5; });
		Arr.sort(function () { return Math.random() - 0.5; });
		while (Point.length && Arr.length) CustomSpecial(oS.PName[Arr[Arr.length - 1]], Point[Point.length - 1][1], Point[Point.length - 1][0], 1), Point.length--, Arr.length--;
	}, 
	RiddleAutoGrow: function() {
		var k = oS.ArP, f = k.ArC, j = k.ArR, e = k.P, d = oS.PName, Arr = [];
		var SummonRange = function(Arr, l, r) {
			for (; l <= r; ++l) for (var j = f[0]; j <= f[1]; ++j) Arr.push([j, l]);
		};
		SummonRange(Arr, 3, 4), oS.RandomGrow(Arr, e.Arr); // 处理泳池的植物
		SummonRange(Arr, 1, 2), SummonRange(Arr, 5, 6), oS.RandomGrow(Arr, e.Arr1), oS.RandomGrow(Arr, e.Arr); // 处理剩余的植物
		SummonRange(Arr, 1, 6), oS.RandomGrow(Arr, e.Arr2); // 处理南瓜头
		for (var i = f[0]; i <= f[1]; ++i) CustomSpecial(oLilyPad, 3, i), CustomSpecial(oLilyPad, 4, i); // 荷叶
		for (var i = j[0]; i <= j[1]; ++i) CustomSpecial(oBrains, i, 0); // 脑子
		NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(6)[0] - 11) + "px;top:65px", EDAll);
	},
	StartGame: function() {
		oP.Monitor(), BeginCool();
		SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
		oS.RiddleAutoGrow(), oS.ArP.ArC = [1, 5], oGd.MoveFogLeft();

		CustomSpecial(oPlantern, 2, 5), CustomSpecial(oPlantern, 5, 5);
		CustomSpecial(oSplitPea, 1, 9), CustomSpecial(oSplitPea, 6, 9);
		CustomSpecial(oSunFlower, 2, 9), CustomSpecial(oSunFlower, 5, 9);
		CustomSpecial(oLilyPad, 3, 5), CustomSpecial(oLilyPad, 4, 5);
		CustomSpecial(oTallNut, 3, 5), CustomSpecial(oTallNut, 4, 5);
		oGd.$["3_5_1"].HP *= 2, oGd.$["4_5_1"].HP *= 2;
		CustomSpecial(oWallNut, 1, 5), CustomSpecial(oWallNut, 6, 5);		
		oFlowerVase.prototype.SpecialBirth(2, 6, 2, { "Type": "Zombie", "Value": oJackinTheBoxZombie }, function(O) { O.AutoSummonBase = false; });
		oFlowerVase.prototype.SpecialBirth(5, 6, 2, { "Type": "Zombie", "Value": oJackinTheBoxZombie }, function(O) { O.AutoSummonBase = false; });
	}
}, 0, {
	AutoSelectCard: function() {
		var d = 0, c = oS.ArCard, b = -1, a = c.length;
		while (++b < a && d <= 10) if (c[b].prototype.CanSelect) SelectCard(c[b].prototype.EName), ++d;
	}
});