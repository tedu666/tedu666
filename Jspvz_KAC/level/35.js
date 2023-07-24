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
},{
	GrowPlant : function(l, d, c, e, b) {
		var j=oS.ChoseCard,f=ArCard[j],h=f.PName,k=h.prototype,i=k.coolTime,a,g=oGd.$LF[e],ChooseCardIsNan=isNaN(j);if(k.CanGrow(l,e,b)){PlayAudio(g!=2?"plant"+Math.floor(1+Math.random()*2):"plant_water");if(!oS.CardKind){var defplt=new h;defplt.Birth(d,c,e,b,l);if(defplt.EName=="oPlantern"){CekoPlantern(e,b);defplt.PrivateDie=function(c){var a=c.R,b=c.C;delete oGd.$Plantern[a+"_"+b];oS.HaveFog&&oGd.GatherFog(a,b,2,3,1);CekoPlantern(a,b);}};}else{asyncInnerHTML((a=new h).CustomBirth(e,b,0,"auto"),function(n,m){EDPZ.appendChild(n);m.Birth();},a);};!ChooseCardIsNan&&innerText(ESSunNum,oS.SunNum-=k.SunNum);!ChooseCardIsNan&&i&&(f.CDReady=0,DoCoolTimer(j,k.coolTime));oSym.addTask(20,SetHidden,[SetStyle(g!=2?$("imgGrowSoil"):$("imgGrowSpray"),{left:d-30+"px",top:c-30+"px",zIndex:3*e+1,visibility:"visible"})]);ChooseCardIsNan&&f&&(delete ArCard[j],ClearChild($(j)));};CancelPlant();
	},
	MoveDropCard : function(c, b, DisappearTime, C) {//选的卡id、落点y
		var a=ArCard[c];a&&(C=$(c))&&((!(oS.Chose==1&&oS.ChoseCard==c)&&a.top<b-52)?(C.style.top=(a.top+=2)+"px",oSym.addTask(5,MoveDropCard,[c,b,DisappearTime])):(CardStartTiming(c,(DisappearTime||1500))));	
	},
	CardStartTiming : function(id, AllTime) {
		if(!isNaN(id)&&(NCard=ArCard[id])){return;};isNaN(AllTime)&&(AllTime=1500),AllTime-=500;oSym.addTask(Math.max(0,AllTime),function(Time,id){Time>=0&&(Time=0),Time+=500;oSym.addTask(10,function(Time,id){if((ischoose=(oS.Chose==1&&oS.ChoseCard==id))||Time>0){oSym.addTask(10,arguments.callee,[Time-10,id]);}else{delete ArCard[id],ClearChild($(id));return;};!ischoose&&ArCard[id]&&$(id).style&&($(id).style.opacity=(0.5+Math.floor((Time-1)/50)%2*0.5));},[Time,id]);},[AllTime,id]);	
	},
	CancelPlant : function(c) {
		ClearChild($("MovePlant"),$("MovePlantAlpha"));oS.Chose=0;MonitorCard();isNaN(oS.ChoseCard)&&(c=$(oS.ChoseCard))&&c.style&&(c.style.opacity=1);GroundOnmousemove=function(){};
	},
	AppearCard : function(h, f, CardID, Fallsize, freetime, c) {//x,y,id,size
		freetime=freetime||1500;var b,d,g="dCard"+Math.random(),c="opacity:1;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto);left:"+h+"px;top:-1000";if(Fallsize){d=0,oSym.addTask(1,MoveDropCard,[g,f,freetime]);}else{d=f-15-20,c+=";top:"+d+"px";oSym.addTask(1,function(q,p,n,j,l,k,m,i){if(ArCard[q]&&$(q)){SetStyle($(q),{left:(p=p+j*k)+"px",top:(n=n+Number(l[0]))+"px"});l.shift();--m;m>0&&((l.length==0)&&(l=[8,16,24,32]),oSym.addTask(i,arguments.callee,[q,p,n,j,l,k,m,++i]))}},[g,h,d,Math.floor(Math.random()*4),[-32,-24,-16,-8],[-1,1][Math.floor(Math.random()*2)],8,2]);oSym.addTask(1,CardStartTiming,[g,freetime]);};ArCard[g]={DID:g,PName:CardID,PixelTop:600,CDReady:1,SunReady:1,top:d};NewImg(g,CardID.prototype.PicArr[CardID.prototype.CardGif],c,$("dCardList"),{onclick:function(g){ClearChild($("MovePlant"),$("MovePlantAlpha"));CancelPlant();this.style&&(this.style.opacity=0.5);ChosePlant(g,this.id);}});
	},
	SummonVase : function(y,x,size,item,vasesize){
		let p=new oFlowerVase;p.Pot_Size=(vasesize?vasesize:0);p.Birth(GetX(x),GetY(y),y,x,[]);oS.Vase[y+"_"+x]={size:size,item:item};
	},
	CekWin : function(){
		return (function(){for(let item in $Z){if($Z[item].PZ != 0){return false}};return true;})() && (function(){for(let item in $P){if($P[item].EName == "oFlowerVase"){return false;}};return true;})();
	},
	CekoPlantern : function(a,b) {
		let p=oGd.$Plantern,q=a+"_"+b,o=$P[p[q]];if(o){for(let s=a-1;s<=a+1;s++){for(let r=b-1;r<=b+1;r++){i=s+"_"+r;if(!oS.oPenVase[i]&&(info=oS.Vase[i])&&(obj=oGd.$[i+"_1"])&&obj.EName=="oFlowerVase"){oS.oPenVase[i]=true;obj.ChangeStyle(obj.Pot_Size,(obj.is_show=1));SetVaseXray(s,r,1);};};};}else{for(let s=a-1;s<=a+1;s++){for(let r=b-1;r<=b+1;r++){i=s+"_"+r;if(oS.oPenVase[i]&&(info=oS.Vase[i])&&(obj=oGd.$[i+"_1"])&&obj.EName=="oFlowerVase"){oS.oPenVase[i]=false;obj.ChangeStyle(obj.Pot_Size,(obj.is_show=0));SetVaseXray(s,r,0);};};};for(let item in p){g=item.split('_'),y=g[0]*1,x=g[1]*1;for(let s=y-1;s<=y+1;s++){for(let r=x-1;r<=x+1;r++){i=s+"_"+r;if(!oS.oPenVase[i]&&(info=oS.Vase[i])&&(obj=oGd.$[i+"_1"])&&obj.EName=="oFlowerVase"){oS.oPenVase[i]=true;obj.ChangeStyle(obj.Pot_Size,(obj.is_show=1));SetVaseXray(s,r,1);};};};};};
	},
	SetVaseXray: function(y,x,is_show) {
		if(!((info=oS.Vase[y+"_"+x])&&(obj=oGd.$[y+"_"+x+"_1"])&&obj.EName=="oFlowerVase")){return;};if(is_show){if(info.size==0){NewImg(0,info.item.prototype.PicArr[info.item.prototype.CardGif],"clip:rect(auto,auto,34px,auto);width: 55px; height: 66px; top: 25px; left: 13.5px",$(obj.id));}else if(info.size==1){NewImg(0,info.item.prototype.PicArr[info.item.prototype.StandGif],"top:15px;left:0px;height:50px;position:absolute;",$(obj.id));}else{NewImg(0,"images/interface/Sun.gif","left:12.5px;top:12.5px;width:60px;height:60px;position:absolute",$(obj.id));};}else{ClearChild($(obj.id).childNodes[2]);};	
	},
	AutoSelectCard: function() {
		SelectCard(oCherryBomb.prototype.EName);
	},
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

});
