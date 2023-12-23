let __BulletsBeta__ = false; // 是否开启测试版子弹

var oBu = {
	BList: {}, BKeys: [], DList: [], 
	Init: function () { let self = this; self["BList"] = {}, self["BKeys"] = {}; }, 
	Get_ID: function () { return "_" + Math["random"](); }, 
	Del: function (Did) { let self = this; self["DList"]["push"](Did); }, 
	Add: function (Obj) { let self = this; self["BList"][Obj["ID"]] = Obj; }, 
	TraversalOf: function (Tick = 1) { // 批量处理子弹移动
		let self = this, BList = self["BList"], DList = self["DList"];
		for (let K in BList) BList[K]["Fresh"](Tick); // 刷新
		for (let D of DList) delete self["BList"][D]; self["DList"]["length"] = 0; // 清除子弹
	}
};

var CBullets = NewO({
	EName: "CBullets", WasDestroy: false, // 名称 是否被销毁
	ImgScale: [1, 1], SpawnPos: [0, 0, 0], LstPos: [[0, 0, 0], [0, 0, 0]], Pos: [0, 0, 0], ImgPos: [0, 0], Speed: [0, 0, 0], // 基本位置信息
	Weight: [0, 0, 0], Gravity: [0, 0, 0], // 重力等施力情况
	MaxSpeed: [Infinity, Infinity, Infinity], MinSpeed: [-Infinity, -Infinity, -Infinity], // 最大、最小速度
	Border: [[0, 1000], [0, 1000], [0, 1000]], // 子弹运行坐标范围
	ID: null, Ele: null, Shadow: null, // 本体 + 影子的html
	PicArr: [], NormalGif: null, SplashGif: null, // 图片列表，子弹图片，被销毁后粒子效果
	Attack: null, R: null, C: null, zIndex: null, LastzIndex: null, // 攻击伤害，所在的行，先后层级
	ImgLeftMove: 0, Width: null, Height: null, HalfWid: null, HalfHei: null, // 子弹中心对准偏移量; 子弹坐标为子弹图片左上角坐标，因此要进行修正
	RegularR: null, Altitude: 1, // 子弹固定的行， 子弹高度，陆地子弹还是天上子弹
	Async_Picture: function () { let self = this; if (!self["Open_Async_Picture"]) return; self["PicArr"] = self["PicArr"]["map"]((D) => D && !/base64/["test"](D) ? self["RandomPic"](D) : D); }, // 图片异步处理，沿用植物的函数进行优化
	RandomPic: function (l) { let link = l + (l["indexOf"]('?') != -1 ? "&" : "?") + Math["random"](); return link; }, // 下次也可以对这两部分进行优化
	CheckOutLimit: (A, B) => B[0] > A || B[1] < A, // 判断数 A 是否在 [B[0], B[1]] 外
	CheckOut: (O) => O["CheckOutLimit"](O["Pos"][0], O["Border"][0]) || O["CheckOutLimit"](O["Pos"][1], O["Border"][1]) || O["CheckOutLimit"](O["Pos"][2], O["Border"][2]), // 判断是否出界
	Destroy: function () { let self = this; ClearChild(self["Ele"], self["Shadow"]), self["WasDestroy"] = true, oBu["Del"](self["ID"]); }, 
	Fresh: function (Tick) { let self = this; if (self["CheckOut"](self)) self["Die"]("Out_Limit"); self["Move"](Tick); }, // 刷新子弹，包括移动
	Move: function () { let self = this; self["Die"](); }, 
	Die: function () { let self = this; self["Destroy"](); }, 
	PrivateBirth: function () {}, // 特殊生成
	ConvertPos: function () { let self = this; self["ImgPos"][0] = self["Pos"][0], self["ImgPos"][1] = self["Pos"][2] - self["Pos"][1]; }, // 把三维的 Pos 转换成html的 ImgPos: [X, Z - Y]
	DataAdjust: function () { // 用于处理数据变动后某些被动值的修改情况
		let self = this, R = (self["RegularR"] ?? GetR(self["Pos"][2])); 
		self["ConvertPos"](), self["R"] = R, self["C"] = GetC(self["Pos"][0]); // 处理 ImgPos、 R
		self["zIndex"] = R * 3 + 2; // 子弹的图层
		self["HalfWid"] = self["Width"] / 2, self["HalfHei"] = self["Height"] / 2; // 处理半图片高便于确定中心位置
		self["LstPos"][0] = self["LstPos"][1], self["LstPos"][1] = self["Pos"]["concat"]();
	}, 
	CopyArr: function () { // 用于复制变量
		let self = this;
		self["LstPos"] = self["LstPos"]["concat"](), self["Pos"] = self["Pos"]["concat"](), self["ImgPos"] = self["ImgPos"]["concat"]();
		self["Weight"] = self["Weight"]["concat"](), self["Gravity"] = self["Gravity"]["concat"]();
		self["Speed"] = self["Speed"]["concat"](), self["Pos"] = self["Pos"]["concat"]();
		self["SpawnPos"] = self["SpawnPos"]["concat"](), self["ImgScale"] = self["ImgScale"]["concat"](); // 初始位置
		self["MaxSpeed"] = self["MaxSpeed"]["concat"](), self["MinSpeed"] = self["MinSpeed"]["concat"](); // 最大、小速度
	}, 
	ImageAdjust: function (Tick) { // 用于处理数据变动后图片位置等信息
		let self = this, Ele = self["Ele"], Shadow = self["Shadow"];

		let EleStyle = "translate(" + (self["ImgPos"][0] - self["SpawnPos"][0] - self["HalfWid"] - self["ImgLeftMove"]) + "px, " + (self["ImgPos"][1] - (self["SpawnPos"][2] - self["SpawnPos"][1]) - self["HalfHei"]) + "px) scale(" + self["ImgScale"][0] + "," + self["ImgScale"][1] + ")";
		let ShaStyle = "translate(" + (self["ImgPos"][0] - self["SpawnPos"][0] - 29 / 2) + "px, " + (self["Pos"][2] - self["SpawnPos"][2] - self["HalfHei"]) + "px)";

		if (__BulletsBeta__) {
			oEf.Animate(Ele, { transform: EleStyle }, Tick / 100, "linear");
			oEf.Animate(Shadow, { transform: ShaStyle }, Tick / 100, "linear");
		} else {
			Ele["style"]["transform"] = EleStyle;
			Shadow["style"]["transform"] = ShaStyle;
		}

		if (self["LastzIndex"] != self["zIndex"]) Ele["style"]["zIndex"] = Shadow["style"]["zIndex"] = self["zIndex"];
		self["LastzIndex"] = self["zIndex"];
	}, 
	Birth: function (DSetting = {}) { // 定义子弹生成规律
		let self = this, { PicArr = self["PicArr"] ?? [], X = 0, Y = 0, Z = 0, zIndex, dPreID = self["EName"], Attack = self["Attack"] ?? 20, NormalGif = self["NormalGif"], SplashGif = self["SplashGif"], Speed = [0, 0, 0], Assign } = DSetting;
		self["ID"] = ID = dPreID + oBu["Get_ID"]();
		self["Attack"] = Attack, self["PicArr"] = PicArr, self["Async_Picture"](), self["CopyArr"]();
		self["Pos"] = [X, Y, Z], self["SpawnPos"] = [X, Y, Z], self["Speed"] = Speed, self["DataAdjust"](); // 设置坐标以及图片坐标、当前行等操作
		self["LstPos"][0] = self["Pos"]["concat"](), self["LstPos"][1] = self["Pos"]["concat"](); // 备份初始数据
		self["zIndex"] = zIndex ?? (3 * self["R"] + 2), self["NormalGif"] = NormalGif, self["SplashGif"] = SplashGif; // 设置图片优先级
		self["Ele"] = NewImg(ID, self["PicArr"][self["NormalGif"]], "left:" + self["ImgPos"][0] + "px; top:" + self["ImgPos"][1] + "px; z-index:" + self["zIndex"] + "; will-change:transform;", EDPZ); // 设置图片
		self["Shadow"] = NewEle(ID + "_Shadow", "div", "z-index:1; opacity:0.5; background-size:29px; background-repeat:no-repeat; width:29px; top:" + (self["Pos"][2] + 30) + "px; left:" + self["Pos"][0] + "px; will-change:transform;", { className: "Shadow" }, EDPZ); // 设置影子
		Object["assign"](self, Assign), self["DataAdjust"](), oBu["Add"](self), self["PrivateBirth"](self), self["ImageAdjust"](0); // 自定义
		return self; // 返回
	}, 
}), 
oPeaBullet = InheritO(CBullets, {
	EName: "oPeaBullet", 
	PicArr: ["images/Plants/PeaBulletHit.gif", "images/Plants/PB-10.gif", "images/Plants/PB00.gif", "images/Plants/PB10.gif"], NormalGif: 2, SplashGif: 0,
	Speed: [0, 0, 0], Weight: [0, 0.01, 0], Gravity: [0, 0, 0], // 速度、重力等施力情况
	PeaProperty: 0, Width: 56, Height: 34, HalfWid: null, HalfHei: null, Direction: 0, // 图片等位置信息
	Attack: 20, NormalAttack: 20, ImgLeftMove: 12, BirthSpeed: 5, LastTorch: [null, null], // 豌豆图片对齐偏移量、 初始速度默认、 上次被加热的格子
	Altitude: 1, // 子弹高度，陆地子弹还是天上子弹
	PrivateChangeDire: function (Direction) {

	}, 
	ChangeDire: function (Direction) { // 改变方向（X坐标）
		let self = this; if (Direction == self["Direction"]) return;
		self["ImgScale"][0] = [1, -1][Direction], self["Direction"] = Direction, self["ImgLeftMove"] = [12, -12][Direction];
		self["PrivateChangeDire"](Direction); // 特殊转向
	}, 
	ChangePea: function (Kind = 0, Audio = false) { // 1: 加热;  -1: 制冷
		let self = this; self["PeaProperty"] = Math["max"](-1, Math["min"](1, self["PeaProperty"] + Kind));
		switch (self["PeaProperty"]) {
			case -1: self["NormalGif"] = 1, self["Width"] = 56, self["Height"] = 34, self["Attack"] = self["NormalAttack"]; break;
			case 0: self["NormalGif"] = 2, self["Width"] = 56, self["Height"] = 34, self["Attack"] = self["NormalAttack"]; break;
			case 1: self["NormalGif"] = 3, self["Width"] = 56, self["Height"] = 34, self["Attack"] = self["NormalAttack"] * 2; break;
		};
		Audio && PlayAudio("firepea"), self["Ele"]["src"] = self["PicArr"][self["NormalGif"]]; // 改变图片
	}, 
	RemoveMaxNum: function (Now, Add, Time, Mnum, IsMax) { // 用于处理加速度的情况下最大/小值扣除的数量
		let More = 0, MoreTime = 0, MoreT = 0; // 定义局部变量 
		if (IsMax ? (Now > Mnum) : (Now < Mnum)) MoreT = Time * (Now - Mnum), Now = Mnum;
		if (IsMax) More = (Now + Add * (Time - 1)) - Mnum, MoreTime = Add ? parseInt(More / Add) : 0;
		else More = Mnum - (Now + Add * (Time - 1)), MoreTime = Add ? parseInt(More / Add) : 0;
		IsMax = !!IsMax | 0, MoreT += (2 * (More % (Add ? Add : 1)) + MoreTime * Add) * ((MoreTime >= 0) ? (MoreTime + 1) : (MoreTime - 1)) / 2;
		return (More < 0 ? 0 : MoreT);
	}, 
	GetIntervalPos: function () { // 用于处理两次移动之间的直线距离数据
		let self = this, LPos = self["LstPos"][0], Pos = self["Pos"];
		let [X1, Y1, Z1] = LPos, [X2, Y2, Z2] = Pos, R1 = self["RegularR"] ?? GetR(Z1), R2 = self["RegularR"] ?? GetR(Z2), dR = R1 < R2 ? 1: -1;
		let Lst = Z1, Wei = [], Half = self["HalfWid"] * [1, -1][self["Direction"]];
		for (let i = 0, R = R1; dR * R < dR * R2; R += dR, ++i) Wei[i] = Lst - GetY(R + dR), (R + dR != R2) && (Lst = GetY(R + dR));
		Wei["push"](Lst - Z2);
		return [{ R: R1, X: X1 + Half }, { R: R2, X: X2 + Half }, Wei];
	}, 
	MoveSpecial: function (Tick) { // 用于除了纯移动外的其他内容，比如检测僵尸
		let self = this, ID = self["ID"], R = self["RegularR"] ?? self["R"], C = self["C"], Direction = (self["Speed"][0] >= 0 ? 0 : 1), PeaProperty = self["PeaProperty"];
		let Torch = oGd["$Torch"], MoveArr = self["GetIntervalPos"](), Zombie = oZ["getFirstZombie"](...MoveArr, self["Altitude"]);
		if (Torch[R + "_" + C] && (self["LastTorch"][0] != R || self["LastTorch"][1] != C)) self["LastTorch"] = [R, C], self["ChangePea"](1, true); // 点燃
		if (Zombie && Zombie["Altitude"] == self["Altitude"]) Zombie[["getSnowPea", "getPea", "getFirePea"][PeaProperty + 1]](Zombie, self["Attack"], Direction), self["Die"](); // 击中僵尸的情况
	}, 
	Move: function (Tick) { // 判断打到的僵尸的部分需要优化，又或者说可以直接在 oBu 处理好每行僵尸的查询
		let self = this, ID = self["ID"], R = self["RegularR"] ?? self["R"], C = self["C"], Direction = (self["Speed"][0] >= 0 ? 0 : 1);
		if (!self["WasDestroy"]) { // 移动，利用等差数列化简
			let dX = self["Weight"][0] * self["Gravity"][0], dY = self["Weight"][1] * self["Gravity"][1], dZ = self["Weight"][2] * self["Gravity"][2];
			let mX = self["RemoveMaxNum"](self["Speed"][0], dX, Tick, self["MaxSpeed"][0], 1), mY = self["RemoveMaxNum"](self["Speed"][1], dY, Tick, self["MaxSpeed"][1], 1), mZ = self["RemoveMaxNum"](self["Speed"][2], dZ, Tick, self["MaxSpeed"][2], 1);
			let nX = self["RemoveMaxNum"](self["Speed"][0], dX, Tick, self["MinSpeed"][0], 0), nY = self["RemoveMaxNum"](self["Speed"][1], dY, Tick, self["MinSpeed"][1], 0), nZ = self["RemoveMaxNum"](self["Speed"][2], dZ, Tick, self["MinSpeed"][2], 0);
			self["Pos"][0] += (2 * self["Speed"][0] + dX * (Tick - 1)) * Tick / 2 - mX - nX, self["Pos"][1] += (2 * self["Speed"][1] + dY * (Tick - 1)) * Tick / 2 - mY - nY, self["Pos"][2] += (2 * self["Speed"][2] + dZ * (Tick - 1)) * Tick / 2 - mZ - nZ; // Pos += [Spe + (Spe + Add * (Tick - 1))] * Tick / 2
			self["Speed"][0] += dX * Tick, self["Speed"][1] += dY * Tick, self["Speed"][2] += dZ * Tick; // Spe += Add * Tick;
			self["Speed"][0] = Math["min"](self["Speed"][0], self["MaxSpeed"][0]), self["Speed"][1] = Math["min"](self["Speed"][1], self["MaxSpeed"][1]), self["Speed"][2] = Math["min"](self["Speed"][2], self["MaxSpeed"][2]); // 取极点
			self["Speed"][0] = Math["max"](self["Speed"][0], self["MinSpeed"][0]), self["Speed"][1] = Math["max"](self["Speed"][1], self["MinSpeed"][1]), self["Speed"][2] = Math["max"](self["Speed"][2], self["MinSpeed"][2]); // 取极点
			self["DataAdjust"](), self["ChangeDire"](Direction), self["MoveSpecial"](Tick), self["ImageAdjust"](Tick); // 刷新图片
		}
	}, 
	Die: function () {
		let self = this, ID = self["ID"] + "_Splash", Ele;
		if (self["SplashGif"] != null) Ele = NewImg(ID, self["PicArr"][self["SplashGif"]], "left:" + (self["ImgPos"][0]) + "px; top:" + (self["ImgPos"][1] - 30) + "px; z-index:" + self["zIndex"] + "; width:46px; height:60px; position:absolute;", EDPZ);
		oSym["addTask"](10, ClearChild, [Ele]), self["Destroy"]();
	}, 
	BeThown: function (Angle, Dis) { // 以 x正半轴为方向 y正半轴 Angle° 扔出速度为 Dis 的自己，计算 X、Y 坐标所需要的速度
		let self = this; Angle = Angle * Math["PI"] / 180, self["Speed"][0] += Dis * Math["cos"](Angle), self["Speed"][1] += Dis * Math["sin"](Angle);
	},
	PrivateBirth: function () {
		let self = this; self["BeThown"](0, self["BirthSpeed"]), self["ChangePea"](0);
	}
}), 
oNormalBullet = InheritO(CBullets, { // 常规无任何效果的子弹、不带方向影响图片转弯的子弹
	EName: "oNormalBullet", 
	PicArr: ["images/Plants/PeaBulletHit.gif", "images/Plants/PB00.gif"], NormalGif: 1, SplashGif: 0,
	Speed: [0, 0, 0], Weight: [0, 0.01, 0], Gravity: [0, 0, 0], // 速度、重力等施力情况
	Width: 56, Height: 34, HalfWid: null, HalfHei: null, Direction: 0, ChangeDire: true, // 图片等位置信息
	Attack: 20, AbsLeftMove: 0, ImgLeftMove: 0, // 豌豆图片对齐偏移量、 初始速度默认、 上次被加热的格子
	Altitude: 1, // 子弹高度，陆地子弹还是天上子弹
	PrivateChangeDire: function (Direction) {  }, 
	ChangeDire: function (Direction) { // 改变方向（X坐标）
		let self = this; if (Direction == self["Direction"] || !self["ChangeDire"]) return;
		self["ImgScale"][0] = [1, -1][Direction], self["Direction"] = Direction, self["ImgLeftMove"] = [1, -1][Direction] * self["AbsLeftMove"];
		self["PrivateChangeDire"](Direction); // 特殊转向
	}, 
	RemoveMaxNum: oPeaBullet.prototype.RemoveMaxNum, // 用于处理加速度的情况下最大/小值扣除的数量
	GetIntervalPos: oPeaBullet.prototype.GetIntervalPos, 
	HitZombie: function (Zombie, Attack, Direction) {
		let self = this; Zombie["getPea"](Zombie, Attack, Direction); 
		return true;
	}, 
	MoveSpecial: function (Tick) {
		let self = this, ID = self["ID"], R = self["RegularR"] ?? self["R"], C = self["C"], Direction = (self["Speed"][0] >= 0 ? 0 : 1);
		let MoveArr = self["GetIntervalPos"](), Zombie = oZ["getFirstZombie"](...MoveArr, self["Altitude"]);
		if (Zombie && Zombie["Altitude"] == self["Altitude"]) self["HitZombie"](Zombie, self["Attack"], Direction) && self["Die"](); // 击中僵尸并确认销毁的情况
	}, 
	Move: oPeaBullet.prototype.Move, // 代码复用
	Die: function () {
		let self = this, ID = self["ID"] + "_Splash", Ele;
		if (self["SplashGif"] != null) Ele = NewImg(ID, self["PicArr"][self["SplashGif"]], "left:" + (self["ImgPos"][0]) + "px; top:" + (self["ImgPos"][1] - 30) + "px; z-index:" + self["zIndex"] + "; width:46px; height:60px; position:absolute;", EDPZ);
		oSym["addTask"](10, ClearChild, [Ele]), self["Destroy"]();
	}, 
	BeThown: function (Angle, Dis) { // 以 x正半轴为方向 y正半轴 Angle° 扔出速度为 Dis 的自己，计算 X、Y 坐标所需要的速度
		let self = this; Angle = Angle * Math["PI"] / 180, self["Speed"][0] += Dis * Math["cos"](Angle), self["Speed"][1] += Dis * Math["sin"](Angle);
	},
	PrivateBirth: function () {
		let self = this; self["ImgLeftMove"] = self["AbsLeftMove"];
	}
}), 
oFunctionBullet = InheritO(oNormalBullet, { // 函数子弹
	EName: "oNormalBullet", LiveTime: 0, 
	XFunction: function (Time) { return 0; }, 
	YFunction: function (Time) { return 0; }, 
	ZFunction: function (Time) { return 0; }, 
	Move: function (Tick) {
		let self = this;
		self["LiveTime"] += Tick; // 更新存活时间
		self["Pos"][0] = self["SpawnPos"][0] + self["XFunction"](self["LiveTime"]);
		self["Pos"][1] = self["SpawnPos"][1] + self["YFunction"](self["LiveTime"]);
		self["Pos"][2] = self["SpawnPos"][2] + self["ZFunction"](self["LiveTime"]);
		self["DataAdjust"](), self["MoveSpecial"](Tick), self["ImageAdjust"](Tick); // 刷新图片
	}, 
	PrivateBirth: function () {
		let self = this; 
		self["ImgLeftMove"] = self["AbsLeftMove"];
		self["LiveTime"] = 0;
	}
}), 
oThrownBullet = InheritO(oNormalBullet, { // 适用于单目标打击的投手子弹，速度会改变图片旋转

});