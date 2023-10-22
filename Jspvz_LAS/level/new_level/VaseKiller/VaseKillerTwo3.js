//VaseKillerTwo3
oS.Init({
	Vase: {},
	oPenVase: {},
	PName: [oCherryBomb, oPuffShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oSeaShroom, oGloomShroom, oCoffeeBean, oLilyPad],
	ZName: [oZombie, oZombie2, oZombie3, oDuckyTubeZombie1, oDuckyTubeZombie3, oFootballZombie, oScreenDoorZombie, oJackinTheBoxZombie],
	PicArr: ["images/interface/background3.jpg","images/interface/trophy.png","images/interface/PointerDown.gif","images/interface/Stripe.png"],
	backgroundImage: "images/interface/background3.jpg",
	DKind: 1,
	ShowScroll: false,
	ProduceSun: false,
	LevelName: "加班日",
	LvlEName: "VaseKillerTwo3",
	Coord: 2,
	LF: [0, 1, 1, 2, 2, 1, 1],
	CanSelectCard: 0,
	StartGameMusic: "Mountains",
	SunNum : 1000,
	StartGame: function() {
		oP.Monitor();
		for(let i in ArCard){DoCoolTimer(i,0);};
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		StopMusic(),PlayMusic(oS.LoadMusic = oS.StartGameMusic);
		oS.RiddleAutoGrow();
		oSym.addTask(250,function(){if(CekWin()){oP.FlagToEnd();}else{oSym.addTask(250,arguments.callee,[]);};},[]);
	},
	VaseArP : {
		GreenNum: 2,
		ZombieNum: 2,
		left: 4,
		right: 9,
		ZombieP: [6, 6, 6, 6, 6, 7, 7, 5],
		WaterZombieP: [4, 4, 4, 4, 3, 3],
		PlantP: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 7, 7, 8, 8, 8],
		SunP: [],
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
		SelectCard("oCoffeeBean"), SelectCard("oLilyPad"), SelectCard("oCherryBomb");
	}
}, __Template_Normal_FlagToEnd__, __Template_FlowerVase__);
