oS.Init({
	Vase: {},
	oPenVase: {},
	PName: [oCherryBomb, oRepeater2, oTallNut, oTorchwood, oSquash, oThreepeater],
	ZName: [oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oFootballZombie, oJackinTheBoxZombie],
	PicArr: ["images/interface/background2.jpg","images/interface/trophy.png","images/interface/PointerDown.gif","images/interface/Stripe.png"],
	backgroundImage: "images/interface/background2.jpg",
	DKind: 0,
	ShowScroll: false,
	ProduceSun: false,
	LevelName: "战略游戏",
	LvlEName: "VaseKillerTwo5",
	CanSelectCard: 0,
	StartGameMusic: "Mountains",
	SunNum : 0,
	StartGame: function() {
		oP.Monitor();
		for(let i in ArCard){DoCoolTimer(i,0);};
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		StopMusic(),PlayMusic(oS.LoadMusic = oS.StartGameMusic);
		oS.RiddleAutoGrow();
		oSym.addTask(100,function(){if(CekWin()){oP.FlagToEnd();}else{oSym.addTask(100,arguments.callee,[]);};},[]);
	},
	VaseArP : {
		GreenNum: 2,
		left: 3,
		right: 9,
		ZombieP: [0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 5],
		PlantP: [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5],
		SunP: [],
	},
	RiddleAutoGrow: function(){
		let P = oS.VaseArP , l = P.left , r = P.right , g = P.GreenNum , zp = P.ZombieP , pp = P.PlantP , sp = P.SunP;
		let Vaseinfo = [],VasePlt = [];
		for(let i in pp){VasePlt.push({size: 0,item: oS.PName[pp[i]]});};
		for(let i in zp){VasePlt.push({size: 0,item: oS.ZName[zp[i]]});};
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
			let vs = SummonVase(y,x,size,item,viewsize);
			vs.CardTime = 1500 + (item.prototype.CardKind * Infinity);
			Vaseinfo.length--,VasePlt.length--;
		};
	}
}, __Template_Normal_FlagToEnd__, __Template_ReSet_Object__(__Template_FlowerVase__, {
	AppearCard : function(h, f, CardID, Fallsize, freetime) {//x,y,id,size
		freetime = freetime || 1500;
		var b, d, g = "dCard" + Math.random(), c = "opacity:1;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto);left:" + h + "px;top:-1000";
		if(Fallsize){
			d = 0, oSym.addTask(1, MoveDropCard, [g, f, freetime]);
		}else{
			d=f-15-20,c+=";top:"+d+"px";oSym.addTask(1,function(q,p,n,j,l,k,m,i){if(ArCard[q]&&$(q)){SetStyle($(q),{left:(p=p+j*k)+"px",top:(n=n+Number(l[0]))+"px"});l.shift();--m;m>0&&((l.length==0)&&(l=[8,16,24,32]),oSym.addTask(i,arguments.callee,[q,p,n,j,l,k,m,++i]))}},[g,h,d,Math.floor(Math.random()*4),[-32,-24,-16,-8],[-1,1][Math.floor(Math.random()*2)],8,2]);
			oSym.addTask(1, CardStartTiming, [g,freetime]);
		};
		CardIdList[g] = true, ArCard[g] = {DID: g,PName: CardID,PixelTop: 600,CDReady: 1,SunReady: 1,top:d};
		NewImg(g, CardID.prototype.PicArr[CardID.prototype.CardGif], c, $("dCardList"), {
			onclick: function(g) {
				ClearChild($("MovePlant"), $("MovePlantAlpha"));
				CancelPlant();
				this.style && (this.style.opacity = 0.5);
				ChosePlant(g, this.id);
			}
		});
	},
	CardIdList: {},
	CekWin : function(){
		return (function(){for(let item in $Z){if($Z[item].PZ != 0){return false}};return true;})() && (function(){for(item in $P){if($P[item].EName == "oFlowerVase"){return false;}};return true;})() && (function(){let bool = true; for(let i in CardIdList) if(!ArCard[i]){delete CardIdList[i];}else{bool = false};return bool;})();
	}
}));
