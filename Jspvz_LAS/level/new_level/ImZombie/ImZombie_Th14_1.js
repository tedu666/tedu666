oS.Init({
	PName: [oSunFlower, oSnowPea, oHypnoShroom, oThreepeater, oSpikeweed, oStarfruit, oGarlic, oGloomShroom, oMelonPult_Pro, oCabbage_Pro],
	ZName: [oImp, oPoleVaultingZombie],
	PicArr: ["new_skin/Images/InterFace/background_th14.png", "images/interface/trophy.png", "images/interface/Stripe.png"],
	backgroundImage: "new_skin/Images/InterFace/background_th14.png",
	StartGameMusic: "Mountains", LoadMusic: "Mountains",
	LevelName: "解谜模式：避高就低", LvlEName: "ImZombie_Th14_1",
	Coord: "th14", ShowScroll: false, ProduceSun: false,
	BrainsNum: 5, DKind: 0, SunNum: 425, CardKind: 1,
	Plants_C: 5, ArP: { ArC: [1, 5], ArR: [1, 5], },
	RiddleAutoGrow: function() {
		Summon("11061237131114241431211422142231230823312423252925313108321433143423343135073531412241314214431444114431450945315114513152295318540555025531");
		NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(oS.Plants_C + 1)[0] - 11) + "px;top:160px;height:400px;", EDMove);
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
		var v = oS.ArCard, u = -1, t = v.length;
		while (++u < t) SelectCard(v[u].prototype.EName);
	}
});

