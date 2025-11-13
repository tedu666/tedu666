alert("本关未开发完全！您目前仅能体验该机制！");

oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oTwinSunflower, oSpikerock, oGatlingPea_Pro, oTorchwood_Pro, oCattail, oCabbage_Pro, oMelonPult_Pro, oWinterMelon_Pro, oZombie, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp, oDiggerZombie],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie, oImp],
	PicArr: ["new_skin/Images/InterFace/background_th14.png", "images/interface/ZombieNoteSmall.png", "images/interface/ZombieNote1.png"],
	backgroundImage: "new_skin/Images/InterFace/background_th14.png",
	CanSelectCard: 1, StartGameMusic: "th13", 
	Coord: "th14", SunNum: 114514, 
	LevelName: "力压的常寻乎超", MusicMode: 1, 
	LvlEName: 9, Cheat_Mode: 1, 
	StartGame: function(){
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));

			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
			for(let i in ArCard) DoCoolTimer(i,0);

			AutoProduceSun(25);
			oSym.addTask(1500, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);
		});

		oGT.On("BulletBirth", (self) => {
			self["Weight"][1] += 0.25, self["Gravity"][1] += 0.25, self["MinSpeed"][1] = 0;
		});
	}, 
	LargeWaveFlag: {
		10: $("imgFlag3"),
		20: $("imgFlag2"),
		30: $("imgFlag1")
	}
}, {
	AZ: [
		[oZombie, 2, 1],
		[oZombie2, 2, 1],
		[oZombie3, 2, 1],
		[oConeheadZombie, 2, 1],
		[oPoleVaultingZombie, 1, 1],
		[oBucketheadZombie, 1, 1]
	],
	FlagNum: 30,
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29],
		a2: [1, 2, 3, 10, 4, 6, 8, 20, 10, 12, 15, 30]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowFinalWave, 0]
	},
});