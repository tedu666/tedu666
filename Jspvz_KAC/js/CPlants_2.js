var oFlowerVase = InheritO(CPlants, {
	EName: "oFlowerVase", CName: "花瓶", // ID 中文名
	SunNum: 0, coolTime: 0, // 阳光 冷却时间
	canEat: 0, Stature: -1, // 是否可以被吃 身高
	HP: 10, width: 89, height: 95, beAttackedPointR: 53, // 血量 宽度 高度 判定点

	PotSize: 0, XRay: 0, CardTime: 1500, // 花瓶种类 是否透视 卡片冷却时间 
	Ele: null, ImgEle: null, EleBG: null, EleCard: null, EleClick: null, // 透视状态下背景Ele 透视状态下图片Ele
	VaseValue: null, // 花瓶本身数据，格式: { "Type": "Plants | Zombie | SunNum", "Value": oSunFlower | oZombie | 300, }
	AutoSetXRay: true, AutoJoker: true, AutoSummonBase: true, BasePlant: null, // 是否自动改变XRay 小丑是否自爆 是否自动生成底座（如在河里生成睡莲）底座植物

	AudioArr: ["VaseBreaking0", "VaseBreaking1", "VaseBreaking2", "VaseBreaking3"],
	PicArr: ["images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png", "images/interface/Scary_Pot.png"],
	Tooltip: "开出一些奇奇怪怪的东西", Produce: "开出一些奇奇怪怪的东西<p>花瓶老哥或许就是", 

	SetStyle: function (Kind) { // 设置花瓶皮肤
		var self = this, XRay = self.XRay; // 获取基本信息
		var PLeft = Kind * 80, PRight = PLeft + 80; // 计算裁剪

		self.PotSize = Kind; // 设置花盆类型
		SetStyle(self.ImgEle, { // 花盆本体的图片
			clip: "rect(101px, " + PRight + "px, 202px, " + PLeft + "px)",
			top: "-101px", left: (-80 * Kind) + "px"
		});
		SetStyle(self.EleBG, { // 花盆透视时的图层
			clip: "rect(0px, " + PRight + "px, 101px, " + PLeft + "px)",
			top: "0px", left: (-80 * Kind) + "px", 
		});

		self.SetXRay(XRay); // 设置透视功能
	}, 

	SetXRay: function (TurnOn) { // 设置花瓶透视
		var self = this, XRay = !!TurnOn; // 获取基本信息

		self.XRay = XRay; // 设置 XRay
		SetAlpha(self.EleBG, XRay * 100, XRay * 1); // 显示透视图层
		SetAlpha(self.EleCard, XRay * 100, XRay * 1); // 显示预览图层
	}, 

	InitImage: function (Kind, XRay) { // 初始化图片
		var self = this, ID = self.id, Ele = self.Ele, ImgEle = self.ImgEle, EleBG = self.EleBG, EleCard = self.EleCard;

		if (!Ele) self.Ele = Ele = $(ID); // 初始化 Ele
		if (!ImgEle) self.ImgEle = ImgEle = Ele.childNodes[1]; // 初始化 ImgEle
		if (!EleBG) self.EleBG = EleBG = self.ImgEle.cloneNode(false), Ele.appendChild(EleBG); // 初始化 EleBG，克隆图片，并复制到自己的图片下
		if (!EleCard) self.EleCard = EleCard = NewEle("", "img", "", {}, Ele); // 初始化 EleCard 节点
		if (!XRay) XRay = self.XRay;
		if (!Kind) Kind = self.PotSize;

		var selfValue = self.VaseValue || {}, VType = selfValue.Type || "Plants", VValue = selfValue.Value || (VType == "SunNum"? 50: (VType == "Plants"? oPeashooter: oZombie)); // 获取该花瓶的内部玩意
		switch (VType) {
			case "Plants": // 植物类型
				EleCard.style = "clip:rect(auto,auto,40px,auto);width:70px;height:80px;top:25px;left:5.5px;"; // 裁剪图片
				EleCard.src = VValue.prototype.PicArr[VValue.prototype.CardGif]; // 显示植物卡槽
				break; 

			case "Zombie":  
				if ($User.Client.Mobile) { // 如果当前设备是移动端，为了移动端屏幕考虑，直接显示卡槽
					EleCard.style = "clip:rect(auto,auto,40px,auto);width:70px;height:80px;top:25px;left:5.5px;"; // 裁剪图片
					EleCard.src = VValue.prototype.PicArr[VValue.prototype.CardGif]; // 显示植物卡槽
				} else {
					var PT = VValue.prototype, ZWidth = PT.beAttackedPointR - PT.beAttackedPointL, ZHeight = PT.height - PT.GetDTop;
					var MaxW = 60, MaxH = 75, K = MaxW / MaxH, EK; // 横款最大值、 横款比值
					var ELeft = 0, ETop = 0, LPoint = PT.beAttackedPointL; // 最终的相对位置

					if (ZWidth > ZHeight) EK = ZWidth / MaxW, ZHeight /= EK, ZWidth = MaxW; // 等比缩放
					else if (ZHeight > ZWidth) EK = ZHeight / MaxH, ZWidth /= EK, ZHeight = MaxH; // 等比缩放

					ELeft = 20 / 2 + (- LPoint / EK) + (MaxW - ZWidth) / 2, ETop = 15 / 2 + (MaxH - ZHeight) / 2;

					EleCard.style = "top:" + ETop + "px;left:" + ELeft + "px;width:" + (PT.width / EK) + "px;height:" + (PT.height / EK) + "px;"; // 确定位置
					EleCard.src = VValue.prototype.PicArr[VValue.prototype.StaticGif]; // 显示僵尸站立图片
				}
				break; 

			case "SunNum": 
				EleCard.style = "left:10px;top:12.5px;width:64px;height:64px;";
				EleCard.src = "images/interface/Sun.gif";
				break; 
		}

		self.SetStyle(Kind), self.SetXRay(XRay); // 初始化显示
	}, 

	BirthStyle: function(self, Id, Ele, Style) {
		var Dom = Ele.childNodes[1]; // 获取植物实际图片
		Dom.src = self.PicArr[self.NormalGif], Dom.style.height = "202px"; // 设置实际宽高
		self.Ele = Ele, EditEle(Ele, {id: Id}, Style, EDPZ); // 修改

		self.InitImage(self.PotSize, self.XRay), self.FreshXRay(true); // 初始化图片等信息
	},

	PrivateBirth: function(self) {
		var Id = self.id, Ele = self.Ele; // 获取

		// 定义鼠标事件相关
		var ClickEle = self.EleClick = NewEle("dCheck_" + Id, "div", "left:" + Ele.style.left + ";top:" + Ele.style.top + ";position:absolute;width:80px;height:101px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:150;cursor:pointer", {
			"onclick": function () { self.Die(); }, 
			"onmouseover": function() { SetAlpha(Ele, 50, 0.5); }, 
			"onmouseout": function() { SetAlpha(Ele, 100, 1); }
		}, EDAll);

		self.ControlBase("Summon", "Auto"); // 生成底座
		self.VaseValue = self.VaseValue || { "Type": "SunNum", "Value": 50 }; // 如果没有信息，默认创建一个 50 阳光的罐子
	},
	getHurt: function(a, b, c) { (b != 2) && (this.Die()); }, // 受伤判定，目前是冰车不会破坏罐子，以后如果有巨人这里是需要修改的
	BoomDie: function() { this.Die(null, false); }, // 爆炸后，直接生成，不播放音效
	PrivateDie: function() {}, InitTrigger: function() {},  // 特殊死亡
	Die: function(ImgSave, OnAudio) { // 是否保留图片 是否播放音效
		var self = this, ID = self.id; // 定义需要用到的变量

		self.oTrigger && oT.delP(self), self.HP = 0; // 删除触发器 清空血量
		delete $P[ID], delete oGd.$[self.R + "_" + self.C + "_" + self.PKind]; // 删除本格数据
		$P.length -= 1; !ImgSave && ClearChild(self.Ele); // 清除图片

		if (OnAudio != false) PlayAudio(self.AudioArr[Math.floor(Math.random() * self.AudioArr.length)]); // 随机播放音效

		self.ControlBase("Delete", "Auto"); // 删除底座
		ClearChild(self.EleClick), self.PlaceItem(); // 放置物品
	},
	PlaceItem: function () {
		var self = this, ID = self.id, Val = self.VaseValue, Type = Val.Type, Value = Val.Value; // 解包

		switch (Type) { // 根据内容生成
			case "Plants": // 丢出植物卡片
				AppearCard(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value, 0, self.CardTime);
				break;

			case "Zombie": // 生成僵尸
				Value = new Value(), ++oP.NumZombies; // 创建僵尸对象 增加僵尸数量

				// 生成僵尸
				asyncInnerHTML(Value.CustomBirth(self.R, self.C, 0, "auto"), function(n, m) {
					EDPZ.appendChild(n), m.Birth();
					if (m.EName == "oJackinTheBoxZombie" && self.AutoJoker) m.OpenBox(m.id); // 如果是小丑僵尸，直接引爆爆炸
				}, Value);
				break;

			case "SunNum": // 生成阳光
				if (Value > 500) AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value - 500, 0), Value = 500; // 大于五百的阳光直接生成一个大的
				while (Value > 25) AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, 25, 0), Value -= 25; // 500 以内的，一个一个生成
				AppearSun(GetX(self.C) - self.width / 2, GetY(self.R) - 30, Value, 0), Value = 0; // 余下的单独生成
				break;
		}
	}, 
	ControlBase: function (Type, Ticket) { // 生成底座
		var BaseList = [oFlowerPot, oLilyPad], LastBase = null, self = this; // 底座

		if (self.BasePlant && $P[self.BasePlant.id]) self.BasePlant.canEat = true; // 默认先解除 canEat 状态
		if (Ticket == "Auto" && !self.AutoSummonBase) return; // 如果是尝试自动生成的话，直接返回

		switch (Type) {
			case "Summon": // 生成底座
				self.ControlBase("Delete", "Auto"); // 先尝试删除原绑定的底座

				if (self.CanGrow([], self.R, self.C)) break; // 如果可以直接种植，则直接返回

				for (var Index in BaseList) { // 尝试生成所有种类的底座
					if (BaseList[Index].prototype.CanGrow([], self.R, self.C)) LastBase = BaseList[Index];
				}

				if (LastBase) { // 如果可以生成
 					CustomSpecial(LastBase, self.R, self.C); // 生成种类
 					self.BasePlant = LastBase = oGd.$[self.R + "_" + self.C + "_" + 0]; // 获取底座
 					LastBase.canEat = false; // 默认底座是不能被吃的
				}
				break;

			case "Delete": // 删除绑定的底座
				if (!self.BasePlant || !$P[self.BasePlant.id]) break; // 如果底座根本不存在，直接返回

				self.BasePlant.Die(); // 顺带删除底座

				break;
		}
	}, 
	FreshXRay: function (OnlySelf) { // 全局属性，为场上所有花瓶设置 XRAY 
		var self = this, Ground = oGd.$, R = self.R - 1, C = self.C - 1, Arr = [0, 1, 2], Str, Pla = oGd.$Plantern;
		
		if (OnlySelf) { // 只检查自己
			if (self.AutoSetXRay == false) return; // 不允许改变
			self.SetXRay(false); // 默认关闭，查找周围是否有再开启
			for (var RQ in Arr) for (var CQ in Arr) if (Pla[(1 * RQ + R) + "_" + (1 * CQ + C)]) self.SetXRay(true); // 设置透视
		} else {
			for (var Q in Ground) { // 遍历每一个花瓶，如果是花瓶则自我检查
				if (Ground[Q] && Ground[Q].EName == "oFlowerVase") Ground[Q].FreshXRay(true);
			}
		}
	}, 

	/*
		函数介绍: 直接在 (R, C) 位置根据你的信息生成一个罐子，此属性会创建一个新的罐子
		使用说明: 
			SetR: 行, SetC: 列
			VaseColor: 罐子颜色 0普通 1绿色 2僵尸
			VaseValue: 花瓶内容信息，格式 { "Type": "Plants | Zombie | SunNum", "Value": oSunFlower | oZombie | 300, }	
			SpecialFunc: 生成前调用的函数（可选）	
		执行成功后会返回该花瓶的信息。
	*/
	SpecialBirth: function (SetR, SetC, VaseColor, VaseValue, SpecialFunc) {
		var Obj = new oFlowerVase;

		Obj.PotSize = VaseColor, Obj.VaseValue = VaseValue; // 基本信息

		if (SpecialFunc) SpecialFunc(Obj); // 让调用者自己操作花瓶信息

		Obj.Birth(GetX(SetC), GetY(SetR), SetR, SetC, [], null);

		return Obj;
	}, 

	/*
		函数介绍: 判断场上是否满足普通砸罐子关卡通关条件
		通关条件: 场地上没有罐子、且场地上没有僵尸
	*/
	GetLevelStatus: function () {
		for (var O in $P) if ($P[O].EName == "oFlowerVase") return false; // 如果有花瓶，直接返回
		for (var O in $Z) if ($Z[O].PZ != 0) return false; // 如果有非魅惑的僵尸，直接返回
		return true;
	}
}), 
oRepeater2 = InheritO(oRepeater, { 
	EName: "oRepeater2",
	CName: "反向双发射手",
	PicArr: ["images/Card/Plants/Repeater2.png", "images/Plants/Repeater2/0.gif", "images/Plants/Repeater2/Repeater2.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
	NormalAttack1: function() {
		var a = this,
		b = "PB" + Math.random();
		EditEle(a.BulletEle.cloneNode(false), {
			id: b
		},
		0, EDPZ);
		oSym.addTask(15,
		function(d) {
			var c = $(d);
			c && SetVisible(c)
		},
		[b]);
		oSym.addTask(1,
		function(f, j, h, c, n, i, m, k, o, g) {
			var l, e = GetC(n),
			d = oZ["getZ" + c](n, i);
			m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB" + m + c + ".gif");
			d && d.Altitude == 1 ? (d[{
				"-1": "getSnowPea",
				0 : "getPea",
				1 : "getFirePea"
			} [m]](d, h, c), (SetStyle(j, {
				left: o + 28 + "px",
				width: "52px",
				height: "46px"
			})).src = "images/Plants/PeaBulletHit.gif", oSym.addTask(10, ClearChild, [j])) : (n += (l = !c ? 5 : -5)) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)
		},
		[b, $(b), 20, 1, a.AttackedLX + 30, a.R, 0, 0, a.AttackedRX, oGd.$Torch])
	},
	getTriggerRange: function(a, b, c) {
		return [[100, b + 25, 1]]
	}
}), 
oGatlingPea_Pro = InheritO(oGatlingPea, {
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
}), 
oTorchwood_Pro = InheritO(oTorchwood, {
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
}), 
oNutBowling_pro = InheritO(oNutBowling, {
	SunNum: 100,
	coolTime: 5,
	EName: "oNutBowling_pro"
}), 
oBoomNutBowling_pro = InheritO(oBoomNutBowling, {
	SunNum: 150,
	coolTime: 30,
	EName: "oBoomNutBowling_pro"
}), 
oHugeNutBowling_pro = InheritO(oHugeNutBowling, {
	SunNum: 750,
	coolTime: 120,
	EName: "oHugeNutBowling_pro"
}), 
oFlowerVase_New = InheritO(oFlowerVase, {
	PicArr: ["new_skin/InterFace/Scary_Pot.png", "new_skin/InterFace/Scary_Pot.png", "new_skin/InterFace/Scary_Pot.png", "new_skin/InterFace/Scary_Pot.png"],

	/*
		函数介绍: 直接在 (R, C) 位置根据你的信息生成一个罐子，此属性会创建一个新的罐子
		使用说明: 
			SetR: 行, SetC: 列
			VaseColor: 罐子颜色 0普通 1绿色 2僵尸
			VaseValue: 花瓶内容信息，格式 { "Type": "Plants | Zombie | SunNum", "Value": oSunFlower | oZombie | 300, }	
			SpecialFunc: 生成前调用的函数（可选）	
		执行成功后会返回该花瓶的信息。
	*/
	SpecialBirth: function (SetR, SetC, VaseColor, VaseValue, SpecialFunc) {
		var Obj = new oFlowerVase_New;

		Obj.PotSize = VaseColor, Obj.VaseValue = VaseValue; // 基本信息

		if (SpecialFunc) SpecialFunc(Obj); // 让调用者自己操作花瓶信息

		Obj.Birth(GetX(SetC), GetY(SetR), SetR, SetC, [], null);

		return Obj;
	}, 
}), 
oBrains_New = InheritO(oBrains, {
	EName: "oBrains_New",
	PKind: 4,
	PicArr: ["new_skin/Images/Plants/brain.png"]
}), 
oLawnCleaner_New = InheritO(oLawnCleaner, {
	EName: "oLawnCleaner_New",
	PicArr: ["images/New_interface/LawnMower_body.png"]
}), 
oReStarfruit = InheritO(oStarfruit, {
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