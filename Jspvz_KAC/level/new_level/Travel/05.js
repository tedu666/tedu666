oS.Init({
	PName: [oGatlingPea_Pro, oTorchwood_Pro, oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oSquash, oThreepeater, oJalapeno, oSpikeweed, oTallNut, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGloomShroom, oTwinSunflower, oSpikerock],
	ZName: [oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oJackinTheBoxZombie],
	PicArr: ["new_skin/InterFace/background_new_1.png"],
	backgroundImage: "new_skin/InterFace/background_new_1.png",
	LevelName: "EX-5 捍卫者",
	LvlEName: "EX_Protect_Brain_5",
	StartGameMusic: "Glorious_Morning",/*"nice_graveyard"*/
	CanSelectCard: 1,
	MusicMode: 1,
	DKind: 0,
	SunNum: 150,
	LevelProduce: "前几关的缝合版，不要让僵尸踩到花坛，也不要让僵尸啃死大蒜哦！",
	LF: [0, 1, 1, 1, 1, 1],
	ZF: [0, 1, 0, 1, 0, 1],
	NormalFlagZombieTask: 100, //平均僵尸出现间隔
	BigFlagZombieTask: 10, //大波僵尸间隔
	LargeWaveFlag: {
		10: $("imgFlag4"),
		20: $("imgFlag3"),
		30: $("imgFlag2"),
		40: $("imgFlag1")
	},
	UserDefinedFlagFunc: function(){

	},
	InitLawnMower: function() {
		for(let i = 1; i <= oS.R; ++i){
		 	CustomSpecial(oLawnCleaner, i, -1);
		};
	},
	LoadAccess: function(LevelDefFuc){

		LevelDefFuc(), SelectCard("oGarlic");
		Start_Ctk_Flower(), Ctk_Save_Block();

		init_dag();
		let f = (a, b, c, d) => {dag.add_edge([a, b], [c, d]), Summon_Ban(a, b), Summon_Ban(c, d);};
		let f2 = (a, b, c, d) => {dag.add_edge([a, b], [c, d]);};
		let F1 = (a, b) => {Summon_Flower(a, b)}, F2 = (a, b) => {Summon_Dangerous(a, b)};

		f(1, 10, 1, 9), f(3, 10, 3, 9), f(5, 10, 5, 9);

		Summon_Ban(3, 6), Summon_Ban(3, 4);
		f2(3, 10, 3, 7), f2(3, 9, 3, 7), f2(3, 7, 3, 5), f2(3, 5, 3, 3), F1(3, 3);

		f(1, 9, 1, 7), f(5, 9, 5, 7), F2(1, 8), F2(5, 8), CustomSpecial(oGarlic, 1, 8), CustomSpecial(oGarlic, 5, 8);
		f(1, 7, 2, 6), f(5, 7, 4, 6), f(2, 6, 5, 6), f(4, 6, 1, 6), f2(3, 5, 1, 6), f2(3, 5, 5, 6);
		f(5, 6, 4, 2), f(1, 6, 2, 2);
		Summon_Ban(4, 2), Summon_Ban(2, 2), f2(4, 2, 4, 0), f2(2, 2, 2, 0);
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

//			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "Tips: 霉菌上不能种植植物哦"}, EDAll);
//			oSym.addTask(250, function() {ClearChild($("DivTeach"));}, []);
		});
	}
}, {
	AZ: [[oZombie, 2, 1], [oZombie2, 2, 1], [oZombie3, 2, 1], [oPoleVaultingZombie, 2, 10], [oConeheadZombie, 3, 5], [oBucketheadZombie, 2, 2], [oNewspaperZombie, 3, 4], [oScreenDoorZombie, 2, 9], [oFootballZombie, 4, 1], [oDancingZombie, 2, 18, [30]], [oJackinTheBoxZombie, 1, 50, [40, 40, 40, 40, 40]]],
	FlagNum: 40,
	FlagToSumNum: {
		a1: [   1, 3, 5, 7,  9, 10, 13, 15,  19, 20, 23, 26,  29, 30, 32,  35,  37,  39],
		a2: [2, 3, 5, 7, 9, 50, 11, 15, 20, 111, 30, 40, 50, 555, 60, 90, 145, 190, 500]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowLargeWave, 0],
		39: [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDAll);
		NewImg("imgSF", "new_skin/images/Card/Cabbage.webp", "height:120px;left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDAll, {onclick: function() {GetNewCard(this, oCabbage, 0);}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDAll);
		// NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
		// NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll);
		Win_Travel(5, 6);
	}
},__Template_ReSet_Object__(___Template_Protect_Brain___,{
	dag: [],
	redag: [],
	Summon_Ban: ___Template__Summon_Ban_Block___,

	$Flower: {},
	Summon_Flower: ___Template__Summon_Flower___,
	__Ctk_Rc_Zombie__: ___Template__Ctk_Rc_Zombie___,
	Start_Ctk_Flower: ___Template__Start_Ctk_Flower___,
	Dangerous_Block: {},
	Summon_Dangerous: ___Template__Summon_Dangerous_Block___,
	Ctk_Save_Block: ___CTK_SAVE_BLOCK___,
}));
