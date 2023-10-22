oS.Init({
	Vase: {},
	oPenVase: {},
	PName: [oCherryBomb, oPeashooter, oSquash, oSnowPea, oHypnoShroom, oRepeater2],
	ZName: [oZombie, oZombie2, oZombie3, oBucketheadZombie, oFootballZombie, oJackinTheBoxZombie, oDancingZombie, oBackupDancer],
	PicArr: ["images/interface/background2.jpg","images/interface/trophy.png","images/interface/PointerDown.gif","images/interface/Stripe.png","images/Card/Plants/SplitPea.png"],
	backgroundImage: "images/interface/background2.jpg",
	DKind: 0,
	ShowScroll: false,
	ProduceSun: false,
	LevelName: "关卡 4-5",
	LvlEName: "35",
	CanSelectCard: 0,
	StartGameMusic: "Mountains",
	SunNum : 0,
	StartGame: function() {
		oP.Monitor();
		for(let i in ArCard){DoCoolTimer(i,0);};
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		StopMusic(),PlayMusic(oS.LoadMusic = oS.StartGameMusic);
		oS.InitLawnMower();
		oSym.addTask(200,function(){if(CekWin()){goto_level_2();}else{oSym.addTask(200,arguments.callee,[]);};},[]);
	},
	VaseArP : {
		GreenNum: 0,
		left: 7,
		right: 9,
		ZombieP: [0, 0, 1, 2, 3],
		PlantP: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
		SunP: [],
	},
	RiddleAutoGrow: function(){
		let P = oS.VaseArP , l = P.left , r = P.right , g = P.GreenNum , zp = P.ZombieP , pp = P.PlantP , sp = P.SunP;
		let Vaseinfo = [],VasePlt = [];
		for(let i in pp){VasePlt.push({size: 0,item: oS.PName[pp[i]]});};
		for(let i in zp){VasePlt.push({size: 1,item: oS.ZName[zp[i]]});};
		for(let i in sp){VasePlt.push({size: 2,item: sp[i]});};
		VasePlt.sort(() => {return Math.random() - 0.5});
		for(let mid = l;mid <= r;mid++){
			for(let R = 1;R <= oS.R;R++){
				Vaseinfo.push({X: mid,Y: R});
			};
		};
		Vaseinfo.sort(() => {return Math.random() - 0.5});
		while(Vaseinfo.length && VasePlt.length){
			let a=Vaseinfo.length-1 , b=VasePlt.length-1 , x=Vaseinfo[a].X , y=Vaseinfo[a].Y , size=VasePlt[b].size , item=VasePlt[b].item , viewsize = 0;
			if(size == 0 && oS.VaseArP.GreenNum != 0){viewsize = 1;oS.VaseArP.GreenNum--;};
			SummonVase(y,x,size,item,viewsize);
			Vaseinfo.length--,VasePlt.length--;
		};
	},
	LoadAccess: function(start_game){
		oS.RiddleAutoGrow();
		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDAll);
		NewImg("dDave", "images/interface/Dave.gif", "z-index:170;left:0;top:81px", EDAll);
		NewEle("DivTeach", "div", "z-index:170", 0, EDAll);
		StopMusic(),PlayMusic(oS.LoadMusic = 'Faster');
		(function(d) {
			var b = arguments.callee, c = $("DivTeach");
			switch (d) {
				case 0:
					DaveTalk("我和我的哥们，弗莱科斯卡斯特·哈维，以前在无聊的时候就打花瓶。(点击继续)",0,b);
					break;
				case 1:
					DaveTalk("那么弗莱科斯卡斯特现在不在镇上，正好你来和我一起吧！(点击继续)",1,b);
					break;
				case 2:
					DaveTalk("按照你的意愿，砸到什么就看运气吧！(点击继续)",2,b);
					break;
				case 3:
					$("dDave").src = "images/interface/Dave2.gif";
					ClearChild($("DivTeach"));
					StopMusic();
					oSym.addTask(50, function(f, d) {
						ClearChild($("dDave"));
						PlayMusic(oS.LoadMusic = "Mountains");
						start_game(0),ClearChild($('DivA'));
						NewEle("DivTeach", "div", "z-index:140", 0, EDAll);
						innerText($("DivTeach"), "点击一只花瓶，看看里面有什么！");
						f(d + 1);
					}, [arguments.callee, d]);
					break;
				case 4:
					let VaseNum = 0;
					for(let item in $P){VaseNum += ($P[item].EName == "oFlowerVase");};
					if (VaseNum != 15 && d == 4){
						d++, innerText($("DivTeach"), "摧毁全部僵尸和花瓶，结束这一关卡！");
						oSym.addTask(300, function(){ClearChild($("DivTeach"));}, []);
					};
					oSym.addTask(10, arguments.callee, [d]);
					break;
				default:
					break;
			}
		}
		)(0);
	}
}, {
	FlagToEnd: function() {
		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDAll);
        NewImg("imgSF", "images/Card/Plants/SplitPea.png", "left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDAll, {
            onclick: function() {
                GetNewCard(this, oSplitPea, 0);
            }
        });
        NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDAll);
	}
}, __Template_ReSet_Object__(__Template_FlowerVase__, {
	DaveTalk: function(text,talknum,b,Audio,waittime){
		let c=$("DivTeach"); c.onclick = null;
		PlayAudio((Audio || "crazydavelong" + Math.floor(1 + Math.random() * 3)));
		$("dDave").src = "images/interface/Dave3.gif";
		oSym.addTask((waittime?waittime:200), function() {
			$("dDave").src = "images/interface/Dave.gif";
			c.onclick = function() {
				oSym.addTask(10, b, [talknum+1])
			}
		},[]);
		innerText(c, text);
	},
	kill_all_ground: function(){
		CancelShovel(),CancelPlant();
		SetHidden($("dCardList"));
		SetHidden($("dPZ"));
		for(let i = 1; i <= oS.C; i++){
			for(let j = 1; j <= oS.R; j++){
				for(let k = 0; k <= 3; k++){
					if(oGd.$[j + '_' + i + '_' + k]){
						oGd.$[j + '_' + i + '_' + k].Die();
					}
				}
			}
		};
		for(let i in $Z){$Z[i].DisappearDie();};
		for(let i in $P){SetVisible($($P[i].id));};
		for(let i in ArCard){if(isNaN(i)){delete ArCard[i],ClearChild($(i));}};
	},
	goto_level_2: function(){
		kill_all_ground();
		PlayAudio("hugewave");
		ClearChild($("DivA"), $("dDave"), $("DivTeach"));
		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=1);opacity:1;z-index:160", 0, EDAll);
		NewImg("dDave", "images/interface/Dave.gif", "z-index:170;left:0;top:81px", EDAll);
		NewEle("DivTeach", "div", "z-index:170", 0, EDAll);

		for(let i = 1; i >= 0; i -= 0.1){oSym.addTask((1 - i) * 50, function(){$("DivA").style.opacity = i;$("DivA").style.filter = "alpha(opacity=" + i + ")";}, []);};
		oSym.addTask(50, function(){$("DivA").style.opacity = "0";$("DivA").style.filter = "alpha(opacity=0)";}, []);

		oS.VaseArP = {
			GreenNum: 2,
			left: 6,
			right: 9,
			ZombieP: [0, 0, 1, 1, 2, 3, 4],
			PlantP: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3],
			SunP: [],
		};
		(function(d) {
			var b = arguments.callee, c = $("DivTeach");
			switch (d) {
				case 0:
					DaveTalk("哥们，你把这些花瓶全都打破了，干得漂亮！(点击继续)",0,b);
					break;
				case 1:
					DaveTalk("就像我打碎所有垃圾桶时那样漂亮！(点击继续)",1,b);
					break;
				case 2:
					SetVisible($("dPZ"));
					oS.RiddleAutoGrow(),PlayAudio("plant1");
					DaveTalk("来，我给你更多的花瓶。(点击继续)",2,b,'crazydaveshort1',100);
					break;
				case 3:
					DaveTalk("别砸太快了。(点击继续)",3,b,'crazydaveshort2',100);
					break;
				case 4:
					DaveTalk("你不想冒出一大堆僵尸，让你手忙脚乱吧，哈哈。(点击继续)",4,b);
					break;
				default:
					$("dDave").src = "images/interface/Dave2.gif";
					ClearChild($("DivTeach"));
					oSym.addTask(50, function() {
						ClearChild($("dDave"));
						ClearChild($('DivA'));
						SetVisible($("dCardList"));
					}, []);
					oSym.addTask(200,function(){if(CekWin()){goto_level_3();}else{oSym.addTask(200,arguments.callee,[]);};},[]);
					break;
			}
		}
		)(0);
	},
	goto_level_3: function(){
		kill_all_ground();
		PlayAudio("hugewave");
		ClearChild($("DivA"), $("dDave"), $("DivTeach"));
		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=1);opacity:1;z-index:160", 0, EDAll);
		NewImg("dDave", "images/interface/Dave.gif", "z-index:170;left:0;top:81px", EDAll);
		NewEle("DivTeach", "div", "z-index:170", 0, EDAll);

		for(let i = 1; i >= 0; i -= 0.1){oSym.addTask((1 - i) * 50, function(){$("DivA").style.opacity = i;$("DivA").style.filter = "alpha(opacity=" + i + ")";}, []);};
		oSym.addTask(50, function(){$("DivA").style.opacity = "0";$("DivA").style.filter = "alpha(opacity=0)";}, []);

		oS.VaseArP = {
			GreenNum: 3,
			left: 5,
			right: 9,
			ZombieP: [0, 0, 1, 1, 2, 2, 3, 3, 5, 6],
			PlantP: [1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
			SunP: [],
		};
		(function(d) {
			var b = arguments.callee, c = $("DivTeach");
			switch (d) {
				case 0:
					DaveTalk("好极了！(点击继续)",0,b,'crazydaveshort1',100);
					break;
				case 1:
					SetVisible($("dPZ"));
					oS.RiddleAutoGrow(),PlayAudio("plant1");
					DaveTalk("这应该是最后一批了。(点击继续)",1,b,'crazydaveshort2',100);
					break;
				case 2:
					DaveTalk("打败他们，之后你的工作就完成了！(点击继续)",2,b);
					break;
				default:
					$("dDave").src = "images/interface/Dave2.gif";
					ClearChild($("DivTeach"));
					oSym.addTask(50, function() {
						ClearChild($("dDave"));
						ClearChild($('DivA'));
						SetVisible($("dCardList"));
					}, []);
					oSym.addTask(200,function(){if(CekWin()){oP.FlagToEnd();}else{oSym.addTask(200,arguments.callee,[]);};},[]);
					break;
			}
		}
		)(0);
	}

}));
