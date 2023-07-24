//VaseKillerTwo1
oS.Init({
	Vase: {},
	oPenVase: {},
	PName: [oCherryBomb, oThreepeater, oSnowPea, oSquash, oLilyPad, oTangleKelp, oPlantern],
	ZName: [oZombie, oZombie2, oZombie3, oBucketheadZombie, oJackinTheBoxZombie, oDuckyTubeZombie1, oDuckyTubeZombie3, oDolphinRiderZombie],
	PicArr: ["images/interface/background4.jpg","images/interface/trophy.png","images/interface/PointerDown.gif","images/interface/Stripe.png"],
	backgroundImage: "images/interface/background4.jpg",
	DKind: 0,
	ShowScroll: false,
	ProduceSun: false,
	LevelName: "迷雾砸罐",
	LvlEName: "VaseKillerTwo1",
	Coord: 2,
	HaveFog: 2,
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

//		$("dFog").style.left = GetX(oS.C - oS.HaveFog) - 30;
		oSym.addTask(10, oGd.MoveFogLeft, []);
	},
	VaseArP : {
		GreenNum: 2,
		ZombieNum: 1,
		left: 6,
		right: 9,
		ZombieP: [0, 0, 1, 2, 3, 4],
		WaterZombieP: [5, 5, 6, 7],
		PlantP: [1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 6],
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
		SelectCard("oCherryBomb"), SelectCard("oLilyPad");
	}
}, __Template_Normal_FlagToEnd__, __Template_FlowerVase__);
