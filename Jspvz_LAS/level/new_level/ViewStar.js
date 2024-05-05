//ViewStar.js
oS.Init({
	TaskPlants: [{i:oStarfruit,l:[2,3]},{i:oStarfruit,l:[3,3]},{i:oStarfruit,l:[4,1]},{i:oStarfruit,l:[4,2]},{i:oStarfruit,l:[4,3]},{i:oStarfruit,l:[4,4]},{i:oStarfruit,l:[4,5]},{i:oStarfruit,l:[5,2]},{i:oStarfruit,l:[5,3]},{i:oStarfruit,l:[5,4]},{i:oStarfruit,l:[6,3]},{i:oStarfruit,l:[6,4]},{i:oStarfruit,l:[7,3]},{i:oStarfruit,l:[7,5]}],
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTorchwood, oTallNut, oSeaShroom, oPlantern, oCactus, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGatlingPea, oGloomShroom, oTwinSunflower, oSpikerock],
	ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oBucketheadZombie],
	AutoSelectCardName: ['oStarfruit'],
	PicArr: ["images/interface/background1.jpg","images/interface/Taco.png"],
	Coord: 1,
	SunNum: 50,
	LF: [0, 1, 1, 1, 1, 1],
	backgroundImage: "images/interface/background1.jpg",
	CanSelectCard: 1,
	DKind: 1,
	LevelName: "观星",
	LvlEName: "ViewStar",
	TaskPlantsMap: [],
	UserDefinedFlagFunc: function(a) {
		if(oP.FlagZombies % 10 == 0 && oP.FlagZombies != 10){
			ShowLargeWave();
		};
		if(oP.FlagZombies == oP.FlagNum - 2){
			oP.FlagZombies = 10;
		};
	},
	StartGameMusic: "UraniwaNi",
	LoadAccess: function(LevelDefFuc) {
		for(i in oS.TaskPlants){
			let AlphaPlants = oS.TaskPlants[i],j = AlphaPlants.i.prototype,x = AlphaPlants.l[0],y = AlphaPlants.l[1];
			oS.TaskPlantsMap[[x,y]] = AlphaPlants.i;
			NewImg("PlantAlpha_"+y+"_"+x+"_"+AlphaPlants.i.prototype.PKind, j.PicArr[j.StaticGif], "visibility:visible;filter:alpha(opacity=40);opacity:0.4;z-index:3;left:" + (GetX(x) - j.width/2) + "px;top:" + (GetY(y) - j.height - 10) + "px;" , EDMove);
		};
		LevelDefFuc();
		for(item in oS.AutoSelectCardName){
			SelectCard(oS.AutoSelectCardName[item]);
		};
	},
	StartGame: function() {//开始游戏
		StopMusic();
		PlayMusic(oS.LoadMusic = oS.StartGameMusic);
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
			BeginCool();
			oSym.addTask(1500,
				function() {
					oP.AddZombiesFlag();
			},[]);

			SetVisible($("imgGQJC"), $("dFlagMeterContent"));
			(function(){
				var num = 0,locations_x,locations_y,tmp,tmpstr;
				for(item in oS.TaskPlants){
					tmp = oS.TaskPlants[item], locations_x = tmp.l[0] , locations_y = tmp.l[1];
					tmpstr = locations_y + "_" + locations_x + "_" + tmp.i.prototype.PKind;
					if(oGd.$[tmpstr]){
						num++;
						$("PlantAlpha_" + tmpstr).style.visibility = "hidden";
					}else{
						$("PlantAlpha_" + tmpstr).style.visibility = "Visible";
					};
				};
				//棋子部分
				let now_schedule = 139 * (1 - num/oS.TaskPlants.length);
				$("imgFlagHead").style.left = now_schedule + "px"; 
				$("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + (now_schedule + 11) + "px)";
				if(num == oS.TaskPlants.length){
					oP.FlagZombies = oP.FlagNum;
					for(item in $Z){
						$Z[item].DisappearDie();
					};
					oP.FlagToEnd();
				}else{
					oSym.addTask(100, arguments.callee, []);
				};
			})();
			AutoProduceSun(25);
			NewEle("DivTeach", "div", 0, {innerHTML: "用对应植物塞满被围出的空间吧！"}, EDMove);
			oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
		})
	}
},
{
	AZ: [[oZombie, 3, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], [oConeheadZombie, 3, 5, [5,8,9,10,13,15,18,20]], [oBucketheadZombie, 1, 10, [10,12,14,16,20]]],
	FlagNum: 22,
	FlagToSumNum: {
		a1: [   3, 5, 9, 10, 13, 15, 19],
		a2: [1, 2, 3, 10, 4,  5,  6, 15]
	},
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
	},
	FlagToEnd: function() {
		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {
			onclick: function() {
				SelectModal(0);
				PlayAudio("winmusic");
			}
		});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll)
	},	
	DefFlagPrgs: function() {
		var f = oP,c = f.FlagZombies,e = f.FlagToSumNum,
		a = 139 - c * f.FlagHeadStep,d = $SSml(c, e.a1, e.a2),b;
		if(f.FlagNum > (c = ++f.FlagZombies)){
			(b = $SEql(c, f.FlagToMonitor)) && oSym.addTask(1690,function(g) { ! g[1] && (g[0](), g[1] = 1)}, [b]);
			oSym.addTask(1990,function(g) {var h = oP;h.ReadyFlag == g++&&(h.ReadyFlag = g, h.DefFlagPrgs())},[c]);
		};
		f.SelectFlagZombie.call(f, d, c);
		f.UserDefinedFlagFunc && f.UserDefinedFlagFunc();
	}
},{
	GroundOnmousemove1 : function(j) {
		j = window.event || j;
		var d = j.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
		b = j.clientY + EBody.scrollTop || EElement.scrollTop,
		k = oS.ChoseCard,
		h = ChosePlantX(d),
		i = ChosePlantY(b),
		f = h[0],
		c = i[0],
		g = i[1],
		a = h[1],
		m = GetAP(d, b, g, a);
		var l = ArCard[k].PName.prototype;
		SetStyle($("MovePlant"), {
			left: d - 0.5 * (l.beAttackedPointL + l.beAttackedPointR) + "px",
			top: b + 20 - l.height + l.GetDY(g, a, m[0]) + "px"
		});
		var map = oS.TaskPlantsMap[[a,g]] || ArCard[k].PName,map = map.prototype;
		if(map.PKind != l.PKind || (map.EName == l.EName && l.CanGrow(m[0], g, a))){
			SetStyle($("MovePlantAlpha"), {
				visibility: "visible",
				left: f + l.GetDX() + "px",
				top: c - l.height + l.GetDY(g, a, m[0]) + "px"
			})
		}else{
			SetHidden($("MovePlantAlpha"));
		};
	},
	GrowPlant : function(l, d, c, e, b) {
		var j = oS.ChoseCard,f = ArCard[j],h = f.PName,k = h.prototype,i = k.coolTime,a,g = oGd.$LF[e];
		var map=oS.TaskPlantsMap[[b,e]] || h;
		if(map.prototype.PKind != k.PKind || (map.prototype.EName == k.EName && k.CanGrow(l, e, b))){
			PlayAudio(g != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water");
			if(!oS.CardKind){
				(new h).Birth(d, c, e, b, l) 
			}else{
				asyncInnerHTML((a = new h).CustomBirth(e, b, 0, "auto"),
				function(n, m) {
					EDPZ.appendChild(n);
					m.Birth()
				},a);
			} 
			innerText(ESSunNum, oS.SunNum -= k.SunNum);
			if(i){
				f.CDReady = 0, DoCoolTimer(j, k.coolTime);
				oSym.addTask(20, SetHidden, [SetStyle(g != 2 ? $("imgGrowSoil") : $("imgGrowSpray"), {
					left: d - 30 + "px",
					top: c - 30 + "px",
					zIndex: 3 * e + 1,
					visibility: "visible"
				})]);
			};
		};
		CancelPlant();
	}
});

