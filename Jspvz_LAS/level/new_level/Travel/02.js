//需要修复：临界值僵尸问题
oS.Init({
	PName: [oSunFlower, oSunFlower, oSquash, oScaredyShroom, oGatlingPea_Pro, oTorchwood_Pro, oWallNut, oTallNut, oPuffShroom],
	ZName: [oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oBucketheadZombie ,oFootballZombie, oZomboni, oJackinTheBoxZombie, oDancingZombie, oBackupDancer],
	PicArr: ["new_skin/Images/InterFace/background_new_1.png"],
	backgroundImage: "new_skin/Images/InterFace/background_new_1.png",
	LevelName: "EX-2 护花者",
	LvlEName: "EX_Save_Flower_2",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 0,
	MusicMode: 1,
	SunNum: 75,
	DKind: 0,
	LevelProduce: "不要让僵尸踩到花坛！",
	LargeWaveFlag: {
		10: $("imgFlag3"),
		20: $("imgFlag2"),
		30: $("imgFlag1")
	},
	UserDefinedFlagFunc: function(){
		if(oP.FlagZombies == 1){
			let R = Math.floor(Math.random() * oS.R + 1);
			for(let i = 1; i <= 16; i++){
				SummonZombie(oFootballZombie, R, 11), ++ oP.NumZombies;
			};
		};
	},
	LoadAccess: function(LevelDefFuc){
		for(let i = 1; i <= oS.R; i++) Summon_Flower(i, 4), CustomSpecial(oTorchwood_Pro, i, 6);
		LevelDefFuc(), Start_Ctk_Flower();
	},
	StartGame: function(){
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
			for(let i in ArCard){DoCoolTimer(i,0);};
			AutoProduceSun(25);
			oSym.addTask(1500, function() {
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"))
			},[]);

			(function() {oZ.traversalOf();oSym.addTask(10, arguments.callee, []);})();
			NewEle("DivTeach", "div", "pointer-events:none;", {innerHTML: "小心，不要让僵尸踩到花坛！"}, EDMove);
			oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
		});
	}
}, {
	AZ: [[oZombie, 1, 4], [oZombie2, 1, 4], [oZombie3, 1, 4], [oPoleVaultingZombie, 1, 5], [oBucketheadZombie, 2, 1], [oFootballZombie, 1, 1, [20,30]], [oZomboni, 1, 15, [30,30,30]], [oJackinTheBoxZombie, 1, 6], [oDancingZombie, 1, 19]],
	FlagNum: 30,
	FlagToSumNum: {
		a1: [   1, 3, 5, 7,  9, 10, 13, 15, 19, 20, 23, 26, 29],
		a2: [0, 2, 4, 5, 6, 10,  7,  9, 11, 20, 13, 14, 17, 30]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowLargeWave, 0],
		29: [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDMove);
		NewImg("imgSF", "images/Card/Plants/GatlingPea.png", "left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDMove, {onclick: function() {GetNewCard(this, oGatlingPea_Pro, 0);}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDMove);
		Win_Travel(2, 3);

//		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDMove, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
//		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDMove);
	}
},{
	$Flower: {},
	Summon_Flower: ___Template__Summon_Flower___,
	__Ctk_Rc_Zombie__: ___Template__Ctk_Rc_Zombie___,
	Start_Ctk_Flower: ___Template__Start_Ctk_Flower___,
	SelectCard: function(c) {
		PlayAudio("tap");
		let h = $("Card" + c).childNodes, f = h[0], b = ArPCard[c], i = b.PName.prototype, g, a, j, e = $("btnOK");
		ArPCard.SelNum |= 0, e.disabled = "", e.style.color = "#FC6"
		++ArPCard.SelNum, b.Select = 1;
		oS.StaticCard && (g = NewEle("dCard" + c + "_$_" + Math.random(), "div", "", {onclick: function() {SelectCard(c);}},$("dCardList")), NewImg(0, f.src, "width:100px;height:120px", g), innerText(NewEle("sSunNum" + c, "span", 0, 0, g), i.SunNum), f.style.top = "-42px");
	},
	SummonZombie: function(id , e , b) {  //僵尸obj，行，列
		e = Math.min(Math.max(e , 1) , oS.R),b = Math.min(Math.max(b , -2) , 11);
		asyncInnerHTML((a = new id).CustomBirth(e, b, 1, "auto"),
		function(n, m) {
			EDPZ.appendChild(n);
			m.Birth();
		},a);
		return a;//返回僵尸数据
	}
});
