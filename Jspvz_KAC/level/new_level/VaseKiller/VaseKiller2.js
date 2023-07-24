//VaseKiller2
oS.Init({
	Vase: {},
	oPenVase: {},
	PName: [oCherryBomb, oRepeater2, oSnowPea, oWallNut, oPotatoMine],
	ZName: [oZombie, oZombie2, oZombie3, oBucketheadZombie, oJackinTheBoxZombie],
	PicArr: ["images/interface/background2.jpg","images/interface/trophy.png","images/interface/PointerDown.gif","images/interface/Stripe.png"],
	backgroundImage: "images/interface/background2.jpg",
	DKind: 0,
	ShowScroll: false,
	ProduceSun: false,
	LevelName: "一路向左",
	LvlEName: "VaseKiller2",
	CanSelectCard: 0,
	StartGameMusic: "Mountains",
	SunNum : 0,
	StartGame: function() {
		oP.Monitor();
		for(let i in ArCard){DoCoolTimer(i,0);};
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		StopMusic(),PlayMusic(oS.LoadMusic = oS.StartGameMusic);
		oS.RiddleAutoGrow();
		oSym.addTask(200,function(){if(CekWin()){oP.FlagToEnd();}else{oSym.addTask(200,arguments.callee,[]);};},[]);
	},
	VaseArP : {
		GreenNum: 2,
		left: 4,
		right: 8,
		ZombieP: [0, 0, 1, 1, 2, 2, 3, 3, 3, 4],
		PlantP: [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
		SunP: [],
	},
	RiddleAutoGrow: __Template_Function_RiddleAutoGrow__
}, __Template_Normal_FlagToEnd__, __Template_FlowerVase__);
