let __BulletImg_Mode__ = "Canvas"; // "Dom" | "Animate" | "Canvas" 三种不同展示方式

var oBu = {
	BList: {}, BKeys: [], DList: [], InitList: [], CanvasList: {}, NowData: 0, 
	Init: function () { 
		let self = this; self["BList"] = {}, self["BKeys"] = {}, self["DList"] = [], self["InitList"] = []; 
		for (let O in self["CanvasList"]) self["CanvasList"][O]["__Delete__"]();
		for (let R = 0; R <= oS["R"] + 1; ++R) {
			self["CanvasList"][R] = new oEffect({ Dev_Style: { width: 1500, height: 800, zIndex: R * 3 + 2, top: "-100px", left: "-100px" }, Width: 1500, Height: 800 }, EDPZ);
			self["CanvasList"][R + "_Shadow"] = new oEffect({ Dev_Style: { width: 1500, height: 800, zIndex: R * 3, top: "-100px", left: "-100px" }, Width: 1500, Height: 800 }, EDPZ);
		}
	}, 
	Get_ID: function () { return "_" + Math["random"](); }, 
	Del: function (Did) { let self = this; self["DList"]["push"](Did); }, 
	Add: function (Obj, dTime) { let self = this; self["BList"][Obj["ID"]] = Obj, self["InitList"]["push"]([dTime, Obj]); oGT.OnTrigger("BulletBirth", Obj) }, 
	ReBindingCanvas: function () { // 重新把所有的画布绑定 
		let self = this, CanvasList = self["CanvasList"]; 
		for (let Q in CanvasList) CanvasList[Q]["ReBinding"](); 
	}, 
	TraversalOf: function (Tick = 1) { // 批量处理子弹移动
		let self = this, BList = self["BList"], DList = self["DList"], InitList = self["InitList"], CanvasList = self["CanvasList"];
		self["NowData"] = new Date();
		for (let INObj of InitList) if (oSym.Now - INObj[0] > 0) INObj[1]["Fresh"](oSym.Now - INObj[0]); self["InitList"]["length"] = 0; // 调整初始时的偏移
		for (let Q in CanvasList) CanvasList[Q]["Clear_Canvas"]();
		for (let K in BList) BList[K]["Fresh"](Tick); // 刷新
		for (let D of DList) delete self["BList"][D]; self["DList"]["length"] = 0; // 清除子弹
	}
};

