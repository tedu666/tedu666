let __Template_FlowerVase__ = {
	GrowPlant : function (l, d, c, e, b) { // 推荐换成如下种植函数，可以适配未重写关的 GrowPlant，还支持流星雨卡槽
		var j = oS.ChoseCard, f = ArCard[j], h = f.PName, k = h.prototype, i = k.coolTime, a, g = oGd.$LF[e], o = f.Kind, s = (k.name == "Plants");
		k.CanGrow(l, e, b) && (PlayAudio(g != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water"), s ? (new h).Birth(d, c, e, b, l) : asyncInnerHTML((a = new h).CustomBirth(e, b, 0, "auto"), function(n, m) {
			EDPZ.appendChild(n), m.Birth();
		}, a), o ? (delete ArCard[j], ClearChild($(j))) : (innerText(ESSunNum, oS.SunNum -= k.SunNum), i && (f.CDReady = 0, DoCoolTimer(j, k.coolTime))), oSym.addTask(20, SetHidden, [SetStyle(g != 2 ? $("imgGrowSoil") : $("imgGrowSpray"), {
			left: d - 30 + "px",
			top: c - 30 + "px",
			zIndex: 3 * e + 1,
			visibility: "visible"
		})]));
		CancelPlant();
	},
	MoveDropCard : function (c, b, t) { // 掉落目标
		var a = ArCard[c], ele = $(c); a && ele && ((!a.HasChosen && a.top < b - 52) ? (ele.style.top = (a.top += 2) + "px", oSym.addTask(5, MoveDropCard, [c, b, t])) : DisappearCard(c, t));
	},
	DisappearCard : function (d, r) {
		var q = 5, e = $(d), f = function (t) {
			switch (true) {
				case !ArCard[d] || !e: return; // 卡片已经消失，不做处理
				case oS.Chose == 1 && oS.ChoseCard == d: break; // 选中
				case t > 500: e.style.opacity = 1; break; // 未到闪烁时间
				case t > 0: e.style.opacity = [1, 0.5][Math.ceil(t / 50) % 2]; break; // 闪烁
				default: delete ArCard[d], ClearChild(e); return;
			}
			e = $(d), oSym.addTask(q, arguments.callee, [t - q]);
		}; f(r);
	},
	AppearCard : function (h, f, e, a, t) { // x, y, 植物id, 移动卡槽类型, 消失时间（默认 15s）
		var b, d, g = "dCard" + Math.random(), c = "opacity:1;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto);left:" + h + "px;top:-1000", t = t || 1500;

		if (a) d = 0, oSym.addTask(1, MoveDropCard, [g, f, t]); // 从天而降，反之抛物线掉落
		else d = f - 15 - 20, c += ";top:" + d + "px", oSym.addTask(1, DisappearCard, [g, t]), oSym.addTask(1,function(q,p,n,j,l,k,m,i){if(ArCard[q]&&$(q)){SetStyle($(q),{left:(p=p+j*k)+"px",top:(n=n+Number(l[0]))+"px"});l.shift();--m;m>0&&((l.length==0)&&(l=[8,16,24,32]),oSym.addTask(i,arguments.callee,[q,p,n,j,l,k,m,++i]))}},[g,h,d,Math.floor(Math.random()*4),[-32,-24,-16,-8],[-1,1][Math.floor(Math.random()*2)],8,2]); // 开始记时，确定抛物线，与阳光部分相似故压缩

		ArCard[g] = { DID: g, PName: e, PixelTop: 600, CDReady: 1, SunReady: 1, top: d, HasChosen: false, Kind: 1 }; // 生成卡片数据，是否被点击过
		NewImg(g, e.prototype.PicArr[e.prototype.CardGif], c, $("dCardList"), { // 生成卡片 ele
			onclick: function (g) { 
				var self = this, style = self.style, id = self.id; ClearChild($("MovePlant"), $("MovePlantAlpha")), CancelPlant(), style && (style.opacity = 0.5), ChosePlant(g, id), ArCard[id] && (ArCard[id].HasChosen = true);
			} 
		});
	},
	SummonVase : function(y,x,size,item,vasesize){
		let p = new oFlowerVase;
		p.Pot_Size = (vasesize ? vasesize : 0);
		p.Birth(GetX(x), GetY(y), y, x, []);
		oS.Vase[y+"_"+x] = {size:size,item:item};
		return p;
	},
	CekWin : function(){
		return (function(){for(let item in $Z){if($Z[item].PZ != 0){return false}};return true;})() && (function(){for(item in $P){if($P[item].EName == "oFlowerVase"){return false;}};return true;})();
	},
	CekoPlantern : function(a,b) {
		let p = oGd.$Plantern,q = a+"_"+b,o = $P[p[q]];
		if(o){//新放置的
			for(let s=a-1;s<=a+1;s++){
				for(let r=b-1;r<=b+1;r++){
					let i = s+"_"+r;
					if(!oS.oPenVase[i] && (info = oS.Vase[i]) && (obj = oGd.$[i + "_1"]) && obj.EName == "oFlowerVase"){
						oS.oPenVase[i] =  true;
						obj.ChangeStyle(obj.Pot_Size,(obj.is_show = 1));
						SetVaseXray(s,r,1);
					};
				};
			};
		}else{//刚去世的，计算光照
			for(let s=a-1;s<=a+1;s++){
				for(let r=b-1;r<=b+1;r++){
					let i = s+"_"+r;
					if(oS.oPenVase[i] && (info = oS.Vase[i]) && (obj = oGd.$[i + "_1"]) && obj.EName == "oFlowerVase"){
						oS.oPenVase[i] = false;
						obj.ChangeStyle(obj.Pot_Size,(obj.is_show = 0));
						SetVaseXray(s,r,0);
					};
				};
			};
			for(let item in p){ //新增
				g = item.split('_'),y = g[0] * 1,x = g[1] * 1;
				for(let s=y-1;s<=y+1;s++){
					for(let r=x-1;r<=x+1;r++){
						let i = s+"_"+r;
						if(!oS.oPenVase[i] && (info = oS.Vase[i]) && (obj = oGd.$[i + "_1"]) && obj.EName == "oFlowerVase"){
							oS.oPenVase[i] = true;
							obj.ChangeStyle(obj.Pot_Size,(obj.is_show = 1));
							SetVaseXray(s,r,1);
						};
					};
				};
			}
		}
	},
	SetVaseXray: function(y,x,is_show) {
		if(!((info = oS.Vase[y+"_"+x]) && (obj = oGd.$[y+"_"+x+"_1"]) && obj.EName == "oFlowerVase")){
			return;
		};
		if(is_show){
			if(info.size == 0){//植物卡
				NewImg(0, info.item.prototype.PicArr[info.item.prototype.CardGif], "clip:rect(auto,auto,34px,auto);width: 55px; height: 66px; top: 25px; left: 13.5px", $(obj.id));
			}else if(info.size == 1){
				NewImg(0, info.item.prototype.PicArr[info.item.prototype.StandGif], "top:15px;left:0px;height:50px;position:absolute;", $(obj.id));	
			}else{
				NewImg(0, "images/interface/Sun.gif", "left:12.5px;top:12.5px;width:60px;height:60px;position:absolute", $(obj.id));
			};
		}else{
			ClearChild($(obj.id).childNodes[2]);
		};
	},
	AutoSelectCard: function() {
		(oS.AutoSelectCard) ? (oS.AutoSelectCard()) : (SelectCard(oCherryBomb.prototype.EName));
	}
};



