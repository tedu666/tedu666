var oFlowerVase = InheritO(CPlants, {
	EName: "oFlowerVase",
	CName: "花瓶",
	SunNum: 0,
	coolTime: 0,
	canEat: 0,
	Stature: -1,
	HP: 10,
	width: 89,
	height: 95,
	beAttackedPointR: 53,
	Pot_Size: 0,
	is_show: 0,
	CardTime: 1500,
	AudioArr: ["vase_breaking0", "vase_breaking1", "vase_breaking2", "vase_breaking3"],
	PicArr: ["images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png"],
	Tooltip: "随机开出某样东西",
	BirthStyle: function(c, e, b, a) {
		var d = b.childNodes[1];
		d.src = c.PicArr[c.NormalGif], d.style.height = "202px";
		EditEle(b, {id: e}, a, EDPZ);
		c.ChangeStyle(c.Pot_Size,c.is_show);

		ckhtml = NewEle("oCheck_"+c.id, "div", "left:"+b.style.left+";top:"+b.style.top+";position:absolute;width:80px;height:101px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:150", 0, EDAll);
		ckhtml.value = c.id;
		ckhtml.onmouseover = function(g) {$(this.value).style.opacity = 0.5;};
		ckhtml.onmouseout = function() {$(this.value).style.opacity = 1;};
		ckhtml.onclick = function(g) {$P[this.value].Die();};
		ckhtml.style.cursor = "pointer";
	},
	GetClip: function(size,is_show) {
		let up,down,left,right;
		is_show ? (up=0,down=101) : (up=101,down=202);
		left=size*80,right=left+80;
		return "rect("+up+"px, "+right+"px, "+down+"px, "+left+"px)";
	},
	Getleft: function(size) {return 80 * size;},
	ChangeStyle: function(size,is_show) {
		var b = $(this.id).childNodes[1];
		SetStyle(b, {
			clip: this.GetClip(size,is_show),
			top: (-101 * !is_show)+"px",
			left: -(this.Getleft(size))+"px"
		});
	},
	PrivateBirth: function(a) {},
	getHurt: function(a, b, c) {(b != 2) && (this.Die());},
	BoomDie: function() {this.Die(null, false);},
	PrivateDie: function() {},
	InitTrigger: function() {},
	Die: function(a, audi = true) {
		var b = this,
		c = b.id;
		b.oTrigger && oT.delP(b);
		b.HP = 0;
		delete $P[c];
		delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
		$P.length -= 1; ! a && ClearChild($(c));

		(audi) && (PlayAudio(this.AudioArr[Math.floor(Math.random() * this.AudioArr.length)]));

		ClearChild($("oCheck_" + c));
		b.itemAppear();
	},
	itemAppear: function(){
		var b = this, c = b.R+"_"+b.C, size = 0, item = oS.PName[0], a, d;
		oS.Vase && (d = oS.Vase[c]) && (size = d.size,item = d.item);
		if(size == 0){
			AppearCard(GetX(b.C) - b.width/2, GetY(b.R), item, 0, b.CardTime);
		}else if(size == 1){
			oP.NumZombies++;
			asyncInnerHTML((a = new item).CustomBirth(b.R, b.C, 0, "auto"),function(n, m) {
				EDPZ.appendChild(n); m.Birth();
				if(m.EName == "oJackinTheBoxZombie"){
					m.OpenBox(m.id);
				};
			},a);
		}else{
			while(item > 25){AppearSun(GetX(b.C) - b.width/2, GetY(b.R), 25, 0);item -= 25;};
			AppearSun(GetX(b.C) - b.width/2, GetY(b.R), item, 0);
		};
		(oS.Vase) && (delete oS.Vase[c]);
	}
});


