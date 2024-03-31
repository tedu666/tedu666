/*
	关卡设计者: 寒冰投手
	关卡制作者: 我是帅
	关卡植物: 5大喷 3南瓜 3魅惑 4土豆 8小向 4三线 3机枪 3仙人掌 10荷叶
*/
oS.Init({
	PName: [oFumeShroom, oPumpkinHead, oHypnoShroom, oPotatoMine, oSunFlower, oThreepeater, oGatlingPea, oCactus, oLilyPad],
	ZName: [oZombie, oConeheadZombie, oBucketheadZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oScreenDoorZombie, oPoleVaultingZombie, oBalloonZombie],
	PicArr: ["images/interface/background4.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
	backgroundImage: "images/interface/background4.jpg",
	StartGameMusic: "Mountains",
	LevelName: "解谜模式：泳池奇遇",
	LvlEName: "ImZombie_Water_3",
	LoadMusic: "Mountains",
	ShowScroll: false, ProduceSun: false, SunNum: 350, CardKind: 1,
	Coord: 2, DKind: 0, LF: [0, 1, 1, 2, 2, 1, 1],
	BrainsNum: 6, Plants_C: 5,
	ArP: {
		ArC: [1, 5], ArR: [1, 6],
	},
	RiddleAutoGrow: function() {
		Summon(Set_Level(oS.Plants_C, 0, 0, 0, [
			{"ID": "02", "Set_Num": 8, "CanWater": true}, 
			{"ID": "05", "Set_Num": 4, "CanWater": false}, 
			{"ID": "11", "Set_Num": 5, "CanWater": true}, 
			{"ID": "13", "Set_Num": 3, "CanWater": true}, 
			{"ID": "19", "Set_Num": 4, "CanWater": true}, 
			{"ID": "27", "Set_Num": 3, "CanWater": true}, 
			{"ID": "GP", "Set_Num": 3, "CanWater": true}, 
		], [1, 1, 2, 2, 1, 1]) + Set_Level(oS.Plants_C, 0, 0, 0, [
			{"ID": "31", "Set_Num": 3, "CanWater": true}, 
		], [1, 1, 2, 2, 1, 1]));

		NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(5 + 1)[0] - 11) + "px;top:65px", EDMove);
		for(let i = 1; i <= oS.R; i++) CustomSpecial(oBrains, i, 0);
	},
	StartGame: function() {
		oP.Monitor(), BeginCool();
		SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
		oS.RiddleAutoGrow();
	}
}, __Template_Normal_FlagToEnd__, {
	Summon: function(str){
		let q = str, j = {"01": oPeashooter, "02": oSunFlower, "03": oCherryBomb, "04": oWallNut, "05": oPotatoMine, "06": oSnowPea, "07": oChomper, "08": oRepeater, "09": oPuffShroom, 10: oSunShroom, 11: oFumeShroom, 12: oGraveBuster, 13: oHypnoShroom, 14: oScaredyShroom, 15: oIceShroom, 16: oDoomShroom, 17: oLilyPad, 18: oSquash, 19: oThreepeater, 20: oTangleKelp, 21: oJalapeno, 22: oSpikeweed, 23: oTorchwood, 24: oTallNut, 25: oSeaShroom, 26: oPlantern, 27: oCactus, 28: oBlover, 29: oSplitPea, 30: oStarfruit, 31: oPumpkinHead, 34: oFlowerPot, 36: oCoffeeBean, 37: oGarlic, 41: oGatlingPea, 42: oTwinSunflower, 43: oGloomShroom, 47: oSpikerock, "CB": oCabbage_Pro, "MP": oMelonPult_Pro, "CC": oCattail, "GP": oGatlingPea_Pro}, l = q.length;

		for(let i = 0; i < l; i += 4){
			let y = q.substr(i, 1), x = q.substr(i + 1, 1), id = j[q.substr(i + 2, 2)] || oPeashooter;
			CustomSpecial(id, y, x, 1);
		};
	},
	AutoSelectCard: function() {
		var v = oS.ArCard, u = -1, t = v.length;
		while (++u < t) SelectCard(v[u].prototype.EName);
	},
	Set_Level: __Template_IZ_SUMMON_FUNC__
});