var CBullets = NewO({
	EName: "CBullets", WasDestroy: false, CreateTime: null, // 名称 是否被销毁 创建日期（游戏刻）
	ImgScale: [1, 1], SpawnPos: [0, 0, 0], LstPos: [[0, 0, 0], [0, 0, 0]], Pos: [0, 0, 0], ImgPos: [0, 0], ImgAngle: 0, Speed: [0, 0, 0], // 基本位置信息
	Weight: [0, 0, 0], Gravity: [0, 0, 0], // 重力等施力情况
	MaxSpeed: [Infinity, Infinity, Infinity], MinSpeed: [-Infinity, -Infinity, -Infinity], // 最大、最小速度
	Border: [[-100, 1000], [0, 1000], [-100, 1000]], // 子弹运行坐标范围
	ID: null, Ele: null, Shadow: null, EleURL: null, // 本体 + 影子的html
	PicArr: [], NormalGif: null, SplashGif: null, // 图片列表，子弹图片，被销毁后粒子效果
	Attack: null, R: null, C: null, zIndex: null, LastzIndex: null, // 攻击伤害，所在的行，先后层级
	ImgLeftMove: 0, Width: null, Height: null, HalfWid: null, HalfHei: null, // 子弹中心对准偏移量; 子弹坐标为子弹图片左上角坐标，因此要进行修正
	RegularR: null, Altitude: 1, // 子弹固定的行， 子弹高度，陆地子弹还是天上子弹
	Async_Picture: function () { let self = this; if (!self["Open_Async_Picture"]) return; self["PicArr"] = self["PicArr"]["map"]((D) => D && !/base64/["test"](D) ? self["RandomPic"](D) : D); }, // 图片异步处理，沿用植物的函数进行优化
	RandomPic: function (l) { let link = l + (l["indexOf"]('?') != -1 ? "&" : "?") + Math["random"](); return link; }, // 下次也可以对这两部分进行优化
	CheckOutLimit: (A, B) => B[0] > A || B[1] < A, // 判断数 A 是否在 [B[0], B[1]] 外
	CheckOut: (O) => O["CheckOutLimit"](O["Pos"][0], O["Border"][0]) || O["CheckOutLimit"](O["Pos"][1], O["Border"][1]) || O["CheckOutLimit"](O["Pos"][2], O["Border"][2]), // 判断是否出界
	Destroy: function () { 
		let self = this; // 如果是画布模式，则没有必要清除
		if (__BulletImg_Mode__ != "Canvas") ClearChild(self["Ele"], self["Shadow"]);
		self["WasDestroy"] = true, oBu["Del"](self["ID"]); 
	}, 
	Fresh: function (Tick) { let self = this; if (self["CheckOut"](self)) self["Die"]("Out_Limit"); self["Move"](Tick); }, // 刷新子弹，包括移动
	Move: function () { let self = this; self["Die"](); }, 
	Die: function () { let self = this; self["Destroy"](); }, 
	PrivateBirth: function () {}, // 特殊生成
	ConvertPos: function () { let self = this; self["ImgPos"][0] = self["Pos"][0], self["ImgPos"][1] = self["Pos"][2] - self["Pos"][1]; }, // 把三维的 Pos 转换成html的 ImgPos: [X, Z - Y]
	DataAdjust: function () { // 用于处理数据变动后某些被动值的修改情况
		let self = this, R = Number(self["RegularR"] ?? GetR(self["Pos"][2])); 
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

		if (__BulletImg_Mode__ == "Canvas") {
			let R = Number(self["RegularR"] ?? self["R"]), Ctx_Img = oBu["CanvasList"][R]["Ctx"], Ctx_Sha = oBu["CanvasList"][R + "_Shadow"]["Ctx"];
			let DX = self["ImgPos"][0] - self["HalfWid"] - self["ImgLeftMove"], DY = self["ImgPos"][1] - self["HalfHei"];
			let DWid = 100, DHei = 100, Time = (oBu["NowData"] - self["CreateTime"][0]) / 1000;

			oPTGif["DrawImage"](Ctx_Img, oPTG_Store["Get"](self["EleURL"], Time), DX + DWid, DY + DHei, self["ImgScale"][0], self["ImgScale"][1], self["ImgAngle"], self["EleURL"]);
			oPTGif["DrawImage"](Ctx_Sha, oPTG_Store["Get"]("Bullet_Shadow", Time), self["ImgPos"][0] - 29 / 2 + DWid, self["Pos"][2] - self["HalfHei"] + DHei + 30);
		} else {
			let EleStyle = "translate(" + (self["ImgPos"][0] - self["SpawnPos"][0] - self["HalfWid"] - self["ImgLeftMove"]) + "px, " + (self["ImgPos"][1] - (self["SpawnPos"][2] - self["SpawnPos"][1]) - self["HalfHei"]) + "px) scale(" + self["ImgScale"][0] + "," + self["ImgScale"][1] + ") rotate(" + self["ImgAngle"] + "deg)";
			let ShaStyle = "translate(" + (self["ImgPos"][0] - self["SpawnPos"][0] - 29 / 2) + "px, " + (self["Pos"][2] - self["SpawnPos"][2] - self["HalfHei"]) + "px)";

			if (__BulletImg_Mode__ == "Animate") {
				oEf.Animate(Ele, { transform: EleStyle }, Tick / 100, "linear");
				oEf.Animate(Shadow, { transform: ShaStyle }, Tick / 100, "linear");
			} else {
				Ele["style"]["transform"] = EleStyle;
				Shadow["style"]["transform"] = ShaStyle;
			}

			if (self["LastzIndex"] != self["zIndex"]) Ele["style"]["zIndex"] = Shadow["style"]["zIndex"] = self["zIndex"];
			self["LastzIndex"] = self["zIndex"];
		}

	}, 
	Birth: function (DSetting = {}) { // 定义子弹生成规律
		let self = this, { PicArr = self["PicArr"] ?? [], X = 0, Y = 0, Z = 0, RegularR, zIndex, dPreID = self["EName"], Attack = self["Attack"] ?? 20, NormalGif = self["NormalGif"], SplashGif = self["SplashGif"], Speed = [0, 0, 0], Assign } = DSetting;
		self["ID"] = ID = dPreID + oBu["Get_ID"](), self["CreateTime"] = [new Date(), oSym.Now];
		self["Attack"] = Attack, self["PicArr"] = PicArr, self["Async_Picture"](), self["CopyArr"]();
		self["Pos"] = [X, Y, Z], self["SpawnPos"] = [X, Y, Z], self["RegularR"] = RegularR, self["Speed"] = Speed, self["DataAdjust"](); // 设置坐标以及图片坐标、当前行等操作
		self["LstPos"][0] = self["Pos"]["concat"](), self["LstPos"][1] = self["Pos"]["concat"](); // 备份初始数据
		self["zIndex"] = zIndex ?? (3 * self["R"] + 2), self["NormalGif"] = NormalGif, self["SplashGif"] = SplashGif; // 设置图片优先级
		self["EleURL"] = self["PicArr"][self["NormalGif"]]; // 设置图片地址
	
		if (__BulletImg_Mode__ != "Canvas") { // 画布模式特判
			self["Ele"] = NewImg(ID, self["PicArr"][self["NormalGif"]], "left:" + self["ImgPos"][0] + "px; top:" + self["ImgPos"][1] + "px; z-index:" + self["zIndex"] + "; will-change:transform;", (__BulletImg_Mode__ == "Canvas" ? null: EDPZ)); // 设置图片
			self["Shadow"] = NewEle(ID + "_Shadow", "div", "z-index:1; opacity:0.5; background-size:29px; background-repeat:no-repeat; width:29px; top:" + (self["Pos"][2] + 30) + "px; left:" + self["Pos"][0] + "px; will-change:transform;", { className: "Shadow" }, (__BulletImg_Mode__ == "Canvas" ? null: EDPZ)); // 设置影子
		} else {
			self["Ele"] = self["Shadow"] = { "src": self["PicArr"][self["NormalGif"]] };
		}
	
		Object["assign"](self, Assign), self["DataAdjust"](), self["PrivateBirth"](self), self["ImageAdjust"](0), oBu["Add"](self, self["CreateTime"][1]); // 自定义
		return self; // 返回
	}, 
}), 
oPeaBullet = InheritO(CBullets, {
	EName: "oPeaBullet", 
	PicArr: ["images/Plants/PeaBulletHit.gif", "images/Plants/PB-10.gif", "images/Plants/PB00.gif", "images/Plants/PB10.gif"], NormalGif: 2, SplashGif: 0,
	Speed: [0, 0, 0], Weight: [0, 0.1, 0], Gravity: [0, 0, 0], // 速度、重力等施力情况
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
		Audio && PlayAudio("firepea"), self["EleURL"] = self["Ele"]["src"] = self["PicArr"][self["NormalGif"]]; // 改变图片
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
		let [X1, Y1, Z1] = LPos, [X2, Y2, Z2] = Pos, R1 = Number(self["RegularR"] ?? GetR(Z1)), R2 = Number(self["RegularR"] ?? GetR(Z2)), dR = R1 < R2 ? 1: -1;
		let Lst = Z1, Wei = [], Half = self["HalfWid"] * [1, -1][self["Direction"]];
		for (let i = 0, R = R1; dR * R < dR * R2; R += dR, ++i) Wei[i] = Lst - GetY(R + dR), (R + dR != R2) && (Lst = GetY(R + dR));
		Wei["push"](Lst - Z2);
		return [{ R: R1, X: X1 + Half }, { R: R2, X: X2 + Half }, Wei];
	}, 
	MoveSpecial: function (Tick) { // 用于除了纯移动外的其他内容，比如检测僵尸
		let self = this, ID = self["ID"], R = Number(self["RegularR"] ?? self["R"]), C = self["C"], Direction = (self["Speed"][0] >= 0 ? 0 : 1), PeaProperty = self["PeaProperty"];
		let Torch = oGd["$Torch"], MoveArr = self["GetIntervalPos"](), Zombie = oZ["getFirstZombie"](...MoveArr, self["Altitude"]);
		if (Torch[R + "_" + C] && (self["LastTorch"][0] != R || self["LastTorch"][1] != C)) self["LastTorch"] = [R, C], self["ChangePea"](1, true); // 点燃
		if (Zombie && Zombie["Altitude"] == self["Altitude"]) Zombie[["getSnowPea", "getPea", "getFirePea"][PeaProperty + 1]](Zombie, self["Attack"], Direction), self["Die"](); // 击中僵尸的情况
	}, 
	Move: function (Tick) { // 判断打到的僵尸的部分需要优化，又或者说可以直接在 oBu 处理好每行僵尸的查询
		let self = this, ID = self["ID"], R = Number(self["RegularR"] ?? self["R"]), C = self["C"], Direction = (self["Speed"][0] >= 0 ? 0 : 1);
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
	Die: function (Reason) {
		let self = this, O = self, ID = self["ID"] + "_Splash", Ele;
		if (Reason == "Out_Limit" && !O["CheckOutLimit"](O["Pos"][1], O["Border"][1])) return self["Destroy"]();
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
	Speed: [0, 0, 0], Weight: [0, 0.15, 0], Gravity: [0, 0, 0], // 速度、重力等施力情况
	Width: 56, Height: 34, HalfWid: null, HalfHei: null, Direction: 0, CanChangeDire: true, // 图片等位置信息
	Attack: 20, AbsLeftMove: 0, ImgLeftMove: 0, // 攻击伤害等
	Altitude: 1, // 子弹高度，陆地子弹还是天上子弹
	PrivateChangeDire: function (Direction) {  }, 
	ChangeDire: function (Direction) { // 改变方向（X坐标）
		let self = this; if (Direction == self["Direction"] || !self["CanChangeDire"]) return;
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
		let self = this, ID = self["ID"], R = Number(self["RegularR"] ?? self["R"]), C = self["C"], Direction = (self["Speed"][0] >= 0 ? 0 : 1);
		let MoveArr = self["GetIntervalPos"](), Zombie = oZ["getFirstZombie"](...MoveArr, self["Altitude"]);
		if (Zombie && Zombie["Altitude"] == self["Altitude"]) self["HitZombie"](Zombie, self["Attack"], Direction) && self["Die"](); // 击中僵尸并确认销毁的情况
	}, 
	Move: oPeaBullet.prototype.Move, // 代码复用
	Die: function (Reason) {
		let self = this, O = self, ID = self["ID"] + "_Splash", Ele;
		if (Reason == "Out_Limit" && !O["CheckOutLimit"](O["Pos"][1], O["Border"][1])) return self["Destroy"]();
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
	EName: "oThrownBullet", 
	PicArr: ["new_skin/Images/Plants/Cabbage/BulletHit.gif", "new_skin/Images/Plants/Cabbage/Bullet.png"], NormalGif: 1, SplashGif: 0,
	Speed: [0, 0, 0], Weight: [0, 0.2, 0], Gravity: [0, -1, 0], // 速度、重力等施力情况
	Width: 30, Height: 30, HalfWid: null, HalfHei: null, Direction: 0, CanChangeDire: true, // 图片等位置信息、方向、是否可改变方向
	SplashTime: 120, SplashMoveLeft: 25, SplashMoveTop: 30, // 特效时间、位移
	Altitude: 1, TaskZombie: null, HitZombieTime: 90, FlyMaxHei: 250, HitAudio: null, NormalHitAudio: "splat1", // 子弹高度、目标僵尸、命中时间、最大高度、默认击中音频、落地音频
	GetAngle: (X, Y, lastX, lastY) => 180 / Math.PI * Math.atan2(Y - lastY, X - lastX), // 获取子弹旋转角度
	ChangeDire: function (Direction) { // 改变方向（X坐标）
		let self = this; if (!self["CanChangeDire"]) return;
		self["ImgAngle"] = self["GetAngle"](self["LstPos"][1][0], self["LstPos"][1][1], self["LstPos"][0][0], self["LstPos"][0][1], self["ImgAngle"]);
		self["PrivateChangeDire"](Direction); // 特殊转向
	}, 
	HitZombie: function (Zombie, Attack) {
		let self = this; (self["HitAudio"] ? PlayAudio(self["HitAudio"]) : Zombie["getPea"](Zombie, 0)), Zombie["getHit2"](Zombie, Attack); return true;
	}, 
	MoveSpecial: function (Tick) {
		let self = this, ID = self["ID"], R = Number(self["RegularR"] ?? self["R"]), C = self["C"], TaskZombie = self["TaskZombie"];
		if (TaskZombie == null || !$Z[TaskZombie["id"]]) return;

		let Z = TaskZombie, Head = Z.HeadTargetPosition, HeadPos = Head[Z.isAttacking] || Head[0]; // 僵尸和僵尸头部坐标
		let zY = parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + HeadPos.y; // 僵尸绝对纵坐标

		if (self["ImgPos"][0] >= parseInt(TaskZombie.Ele.style.left) + HeadPos.x && self["ImgPos"][1] >= zY) self["HitZombie"](TaskZombie, self["Attack"], self) && self["Die"](); // 击中僵尸并确认销毁的情况
	}, 
	Move: oPeaBullet.prototype.Move, // 代码复用
	BeThown: function (Angle, Dis) { // 以 x正半轴为方向 y正半轴 Angle° 扔出速度为 Dis 的自己，计算 X、Y 坐标所需要的速度
		let self = this; Angle = Angle * Math["PI"] / 180, self["Speed"][0] += Dis * Math["cos"](Angle), self["Speed"][1] += Dis * Math["sin"](Angle);
	}, 
	Die: function (Reason) { // 模块化
		let self = this, O = self, ID = self["ID"] + "_Splash", Ele;
		if (Reason == "Out_Limit" && !O["CheckOutLimit"](O["Pos"][1], O["Border"][1])) return self["Destroy"]();
		if (Reason == "Out_Limit") self["NormalHitAudio"] && PlayAudio(self["NormalHitAudio"]); // 如果是出界导致的，播放音频
		if (self["SplashGif"] != null) Ele = NewImg(ID, self["PicArr"][self["SplashGif"]] + "?" + Math.random(), "left:" + (self["ImgPos"][0] - self["SplashMoveLeft"]) + "px; top:" + (self["ImgPos"][1] - self["SplashMoveTop"]) + "px; z-index:" + self["zIndex"] + "; width:46px; height:60px; position:absolute;", EDPZ);
		oSym["addTask"](self["SplashTime"], ClearChild, [Ele]), self["Destroy"]();
	}, 

	// 根据点与点的关系计算出速度以及加速度
	GetZombieFunc: function (TaskZombie, MaxY, Time) { // 计算从这里到目标僵尸，经过最大值 MaxY 对应的函数解析式
		let self = this, X = self["ImgPos"][0], Y = self["ImgPos"][1];
		if (TaskZombie == null) return [-0.002, 0.002 * 700];
		let Z = TaskZombie, Head = Z.HeadTargetPosition, HeadPos = Head[Z.isAttacking] || Head[0]; // 僵尸和僵尸头部坐标
		let zSpeed = !TaskZombie.isAttacking * TaskZombie.Speed * (TaskZombie.WalkDirection == 0 ? 1 : -1); // 是否攻击 * 速度 * 方向
		let zY = Y - (parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + HeadPos.y); // 僵尸绝对纵坐标
		let zX = parseInt(TaskZombie.Ele.style.left) + HeadPos.x; // 投出时僵尸横坐标
		let dX = zX - X - zSpeed * (Time * (zX / 900)) / (oP.ZTimeStep); // 计算坐标差

		return (() => {
			/* 
				将 (X3, Y3) 代入 f(x) = ax^2 + bx 得
				① X3 ^ 2 * a + X3 * b = Y3
				将抛物线最大值 Y2 利用公式可得
				② b ^ 2 / 4a = - Y2
				所以得到
				③ a = - b ^ 2 / 4Y2
				因此，将 ③ 代入 ① 得到
				- X3 ^ 2 / 4Y2 * b ^ 2 + X3 * b - Y3 = 0
				可知 a = X3 ^ 2 / 4Y2, b = X3, c = -Y3 根据公式法求出结果
			*/
			let A = 0, B = 0, Y2 = MaxY, X3 = dX, Y3 = zY;
			let a = - X3 * X3 / 4 / Y2, b = X3, c = -Y3, dlt = Math.sqrt(b * b - 4 * a * c);
			B = (- b - dlt) / (2 * a), A = - B * B / 4 / Y2;
			return [A, B];
		})();
/*
		let A = MaxY / (dX * dX / 4 - dX * dX / 2), B = - A * dX; // 计算系数
		return [A, B];
*/
	}, 
	CalcFuncVal: function (A, B, T) { // 将 y = Ax ^ 2 + Bx 转换成速度
		let self = this, x0 = - B / (2 * A), y0 = A * x0 * x0 + B * x0; // 顶点坐标
		self["Speed"][0] = 2 * x0 / T;
		self["Speed"][1] = 2 * (y0 * 2) / T;
		self["Weight"][1] = 2 * (y0 * 4) / (T * T);
	}, 
	GetTaskZombie: function () {
		let self = this, X0 = self["Pos"][0], X1 = 1000, R = Number(self["RegularR"] ?? self["R"]);
		return oZ.getRangeLeftZ(X0, X1, R, 1, (Z) => !Z.WasDied);
	}, 

	PrivateBirth: function () {
		let self = this; self["ImgLeftMove"] = 0, self["TaskZombie"] = self["GetTaskZombie"](); // 旋转图片无偏移
		let [X, Y] = self["GetZombieFunc"](self["TaskZombie"], self["FlyMaxHei"], self["HitZombieTime"]); // 计算目标位置
		self["CalcFuncVal"](X, Y, self["HitZombieTime"]); // 计算速度
	}
});

let GetRandZ = () => {
	for (let O in $Z) return $Z[O];
}