var oRepeater2 = InheritO(oRepeater, {
	EName: "oRepeater2",
	CName: "反向双发射手",
	PicArr: ["images/Card/Plants/Repeater2.png", "images/Plants/Repeater2/0.gif", "images/Plants/Repeater2/Repeater2.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
	NormalAttack1: function() {
		var a=this,b="PB"+Math.random();EditEle(a.BulletEle.cloneNode(false),{id:b},0,EDPZ);oSym.addTask(15,function(d){var c=$(d);c&&SetVisible(c)},[b]);oSym.addTask(1,function(f,j,h,c,n,i,m,k,o,g){var l,e=GetC(n+30),d=oZ["getZ"+c](n+30,i);m==0&&g[i+"_"+e]&&k!=e&&(PlayAudio("firepea"),m=1,h=40,k=e,j.src="images/Plants/PB"+m+c+".gif");d&&d.Altitude==1?(d[{"-1":"getSnowPea",0:"getPea",1:"getFirePea"}[m]](d,h,c),(SetStyle(j,{left:o+28+"px",width:"52px",height:"46px"})).src="images/Plants/PeaBulletHit.gif",oSym.addTask(10,ClearChild,[j])):(n+=(l=!c?5:-5))<oS.W&&n>100?(j.style.left=((o+=l)-56)+"px",oSym.addTask(1,arguments.callee,[f,j,h,c,n,i,m,k,o,g])):ClearChild(j)},[b,$(b),20,1,a.AttackedLX,a.R,0,0,a.AttackedRX + 56,oGd.$Torch]);
	},
	getTriggerRange: function(a, b, c) {
		return [[100, b + 25, 1]]
	}
});




var oGatlingPea_Pro = InheritO(oGatlingPea, {
	CanGrow: CPlants.prototype.CanGrow,
	Tooltip: "一次发射四颗豌豆<br>遇到火炬树桩后伤害大幅度提升<br>有几率一次发出多颗豌豆",
	CName: "加特林（加强版）",
	EName: "oGatlingPea_Pro",
	SunNum: 375,
	Is_AOE: false,
	Judge_Strength: 1.4,
	NormalAttack1: function() {
		var a=this,b="PB"+Math.random();EditEle(a.BulletEle.cloneNode(false),{id:b},0,EDPZ);oSym.addTask(15,function(d){var c=$(d);c&&SetVisible(c)},[b]);oSym.addTask(1,function(f,j,h,c,n,i,m,k,o,g){var l,e=GetC(n),d=oZ["getZ"+c](n,i);m==0&&g[i+"_"+e]&&k!=e&&(PlayAudio("firepea"),m=1,h=60,k=e,j.src="images/Plants/PB"+m+c+".gif");d&&d.Altitude==1?(d[{"-1":"getSnowPea",0:"getPea",1:"getFirePea"}[m]](d,h,c),(SetStyle(j,{left:o+28+"px",width:"52px",height:"46px"})).src="images/Plants/PeaBulletHit.gif",oSym.addTask(10,ClearChild,[j])):(n+=(l=!c?5:-5))<oS.W&&n>100?(j.style.left=(o+=l)+"px",oSym.addTask(1,arguments.callee,[f,j,h,c,n,i,m,k,o,g])):ClearChild(j)},[b,$(b),20,0,a.AttackedLX,a.R,0,0,a.AttackedLX-40,oGd.$Torch]);
	},
	NormalAttack: function(a) {
		let w = 3 + Math.floor(Math.random() * 16 * (Math.floor(Math.random() * 128) == 0));
		this.NormalAttack1();
		oSym.addTask(15,function(d, b) {
			var c = $P[d];
			c && c.NormalAttack1(); --b && oSym.addTask(15, arguments.callee, [d, b])
		}, [this.id, w]);
	}
});

var oTorchwood_Pro = InheritO(oTorchwood, {
	SunNum: 275,
	coolTime: 20,
	HP: 1024,
	width: 84,
	height: 141,
	EName: "oTorchwood_Pro",
	Tooltip: "通过火炬树桩的豌豆将变为火球<br>死亡时化为灰烬烧光整行",
	PicArr: ["images/Card/Plants/Torchwood.png","new_fold/Plants/Torchwood/0.webp","new_fold/Plants/Torchwood/Torchwood.webp","images/Plants/PB00.gif","images/Plants/PB01.gif","new_fold/Plants/Torchwood/PB10.webp","images/Plants/PB11.gif","images/Plants/Torchwood/SputteringFire.gif"],
	Is_AOE: false,
	Judge_Strength: 1,
	PrivateDie: function(c, s) {
		var a = c.R,
		b = c.C;
		delete oGd.$Torch[a + "_" + b];
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
		(s != false) && c.Fire(c);
	},
	PrivateBirth: function(c) {
		var a = c.R,
		b = c.C;
		oGd.$Torch[a + "_" + b] = c.id;
		oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0)
		c.Start_Make_Fire(c);
	},
	Start_Make_Fire: function(c){
		oSym.addTask(0, function(id){
			if(!$P[id]) return;
			let d = $P[id], r = d.R, c = d.C, b, e;
			for(let i = Math.max(1, r - 1); i <= Math.min(r + 1, oS.R); i++){
				b = oZ.getArZ(GetX(c - 1), GetX(c + 1), i), e = b.length;
				while(e--){
					b[e].getFirePeaSputtering();
				}
			}
			oSym.addTask(100, arguments.callee, [id]);
		}, [c.id])
	},
	Fire: function(a){
		oSym.addTask(0, function(j) {
			PlayAudio("jalapeno");
			var h = j, f = h.R, c = oZ.getArZ(100, oS.W, f), e = c.length, g = oGd.$Ice[f], d = oGd.$Crater, id = "dFire_" + Math.random();
			while (e--) {c[e].getExplosion();}

			NewImg(id, "images/Plants/Jalapeno/JalapenoAttack.gif?" + Math.random(), "width:755px;height:131px;left:" + GetX(0) + "px;top:" + (GetY(f) - 131), EDAll);

			ClearChild($("dIceCar" + f)), oSym.addTask(135, ClearChild, [$(id)]);
			if (g) {for (e = g[1]; e < 11; e++) {delete d[f + "_" + e];}}
		},[a])
	}
});

