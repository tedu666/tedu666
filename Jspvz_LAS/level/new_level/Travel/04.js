oS.Init({
	PName: [oGatlingPea_Pro, oTorchwood_Pro, oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oSquash, oThreepeater, oJalapeno, oSpikeweed, oTallNut, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock],
	ZName: [oZombie, oZombie2, oZombie3, oBucketheadZombie, oFootballZombie, oJackinTheBoxZombie, oBalloonZombie],
	PicArr: ["new_skin/Images/InterFace/background_new_1.png"],
	backgroundImage: "new_skin/Images/InterFace/background_new_1.png",
	LevelName: "EX-4 守护者",
	LvlEName: "EX_Save_Plants_4",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 1,
	MusicMode: 1,
	SunNum: 100,
	DKind: 0,
	LevelProduce: "保护在警戒线上的植物！",
	LargeWaveFlag: {
		20: $("imgFlag1")
	},
	Can_Dangerous: [],
	UserDefinedFlagFunc: function(){
		Summon_New(2);
	},
	LoadAccess: function(LevelDefFuc){
		for(let i = 1; i <= oS.C; i++){for(let j = 1; j <= oS.R; j++){oS.Can_Dangerous.push([j, i]);}};
		oS.Can_Dangerous.sort(() => {return Math.random() - 0.5});
		Summon_New(10);
		LevelDefFuc(), Ctk_Save_Block();
	},
	StartGame: function(){
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));

			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
//			for(let i in ArCard){DoCoolTimer(i,0);};
			BeginCool();

			AutoProduceSun(25);
			oSym.addTask(1500, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);


			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "保护好警告线上的植物（如果上面有的话）"}, EDMove);
			oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
		});
	}
}, {
	AZ: [[oZombie, 1, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], [oBucketheadZombie, 2, 4], [oFootballZombie, 4, 8], [oJackinTheBoxZombie, 3, 20, [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20]], [oBalloonZombie, 2, 20, [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20]]],
	FlagNum: 20,
	FlagToSumNum: {
		a1: [   2, 10, 15,  19],
		a2: [1, 2,  3,  4, 100]
	},
	FlagToMonitor: {
		19: [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		Win_Travel(4, 5);
	}
},{
	Dangerous_Block: {},
	Summon_Dangerous: ___Template__Summon_Dangerous_Block___,
	Ctk_Save_Block: ___CTK_SAVE_BLOCK___,
	Summon_New: function(n = 1){
		for(let i = 1; i <= n && oS.Can_Dangerous.length; i++){
			let d = oS.Can_Dangerous[0];
			Summon_Dangerous(d[0], d[1]), oS.Can_Dangerous.splice(0, 1);
		};
	}
});
