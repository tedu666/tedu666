(function(){
	let T = [];
	T.push({i:oLilyPad,l:[1,3]},{i:oLilyPad,l:[1,4]});
	for(let i=1;i<=6;i++){
		T.push({i:oCactus,l:[1,i]});
		T.push({i:oPumpkinHead,l:[1,i]});
	};
	for(let i=2;i<=4;i++){
		for(let j=1;j<=2;j++){
			T.push({i:oGatlingPea,l:[i,j]});
			T.push({i:oGatlingPea,l:[i,4+j]});
		};
	};
	T.push({i:oLilyPad,l:[2,3]},{i:oLilyPad,l:[2,4]},{i:oTwinSunflower,l:[2,3]},{i:oTwinSunflower,l:[2,4]});
	T.push({i:oGloomShroom,l:[7,1]},{i:oPumpkinHead,l:[7,1]});
	T.push({i:oGloomShroom,l:[7,6]},{i:oPumpkinHead,l:[7,6]});
	T.push({i:oGloomShroom,l:[6,1]},{i:oPumpkinHead,l:[6,1]});
	T.push({i:oGloomShroom,l:[6,6]},{i:oPumpkinHead,l:[6,6]});
	for(let i=6;i<=9;i++){
		T.push({i:oLilyPad,l:[i,3]},{i:oGloomShroom,l:[i,3]},{i:oPumpkinHead,l:[i,3]});
		T.push({i:oLilyPad,l:[i,4]},{i:oGloomShroom,l:[i,4]},{i:oPumpkinHead,l:[i,4]});
	};

	oS.Init({
		TaskPlants: T,
		PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTorchwood, oTallNut, oSeaShroom, oPlantern, oCactus, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGatlingPea, oGloomShroom, oTwinSunflower, oSpikerock],
		ZName: [oJackinTheBoxZombie,oImp,oZombie,oZombie2,oZombie3,oConeheadZombie,oBucketheadZombie,oDuckyTubeZombie1,oDuckyTubeZombie2,oDuckyTubeZombie3,oPoleVaultingZombie,oNewspaperZombie,oScreenDoorZombie,oFootballZombie,oBalloonZombie,oDolphinRiderZombie,oSnorkelZombie,oZomboni,oSmallZombie,oSmallDuckyTubeZombie1,oSmallConeheadZombie,oSmallFootballZombie,oSmallSnorkelZombie],
		AutoSelectCardName: ['oLilyPad','oCactus','oPumpkinHead','oRepeater','oGatlingPea','oSunFlower','oTwinSunflower','oFumeShroom','oGloomShroom','oCoffeeBean'],
		PicArr: ["images/interface/Taco.png","images/interface/background3.jpg"],
		Coord: 2,
		SunNum: 1000,
		LF: [0, 1, 1, 2, 2, 1, 1],
		backgroundImage: "images/interface/background3.jpg",
		CanSelectCard: 1,
		DKind: 1,
		LevelName: "不靠谱的阵形",
		LvlEName: "ViewPlants",
		TaskPlantsMap: [],
		UserDefinedFlagFunc: function(a) {
			if(oP.FlagZombies % 10 == 0 && oP.FlagZombies != 10){
				ShowLargeWave();
			};
			if(oP.FlagZombies == oP.FlagNum - 2){
				oP.FlagZombies = 40;
			};
		},
		StartGameMusic: "Kitanai Sekai",
		LoadAccess: function(LevelDefFuc) {
			for(i in oS.TaskPlants){
				let AlphaPlants = oS.TaskPlants[i],j = AlphaPlants.i.prototype,x = AlphaPlants.l[0],y = AlphaPlants.l[1];
				oS.TaskPlantsMap[[x,y,AlphaPlants.i.prototype.PKind]] = AlphaPlants.i;
				NewImg("PlantAlpha_"+y+"_"+x+"_"+AlphaPlants.i.prototype.PKind, j.PicArr[j.StaticGif], "visibility:visible;filter:alpha(opacity=40);opacity:0.4;z-index:19;left:" + (GetX(x) - j.width/2) + "px;top:" + (GetY(y) - j.height - 10) + "px;" , EDAll);
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
				oSym.addTask(1500,function() {oP.AddZombiesFlag();},[]);

				SetVisible($("imgGQJC"), $("dFlagMeterContent"));
				(function(){
					var num = 0,locations_x,locations_y,tmp,tmpstr;
					for(item in oS.TaskPlants){
						tmp = oS.TaskPlants[item], locations_x = tmp.l[0] , locations_y = tmp.l[1];
						tmpstr = locations_y + "_" + locations_x + "_" + tmp.i.prototype.PKind;
						if(oGd.$[tmpstr] && oGd.$[tmpstr].EName == tmp.i.prototype.EName){
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
						for(item in $Z){
							$Z[item].DisappearDie();
						};
						ShowFinalWave();
						oP.FlagZombies = oP.FlagNum - 1;
						for(let item=0;item<15;item++){
							oP.SetTimeoutZombie(oS.ZName,150);
							oP.NumZombies += oS.ZName.length;
						}	
					}else{
						oSym.addTask(150, arguments.callee, []);
					};
				})();
				AutoProduceSun(50);
				NewEle("DivTeach", "div", 0, {innerHTML: "用对应植物塞满被围出的空间吧！（紫卡植物可先种植它需要的植物）"}, EDAll);
				oSym.addTask(500, function() {ClearChild($("DivTeach"));}, []);
				MonitorCard();
			})
		}
	},
	{
		AZ: [[oImp, 1, 1, [1,2,3,4,5,10,15,40,50]], [oZombie, 3, 1], [oZombie2, 1, 1], [oZombie3, 1, 1], [oConeheadZombie, 3, 5, [1,5,8,9,10,13,15,18,20]], [oBucketheadZombie, 1, 10, [10,12,14,16,20]], [oDuckyTubeZombie1, 2, 3, [3,10,40]], [oDuckyTubeZombie2, 2, 6, [6,10,40]], [oDuckyTubeZombie3, 2, 10, [10,11,40]], [oPoleVaultingZombie, 1, 11], [oNewspaperZombie, 1, 15], [oScreenDoorZombie, 1, 18], [oFootballZombie, 2, 21, [21,23,25,50]], [oBalloonZombie, 1, 29], [oDolphinRiderZombie, 3, 34,[34,35,36,37,39,41,42,43,44,45,46,47,48,49,50]], [oSnorkelZombie, 3, 34,[34,35,36,37,39,41,42,43,44,45,46,47,48,49,50]], [oZomboni, 1, 44], [oSmallZombie,2,49],[oSmallDuckyTubeZombie1,2,49],[oSmallConeheadZombie,2,49],[oSmallFootballZombie,2,49],[oSmallSnorkelZombie,2,49]],
		FlagNum: 52,
		FlagToSumNum: {
			a1: [3, 5, 9, 10, 13, 15, 19, 20, 21, 23, 25, 28, 30, 31, 35, 38, 39, 40, 50,  52],
			a2: [1, 2, 3, 10,  4,  5,  6, 15,  7,  8, 15, 10, 20, 13, 14, 20, 27, 35, 40, 100]
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
			if(f.FlagNum > (c = ++f.FlagZombies)) {
				(b = $SEql(c, f.FlagToMonitor)) && oSym.addTask(1690,function(g) { ! g[1] && (g[0](), g[1] = 1)},[b]);
				oSym.addTask(1990, function(g) {
					var h = oP;
					h.ReadyFlag == g++&&(h.ReadyFlag = g, h.DefFlagPrgs())
				},[c])
			};
			f.SelectFlagZombie.call(f, d, c);
			f.UserDefinedFlagFunc && f.UserDefinedFlagFunc()
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
			var map=oS.TaskPlantsMap[[a,g,l.PKind]] || ArCard[k].PName,map = map.prototype,PurpleCard = false;
			if(map.EName == "oGatlingPea" && l.EName == "oRepeater" && l.CanGrow(m[0], g, a)){
				PurpleCard = true;
			}
			if(map.EName == "oGloomShroom" && l.EName == "oFumeShroom" && l.CanGrow(m[0], g, a)){
				PurpleCard = true;
			}
			if(map.EName == "oSpikerock" && l.EName == "oSpikeweed" && l.CanGrow(m[0], g, a)){
				PurpleCard = true;
			}
			if(map.EName == "oTwinSunflower" && l.EName == "oSunFlower" && l.CanGrow(m[0], g, a)){
				PurpleCard = true;
			}
			if(PurpleCard || map.PKind != l.PKind || (map.EName == l.EName && l.CanGrow(m[0], g, a))){
				SetStyle($("MovePlantAlpha"), {
					visibility: "visible",
					left: f + l.GetDX() + "px",
					top: c - l.height + l.GetDY(g, a, m[0]) + "px"
				})
			}else{
				SetHidden($("MovePlantAlpha"));
			};
		},
		ChosePlant : function(h, d) {
			PlayAudio("seedlift");
			var g = ArCard[oS.ChoseCard = d];
			if (! (g.CDReady && g.SunReady)) {
				return
			}
			h = window.event || h;
			var b = h.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
			a = h.clientY + EBody.scrollTop || EElement.scrollTop,
			j = g.PName.prototype,
			e = ArCard.length,
			f, c = j.PicArr;
			oS.Chose = 1; ! oS.CardKind ? EditImg(NewImg("MovePlant", c[j.StaticGif], "left:" + b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR) + "px;top:" + a + 20 - j.height + "px;z-index:254", EDAll).cloneNode(false), "MovePlantAlpha", "", {
				visibility: "hidden",
				filter: "alpha(opacity=40)",
				opacity: 0.4,
				zIndex: 30
			},
			EDAll) : (NewImg("MovePlant", j.PicArr[j.StandGif], "left:" + (b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR)) + "px;top:" + (a + 20 - j.height) + "px;z-index:254", EDAll), NewImg("MovePlantAlpha", j.PicArr[j.StandGif], "visibility:hidden;filter:alpha(opacity=40);opacity:0.4;z-index:30", EDAll));
			while (e--) {
				$(ArCard[e].DID).childNodes[0].style.top = "-55px"
			}
			SetHidden($("dTitle"));
			GroundOnmousemove = GroundOnmousemove1;
		},
		MonitorCard : function(d) {
			var b = ArCard.length,
			c, a = Number(ESSunNum.innerHTML);
			a != oS.SunNum && (oS.SunNum = Math.min(a, oS.SunNum));
			if (oS.Chose < 1) {
				while (b--) { (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? (d.SunReady && (d.SunReady = 0), $(d.DID).childNodes[0].style.top = "-55px") : (!d.SunReady && (d.SunReady = 1), d.CDReady && ($(d.DID).childNodes[0].style.top = 0))
				}
			} else {
				while (b--) { (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? d.SunReady && (d.SunReady = 0) : !d.SunReady && (d.SunReady = 1)
				}
			};
			ViewPlantTitle(oS.MCID);
		},
		GrowPlant : function(l, d, c, e, b) {
			var j = oS.ChoseCard,f = ArCard[j],h = f.PName,k = h.prototype,i = k.coolTime,a,g = oGd.$LF[e];
			var map=oS.TaskPlantsMap[[b,e,h.prototype.PKind]] || h,PurpleCard = false;
			if(map.prototype.EName == "oGatlingPea" && k.EName == "oRepeater" && k.CanGrow(l, e, b)){
				PurpleCard = true;
			};
			if(map.prototype.EName == "oGloomShroom" && k.EName == "oFumeShroom" && k.CanGrow(l, e, b)){
				PurpleCard = true;
			};
			if(map.prototype.EName == "oSpikerock" && k.EName == "oSpikeweed" && k.CanGrow(l, e, b)){
				PurpleCard = true;
			};
			if(map.prototype.EName == "oTwinSunflower" && k.EName == "oSunFlower" && k.CanGrow(l, e, b)){
				PurpleCard = true;
			};
			if(PurpleCard || map.prototype.PKind != k.PKind || (map.prototype.EName == k.EName && k.CanGrow(l, e, b))){
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
		},
		SelectCard : function(c) {
			PlayAudio("tap");
			var h = $("Card" + c).childNodes,f = h[0],b = ArPCard[c],i = b.PName.prototype,g,a,j,e = $("btnOK");
			if (!b.Select) {
				if (! (ArPCard.SelNum |= 0)) {
					e.disabled = "";
					e.style.color = "#FC6"
				} else {
					if (ArPCard.SelNum > 10) {
						return
					}
				}++ArPCard.SelNum;
				b.Select = 1;
				oS.StaticCard && (g = NewEle("dCard" + c, "div", "height: 54px", {
					onclick: function() {
						SelectCard(c)
					}
				},
				$("dCardList")), NewImg(0, f.src, "width:100px;height:110px", g), innerText(NewEle("sSunNum" + c, "span", "line-height: 10px", 0, g), i.SunNum), f.style.top = "-42px")
			} else {
				b.Select = 0; ! --ArPCard.SelNum && (e.disabled = "disabled", e.style.color = "#888"); (g = $("dCard" + c)).onclick = null;
				ClearChild(g.firstChild, g.childNodes[1], g.lastChild, g);
				f.style.top = 0
			}
		}
	});
})();
