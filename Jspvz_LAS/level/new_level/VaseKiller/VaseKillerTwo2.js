//VaseKillerTwo2
oS.Init({
	Vase: {},
	oPenVase: {},
	PName: [oCherryBomb, oFumeShroom, oScaredyShroom, oCactus, oSeaShroom, oPeashooter, oPumpkinHead, oStarfruit, oLilyPad, oTangleKelp, oPlantern, oPotatoMine],
	ZName: [oZombie, oZombie2, oZombie3, oScreenDoorZombie, oPoleVaultingZombie, oBucketheadZombie, oJackinTheBoxZombie, oDuckyTubeZombie1, oDuckyTubeZombie3],
	PicArr: ["images/interface/background4.jpg","images/interface/trophy.png","images/interface/PointerDown.gif","images/interface/Stripe.png"],
	backgroundImage: "images/interface/background4.jpg",
	DKind: 0,
	ShowScroll: false,
	ProduceSun: false,
	LevelName: "记忆大师",
	LvlEName: "VaseKillerTwo2",
	Coord: 2,
	HaveFog: 6,
	LF: [0, 1, 1, 2, 2, 1, 1],
	CanSelectCard: 0,
	StartGameMusic: "Mountains",
	SunNum : 0,
	StartGame: function() {
		oP.Monitor();
		for(let i in ArCard){DoCoolTimer(i,0);};
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		StopMusic(),PlayMusic(oS.LoadMusic = oS.StartGameMusic);
		oS.RiddleAutoGrow();
		oSym.addTask(250,function(){if(CekWin()){oP.FlagToEnd();}else{oSym.addTask(250,arguments.callee,[]);};},[]);

		oSym.addTask(1000, oGd.MoveFogLeft, []);
	},
	VaseArP : {
		GreenNum: Infinity,
//		ZombieNum: Infinity,
		left: 5,
		right: 9,
		ZombieP: [0, 1, 2, 3, 4, 5, 6],
		WaterZombieP: [7, 8, 8],
		PlantP: [1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 7, 8, 8, 8, 9],
		SunP: [50],
	},
	RiddleAutoGrow: __Template_Function_RiddleAutoGrow_Water__,
	ZombiePot: [],
	DefRiddleAutoGrow: function(){
		__Template_Function_DefRiddleAutoGrow_Water_SetZombie__();
	},
	DefSummon: function(y, x, size, item, viewsize){
		if(size == 1) oS.ZombiePot.push([y, x, size, item, viewsize]);
	},
	AutoSelectCard: function(){
		SelectCard("oCherryBomb"), SelectCard("oLilyPad"), SelectCard("oPlantern"), SelectCard("oTangleKelp"), SelectCard("oPotatoMine");
	}
}, __Template_Normal_FlagToEnd__, __Template_FlowerVase__);