let __Template_Function_RiddleAutoGrow__ = function(){
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
}; 



let __Template_Function_RiddleAutoGrow_Water__ = function(){
	let P = oS.VaseArP , l = P.left , r = P.right , g = P.GreenNum , zp = P.ZombieP , pp = P.PlantP , sp = P.SunP , wp = P.WaterZombieP;
	let Vaseinfo = [], VasePlt = [], ret = {};
	let f = function(){
		VasePlt.sort(() => {return Math.random() - 0.5});
		Vaseinfo.sort(() => {return Math.random() - 0.5});
		while(Vaseinfo.length && VasePlt.length){
			let a=Vaseinfo.length-1 , b=VasePlt.length-1 , x=Vaseinfo[a].X , y=Vaseinfo[a].Y , size=VasePlt[b].size , item=VasePlt[b].item , viewsize = 0;
			if(size == 0 && oS.VaseArP.GreenNum != 0){viewsize = 1;oS.VaseArP.GreenNum--;};
			if(oGd.$LF[y] == 2) CustomSpecial(oLilyPad, y, x);
			SummonVase(y,x,size,item,viewsize);

			(oS.DefSummon) && (oS.DefSummon(y, x, size, item, viewsize));

			ret[x + "_" + y] = true;
			Vaseinfo.length--,VasePlt.length--;
		};
	};


	//先放陆地僵尸
	for(let i in zp){VasePlt.push({size: 1,item: oS.ZName[zp[i]]});};
	for(let mid = l;mid <= r;mid++){
		for(let R = 1;R <= oS.R;R++){
			if(oGd.$LF[R] != 2) Vaseinfo.push({X: mid,Y: R});
		};
	};
	f();


	//随后植物以及阳光
	for(let i in pp){VasePlt.push({size: 0,item: oS.PName[pp[i]]});};
	for(let i in sp){VasePlt.push({size: 2,item: sp[i]});};
	f();


	//最后水路僵尸
	for(let mid = l;mid <= r;mid++){
		for(let R = 1;R <= oS.R;R++){
			if(oGd.$LF[R] == 2 && !ret[mid + "_" + R]) Vaseinfo.push({X: mid,Y: R});
		};
	};
	for(let i in wp){VasePlt.push({size: 1,item: oS.ZName[wp[i]]});};
	f();

	(oS.DefRiddleAutoGrow) && (oS.DefRiddleAutoGrow());
};



let __Template_Function_DefRiddleAutoGrow_Water_SetZombie__ = function(){
	oSym.addTask(50, function(){
		for(let i = 1; i <= oS.R; i++){
			for(let j = 1; j <= oS.C; j++){
				let a = oGd.$[i + "_" + j + "_0"], b = oGd.$[i + "_" + j + "_1"];

				if(a && b && b.EName == "oFlowerVase") a.canEat = false;
				else if(a) a.canEat = true;
			}
		}
		oSym.addTask(50, arguments.callee, []);
	}, []);

	oS.ZombiePot.sort(() => {return Math.random() - 0.5});

	while(oS.VaseArP.ZombieNum && oS.ZombiePot.length){
		let d = oS.ZombiePot.length - 1, z = oS.ZombiePot[d];
		let y = z[0], x = z[1], c = oGd.$[y + "_" + x + "_1"];
		--oS.ZombiePot.length, --oS.VaseArP.ZombieNum;
		if(!c) continue;
		c.ChangeStyle(c.Pot_Size = 2, c.is_show);
	};
}