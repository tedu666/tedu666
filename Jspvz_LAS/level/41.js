oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oCabbage],
	ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie],
	PicArr: function() {
		var a = oFlowerPot.prototype,
			b = a.PicArr;
		return ["images/interface/background5.jpg", b[a.CardGif], b[a.NormalGif]]
	}(),
	backgroundImage: "images/interface/background5.jpg",
	CanSelectCard: 1,
	Coord: 3, SunNum: 50, 
	LevelName: "关卡 5-1",
	LvlEName: 41, StartGameMusic: "GrazeTheRoof", 
	LF: [0, 3, 3, 3, 3, 3], 
	LoadAccess: function(CallBack) {
		for (let C = 1; C <= 5; ++C) for (let R = 1; R <= oS.R; ++R) CustomSpecial(oFlowerPot, R, C);
		CallBack();
	}, 
	UserDefinedFlagFunc: function(a) {
		if (oP.FlagNum == oP.FlagZombies) oP.SetTimeoutSkyZombie(6, 9, 3, [oZombie, oConeheadZombie]);
	},
	LargeWaveFlag: {
		10: $("imgFlag1")
	}
}, {
	AZ: [
		[oZombie, 3, 1],
		[oZombie2, 2, 1],
		[oZombie3, 2, 1],
		[oConeheadZombie, 2, 1]
	],
	FlagNum: 10,
	FlagToSumNum: {
		a1: [3, 5, 9],
		a2: [1, 2, 3, 9]
	},
	FlagToMonitor: {
		9: [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDAll);
		NewImg("imgSF", "images/Card/Plants/FlowerPot.png", "left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDAll, {
			onclick: function() {
				GetNewCard(this, oFlowerPot, 0);
			}
		});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDAll)
	}
});