//VaseKillerTwo4
oS.Init({
	Vase: {},
	oPenVase: {},
	PName: [oCherryBomb, oRepeater, oGatlingPea, oGarlic, oTallNut, oTorchwood, oBlover, oLilyPad, oCoffeeBean, oDoomShroom],
	ZName: [oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oBucketheadZombie, oDuckyTubeZombie1, oDuckyTubeZombie3, oBalloonZombie, oJackinTheBoxZombie],
	PicArr: ["images/interface/background3.jpg","images/interface/trophy.png","images/interface/PointerDown.gif","images/interface/Stripe.png"],
	backgroundImage: "images/interface/background3.jpg",
	DKind: 1,
	ShowScroll: false,
	ProduceSun: false,
	LevelName: "不可犹豫",
	LvlEName: "VaseKillerTwo4",
	Coord: 2,
	LF: [0, 1, 1, 2, 2, 1, 1],
	CanSelectCard: 0,
	StartGameMusic: "Mountains",
	SunNum : 150,
	StartGame: function() {
		oP.Monitor();
		for(let i in ArCard){DoCoolTimer(i,0);};
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		StopMusic(),PlayMusic(oS.LoadMusic = oS.StartGameMusic);
		oS.RiddleAutoGrow();
		oSym.addTask(250,function(){if(CekWin()){oP.FlagToEnd();}else{oSym.addTask(250,arguments.callee,[]);};},[]);
	},
	VaseArP : {
		GreenNum: 5,
		ZombieNum: 5,
		left: 4,
		right: 9,
		ZombieP: [0, 0, 1, 1, 2, 2, 3, 4, 4, 4, 4, 7],
		WaterZombieP: [5, 5, 6, 6, 6, 6, 7, 8],
		PlantP: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6],
		SunP: [],
	},
	RiddleAutoGrow: __Template_Function_RiddleAutoGrow_Water__,
	ZombiePot: [],
	DefRiddleAutoGrow: function(){
		__Template_Function_DefRiddleAutoGrow_Water_SetZombie__();
		for(let i = 1; i <= oS.C; i++){
			CustomSpecial(oLilyPad, 3, i), CustomSpecial(oLilyPad, 4, i);
		}
	},
	DefSummon: function(y, x, size, item, viewsize, b){
		if(size == 1) oS.ZombiePot.push([y, x, size, item, viewsize]);

		(b = oGd.$[y + "_" + x + "_" + 1]) && (b.CardTime = (viewsize == 1 ? 500 : 750));
	},
	AutoSelectCard: function(){
		SelectCard("oCherryBomb"), SelectCard("oLilyPad"), SelectCard("oCoffeeBean"), SelectCard("oTallNut");
	}
}, __Template_Normal_FlagToEnd__, __Template_FlowerVase__);
