oS.Init({
	PName: [oSunFlower, oSnowPea, oHypnoShroom, oThreepeater, oSpikeweed, oStarfruit, oGarlic, oGloomShroom, oMelonPult_Pro, oCabbage_Pro],
	ZName: [oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oFootballZombie, oDuckyTubeZombie2, oDuckyTubeZombie3, oScreenDoorZombie, oNewspaperZombie, oDolphinRiderZombie, oSnorkelZombie, oBackupDancer],
	PicArr: ["images/interface/background4.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
	backgroundImage: "images/interface/background4.jpg",
	StartGameMusic: "Mountains",
	LevelName: "解谜模式：清爽夏日",
	LvlEName: "ImZombie_Water_1",
	LoadMusic: "Mountains",
	ShowScroll: false,
	ProduceSun: false,
	BrainsNum: 6,
	SunNum: 350,
	CardKind: 1,
	Coord: 2,
	DKind: 0,
	LF: [0, 1, 1, 2, 2, 1, 1],
	Plants_C: 4,
	ArP: {
		ArC: [1, 4],
		ArR: [1, 4],
	},
	RiddleAutoGrow: function() {
		Summon(Set_Level(oS.Plants_C, 0, 0, 0, [{"ID": "02", "Set_Num": 6, "CanWater": true}, {"ID": "06", "Set_Num": 3, "CanWater": true}, {"ID": "13", "Set_Num": 1, "CanWater": true}, {"ID": "19", "Set_Num": 1, "CanWater": true}, {"ID": "22", "Set_Line": [2, 5, 6], "CanWater": false}, {"ID": "30", "Set_Num": 2, "CanWater": true}, {"ID": "37", "Set_Num": 1, "CanWater": true}, {"ID": "43", "Set_Num": 2, "CanWater": true}, {"ID": "MP", "Set_Num": 3, "CanWater": true}, {"ID": "CB", "Set_Num": 2, "CanWater": true}], [1, 1, 2, 2, 1, 1]));
		NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(oS.Plants_C + 1)[0] - 11) + "px;top:65px", EDAll);
		for(let i = 1; i <= oS.R; i++) CustomSpecial(oBrains, i, 0);
	},
	StartGame: function() {
		oP.Monitor(), BeginCool();
		SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
		oS.RiddleAutoGrow();
	}
}, __Template_Normal_FlagToEnd__, {
	Summon: function(str){
		let q = str, j = {"01": oPeashooter, "02": oSunFlower, "03": oCherryBomb, "04": oWallNut, "05": oPotatoMine, "06": oSnowPea, "07": oChomper, "08": oRepeater, "09": oPuffShroom, 10: oSunShroom, 11: oFumeShroom, 12: oGraveBuster, 13: oHypnoShroom, 14: oScaredyShroom, 15: oIceShroom, 16: oDoomShroom, 17: oLilyPad, 18: oSquash, 19: oThreepeater, 20: oTangleKelp, 21: oJalapeno, 22: oSpikeweed, 23: oTorchwood, 24: oTallNut, 25: oSeaShroom, 26: oPlantern, 27: oCactus, 28: oBlover, 29: oSplitPea, 30: oStarfruit, 31: oPumpkinHead, 34: oFlowerPot, 36: oCoffeeBean, 37: oGarlic, 41: oGatlingPea, 42: oTwinSunflower, 43: oGloomShroom, 47: oSpikerock, "CB": oCabbage_Pro, "MP": oMelonPult_Pro, "CC": oCattail}, l = q.length;

		for(let i = 0; i < l; i += 4){
			let y = q.substr(i, 1), x = q.substr(i + 1, 1), id = j[q.substr(i + 2, 2)] || oPeashooter;
			CustomSpecial(id, y, x, 1);
		};
	},
	AutoSelectCard: function() {
		var v = oS.ArCard, u = -1, t = v.length - 1;
		while (++u < t) SelectCard(v[u].prototype.EName);
	},
	Set_Level: __Template_IZ_SUMMON_FUNC__
});

