oS.Init({
	PName: [oGatlingPea_Pro, oTorchwood_Pro, oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oSquash, oThreepeater, oJalapeno, oSpikeweed, oTallNut, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie],
	PicArr: ["new_skin/InterFace/background_new_1.png"],
	backgroundImage: "new_skin/InterFace/background_new_1.png",
	LevelName: "EX-3 寻路者",
	LvlEName: "EX_Protect_Brain_3",
	StartGameMusic: "Glorious_Morning",/*"nice_graveyard"*/
	CanSelectCard: 1,
	MusicMode: 1,
	DKind: 0,
	SunNum: 150,
	LevelProduce: "僵尸会根据特定道路行走！",
	LF: [0, 1, 1, 1, 1, 1],
	ZF: [0, 0, 0, 1, 0, 0],
	NormalFlagZombieTask: 200, //平均僵尸出现间隔
	BigFlagZombieTask: 20, //大波僵尸间隔
	LargeWaveFlag: {
		10: $("imgFlag4"),
		20: $("imgFlag3"),
		30: $("imgFlag2"),
		40: $("imgFlag1")
	},
	UserDefinedFlagFunc: function(){
		if(oP.FlagZombies % 15 == 0){
			CustomSpecial(oHugeNutBowling_pro, 3, -2);
		}
	},
	InitLawnMower: function() {
		for(let i = 1; i <= oS.R; i++){
		 	CustomSpecial(oLawnCleaner, i, -1);
		};
	},
	LoadAccess: function(LevelDefFuc){

		LevelDefFuc();

		init_dag();
		let f = (a, b, c, d) => {dag.add_edge([a, b], [c, d]), Summon_Ban(a, b), Summon_Ban(c, d);};
		let f2 = (a, b, c, d) => {dag.add_edge([a, b], [c, d]);};
		f(3, 11, 3, 10);
		f(3, 10, 3, 9);
		f(3, 9, 3, 8);
		f(3, 8, 2, 8), f(3, 8, 4, 8);
		f(2, 8, 2, 7), f(4, 8, 4, 7);
		f(2, 7, 2, 6), f(4, 7, 4, 6);

		f(2, 6, 1, 6), f(2, 6, 3, 6), f(4, 6, 3, 6), f(4, 6, 5, 6);
		f(1, 6, 1, 5), f(3, 6, 3, 5), f(5, 6, 5, 5);

		f(1, 5, 1, 4), f(3, 5, 3, 3), f(5, 5, 5, 4);
		f(1, 4, 1, 3), f(5, 4, 5, 3);
		f(3, 3, 1, 3), f(3, 3, 5, 3);
		f(5, 3, 3, 1), f(1, 3, 3, 1);
	},
	StartGame: function(){
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
			oSym.addTask(10,function(){oSym.addTask(10,arguments.callee,[]);dag_traversal_of();},[]);

			for(let i in ArCard){DoCoolTimer(i,0);};

			AutoProduceSun(25);

			oSym.addTask(1500, function() {oP.AddZombiesFlag();SetVisible($("dFlagMeterContent"));},[]);

			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "Tips: 霉菌上不能种植植物哦"}, EDAll);
			oSym.addTask(250, function() {ClearChild($("DivTeach"));}, []);
		});
	}
}, {
	AZ: [[oZombie, 2, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], [oPoleVaultingZombie, 2, 7], [oConeheadZombie, 3, 3], [oBucketheadZombie, 2, 2], [oNewspaperZombie, 3, 2], [oScreenDoorZombie, 1, 6], [oFootballZombie, 4, 3], [oDancingZombie, 2, 15, [20]], [oZomboni, 1, 35, [5, 10, 15, 20, 25, 30, 35, 36, 37, 38, 39, 40]], [oJackinTheBoxZombie, 1, 10, [10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20]], [oBalloonZombie, 1, 1, [10, 20, 30, 40, 40, 40, 40]]],
	FlagNum: 40,
	FlagToSumNum: {
		a1: [   1, 3,  5,  7,  9, 10, 13, 15,  19, 20, 23, 26,  29,  30, 32, 35, 37,  39],
		a2: [1, 4, 8, 12, 20, 50, 21, 23, 25, 100, 30, 32, 34, 200, 200, 37, 45, 50, 300]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowLargeWave, 0],
		39: [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		Win_Travel(3, 4);
	}
},__Template_ReSet_Object__(___Template_Protect_Brain___,{
	dag: [],
	redag: [],
	Summon_Ban: ___Template__Summon_Ban_Block___
}));