var oNutBowling_pro = InheritO(oNutBowling, {
	SunNum: 100,
	coolTime: 5,
	EName: "oNutBowling_pro"
});
var oBoomNutBowling_pro = InheritO(oBoomNutBowling, {
	SunNum: 150,
	coolTime: 30,
	EName: "oBoomNutBowling_pro"
});
var oHugeNutBowling_pro = InheritO(oHugeNutBowling, {
	SunNum: 750,
	coolTime: 120,
	EName: "oHugeNutBowling_pro"
});


var oFlowerVase_New = InheritO(oFlowerVase, {
	PicArr: ["new_skin/InterFace/Scary_Pot.png", "new_skin/InterFace/Scary_Pot.png", "new_skin/InterFace/Scary_Pot.png", "new_skin/InterFace/Scary_Pot.png"],
});

var oBrains_New = InheritO(oBrains, {
	EName: "oBrains_New",
	PKind: 4,
	PicArr: ["new_skin/Images/Plants/brain.png"]
});

var oLawnCleaner_New = InheritO(oLawnCleaner, {
	EName: "oLawnCleaner_New",
	PicArr: ["images/New_interface/LawnMower_body.png"]
});

var oReStarfruit = InheritO(oStarfruit, {
	EName: "oReStarfruit",
	CName: "连发杨桃",
	SunNum: 250,
	Tooltip: "连续向五个方向发射小杨桃",
	Produce: '连发杨桃可以向五个方向发射小杨桃。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">五个方向</font></p>杨桃：“嘿，哥们，有一天我去看牙医，他说我有四个牙洞。我一数，我就只有一颗牙齿！一颗牙齿长了四个牙洞？怎么会这样啊？”',
	NormalAttack1: oStarfruit.prototype.NormalAttack,
	NormalAttack: function(a) {
		oSym.addTask(0, function(c, t){
			var b = $P[c];
			b && b.NormalAttack1();
			(--t > 0) && (oSym.addTask(15, arguments.callee, [c, t]));
		}, [this.id, 2]);
	}
});