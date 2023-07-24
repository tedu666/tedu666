(() => {
	// 部分代码结构学习于旅行
	var ClearChild = (...arr) => arr.forEach(ele => ele?.parentNode && ele.parentNode.removeChild(ele)); 

	var oBu = {
		BList: {}, BKeys: [], DList: [], 
		Init: function () { let self = this; self["BList"] = {}, self["BKeys"] = {}; }, 
		Get_ID: function () { return "_" + Math["random"](); }, 
		Del: function (Did) { let self = this; self["DList"]["push"](Did); }, 
		Add: function (Obj) { let self = this; self["BList"][Obj["ID"]] = Obj; }, 
		TraversalOf: function (Tick) { // 批量处理子弹移动
			let self = this, BList = self["BList"], DList = self["DList"];
			for (let K in BList) BList[K]["Fresh"](Tick); // 刷新
			for (let D of DList) delete self["BList"][D]; self["DList"]["length"] = 0; // 清除子弹
		}
	};	

	var CBullets = NewO({
		EName: "CBullets", WasDestroy: false, // 名称 是否被销毁
		ImgScale: [1, 1], SpawnPos: [0, 0, 0], Pos: [0, 0, 0], ImgPos: [0, 0], Speed: [0, 0, 0], // 基本位置信息
		Weight: [0, 0, 0], Gravity: [0, 0, 0], // 重力等施力情况
		Border: [[0, 1000], [0, 1000], [0, 1000]], // 子弹运行坐标范围
		ID: null, Ele: null, Shadow: null, // 本体 + 影子的html
		PicArr: [], NormalGif: null, SplashGif: null, // 图片列表，子弹图片，被销毁后粒子效果
		Attack: null, R: null, C: null, zIndex: null, // 攻击伤害，所在的行，先后层级
		ImgLeftMove: 0, Width: null, Height: null, HalfWid: null, HalfHei: null, // 子弹中心对准偏移量; 子弹坐标为子弹图片左上角坐标，因此要进行修正
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
			let self = this; self["ConvertPos"](), self["R"] = GetR(self["Pos"][2]), self["C"] = GetC(self["Pos"][0]); // 处理 ImgPos、 R
			self["zIndex"] = GetR(self["Pos"][2]) * 3 + 2; // 子弹的图层
			self["HalfWid"] = self["Width"] / 2, self["HalfHei"] = self["Height"] / 2; // 处理半图片高便于确定中心位置
		}, 
		CopyArr: function () { // 用于复制变量
			let self = this;
			self["Pos"] = self["Pos"]["concat"](), self["ImgPos"] = self["ImgPos"]["concat"]();
			self["Weight"] = self["Weight"]["concat"](), self["Gravity"] = self["Gravity"]["concat"]();
			self["Speed"] = self["Speed"]["concat"](), self["Pos"] = self["Pos"]["concat"]();
			self["SpawnPos"] = self["SpawnPos"]["concat"](), self["ImgScale"] = self["ImgScale"]["concat"](); // 初始位置
		}, 
		ImageAdjust: function () { // 用于处理数据变动后图片位置等信息
			let self = this, Ele = self["Ele"], Shadow = self["Shadow"];

			Ele["style"]["transform"] = "translate(" + (self["ImgPos"][0] - self["SpawnPos"][0] - self["HalfWid"] - self["ImgLeftMove"]) + "px, " + (self["ImgPos"][1] - (self["SpawnPos"][2] - self["SpawnPos"][1]) - self["HalfHei"]) + "px) scale(" + self["ImgScale"][0] + "," + self["ImgScale"][1] + ")";
			Shadow["style"]["transform"] = "translate(" + (self["ImgPos"][0] - self["SpawnPos"][0] - 29 / 2) + "px, " + (self["Pos"][2] - self["SpawnPos"][2] + 30 - self["HalfHei"]) + "px)";

			Ele["style"]["zIndex"] = Shadow["style"]["zIndex"] = self["zIndex"];
		}, 
		Birth: function (DSetting = {}) { // 定义子弹生成规律
			let self = this, { PicArr = self["PicArr"] ?? [], X = 0, Y = 0, Z = 0, zIndex, dPreID = self["EName"], Attack = self["Attack"] ?? 20, NormalGif = self["NormalGif"], SplashGif = self["SplashGif"], Speed = [0, 0, 0], Assign } = DSetting;
			self["ID"] = ID = dPreID + oBu["Get_ID"]();
			self["Attack"] = Attack, self["PicArr"] = PicArr, self["Async_Picture"](), self["CopyArr"]();
			self["Pos"] = [X, Y, Z], self["SpawnPos"] = [X, Y, Z], self["Speed"] = Speed, self["DataAdjust"](); // 设置坐标以及图片坐标、当前行等操作
			self["zIndex"] = zIndex ?? (3 * self["R"] + 2), self["NormalGif"] = NormalGif, self["SplashGif"] = SplashGif; // 设置图片优先级
			self["Ele"] = NewImg(ID, self["PicArr"][self["NormalGif"]], "left:" + self["ImgPos"][0] + "px; top:" + self["ImgPos"][1] + "px; z-index:" + self["zIndex"] + "; will-change:transform;", EDPZ); // 设置图片
			self["Shadow"] = NewEle(ID + "_Shadow", "div", "z-index:1; opacity:0.5; background-size:29px; background-repeat:no-repeat; width:29px; top:" + (self["Pos"][2] + 30) + "px; left:" + self["Pos"][0] + "px; will-change:transform;", { className: "Shadow" }, EDPZ); // 设置影子
			Object["assign"](self, Assign), oBu["Add"](self), self["PrivateBirth"](self), self["ImageAdjust"](); // 自定义
			return self; // 返回
		}, 
	}), 
	oPeaBullet = InheritO(CBullets, {
		EName: "oPeaBullet", 
		PicArr: ["images/Plants/PeaBulletHit.gif", "images/Plants/PB-10.gif", "images/Plants/PB00.gif", "images/Plants/PB10.gif"], NormalGif: 2, SplashGif: 0,
		Speed: [0, 0, 0], Weight: [0, 0.01, 0], Gravity: [0, 0, 0], // 速度、重力等施力情况
		PeaProperty: 0, Width: 56, Height: 34, HalfWid: null, HalfHei: null, Direction: 0, // 图片等位置信息
		Attack: 20, NormalAttack: 20, ImgLeftMove: 12, BirthSpeed: 5, LastTorch: [null, null], // 豌豆图片对齐偏移量、 初始速度默认、 上次被加热的格子
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
		Move: function (Tick) { // 判断打到的僵尸的部分需要优化，又或者说可以直接在 oBu 处理好每行僵尸的查询
			let self = this, ID = self["ID"], R = self["R"], C = self["C"], Direction = (self["Speed"][0] >= 0 ? 0 : 1), PeaProperty = self["PeaProperty"];
			let Torch = oGd["$Torch"], Zombie = oZ["getZ" + Direction](self["Pos"][0] + self["HalfWid"] * [1, -1][Direction], R);
			if (Torch[R + "_" + C] && (self["LastTorch"][0] != R || self["LastTorch"][1] != C)) self["LastTorch"] = [R, C], self["ChangePea"](1, true); // 点燃
			if (Zombie && Zombie["Altitude"] == 1) Zombie[["getSnowPea", "getPea", "getFirePea"][PeaProperty + 1]](Zombie, self["Attack"]), self["Die"](); // 击中僵尸的情况
			else { // 移动，利用等差数列化简
				let dX = self["Weight"][0] * self["Gravity"][0], dY = self["Weight"][1] * self["Gravity"][1], dZ = self["Weight"][2] * self["Gravity"][2];
				self["Pos"][0] += (2 * self["Speed"][0] + dX * (Tick - 1)) * Tick / 2, self["Pos"][1] += (2 * self["Speed"][1] + dY * (Tick - 1)) * Tick / 2, self["Pos"][2] += (2 * self["Speed"][2] + dZ * (Tick - 1)) * Tick / 2; // Pos += [Spe + (Spe + Add * (Tick - 1))] * Tick / 2
				self["Speed"][0] += dX * Tick, self["Speed"][1] += dY * Tick, self["Speed"][2] += dZ * Tick; // Spe += Add * Tick;
				self["DataAdjust"](), self["ChangeDire"](Direction), self["ImageAdjust"](); // 刷新图片
			}
		}, 
		Die: function () {
			let self = this, ID = self["ID"] + "_Splash";
			let Ele = NewImg(ID, self["PicArr"][self["SplashGif"]], "left:" + (self["ImgPos"][0]) + "px; top:" + (self["ImgPos"][1] - 30) + "px; z-index:" + self["zIndex"] + "; width:46px; height:60px; position:absolute;", EDPZ);
			oSym["addTask"](10, ClearChild, [Ele]), self["Destroy"]();
		}, 
		BeThown: function (Angle, Dis) { // 以 x正半轴为方向 y正半轴 Angle° 扔出速度为 Dis 的自己，计算 X、Y 坐标所需要的速度
			let self = this; Angle = Angle * Math["PI"] / 180, self["Speed"][0] += Dis * Math["cos"](Angle), self["Speed"][1] += Dis * Math["sin"](Angle);
		},
		PrivateBirth: function () {
			let self = this; self["BeThown"](0, self["BirthSpeed"]), self["ChangePea"](0);
		}
	});



	let f = (T = 5) => {
		(function() { oBu["TraversalOf"](3); oSym.addTask(3, arguments.callee); })();
	};



	var oPea1 = InheritO(oPeashooter, {
		EName: "oPea1",
		CName: "豌豆射手 - 导弹",
		NormalAttack: function() {
			let self = this, Bul = new oPeaBullet();
			Bul["Birth"]({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, Assign: {Weight: [0.03, 0.01, 1], Gravity: [-1, 0, 0] }});
		}
	}),
	oPea2 = InheritO(oPeashooter, {
		EName: "oPea2",
		CName: "豌豆射手 - 虚狗",
		NormalAttack: function() {
			let self = this, Bul = new oPeaBullet();
			Bul["Birth"]({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, Assign: {Weight: [0, 0.1, 1], Gravity: [0, -10, 0] }});
		}
	}),
	oPea3 = InheritO(oPeashooter, {
		EName: "oPea3",
		CName: "豌豆射手 - 对不准射手",
		NormalAttack: function() {
			let self = this, Bul = new oPeaBullet();
			Bul["Birth"]({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, Assign: {Weight: [0, 0.1, 1], Gravity: [0, 10, 0] }});
		}
	}),
	oPea4 = InheritO(oPeashooter, {
		EName: "oPea4",
		CName: "豌豆射手 - 抛物线射手",
		NormalAttack: function() {
			let self = this, Bul = new oPeaBullet();
			Bul["Birth"]({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, 
				Assign: {
					Weight: [0, 0.025, 1], Gravity: [0, -10, 0], 
					PrivateBirth: function () {
						let self = this; self["BeThown"](60, 10), self["ChangePea"](0);
					} 
				}
			});
		}
	}), 
	oPea5 = InheritO(oSnowPea, {
		EName: "oPea5",
		CName: "寒冰投手",
		NormalAttack: function() {
			let self = this, Bul = new oPeaBullet();
			Bul["Birth"]({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, 
				Assign: {
					Weight: [0, 0.025, 1], Gravity: [0, -10, 0], PeaProperty: -1, 
					PrivateBirth: function () {
						let self = this; self["BeThown"](60, 10), self["ChangePea"](0);
					} 
				}
			});
		}
	}), 
	oPea6 = InheritO(oSnowPea, {
		EName: "oPea6",
		CName: "寒冰射手 - 导弹射手",
		NormalAttack: function() {
			let self = this, Bul = new oPeaBullet();
			Bul["Birth"]({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, 
				Assign: {
					Weight: [0.05, 0, 0], Gravity: [1, -10, 0], PeaProperty: -1, 
					PrivateBirth: function () {
						let self = this; self["BeThown"](0, 0), self["ChangePea"](0);
					} 
				}
			});
		}
	}),
	oPea7 = InheritO(oSnowPea, {
		EName: "oPea7",
		CName: "寒冰射手 - 乱射射手",
		NormalAttack: function() {
			let self = this, Bul = new oPeaBullet();
			Bul["Birth"]({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, 
				Assign: {
					Weight: [0.02, 0, 0.01], Gravity: [-10, -10, -10], PeaProperty: -1, 
					PrivateBirth: function () {
						let self = this; self["BeThown"](0, 12.5), self["ChangePea"](0);
					} 
				}
			});
		}
	}), 
	oPea8 = InheritO(oSnowPea, {
		EName: "oPea8",
		CName: "寒冰射手 - 霰弹枪",
		NormalAttack: function() {
			let self = this;
			for (let i = 1; i <= 10; ++i) {
				let Pea = new oPeaBullet();
				Pea.Birth({ X: self["AttackedLX"] + 26, Y: 45, Z: self["pixelTop"] + 60, 
					Assign: {
						Weight: [Math.random() * 0.04, 0.01, Math.random() * 0.05 - 0.025], Gravity: [-1, 0, 1], PeaProperty: -1
					} 
				});
			}
		}
	});


	oS.Init({
		PName: [oPea1, oPea2, oPea3, oPea5, oPea6, oPea7, oPea8, oTorchwood, oTorchwood_Pro, oTallNut],
		ZName: [oZombie],
		PicArr: ["images/interface/background1.jpg"],
		backgroundImage: "images/interface/background1.jpg",
		CanSelectCard: 0,
		SunNum: Infinity, MaxSunNum: Infinity, Cheat_Mode: true,
		LevelName: "小游戏：你的心脏够强劲吗？",
		LvlEName: "TestUHeart",
		LargeWaveFlag: {
			1 : $("imgFlag1")
		},
		StartGameMusic: "Watery Graves",
		StartGame: function() {
			f(), SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
			var a = NewEle("DivTeach", "div", "line-height:40px;font-size: 14px", 0, EDAll);
			NewEle("spanT", "span", "position:absolute;left:0;width:620px;text-align: center; font-family: 幼圆; font-size: 14px;line-height:50px", 0, a);
			NewEle("btnClick1", "span", "cursor:pointer;position:absolute;left:550px;height:40px;width:40px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
			NewEle("btnClick2", "span", "cursor:pointer;position:absolute;left:600px;height:40px;width:60px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
			NewEle("btnClick3", "span", "cursor:pointer;position:absolute;left:670px;height:40px;width:60px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
			NewEle("btnClick4", "span", "cursor:pointer;position:absolute;left:740px;height:40px;width:140px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
			innerText($("spanT"), "测试一下CPU和浏览器是否强劲？打开任务管理器，点击开始吧！");
			innerText($("btnClick1"), "10"), innerText($("btnClick2"), "100"), innerText($("btnClick3"), "500"), innerText($("btnClick4"), "翠花,上5000个!!");
			oP.Monitor({
				ar: [0],
				f: function() {
					var c = $User.Browser,
					b = function() {
						StopMusic();
						PlayMusic(oS.LoadMusic = oS.StartGameMusic);
						oS.InitLawnMower();
						PrepareGrowPlants(function() {
							BeginCool();
							AutoProduceSun(25);
							oP.AddZombiesFlag();
							SetVisible($("dFlagMeterContent"))
						})
					};
					$("btnClick1").onclick = function() {
						oP.FlagToSumNum.a2 = [10], ClearChild($("DivTeach")), b()
					};
					$("btnClick2").onclick = function() {
						oP.FlagToSumNum.a2 = [100], ClearChild($("DivTeach")), b()
					};
					$("btnClick3").onclick = function() {
						oP.FlagToSumNum.a2 = [500], ClearChild($("DivTeach")), b()
					};
					$("btnClick4").onclick = function() {
						oP.FlagToSumNum.a2 = [5000], ClearChild($("DivTeach")), b()
					}; 
					(c.IE9 || !c.IE) && (oS.LvlClearFunc = function() {
						oP.SelectFlagZombie = oP.OldSelectFlagZombie
					},
					oP.OldSelectFlagZombie = oP.SelectFlagZombie, oP.SelectFlagZombie = function(h) {
						var i = oP,
						g = [],
						f = 1,
						j = i.ArZ,
						m = [],
						k = [],
						e = 30,
						d = EDPZ.cloneNode(true);
						oS.LargeWaveFlag[i.FlagZombies].style.top = "5px"; --h;
						k[0] = (m[0] = (new oFlagZombie)).prepareBirth(0);
						while (h--) {
							k[f] = (m[f++] = new oZombie).prepareBirth(e);
							e += 5
						}
						i.NumZombies += f;
						d.innerHTML = EDPZ.innerHTML + k.join("");
						EDAll.replaceChild(d, EDPZ);
						EDPZ = d;
						while (f--) {
							m[f].Birth()
						}
					})
				}
			})
		}
	},
	{
		NormalFlagZombieTask: 1,
		BigFlagZombieTask: 1,
		AZ: [[oZombie, 30, 1]],
		FlagNum: 1,
		FlagToSumNum: {
			a1: [],
			a2: [1000]
		},
		FlagToMonitor: {
			1 : [ShowFinalWave, 0]
		}
	}, {
		CBullets: CBullets, 
		oBu: oBu, 
		oPeaBullet: oPeaBullet, 
		oPea1: oPea1, 
		oPea2: oPea2,
		oPea3: oPea3,
		oPea4: oPea4,  
		oPea5: oPea5,  
		oPea6: oPea6,  
		oPea7: oPea7,  
		f: f 
	});
})();