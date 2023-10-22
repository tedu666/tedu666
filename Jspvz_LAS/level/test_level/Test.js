(() => {
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
				Pea.Birth({ X: self["AttackedLX"] + 26, Y: 30, Z: self["pixelTop"] + 45, 
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
			SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
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
		oPea1: oPea1, 
		oPea2: oPea2,
		oPea3: oPea3,
		oPea4: oPea4,  
		oPea5: oPea5,  
		oPea6: oPea6,  
		oPea7: oPea7,  
	});
})();