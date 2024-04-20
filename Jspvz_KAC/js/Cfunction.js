var MAX_PLT_INDEX = 4, MIN_PLT_INDEX;
var __Normal_Start_Room__ = 0, __ONLINE_ALLOW_FRESH__ = true;
var __Open_Async_Picture__ = false; //开启动画异步

var $User = function() {
	var b = navigator.platform,
	i = navigator.userAgent,
	f = (b == "Win32" || b == "Windows"),
	g = (b == "Mac68K" || b == "MacPPC" || b == "Macintosh"),
	d = (b == "X11" && !f && !g),
	h = f || g || d,
	a = "lonelystar.org",
	c = !!(window.attachEvent && !window.opera),
	e = c && !window.XMLHttpRequest,
	j = location.protocol.toLowerCase() == "http:" ? 1 : 0;
	$Random = j ? "#": "?";
	innerText = c ?
	function(l, k) {
		l.innerText = k
	}: function(l, k) {
		l.textContent = k
	};
	e ? (document.execCommand("BackgroundImageCache", false, true), ShadowPNG = "images/interface/plantshadow8.gif") : ShadowPNG = "images/interface/plantshadow32.png";
	return {
		VersionName: "KAC", 
		Browser: {
			IE: c,
			IE6: e,
			IE9: c && i.indexOf("MSIE 9.0") > 0,
			Opera: !!window.opera,
			WebKit: i.indexOf("AppleWebKit/") > -1,
			Gecko: i.indexOf("Gecko") > -1 && i.indexOf("KHTML") == -1
		},
		Server: {
			List: [["1号(电信)", "http://pvz1.jspvz.com/", "NaN"], ["2号(联通)", "http://pvz2.jspvz.com/", "NaN"]],
			SpeedURL: "",
			DataURL: "",
			SpeedInx: 0,
			DataInx: 0,
			ErrNum: 0
		},
		HTML5: function() {
			return ( !! (document.createElement("canvas").getContext))
		} (),
		System: {
			Win: f,
			Mac: g,
			Unix: d
		},
		Client: {
			PC: h,
			Mobile: !h
		},
		HTTP: j,
		AuthorWebsite: a,
		isAuthorWebsite: true,
		Visitor: {
			UserName: "游客",
			UserAuthority: 0,
			Progress: 1,
			SelectServerT: 0,
			NowStep: 1,
			TimeStep: 10,
			SaveLvl: 1,
			SaveLvlCallBack: null
		}
	}
} (),
oSym = {
	DebugMode: true,
	Init: function(b, a) {
		let self = this;
		self["Stop"]();
		self["Now"] = 0, self["Timer"] = null, self["RunningVer"] = Math.random(); // 重置时间
		self["NowStep"] = 1, self["TimeStep"] = 10; // 重置速度
		self["TQ"] = new LimitAVL(100), self["TQ"]["push"](new TimerObj({ T: 0, f: b, ar: a || [] }, "T")); // 创建优先队列
		self["AddTaskQ"] = []; // 待加入的 TQ，防止死循环
		self["Start"](); // 开始
	},
	SysTime: function() { // Date["now"](); window["performance"]["now"]()
		return $User["HTML5"] ? window["performance"]["now"]() : Date["now"](); // 获取精度问题
	}, 
	Clear: function() {
		this["AddTaskQ"]["length"] = 0, this["TQ"]["AVL"]["clear"](); // 清除优先队列
	},
	Start: function() {
		var Ver = this["RunningVer"];
		if (this["Timer"] == null) { 
			this["Timer"] = Infinity, (function() { 
				let a = oSym, b = a["TQ"], l, c, e, f = a["AddTaskQ"], D = a["SysTime"](); 

				if (Ver != a["RunningVer"]) return;

				a["Now"] += a["NowStep"], a["TQ"]["pushList"](f), f["length"] = 0; // 插入预备任务

				l = a["TQ"]["QueryLimit"](a["Now"], 1); // 筛选并删除

				for (let c of l) {
					if (a["DebugMode"]) { try { (e = c["f"]).apply(e, c["ar"]); } catch (why) { console.error(why); };
					} else (e = c["f"]).apply(e, c["ar"]);
				};

				if (a["Timer"] != null) a["Timer"] = setTimeout(arguments.callee, Math["max"](a["TimeStep"] - Math["ceil"](a["SysTime"]() - D), 0));
			})();
		}
	},
	Stop: function() {
		clearTimeout(oSym["Timer"]), oSym["Timer"] = null;
	},
	addTask: function(b, c, a) {
		this["AddTaskQ"]["push"](new TimerObj({ T: this["Now"] + b, f: c, ar: a }, "T")); // 加入等待队列里
		return this
	}
},
oS = {
	UrlLvList: {}, //记录哪些关卡是网络关卡，下次读取直接判断
	W: 880,
	H: 600,
	C: 9,
	LawnMowerX: 70,
	Lvl: 0,
	MaxSunNum: 9990,
	GlobalVariables: {},
	LvlVariables: {},
	SelfVariables: [],
	LvlClearFunc: null,
	Init: function(e, g, b, d) {
		var c, a = window;
		e.LoadMusic ? (PlayMusic(e.LoadMusic), NewAudio({
			source: "Look up at the Sky",
			loop: true
		})) : PlayMusic(e.LoadMusic = "Look up at the Sky");
		NewAudio({
			source: "groan2"
		});
		if (b != d) {
			for (c in b) {
				a[c] != d ? (this.GlobalVariables[c] = a[c], a[c] = b[c]) : this.LvlVariables[c] = a[c] = b[c]
			}
		}
		ArCard = [];
		ArPCard = [];
		ArSun = [];
		$Pn = [];
		$Z = [];
		$P = [];
		EDAll = $("dAll");
		EDPZ = $("dPZ");
		EDAlloffsetLeft = EDAll.offsetLeft;
		EDNewAll = EDAll.cloneNode(true);
		EDNewFlagMeter = $("dFlagMeter").cloneNode(true);
		ESSunNum = $("sSunNum");
		this.AudioArr = [];
		this.MustAllReady = true;
		this.LoadAccess = null;
		this.InitLawnMower = null;
		this.StartGame = null;
		this.ChoseCard = this.MPID = "";
		this.PicNum = this.AccessNum = this.MCID = this.Chose = 0;
		this.Monitor = null;
		this.UserDefinedFlagFunc = null;
		this.SunNum = d;
		this.BrainsNum = d;
		this.HaveFog = 0;
		this.AutoMoveFog = true;
		this.FogKind = 0;
		this.MaxSunNum = 9990;
		this.Zombies_Die_Func = null;
		this.NormalFlagZombieTask = 150;
		this.BigFlagZombieTask = 30;
		this.Cheat_Mode = false; // 作弊模式
		for (c in e) {
			this.SelfVariables.push(c);
			this[c] = e[c]
		}
		$User.isAuthorWebsite && oS.LevelEName != 0 && (ClearChild($("JSPVZAjax")), SaveUserPosition(oS.LvlEName), INIT_USER_DATA()); ! this.PicArr && (this.PicArr = []); ! this.PName && (this.PName = []); ! this.ZName && (this.ZName = []); ! this.backgroundImage && (this.backgroundImage = "images/interface/background1.jpg"); ! this.LF && (this.LF = [0, 1, 1, 1, 1, 1]); ! this.ZF && (this.ZF = this.LF); ! this.LargeWaveFlag && (this.LargeWaveFlag = {}); ! this.StartGameMusic && (this.StartGameMusic = "UraniwaNi");
		this.ArCard = this.CardKind == d ? e.PName: e.ZName;
		this.SunNum == d && (this.SunNum = 50);
		this.CanSelectCard == d && (this.CanSelectCard = 1);
		this.DKind == d && (this.DKind = 1);
		this.StaticCard == d && (this.StaticCard = 1);
		this.ShowScroll == d && (this.ShowScroll = true);
		this.ProduceSun == d && (this.ProduceSun = true);
		this.Coord == d && (this.Coord = 1);
		this.ELF == d && (this.ELF = []);
		oCoord[this.Coord]();
		oP.Init(g);
		oT.Init(this.R);
		oZ.Init(this.R);
		oGd.Init();
		this.LoadTips();
		this.LoadProgress();
		this.Special_LoadProgress && (this.Special_LoadProgress(), (delete this.Special_LoadProgress));
	},
	LoadTips: function() {
		var b = NewEle("dTips", "div", "position:absolute;color:#fff;top:450px;width:100%;text-align:center;font-size:16px", "", EDAll),
		a = ["亲,不要说偶没提示你,本游戏自带调速功能,在游戏选项里哦,别再抱怨节奏慢了!亲!!", "本游戏有选关功能,请到游戏选项里选择!", "只有注册用户才能自动保存关卡进度,未注册用户每次玩请自己选关", "不会关闭声音?请到游戏选项里勾选静音功能!", "表忘记游戏选项里面有一个为偷懒人士准备的“自动拾取阳光”的功能!", "不会玩?点左下角“点击开始”,再点击右边墓碑上的选项开始玩,初次玩就点“开始冒险吧”", "这游戏是不是给3岁小孩玩的?这么幼稚!亲爱的,如果你玩过原版植物僵尸就不会这么认为了", "这是山寨版?是的,这纯粹就是个人练习程序的产物,后来免费放网上给大家无聊时打发时间的", "这网页版开发速度也太慢了!没错,由于个人业余时间很有限,所以请大家谅解!", "有广告?这是个人提供的免费游戏,租赁服务器价格不便宜,为了提供更好的硬件所以这是必须的", "初次玩的朋友,请从第一关开始玩起,自然会有教学功能教你一步一步玩下去", "为啥看不到阳光或者僵尸?检查一下你浏览器里的广告杀手功能,也许是它在搞鬼!", "游戏毫无难度?在目前进度下,可以尝试着使用调速功能玩更快的速度", "这里有木有人啊?这儿必须有活人的,打开聊天按钮加入到在线交流行列!", "为啥这么卡?如果你是IE6-8的用户,请使用IE9,Chrome,Firefox,Opera等更好的浏览器!", "如果你支持偶,非常感谢,请一如既往继续支持偶!顺便帮偶点一下那啥~。。。", "这是用什么语言写的?javascript,一个简单而又神奇的语言,纯的,JS!"];
		b.innerHTML = '<span style="font-weight:bold">游戏小贴士:</span><span>' + a[Math.floor(Math.random() * a.length)] + "</span>"
	},
	LoadProgress: function(r, l, a, t, b) {
		SetVisible($("dFlagMeter"));
		SetHidden($("imgGQJC"));
		var p = oS,
		j = [],
		i = p.PicArr,
		k = p.PName,
		s = p.ZName,
		w = 0,
		u = GetX(11),
		g = oGd.$LF,
		c = oGd.$ZF,
		d = oS.R + 1,
		x = $("sFlagMeterTitleF"),
		y = $("dFlagMeterTitle"),
		z = $("dFlagMeter"), 
		e = p.LoadImage,
		h = p.CheckImg,
		f = p.InitPn,
		m,
		q;
		NewImg(0, "images/interface/brain.png", "", $Pn.oBrains = NewEle(0, "div", "position:absolute"));
		switch (p.Coord) {
		case 2:
			NewImg(0, "images/interface/PoolCleaner.png", "", $Pn.oPoolCleaner = NewEle(0, "div", "position:absolute"));
		case 1:
			NewImg(0, "images/interface/LawnCleaner.png", "", $Pn.oLawnCleaner = NewEle(0, "div", "position:absolute"));
			break
		}
		while (r--) {
			a = (l = k[r].prototype).PicArr.slice(0);
			Array.prototype.push.apply(i, a);
			t = l.AudioArr, b = t.length;
			while (b--) NewAudio({ source: t[b] });
		}
		for (r in oS.LargeWaveFlag) {
			s[s.length] = oS.FlagZombie || oFlagZombie;
			break
		}
		r = s.length;
		while (r--) {
			Array.prototype.push.apply(i, (l = (q = s[r]).prototype).PicArr.slice(0));
			t = l.AudioArr, b = t.length;
			while (b--) NewAudio({ source: t[b] });
			l.Init.call(q, u, l, c, d);
		}
		p.PicNum = w += i.length;
		r = i.length;
		z.style["pointer-events"] = "auto";
		y.setAttribute("title", "如果长时间没有加载完毕或者不想再等待预读可以尝试点击跳过预读直接进入游戏");
		y.style.cursor = "pointer";
		y.onclick = function() {
			oS.MustAllReady = false;
			oS.LoadReady(oS)
		};
		while (r--) {
			e(i[r], h)
		}
		r = j.length;
		oS.LoadAudio()
	},
	LoadAudio: function() {
		var b = oS.AudioArr,
		a = b.length;
		while (a--) {
			NewAudio({
				source: b[a]
			})
		}
	},
	InitPn: function(a) {
		var b = $Pn[a[0]] = NewEle(0, "div", "position:absolute");
		NewImg(0, ShadowPNG, a[2], b);
		NewImg(0, a[1], "", b);
		oS.CheckImg()
	},
	LoadImage: function(b, d, c) {
		var a = new Image();
		a.src = b;
		a.complete ? (a = null, d(c, 1)) : (a.onload = function() {
			a.complete && (a = null, d(c, 1))
		},
		a.onerror = function() {
			a.title = b;
			d(c, 0)
		})
	},
	LoadScript: function(f, c, e, a, d) {
		var b = NewEle(f, "script", 0, {
			type: "text/javascript"
		});
		b.onload = function() {
			e(d, 1)
		};
		b.onerror = function() {
			e(d, 0)
		};
		b.src = c;
		a.appendChild(b)
	},
	CheckImg: function(b, a) {
		var c = oS;
		if (c.AccessNum > c.PicNum || !c.MustAllReady) {
			return
		}
		b = 139 - c.AccessNum++*140 / c.PicNum - 11;
		$("imgFlagHead").style.left = b + "px";
		$("sFlagMeterTitleF").innerHTML = '<span style="cursor:pointer;font-family:Yahei Mono;color:#fff">LOADING...(<span style="cursor:pointer;color:#ff0">直接进入游戏</span>):(' + c.AccessNum + "/" + c.PicNum + ")</span>";
		$("imgFlagMeterFull").style.clip = "rect(0,auto,21px," + (b + 11) + "px)";
		if (c.AccessNum == c.PicNum) {
			oS.Lvl == 0 && PlayAudio("groan2");
			if (c.MustAllReady) {
				$("sFlagMeterTitleF").innerHTML = '<span style="cursor:pointer;font-family:Yahei Mono;color:#fff">图片载入完毕！(<span id="ADTimer" style="cursor:pointer;color:#005"></span>)</span>';
				c.LoadReady(c)
			}
		}
	},
	LoadReady: function(f) {
		var c = $("dFlagMeterTitle");
		if (c.onclick == null) {
			return
		}
		if (f.CenterContent) {
			var e = oS.Lvl;
			if (oS.MustAllReady && oS.DisplayAD) {
				var b = (oS.Lvl ? 1000 : 3000) - oSym.Now;
				if (b > 0) {
					oSym.addTask(b, arguments.callee, [f]); (function(g) {
						var h = $("ADTimer");
						h && ($("ADTimer").innerHTML = '<span style="text-decoration:underline;color:#ff0">倒计时' + g + "秒,跳过广告</span>"); --g && oSym.addTask(100, arguments.callee, [g])
					})(Math.ceil(b / 100));
					return
				}
			}
			oS.DisplayAD = false;
		}
		SetNone($("dLvlLink"));
		ClearChild($("dTips"));
		oSym.NowStep = $User.Visitor.NowStep;
		oSym.TimeStep = $User.Visitor.TimeStep;
		c.onclick = null;
		c.title = null;
		c.style.cursor = "default";
		SetHidden($("dFlagMeterContent"), dFlagMeter);
		$("dFlagMeter").style.top = "545px";
		$("dFlagMeter").style["pointer-events"] = "none";
		$("sFlagMeterTitleF").innerHTML = $("dFlagMeterTitleB").innerHTML = f.LevelName;
		$("imgFlagHead").style.left = "139px";
		$("imgFlagMeterFull").style.clip = "rect(0,auto,auto,157px)";
		delete f.PicArr;
		delete f.Coord;
		delete f.LF;
		delete f.ZF;
		delete f.ELF;
		var a = {
			background: "url(" + f.backgroundImage + ") no-repeat",
			visibility: "visible"
		}; ! f.ShowScroll && (a.left = "-115px");
		SetStyle($("tGround"), a);
		oS.backgroundImage=='images/interface/background4.jpg' && ($("tGround").innerHTML = oS.GifHTML);
		var d = function(h) {
			var i = oS,
			g = $User.Visitor;
			NewImg("imgGrowSoil", "images/interface/GrowSoil.gif", "visibility:hidden;z-index:50", EDAll);
			NewImg("imgGrowSpray", "images/interface/GrowSpray.gif", "visibility:hidden;z-index:50", EDAll);
			NewEle("dTitle", "div", 0, 0, $("dBody"));
			innerText(ESSunNum, i.SunNum);
			InitPCard();
			i.ShowScroll ? oSym.addTask(h == undefined ? 200 : h,
			function(j) {
				ClearChild(j);
				i.ScrollScreen()
			},
			[NewEle("DivTeach", "div", "line-height:50px", {
				innerHTML: (Math.floor(g.UserAuthority) == "255" ? '<span style="color:#0F0;font-weight:bold">&lt;' + g.UserName + "&gt;</span>": "&lt;" + g.UserName + "&gt;") + "的房子"
			},
			EDAll)]) : (SetVisible($("dMenu")), AutoSelectCard(), LetsGO())
		};
		f.LoadAccess ? f.LoadAccess(d) : d()
	},
	ScrollScreen: function() { (EDAll.scrollLeft += 25) < 500 ? oSym.addTask(2, arguments.callee, []) : (DisplayZombie(), SetVisible($("dMenu")), oS.CanSelectCard ? SetVisible($("dTop"), $("dSelectCard"), $("dCardList")) : (AutoSelectCard(), oSym.addTask(200, oS.ScrollBack, [LetsGO])))
	},
	ScrollBack: function(a) {
		SetHidden($("dZombie"), $("dSelectCard"), $("dTitle"), $("dCardList"));
		$("tGround").style.left = "-115px";
		$("dZombie").innerHTML = ""; (function(c) {
			var b = EDAll.scrollLeft; (b -= 25) > 0 ? (EDAll.scrollLeft = b, oSym.addTask(2, arguments.callee, [c])) : (EDAll.scrollLeft = 0, c())
		})(a)
	}
},
oCoord = {
	1 : function() {
		oS.R = 5;
		ChosePlantX = function(a) {
			return Compare(GetC(a), 1, oS.C, GetX)
		};
		ChosePlantY = function(a) {
			return $SSml(a, [86, 181, 281, 386, 476], [[75, 0], [175, 1], [270, 2], [380, 3], [470, 4], [575, 5]])
		};
		GetC = function(a) {
			return $SSml(a, [ - 50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [ - 2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
		};
		GetR = function(a) {
			return $SSml(a, [86, 181, 281, 386, 476], [0, 1, 2, 3, 4, 5])
		};
		GetX = function(a) {
			return $SEql(a, {
				"-2": -50,
				"-1": 100,
				0 : 140,
				1 : 187,
				2 : 267,
				3 : 347,
				4 : 427,
				5 : 507,
				6 : 587,
				7 : 667,
				8 : 747,
				9 : 827,
				10 : 865,
				11 : 950
			})
		};
		GetY = function(a) {
			return $SEql(a, {
				0 : 75,
				1 : 175,
				2 : 270,
				3 : 380,
				4 : 470,
				5 : 575
			})
		};
		GetY1Y2 = function(a) {
			return $SEql(a, {
				0 : [0, 85],
				1 : [86, 180],
				2 : [181, 280],
				3 : [281, 385],
				4 : [386, 475],
				5 : [476, 600]
			})
		};
		GetX1X2 = function(a) {
			return $SEql(a, {
				"-2": [ - 100, -49],
				"-1": [ - 50, 99],
				0 : [100, 139],
				1 : [140, 219],
				2 : [220, 294],
				3 : [295, 378],
				4 : [379, 459],
				5 : [460, 539],
				6 : [540, 624],
				7 : [625, 694],
				8 : [695, 774],
				9 : [775, 854],
				10 : [855, 934],
				11 : [950, 1030]
			})
		}; ! oS.InitLawnMower && (oS.InitLawnMower = function() {
			var a = 6;
			while (--a) {
				CustomSpecial(oLawnCleaner, a, -1)
			}
		});
		oS.GifHTML = ""; oS.HaveFog && oGd.MakeFog();
	},
	2 : function() {
		oS.R = 6;
		ChosePlantX = function(a) {
			return Compare(GetC(a), 1, oS.C, GetX)
		};
		ChosePlantY = function(a) {
			return $SSml(a, [86, 171, 264, 368, 440, 532], [[75, 0], [161, 1], [254, 2], [358, 3], [430, 4], [524, 5], [593, 6]])
		};
		GetC = function(a) {
			return $SSml(a, [ - 50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [ - 2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
		};
		GetR = function(a) {
			return $SSml(a, [86, 171, 264, 368, 440, 532], [0, 1, 2, 3, 4, 5, 6])
		};
		GetX = function(a) {
			return $SEql(a, {
				"-2": -50,
				"-1": 100,
				0 : 140,
				1 : 187,
				2 : 267,
				3 : 347,
				4 : 427,
				5 : 507,
				6 : 587,
				7 : 667,
				8 : 747,
				9 : 827,
				10 : 865,
				11 : 950
			})
		};
		GetY = function(a) {
			return $SEql(a, {
				0 : 75,
				1 : 165,
				2 : 253,
				3 : 355,
				4 : 430,
				5 : 522,
				6 : 587
			})
		};
		GetY1Y2 = function(a) {
			return $SEql(a, {
				0 : [0, 85],
				1 : [86, 170],
				2 : [171, 263],
				3 : [264, 367],
				4 : [368, 439],
				5 : [440, 531],
				6 : [532, 600]
			})
		};
		GetX1X2 = function(a) {
			return $SEql(a, {
				"-2": [ - 100, -49],
				"-1": [ - 50, 99],
				0 : [100, 139],
				1 : [140, 219],
				2 : [220, 294],
				3 : [295, 378],
				4 : [379, 459],
				5 : [460, 539],
				6 : [540, 624],
				7 : [625, 694],
				8 : [695, 774],
				9 : [775, 854],
				10 : [855, 934],
				11 : [950, 1030]
			})
		}; ! oS.InitLawnMower && (oS.InitLawnMower = function() {
			CustomSpecial(oLawnCleaner, 1, -1);
			CustomSpecial(oLawnCleaner, 2, -1);
			CustomSpecial(oPoolCleaner, 3, -1);
			CustomSpecial(oPoolCleaner, 4, -1);
			CustomSpecial(oLawnCleaner, 5, -1);
			CustomSpecial(oLawnCleaner, 6, -1)
		});
		oS.GifHTML = '<img style="position:absolute;left:253px;top:278px" src="images/interface/background' + (oS.DKind ? 3 : 4) + '_2.gif">'; oS.HaveFog && oGd.MakeFog();
	},
	200 : function() {
		oS.R = 6;
		ChosePlantX = function(a) {
			return Compare(GetC(a), 1, oS.C, GetX)
		};
		ChosePlantY = function(a) {
			return $SSml(a, [86, 171, 254, 338, 440, 542], [[75, 0], [161, 1], [254, 2], [338, 3], [430, 4], [524, 5], [593, 6]])
		};
		GetC = function(a) {
			return $SSml(a, [ - 50, 100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [ - 2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
		};
		GetR = function(a) {
			return $SSml(a, [86, 171, 254, 338, 440, 542], [0, 1, 2, 3, 4, 5, 6])
		};
		GetX = function(a) {
			return $SEql(a, {
				"-2": -50,
				"-1": 100,
				0 : 140,
				1 : 187,
				2 : 267,
				3 : 347,
				4 : 427,
				5 : 507,
				6 : 587,
				7 : 667,
				8 : 747,
				9 : 827,
				10 : 865,
				11 : 950
			})
		};
		GetY = function(a) {
			return $SEql(a, {
				0 : 75,
				1 : 165,
				2 : 243,
				3 : 335,
				4 : 420,
				5 : 532,
				6 : 597
			})
		};
		GetY1Y2 = function(a) {
			return $SEql(a, {
				0 : [0, 85],
				1 : [86, 170],
				2 : [171, 253],
				3 : [254, 337],
				4 : [338, 439],
				5 : [440, 541],
				6 : [542, 600]
			})
		};
		GetX1X2 = function(a) {
			return $SEql(a, {
				"-2": [ -100, -49],
				"-1": [ -50, 99],
				0 : [100, 139],
				1 : [140, 219],
				2 : [220, 294],
				3 : [295, 378],
				4 : [379, 459],
				5 : [460, 539],
				6 : [540, 624],
				7 : [625, 694],
				8 : [695, 774],
				9 : [775, 854],
				10 : [855, 934],
				11 : [950, 1030]
			})
		}; ! oS.InitLawnMower && (oS.InitLawnMower = function() {
			CustomSpecial(oLawnCleaner, 1, -1);
			CustomSpecial(oLawnCleaner, 2, -1);
			CustomSpecial(oPoolCleaner, 3, -1);
			CustomSpecial(oPoolCleaner, 4, -1);
			CustomSpecial(oLawnCleaner, 5, -1);
			CustomSpecial(oLawnCleaner, 6, -1)
		});
		oS.GifHTML = '<img style="position:absolute;left:253px;top:278px" src="images/interface/background' + (oS.DKind ? 3 : 4) + '_2.gif">'; oS.HaveFog && oGd.MakeFog();
	}
},
oP = {
	Init: function(a) {
		var r = this;
		r.NumZombies = r.FlagZombies = 0, r.FlagMaxWaitTime = 1990, r.FlagZombieWaitTime = 500, r.ZTimeStep = 10, r.AutoStopGame = true; // FlagMaxWaitTime: 两波之间最大间隔; FlagZombieWaitTime: 两波之间最小间隔; ZTimeStep: 僵尸移动的间隔; AutoStopGame: 是否暂停游戏
		if (a) {
			var l;
			for (l in a) {
				r[l] = a[l]
			}
			if (a.AZ) {
				var k, b = {},
				g, c, q, p, d, m = [],
				h,
				e,
				n;
				r.ArZ = [];
				h = ((k = r.AZ).sort(function(i, f) {
					return i[2] - f[2]
				})).length;
				while (h--) {
					c = (n = k[h])[0];
					q = n[1];
					p = n[2];
					while (q--) {
						m.push([c, p])
					}
					if (d = n[3]) {
						e = d.length;
						while (e--) {
							b[g = d[e]] ? b[g].push(c) : b[g] = [c]
						}
					}
				}
				r.AZ = m;
				r.MustShowAtFlag = b
			}
		}
		a && a.FlagNum ? (r.FlagHeadStep = (145 / (a.FlagNum - 1)), r.MonPrgs = function (_) {
			var u = oP, j, i = u.FlagZombies, s, t, f = $User.Visitor, _;
			if (!--u.NumZombies) {
				if (i < u.FlagNum) {
					u.ReadyFlag = ++i, oSym.addTask(oP.FlagZombieWaitTime, u.FlagPrgs, []);
					(_ = $SEql(i - 1, u.FlagToMonitor)) && oSym.addTask(oP.FlagZombieWaitTime - 300, function (g) { !g[1] && (g[0](), g[1] = 1) }, [_]); /* 提前触发大波 */ 
				} else {
					oP.AutoStopGame && (NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:255", 0, EDAll), PauseGame($("dMenu0"), 1));
					u.FlagToEnd();
					if (!isNaN(Math.floor(s))) {
						t = $("dAdventure"), $User.Visitor.Progress = ++s, t.firstChild.innerHTML = Math.ceil(s / 10);
						t.childNodes[1].innerHTML = (s = s - Math.floor(s / 10) * 10) ? s : s + 1;
					};
				};
			};
			oS.Zombies_Die_Func && oS.Zombies_Die_Func(_);
		}) : r.MonPrgs = function() {}; (!a || !a.FlagToEnd) && (r.FlagToEnd = function() {
			NewImg("imgSF", "images/interface/trophy.png", "left:417px;top:233px;z-index:256", EDAll, {
				onclick: function() {
					PlayAudio("winmusic");
					SelectModal(__Normal_Start_Room__);
					HiddenOptions();
					SetBlock($("dSurface"), $("iSurfaceBackground"));
					ShowNameDiv()
				}
			})
		})
	},
	AddZombiesFlag: function(d) {
		var g = oP,
		c = oS.LargeWaveFlag,
		e, b = g.FlagHeadStep,
		a = g.FlagNum;
		SetVisible($("imgGQJC"), $("dFlagMeterContent"));
		for (e in c) {
			Math.floor(e) < a ? SetStyle(c[e], {
				visibility: "visible",
				left: (155 - e * b) + "px"
			}) : (SetVisible(c[e]), SetStyle(c[e], {left: "5px"}));
		}
		PlayAudio("awooga");
		(function() {
			oSym.addTask(2000, function() { 
				[
					function() { PlayAudio(["groan1", "groan2"][Math.floor(Math.random() * 2)]) },
					function() { PlayAudio(["groan3", "groan4"][Math.floor(Math.random() * 2)]) },
					function() { PlayAudio(["groan5", "groan6"][Math.floor(Math.random() * 2)]) },
					function() { PlayAudio("groan1"); oSym.addTask(150, function() { PlayAudio("groan5") }, []); },
					function() { PlayAudio("groan2"); oSym.addTask(150, function() { PlayAudio("groan6") }, []); }
				][Math.floor(Math.random() * 3)]();

				oSym.addTask(2000, arguments.callee, [])
			}, []);
		}) ();
		g.ReadyFlag = 1;
		(g.DefFlagPrgs) ? (g.DefFlagPrgs(d)) : (g.FlagPrgs(d));
	},
	SelectFlagZombie: function(j, d) {
		var e = oP,
		m = e.ArZ,
		k = e.AZ,
		s = k.length,
		q, r, i = [],
		g = 0,
		n = oS.LargeWaveFlag[d],
		c = false,
		h = !n ? oS.NormalFlagZombieTask : (PlayAudio("siren"), n.style.top = "5px", --j, i[g++] = oS.FlagZombie || oFlagZombie, oS.BigFlagZombieTask),
		p, b, f = e.MustShowAtFlag, a;
		while (s--) {
			if ((r = (q = k[s])[1]) > d) {
				break
			} else {
				m.push(q[0]); --k.length;
				c = true
			}
		}
		c && m.sort(function(t, l) {
			return t.prototype.Lvl - l.prototype.Lvl
		});
		if (a = f[d]) {
			s = a.length;
			while (s--) {
				j -= (i[g++] = a[s]).prototype.Lvl
			}
		}
		b = m[s = (p = m.length) - 1].prototype.Lvl;
		while (j > 0) {
			if (s && b > j)

			//$User.Server.DataURL+
			{
				while (--s && m[s].prototype.Lvl > j) {}
				p = s + 1;
				b = m[s].prototype.Lvl
			}
			j -= (i[g++] = m[Math.floor(Math.random() * p)]).prototype.Lvl
		}
		e.NumZombies += g;
		e.SetTimeoutZombie(i, h)
	},
	SelectFlagZombie1: function(d) {
		var h = oP,
		c = [],
		a = 0,
		g = h.ArZ,
		f = oS.LargeWaveFlag[h.FlagZombies],
		e = h.SumToZombie,
		b = !f ? oS.NormalFlagZombieTask : (f.style.top = "5px", --d, c[a++] = oS.FlagZombie || oFlagZombie, oS.BigFlagZombieTask);
		while (d > 0) {
			d -= (c[a++] = g[Math.floor(Math.random() * $SEql(d, e))]).prototype.Lvl
		}
		h.NumZombies += a;
		h.SetTimeoutZombie(c, b)
	},
	SetTimeoutTomZombie: function(c) {
		var f = [],
		d = [],
		e = 0,
		a = c.length,
		b,
		g;
		for (b in oGd.$Tombstones) {
			g = b.split("_");
			d[e] = (f[e] = new c[Math.floor(Math.random() * a)]).CustomBirth(g[0], g[1], 100); ++e
		}
		this.AppearUP(d, f, e)
	},
	SetTimeoutWaterZombie: function(j, b, e, h) {
		var f = oGd.$LF,
		l = [],
		c = f.length,
		m = [],
		k = [],
		g = h.length,
		a,
		d = b - j + 1;
		while (--c) {
			f[c] == 2 && l.push(c)
		}
		a = l.length;
		c = e;
		while (c--) {
			k[c] = (m[c] = new h[Math.floor(Math.random() * g)]).CustomBirth(l[Math.floor(Math.random() * a)], Math.floor(j + Math.random() * d))
		}
		this.AppearUP(k, m, e)
	},
	AppearUP: function(a, c, b) {
		oP.NumZombies += b;
		asyncInnerHTML(a.join(""),
		function(h, f) {
			EDPZ.appendChild(h);
			var e = f.length,
			g, d;
			while (e--) {
				g = f[e];
				g.Birth.call(g);
				SetBlock(g.Ele);
				oSym.addTask(10,
				function(l, k, i, j) {
					k = Math.max(k - j, 0);
					SetStyle(l, {
						top: k + "px",
						clip: "rect(0,auto," + (i += j) + "px,0)"
					});
					k && oSym.addTask(10, arguments.callee, [l, k, i, j])
				},
				[g.EleBody, d = g.height, 0, d * 0.1])
			}
		},
		c)
	},
	SetTimeoutZombie: function(b, d) {
		var f = [],
		c = [],
		e = 0,
		g = 0,
		a = b.length;
		while (e < a) {
			c[e] = (f[e] = new b[e]).prepareBirth(g);
			g += d; ++e
		}
		asyncInnerHTML(c.join(""),
		function(k, j) {
			EDPZ.appendChild(k);
			var h = j.length;
			while (h--) {
				j[h].Birth()
			}
		},
		f)
	},
	FlagPrgs: function() {
		if(oP.DefFlagPrgs) {oP.DefFlagPrgs(); return;};

		var f = oP,
		c = f.FlagZombies,
		e = f.FlagToSumNum,
		a = 139 - c * f.FlagHeadStep,
		d = $SSml(c, e.a1, e.a2),
		b;
		f.FlagNum > (c = ++f.FlagZombies) ? ($("imgFlagHead").style.left = a + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + (a + 11) + "px)", (b = $SEql(c, f.FlagToMonitor)) && oSym.addTask(oP.FlagMaxWaitTime - 300,
		function(g) { ! g[1] && (g[0](), g[1] = 1)
		}, [b]), oSym.addTask(oP.FlagMaxWaitTime, function(g) {
			var h = oP;
			h.ReadyFlag == g++&&(h.ReadyFlag = g, h.FlagPrgs())
		}, [c])) : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)");
		f.SelectFlagZombie.call(f, d, c);
		f.UserDefinedFlagFunc && f.UserDefinedFlagFunc()
	},
	Monitor: function(a, b) {
		a && a.f.apply(a.f, a.ar);
		oP.UserDefinedFlagFunc = b ? b: null; (function() {
			oSym.addTask(oP.ZTimeStep, arguments.callee, []), oZ.traversalOf();
		})()
	}
},
oGd = {
	Init: function() {
		this.$ = [];
		this.$Crater = [];
		this.$Creator_Def = [];
		this.$Tombstones = {};
		this.$Torch = [];
		this.$Plantern = [];
		this.$LF = oS.LF;
		this.$ZF = oS.ZF;
		this.$Ice = [];
		this.$JackinTheBox = 0;
		this.$Balloon = new Array(oS.R + 1);
		this.$Fog = [];
		this.$ELF = oS.ELF; // 记录特殊的 LF, [[null, 1, 1, 4, 5, 1, 4]]
	},
	Get_LF: function(r, c) { // 获取更精准的 LF
		var e = this["$ELF"], w = e && e[r], c = w && w[c], l = this["$LF"], z = l && l[r], ret = (c == null) ? z : c; return ret;
	},
	add: function(c, a, b, d) { (b = (d = this.$)[a]) && b.Die();
		d[a] = c
	},
	del: function(a) {
		delete this.$[a.R + "_" + a.C + "_" + a.PKind]
	},
	MakeFog: function() {
		var d = "", g = tx = ri = cj = 0, c = oGd.$Fog, b, a = 2 * oS.HaveFog + 3, kd = oS.FogKind;
		e = (function() {
			return function(f) {
				switch (kd) {
					case 1: d += '<img id="' + f + '" src="images/New_interface/dark' + Math.floor(Math.random() * 4) + ".png" + '" style="left:' + g + "px;top:" + tx + 'px">'; break;
					default: d += '<img id="' + f + '" src="images/interface/fog' + Math.floor(Math.random() * 4) + ".png" + '" style="left:' + g + "px;top:" + tx + 'px">'; // 正常的雾
				}
			}
		})();
		for (ri = 1, tx = 0; ri < 7; g = 0, ri++) {
			for (ci = 0; ci <= a; ci++) {
				e(c[b = ri + "_" + ci] = "Fog" + b);
				g += 35
			}
			tx += 90
		}
		NewEle("dFog", "div", "", {
			innerHTML: d
		},
		EDAll)
	},
	MoveFogLeft: function(a) { (function(c, d, b, e) {
			d -= 50;
			d > b ? (c.style.left = d + "px", oSym.addTask(5, arguments.callee, [c, d, b, e])) : (c.style.left = b + "px", e && e())
		})($("dFog"), 900, GetX(oS.C - oS.HaveFog) - 30, a)
	},
	MoveFogRight: function() {
		//if (arguments.callee && arguments.callee.caller.caller == null) {
		//	return
		//} 
		(function(a, b) { (b += 50) < 901 ? (a.style.left = b + "px", oSym.addTask(5, arguments.callee, [a, b])) : a.style.left = "900px"
		})($("dFog"), GetX(oS.C - oS.HaveFog) - 3)
	},
	GatherFog: function(e, s, y, u, z) {
		var d = e - y,
		c = e + y,
		r = s - u,
		q = s + u,
		f = [SetNone, SetBlock][z],
		x = oS.C,
		n = oS.R,
		j = x + 1,
		h = oS.HaveFog,
		a = h * 2,
		l = [],
		m,
		k,
		w,
		p = function(i) {
			return (i - x) * 2 + a
		},
		t = function(i) {
			return (i - x) * 2 + a - 2
		};
		if (d > 0) {
			m = t(r > 0 ? r + 1 : 1);
			k = p(q > j ? j: q - 1);
			do {
				m > -1 && l.push("Fog" + d + "_" + m)
			} while ( m ++< k )
		} else {
			d = 0
		}
		if (c <= n) {
			m = t(r > 0 ? r + 1 : 1);
			k = p(q > j ? j: q - 1);
			do {
				m > -1 && l.push("Fog" + c + "_" + m)
			} while ( m ++< k )
		} else {
			c = n + 1
		}++d; --c;
		m = t(r < 1 ? 1 : r);
		k = p(q > j ? j: q);
		w = m;
		do {
			do {
				m > -1 && l.push("Fog" + d + "_" + m)
			} while ( m ++<= k );
			m = w
		} while ( d ++< c );
		for (m = 0; m < l.length; f($(l[m])), m++) {}
		if (z) {
			var b = oGd.$Torch,
			g;
			for (w in b) {
				g = $P[b[w]];
				this.GatherFog(g.R, g.C, 1, 1, 0)
			}
			b = oGd.$Plantern;
			for (w in b) {
				g = $P[b[w]];
				this.GatherFog(g.R, g.C, 2, 3, 0)
			}
		}
	}
},
oZ = {
	Init: function(b) {
		this.$ = [];
		this.$R = [];
		var a;
		for (a = b; a; this.$[a] = [], this.$R[a--] = []) {}
	},
	add: function(b, a) { (a = oZ.$[b.R]).push(b);
		a.sort(function(d, c) {
			return d.AttackedLX - c.AttackedLX
		});
		a.RefreshTime = oSym.Now
	},
	getZ0: function(b, d) {
		if (d < 1 || d > oS.R) {
			return
		}
		var c = 0,
		e = this.$[d],
		f,
		a = e.length;
		while (c < a && (f = e[c++]).AttackedLX <= b) {
			if (f.PZ && f.HP > 0 && f.AttackedRX >= b) {
				return f
			}
		}
	},
	getZ1: function(h, b) {
		if (b < 1 || b > oS.R) {
			return
		}
		var d = 0,
		j = this.$[b],
		f = this.$R[b],
		g,
		c,
		k,
		e; (k = j.RefreshTime) == f.RefreshTime ? g = f: (g = (this.$R[b] = j.slice(0)).sort(function(l, i) {
			return i.AttackedRX - l.AttackedRX
		})).RefreshTime = k;
		e = g.length;
		while (d < e && (c = g[d++]).AttackedRX >= h) {
			if (c.PZ && c.HP > 0 && c.AttackedLX <= h) {
				return c
			}
		}
	},
	getArZ: function(e, d, b) {
		var g = 0,
		l = this.$[b],
		f = [],
		k = 0,
		c,
		h = l.length,
		j;
		while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
			c.PZ && c.HP > 0 && (j > e || c.AttackedRX > e) && (f[k++] = c)
		}
		return f
	},
	getRangeLeftZ: function(e, d, b) {
		if (b < 1 || b > oS.R) {
			return
		}
		var g = 0,
		l = this.$[b],
		f = [],
		k = 0,
		c,
		h = l.length,
		j;
		while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
			if (c.PZ && c.HP > 0 && (j > e || c.AttackedRX > e)) {
				return c
			}
		}
		return
	},
	moveTo: function(g, f, c) {
		var b = this.$[f],
		a = this.$[c],
		e = b.length,
		d;
		while (e--) { (o = b[e]).id == g && (b.splice(e, 1), o.R = c, a.push(o), (a.sort(function(i, h) {
				return i.AttackedLX - h.AttackedLX
			})).RefreshTime = b.RefreshTime = oSym.Now, e = 0)
		}
	},
	traversalOf: function() {
		var a, b = this.$,
		j, l = 0,
		d = 0,
		k = 1000,
		i, h, f = [function(n) {
			d = 1;
			k = i
		},
		function(n) { (i = n.AttackedLX) > k && (l = d = 1);
			k = i
		}],
		e = b.length,
		m,
		c,
		g; (function(r) {
			var q = (j = b[r]).length,
			n = arguments.callee,
			p = oT.$[r],
			s = oT.$L[r];
			while (q--) {
				a = j[q];
				a.HP > 0 && a.PZ && a.ZX < 901 && oT["chkD" + a.WalkDirection](a, r, p, s); a.HP <= 0 ? (j.splice(q, 1), f[0](a)) : f[a.ChkActs(a, r, j, q)](a)
			}
			l ? (l = d = 0, j.sort(function(u, t) {
				return u.AttackedLX - t.AttackedLX
			}), j.RefreshTime = oSym.Now) : d && (d = 0, j.RefreshTime = oSym.Now); --r && oSym.addTask(0, n, [r])
		})(b.length - 1)
	}
},
oT = {
	Init: function(b) {
		this.$ = [];
		this.$L = [];
		for (var a = b; a;) {
			this.$[a] = [];
			this.$L[a--] = []
		}
	},
	add: function(f, c, g) {
		if (f <= 0 || f > oS.R) {
			return
		}
		var e = this.$[f],
		d = c.length,
		b;
		while (d--) {
			b = c[d];
			e.push([b[0], b[1], b[2], g])
		}
		e.sort(function(i, h) {
			return h[1] - i[1]
		});
		e.RefreshTime = new Date
	},
	chkD0: function(g, e, d, h) {
		var f = g.AttackedLX,
		c = 0,
		b, a;
		while (c < d.length && (b = d[c])[1] >= f) { (a = $P[b[3]]).canTrigger && b[0] <= f && a.TriggerCheck(g, b[2], c); ++c
		}
	},
	chkD1: function(b, e, c, g) {
		var j = b.AttackedLX,
		h = b.AttackedRX,
		f = 0,
		m, l, d, a, k; (l = c.RefreshTime) == g.RefreshTime ? m = g: (m = (this.$L[e] = c.slice(0)).sort(function(n, i) {
			return n[0] - i[0]
		})).RefreshTime = l;
		while (f < m.length && (d = m[f])[0] <= h) { (a = $P[d[3]]).canTrigger && d[1] >= h && a.TriggerCheck(b, d[2], f); ++f
		}
	},
	delP: function(e) {
		var b = e.oTrigger,
		f = e.id,
		d, a, c;
		for (d in b) {
			for (c = (a = this.$[d]).length; c--; a[c][3] == f && a.splice(c, 1)) {}
			a.RefreshTime = new Date
		}
	},
	indexOf: function(j, d) {
		var f = new RegExp(d + ",", "g"),
		h = (j.toString() + ",").replace(f, "┢,").replace(/[^,┢]/g, ""),
		i = 0,
		g = 0,
		b = [];
		for (; (g = h.indexOf("┢", g)) > 0; b.push((g++-i++-2) / 3)) {}
		return b
	}
},
asyncInnerHTML = function(d, c, a) {
	var b = $n("div"),
	e = document.createDocumentFragment();
	b.innerHTML = d; (function(g) {
		var f = arguments.callee;
		g--?(e.appendChild(b.firstChild), setTimeout(function() {
			f(g)
		},
		0)) : c(e, a)
	})(b.childNodes.length)
},
WhichMouseButton = function(a) {
	a = window.event || a;
	var b = $User.Browser;
	return ! b.Gecko ? $SEql(a.button, {
		1 : 1,
		0 : 1,
		2 : 2,
		"default": 1
	}) : $SEql(a.which, {
		1 : 1,
		3 : 2,
		"default": 1
	})
},
GroundOnmousedown = function(i) {
	i = window.event || i;
	var a = i.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
	k = i.clientY + EBody.scrollTop || EElement.scrollTop,
	g = ChosePlantX(a),
	h = ChosePlantY(k),
	d = g[0],
	c = h[0],
	f = h[1],
	b = g[1],
	j = GetAP(a, k, f, b);
	switch (oS.Chose) {
	case 1:
		WhichMouseButton(i) < 2 ? GrowPlant(j[0], d, c, f, b) : (PlayAudio("tap"), CancelPlant());
		break;
	case - 1 : WhichMouseButton(i) < 2 ? (PlayAudio("plant2"), ShovelPlant(j)) : (PlayAudio("tap"), CancelShovel())
	}
},
GetAP = function(a, h, d, c) {
	var f, i = oGd.$,
	e, g = [],
	b;
	for (f = 0; f < MAX_PLT_INDEX; g.push(e = i[d + "_" + c + "_" + f++]), e && !(a < e.pixelLeft || a > e.pixelRight || h < e.pixelTop || h > e.pixelBottom) && (b = e)) {}
	return [g, b]
},
GroundOnkeydown = function(b) {
	var a;
	if ((a = (b || event).keyCode) == 27) {
		switch (oS.Chose) {
		case 1:
			CancelPlant();
			break;
		case - 1 : CancelShovel()
		}
		return (false)
	} else { ! oS.Chose && KeyBoardGrowPlant(a)
	}
},
KeyBoardGrowPlant = function(b, a) {
	a = a || 0;
	if (b > 47 && b < 58) {
		switch (a) {
		case 0:
			ChosePlant({ clientX: 450, clientY: 300 }, (b - 48 - 1 + 10) % 10)
		}
	}
},
GroundOnmousemove = function() {},
GroundOnmousemove1 = function(j) {
	j = window.event || j;
	var d = j.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
	b = j.clientY + EBody.scrollTop || EElement.scrollTop,
	k = oS.ChoseCard,
	h = ChosePlantX(d),
	i = ChosePlantY(b),
	f = h[0],
	c = i[0],
	g = i[1],
	a = h[1],
	m = GetAP(d, b, g, a);
	var l = ArCard[k].PName.prototype;
	SetStyle($("MovePlant"), {
		left: d - 0.5 * (l.beAttackedPointL + l.beAttackedPointR) + "px",
		top: b + 20 - l.height + l.GetDY(g, a, m[0]) + "px"
	});
	l.CanGrow(m[0], g, a) && Trigger_Ctk_Plt(m[0], g, a, l) ? SetStyle($("MovePlantAlpha"), {
		visibility: "visible",
		left: f + l.GetDX() + "px",
		top: c - l.height + l.GetDY(g, a, m[0]) + "px"
	}) : SetHidden($("MovePlantAlpha"))
},
GroundOnmousemove2 = function(k) {
	k = window.event || k;
	var d = k.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
	b = k.clientY + EBody.scrollTop || EElement.scrollTop,
	m = oS.ChoseCard,
	h = ChosePlantX(d),
	i = ChosePlantY(b),
	f = h[0],
	c = i[0],
	g = i[1],
	a = h[1],
	n = GetAP(d, b, g, a);
	var j = n[1],
	l = j ? j.id: "",
	p = oS.MPID;
	p != l && (p && $(p) && SetAlpha($(p).childNodes[1], 100, 1), (oS.MPID = l) && SetAlpha($(l).childNodes[1], 60, 0.6));
	SetStyle($("tShovel"), {
		left: d - 15 + "px",
		top: b - 16 + "px"
	})
},
DisplayZombie = function() {
	SetVisible($("bShowHandBook"));
	var d = oP.AZ.slice(0),
	b = d.length,
	c,
	g,
	h = $("dZombie"),
	f = [],
	e = [],
	a;
	while (b--) {
		d[b][0].prototype.CanDiaplay == 0 && d.splice(b, 1)
	}
	c = b = d.length;
	while (c--) {
		f.push(Math.floor(150 + Math.random() * 444))
	}
	f.sort(function(j, i) {
		return j - i
	});
	while (b) {
		g = d[a = Math.floor(Math.random() * b)][0].prototype;
		g.CanDisplay ? (d.splice(a, 1), e[b--] = g.getHTML("", Math.floor(50 + Math.random() * 201) - g.width * 0.5, f[b] - g.height, 1, "block", "auto", g.GetDTop, g.PicArr[g.StandGif])) : --b
	}
	asyncInnerHTML(e.join(""),
	function(i) {
		h.appendChild(i)
	})
},
AutoSelectCard = function() {
	var c = oS.ArCard,
	b = -1,
	a = c.length;
	while (++b < a) {
		SelectCard(c[b].prototype.EName)
	}
},
InitPCard = function() {
	var d = "",
	f, e = oS.ArCard,
	a = e.length,
	b = 0,
	c;
	while (b < a) {
		f = e[b];
		c = f.prototype;
		if (!c.CanSelect) {++b;
			continue
		}
		ArPCard[EName = c.EName] = {
			Select: 0,
			PName: f
		};
		d += '<div class="span1" id="Card' + EName + '" onmouseout="SetHidden($(\'dTitle\'))" onmousemove="ViewCardTitle(' + EName + ',event)" onclick="SelectCard(\'' + EName + '\')"><img src="' + c.PicArr[0] + '"><span class="span2">' + c.SunNum + "</span></div>";
		b++%6 == 5 && (d += "<br>")
	}
	$("dPCard").innerHTML = d
},
InitHandBookPCard = function() {
	PlayAudio("gravebutton");
	var d = "",
	g, f, e = [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTorchwood, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGatlingPea, oGloomShroom, oTwinSunflower, oSpikerock, oCabbage_Pro, oMelonPult_Pro, oCattail],
	a = e.length,
	b = 0,
	c;
	while (b < a) {
		g = e[b];
		c = g.prototype;
		f = c.EName;
		d += '<div class="span1" onclick="ViewProducePlant(' + f + ')"><img src="' + c.PicArr[0] + '"><div class="span2">' + c.SunNum + "</div></div>";
		b++%6 == 5 && (d += "<br>")
	}
	$("dHandBookPCard").innerHTML = d;
	ViewProducePlant(e[0]);
	$("dHandBookPZ").className = "WindowFrame Almanac_PlantBack";
	SetVisible($("dHandBookPZ"));
	SetNone($("dHandBookZ"));
	SetBlock($("dHandBookP"))
},
InitHandBookZCard = function() {
	PlayAudio("gravebutton");
	var d = "",
	g, f, e = [oZombie, oFlagZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oBackupDancer, oDuckyTubeZombie1, oSnorkelZombie, oZomboni, oDolphinRiderZombie, oImp, oJackinTheBoxZombie, oBalloonZombie],
	a = e.length,
	b = 0,
	c;
	while (b < a) {
		g = e[b];
		c = g.prototype;
		f = c.EName;
		d += '<div class="span1" onclick="ViewProduceZombie(' + f + ')"><img src="' + c.PicArr[0] + '"><div class="span2">' + c.SunNum + "</div></div>";
		b++
	}
	$("dHandBookZCard").innerHTML = d;
	ViewProduceZombie(e[0]);
	$("dHandBookPZ").className = "WindowFrame Almanac_ZombieBack";
	SetVisible($("dHandBookPZ"));
	SetNone($("dHandBookP"));
	SetBlock($("dHandBookZ"))
},
ViewProducePlant = function(b) {
	PlayAudio("plant1");
	var a = b.prototype;
	$("pHandBookPlant").style.backgroundImage = "url(" + a.PicArr[a.StaticGif] + ")";
	$("dProducePlant").innerHTML = a.Produce;
	innerText($("dHandBookPlantName"), a.CName);
	innerText($("spSunNum"), a.SunNum);
	innerText($("spCoolTime"), a.coolTime + "秒");
	$("pPlantBack").style.backgroundPosition = -200 * a.BookHandBack + "px 0"
},
ViewProduceZombie = function(b) {
	PlayAudio("plant1");
	var a = b.prototype;
	$("pHandBookZombie").style.background = "url(" + a.PicArr[a.StaticGif] + ") no-repeat scroll " + a.BookHandPosition;
	$("dProduceZombie").innerHTML = a.Produce;
	innerText($("dHandBookZombieName"), a.CName);
	$("pZombieBack").style.backgroundPosition = -200 * a.BookHandBack + "px 0"
},
ViewCardTitle = function(b, c) {
	c = c || window.event;
	var f = $("dTitle"),
	a = b.prototype;
	f.innerHTML = a.CName + "<br>冷却时间:" + a.coolTime + "秒<br>" + (oS.DKind && a.night ? '<span style="color:#F00">夜行性的--在白天会睡觉</span><br>' + a.Tooltip: a.Tooltip || ('<span style="text-align:left">' + a.Produce + "</span>"));
	SetStyle(f, {
		left: c.clientX + (EBody.scrollLeft || EElement.scrollLeft) - 3 + "px",
		top: c.clientY + 18 + EBody.scrollTop || EElement.scrollTop + "px",
		visibility: "visible"
	})
},
SelectCard = function(c, m) {
	!m && PlayAudio("tap");
	var h = $("Card" + c).childNodes,
	f = h[0],
	b = ArPCard[c],
	i = b.PName.prototype,
	g,
	a,
	j,
	e = $("btnOK");
	if (!b.Select) {
		if (! (ArPCard.SelNum |= 0)) {
			e.disabled = "";
			e.style.color = "#FC6"
		} else {
			if (ArPCard.SelNum > 9) {
				return
			}
		}++ArPCard.SelNum;
		b.Select = 1;
		oS.StaticCard && (g = NewEle("dCard" + c, "div", "", {
			onclick: function() {
				SelectCard(c)
			}
		},
		$("dCardList")), NewImg(0, f.src, "width:100px;height:120px", g), innerText(NewEle("sSunNum" + c, "span", 0, 0, g), i.SunNum), f.style.top = "-42px")
	} else {
		b.Select = 0; ! --ArPCard.SelNum && (e.disabled = "disabled", e.style.color = "#888"); (g = $("dCard" + c)).onclick = null;
		ClearChild(g.firstChild, g.childNodes[1], g.lastChild, g);
		f.style.top = 0
	}
},
ResetSelectCard = function() {
	var b, a = $("btnOK");
	for (b in ArPCard) {
		ArPCard[b].Select && SelectCard(b)
	}
	a.disabled = "disalbed";
	a.style.color = "#888"
},
LetsGO = function() {
	var e = $("dCardList"),
	g = 0,
	k = e.childNodes.length,
	f,
	h,
	l,
	c,
	j,
	a,
	b = document.body;
	SetStyle($("dTop"), {
		left: "105px",
		top: 0
	});
	e.style.left = 0;
	SetVisible(e);
	while (g < k) { (function(d) {
			f = (j = e.childNodes[d]).id.substr(5).split("_$_")[0];
			l = (h = ArPCard[f].PName).prototype;
			j.onclick = function(i) {
				ChosePlant(i, d)
			};
			j.onmouseover = function() {
				SetVisible($("dTitle"));
				ViewPlantTitle(oS.MCID = d)
			};
			j.onmouseout = function() {
				SetHidden($("dTitle"))
			};
			j.firstChild.style.top = "-60px"; (a = j.lastChild).id = "sSunNum" + d;
			innerText(a, l.SunNum);
			ArCard.push({
				DID: j.id,
				CDReady: 0,
				SunReady: 0,
				PName: h
			})
		})(g++)
	}
	b.onkeydown = function(d) {
		GroundOnkeydown(d)
	};
	b.onmousedown = function(d) {
		GroundOnmousedown(d)
	};
	b.onmousemove = function(d) {
		GroundOnmousemove(d)
	};
	SetVisible(e); ! oS.BrainsNum && CustomSpecial(oBrains, oS.R - 1, -2); (oS.StartGame ||
	function() {
		StopMusic();
		(!oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			(oS.MusicMode) && (PlayMusic(oS.LoadMusic = oS.StartGameMusic));
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
			BeginCool();
			oS.DKind && AutoProduceSun(25);
			oSym.addTask(1500,
			function() {
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"))
			},
			[])
		})
	})();
	oS.StartTime = oSym.Now
},
ViewPlantTitle = function(b) {
	var f = $("dTitle"),
	e = ArCard[b],
	c = e.PName.prototype,
	a = c.CName; ! c.CardKind && (a += "<br>冷却时间:" + c.coolTime + "秒<br>" + c.Tooltip, !e.CDReady && (a += '<br><span style="color:#F00">正在重新装填中...</span>')); ! e.SunReady && (a += '<br><span style="color:#F00">阳光不足!</span>');
	f.innerHTML = a;
	SetStyle(f, {
		top: 60 * b + "px",
		left: (EDAlloffsetLeft + 100) + "px"
	})
},
BeginCool = function() {
	var b = ArCard.length,
	c, d, a, e;
	while (b--) {
		a = (c = (d = ArCard[b]).PName.prototype).coolTime;
		e = c.SunNum;
		switch (a) {
		case 0:
		case 7.5:
			d.CDReady = 1;
			e <= oS.SunNum && (d.SunReady = 1, $(d.DID).childNodes[0].style.top = "0");
			break;
		case 30:
			DoCoolTimer(b, 20);
			break;
		default:
			DoCoolTimer(b, 35)
		}
	}
},
ImmediatelyCool = function() {
	var b = ArCard.length,
	c, d, a, e;
	while (b--) {
		a = (c = (d = ArCard[b]).PName.prototype).coolTime;
		e = c.SunNum;
		d.CDReady = 1;
		d.SunReady = 1;
		$(d.DID).childNodes[0].style.top = 0
	}
},
MonitorCard = function(d) {
	var b = ArCard.length,
	c, a = Number(ESSunNum.innerHTML);
	a != oS.SunNum && (oS.SunNum = Math.min(a, oS.SunNum));
	if (oS.Chose < 1) {
		while (b--) { (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? (d.SunReady && (d.SunReady = 0), $(d.DID).childNodes[0].style.top = "-60px") : (!d.SunReady && (d.SunReady = 1), d.CDReady && ($(d.DID).childNodes[0].style.top = 0))
		}
	} else {
		while (b--) { (c = (d = ArCard[b]).PName.prototype).SunNum > oS.SunNum ? d.SunReady && (d.SunReady = 0) : !d.SunReady && (d.SunReady = 1)
		}
	}
	ViewPlantTitle(oS.MCID)
},
DoCoolTimer = function(c, b) {
	var a = $(ArCard[c].DID);
	NewEle("dCD1" + c, "span", "position:absolute;left:22px;top:22px;font-size:18px;font-weight:500;font-family:Verdana;color:#000", "", a);
	NewEle("dCD2" + c, "span", "position:absolute;left:20px;top:20px;font-size:18px;font-weight:500;font-family:Verdana;color:#FF0", "", a); (function(d, e) {
		d > 0 ? (innerText($("dCD1" + e), d), innerText($("dCD2" + e), d), oSym.addTask(50, arguments.callee, [(d - 0.5).toFixed(1), e])) : (ClearChild($("dCD1" + e), $("dCD2" + e)), ArCard[e].CDReady = 1, MonitorCard())
	})(b, c)
},
ChosePlant = function(h, d) {
	PlayAudio("seedlift");
	var g = ArCard[oS.ChoseCard = d];
	if (! (g.CDReady && g.SunReady)) {
		return
	}
	h = window.event || h;
	var b = h.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
	a = h.clientY + EBody.scrollTop || EElement.scrollTop,
	j = g.PName.prototype,
	e = ArCard.length,
	f, c = j.PicArr;
	oS.Chose = 1; ! j.CardKind ? EditImg(NewImg("MovePlant", c[j.StaticGif], "left:" + b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR) + "px;top:" + a + 20 - j.height + "px;z-index:254", EDAll).cloneNode(false), "MovePlantAlpha", "", {
		visibility: "hidden",
		filter: "alpha(opacity=40)",
		opacity: 0.4,
		zIndex: 30
	},
	EDAll) : (NewImg("MovePlant", j.PicArr[j.StandGif], "left:" + (b - 0.5 * (j.beAttackedPointL + j.beAttackedPointR)) + "px;top:" + (a + 20 - j.height) + "px;z-index:254", EDAll), NewImg("MovePlantAlpha", j.PicArr[j.StandGif], "visibility:hidden;filter:alpha(opacity=40);opacity:0.4;z-index:30", EDAll));
	while (e--) {
		$(ArCard[e].DID).childNodes[0].style.top = "-60px"
	}
	SetHidden($("dTitle"));
	GroundOnmousemove = GroundOnmousemove1
},
CancelPlant = function() {
	ClearChild($("MovePlant"), $("MovePlantAlpha"));
	oS.Chose = 0;
	MonitorCard();
	GroundOnmousemove = function() {}
},
ShovelPlant = function(a) {
	PlayAudio("plant2");
	var b = a[0],
	c = a[1];
	c && (c.PKind || !(b[1] || b[2])) && (c.Die(false), oS.MPID = "");
	CancelShovel()
},
ChoseShovel = function(a) {
	PlayAudio("shovel");
	WhichMouseButton(a) < 2 && (SetHidden($("imgShovel")), NewImg("tShovel", "images/interface/Shovel.png", "left:" + (a.clientX - 10) + "px;top:" + (a.clientY + document.body.scrollTop - 17) + "px;z-index:25", EDAll), oS.Chose = -1, GroundOnmousemove = GroundOnmousemove2, StopBubble(a))
},
CancelShovel = function(a) {
	var b = oS.MPID, r;
	ClearChild($("tShovel"));
	oS.Chose = 0;
	SetVisible($("imgShovel"));
	b && (r = $(b)) && SetAlpha(r.childNodes[1], 100, 1);
	GroundOnmousemove = function() {}
},
StopBubble = function(a) {
	window.event ? event.cancelBubble = true: a.stopPropagation()
},
GrowPlant = function(l, d, c, e, b) {
	var j = oS.ChoseCard, f = ArCard[j], h = f.PName, k = h.prototype, i = k.coolTime, a, g = oGd.$LF[e], o = f.Kind, s = (k.name == "Plants");

	if (k.CanGrow(l, e, b) && Trigger_Ctk_Plt(l, e, b, k)) {
		PlayAudio(g != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water");

		!k.CardKind ? (new h).Birth(d, c, e, b, l) : asyncInnerHTML((a = new h).CustomBirth(e, b, 0, "auto"), function(n, m) {
			EDPZ.appendChild(n), m.Birth();
		}, a);

		if (o) delete ArCard[j], ClearChild($(j))
		else !oS.Cheat_Mode && (innerText(ESSunNum, oS.SunNum -= k.SunNum), i && (f.CDReady = 0, DoCoolTimer(j, k.coolTime))); 

		oSym.addTask(20, SetHidden, [SetStyle(g != 2 ? $("imgGrowSoil") : $("imgGrowSpray"), {
			left: d - 30 + "px",
			top: c - 30 + "px",
			zIndex: 3 * e + 1,
			visibility: "visible"
		})]);
	} 
	CancelPlant()
},

//20231009种子雨（原创移植）
AppearCard = function (h, f, e, a, t) { // x, y, 植物id, 移动卡槽类型, 消失时间（默认 15s）
	var b, d, g = "dCard" + Math.random(), c = "opacity:1;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto);left:" + h + "px;top:-1000", t = t || 1500;

	if (a) d = 0, oSym.addTask(1, MoveDropCard, [g, f, t]); // 从天而降，反之抛物线掉落
	else d = f - 15 - 20, c += ";top:" + d + "px", oSym.addTask(1, DisappearCard, [g, t]), oSym.addTask(1,function(q,p,n,j,l,k,m,i){if(ArCard[q]&&$(q)){SetStyle($(q),{left:(p=p+j*k)+"px",top:(n=n+Number(l[0]))+"px"});l.shift();--m;m>0&&((l.length==0)&&(l=[8,16,24,32]),oSym.addTask(i,arguments.callee,[q,p,n,j,l,k,m,++i]))}},[g,h,d,Math.floor(Math.random()*4),[-32,-24,-16,-8],[-1,1][Math.floor(Math.random()*2)],8,2]); // 开始记时，确定抛物线，与阳光部分相似故压缩

	ArCard[g] = { DID: g, PName: e, PixelTop: 600, CDReady: 1, SunReady: 1, top: d, HasChosen: false, Kind: 1 }; // 生成卡片数据，是否被点击过
	NewImg(g, e.prototype.PicArr[e.prototype.CardGif], c, $("dCardList"), { // 生成卡片 ele
		onclick: function (g) { 
			var self = this, style = self.style, id = self.id; ClearChild($("MovePlant"), $("MovePlantAlpha")), CancelPlant(), style && (style.opacity = 0.5), ChosePlant(g, id), ArCard[id] && (ArCard[id].HasChosen = true);
		} 
	});
}, MoveDropCard = function (c, b, t) { // 掉落目标
	var a = ArCard[c], ele = $(c); a && ele && ((!a.HasChosen && a.top < b - 52) ? (ele.style.top = (a.top += 2) + "px", oSym.addTask(5, MoveDropCard, [c, b, t])) : DisappearCard(c, t));
}, DisappearCard = function (d, r) {
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


AutoProduceSun = function(a) {
	AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), a, 1);
	oSym.addTask(Math.floor(9 + Math.random() * 3) * 100, AutoProduceSun, [a])
},
AppearSun = function(h, f, e, a) {
	var b, d, g = "Sun" + Math.random(),
	c = "cursor:pointer;z-index:25;filter:alpha(opacity=80);opacity:0.8;left:" + h + "px;";
	switch (e) {
	case 25:
		c += "width:78px;height:78px";
		b = 39;
		break;
	case 15:
		c += "width:46px;height:46px";
		b = 23;
		break;
	default:
		c += "width:100px;height:100px";
		b = 55
	}
	a ? (d = 0, oSym.addTask(10, MoveDropSun, [g, f])) : (d = f - b - 20, c += ";top:" + d + "px", oSym.addTask(1,
	function(q, p, n, j, l, k, m, i) {
		if (ArSun[q] && ArSun[q].C) {
			SetStyle($(q), {
				left: (p = p + j * k) + "px",
				top: (n = n + Number(l[0])) + "px"
			});
			l.shift(); --m;
			m > 0 && ((l.length == 0) && (l = [8, 16, 24, 32]), oSym.addTask(i, arguments.callee, [q, p, n, j, l, k, m, ++i]))
		}
	},
	[g, h, d, Math.floor(Math.random() * 4), [ - 32, -24, -16, -8], [ - 1, 1][Math.floor(Math.random() * 2)], 8, 2]), oSym.addTask(800, DisappearSun, [g], 3));
	ArSun[g] = {
		id: g,
		N: e,
		C: 1,
		left: h,
		top: d
	};
	NewImg(g, "images/interface/Sun.gif", c, EDAll, {
		onclick: function() {
			ClickSun(this.id)
		}
	});
	oS.AutoSun && oSym.addTask(100, ClickSun, [g])
},
MoveDropSun = function(c, b) {
	var a = ArSun[c];
	a && a.C && (a.top < b - 53 ? ($(c).style.top = (a.top += 3) + "px", oSym.addTask(5, MoveDropSun, [c, b])) : oSym.addTask(800, DisappearSun, [c]))
},
DisappearSun = function(b) {
	var a = ArSun[b];
	a && a.C && (delete ArSun[b], ClearChild($(b)))
},
ClickSun = function(b) {
	PlayAudio("points");
	var a = ArSun[b];
	a && a.C && (a.C = 0, oSym.addTask(0, MoveClickSun, [b]))
},
MoveClickSun = function(b) {
	var a = 15,
	c = ArSun[b],
	e = 85,
	i = -20,
	d = c.left,
	h = c.top,
	g = Math.round((d - e) / a),
	f = Math.round((h - i) / a); (function(k, l, n, s, m, r, j, q, p) { (m -= q) > n ? (SetStyle($(k), {
			left: m + "px",
			top: (r -= p) + "px"
		}), oSym.addTask(j, arguments.callee, [k, l, n, s, m, r, j += 0.3, q, p])) : (SetStyle($(k), {
			left: n + "px",
			top: s + "px"
		}), Number(ESSunNum.innerHTML) != oS.SunNum && (oS.SunNum = Math.min(Number(ESSunNum.innerHTML), oS.SunNum)), innerText(ESSunNum, oS.SunNum = Math.min(oS.SunNum + l.N, oS.MaxSunNum)), MonitorCard(), delete ArSun[k], oSym.addTask(20, ClearChild, [$(k)]))
	})(b, c, e, i, d, h, 1, g, f)
},
AutoClickSun = function() {
	var a, b;
	for (b in ArSun) {
		ArSun[b].C && ClickSun(b)
	}
},
ShowLargeWave = function(a) {
	PlayAudio("hugewave");
	NewImg("LargeWave", "images/interface/LargeWave.gif", "left:71px;top:249px;width:858px;height:102px;z-index:50", EDAll);
	oSym.addTask(4,
	function(b, c, d) {
		SetStyle($("LargeWave"), {
			width: (b -= 57.2) + "px",
			height: (c -= 6.8) + "px",
			left: 500 - b * 0.5 + "px",
			top: 300 - c * 0.5 + "px"
		});
		b > 286 ? oSym.addTask(4, arguments.callee, [b, c, d]) : (oSym.addTask(460,
		function() {
			ClearChild($("LargeWave"))
		},
		[]), d && d())
	},
	[858, 102, a])
},
ShowFinalWave = function() {
	var a = function(b) {
		PlayAudio("finalwave");
		NewImg("FinalWave", "images/interface/FinalWave.gif", "left:122px;top:194px;width:756px;height:213px;z-index:50", EDAll);
		oSym.addTask(4,
		function(c, e, d) {
			SetStyle($("FinalWave"), {
				width: (c -= 50.4) + "px",
				height: (e -= 14.2) + "px",
				left: 500 - c * 0.5 + "px",
				top: 300 - e * 0.5 + "px"
			});
			c > 252 ? oSym.addTask(4, arguments.callee, [c, e, d]) : oSym.addTask(d,
			function() {
				ClearChild($("FinalWave"))
			},
			[])
		},
		[756, 213, b])
	}; (oP.FlagNum in oS.LargeWaveFlag) ? ShowLargeWave(function() {
		oSym.addTask(560, a, [150])
	}) : a(500)
},
GameOver = function(a) {
	AllAudioStop(); ! a ? (PlayAudio("scream"), NewImg("iGameOver", "images/interface/ZombiesWon.png", "width:900px;height:600px;z-index:255", EDAll, {
		onclick: function() {
			SelectModal(oS.Lvl)
		}
	})) : (PlayAudio("losemusic", false), SetHidden($("dLoginDataHTML")), $("dMsgFailed").innerHTML = a + '<p><p><span style="color:#10AE08">点击重新开始</span>', $("dMsgFailed").onclick = function() {
		SetNone($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed"));
		SelectModal(oS.Lvl);
		$("dMsgFailed").onclick = null;
		SetVisible($("dLoginDataHTML"));
	},
	SetBlock($("dSurface"), $("dShowMsgLogin"), $("dMsgFailed")));
	oSym.Stop()
},
PrepareGrowPlants = function(a) {
	var b = function() {
		PlayAudio("readysetplant");
		oSym.addTask(60,
		function(d, c) {
			var e = d.style;
			e.backgroundPosition = "0 -108px";
			oSym.addTask(40,
			function(g, h, f) {
				h.backgroundPosition = "0 -216px";
				oSym.addTask(100,
				function(j, i) {
					ClearChild(j);
					i()
				},
				[g, f])
			},
			[d, e, c])
		},
		[NewEle(0, "div", "position:absolute;overflow:hidden;background:url(images/interface/PrepareGrowPlants.png) no-repeat;width:255px;height:108px;z-index:50;left:" + (oS.W * 0.5 - 77) + "px;top:" + (oS.H * 0.5 - 54) + "px", 0, EDAll), a])
	};
	(oS.AutoMoveFog && oS.HaveFog) ? oGd.MoveFogLeft(b) : b()
},
CustomPlants = function(b, a, c) { (new ArCard[b].PName).Birth(GetX(c), GetY(a), a, c, [])
},
CustomSpecial = function(c, b, d, a) {(new c).Birth(GetX(d), GetY(b), b, d, [], a)
},
CheckAutoSun = function(a) {
	var b = a.checked ? 1 : 0;
	b != oS.AutoSun && (addCookie("JSPVZAutoSun", oS.AutoSun = b), b && AutoClickSun())
},
GetNewCard = function(a, b, c) {
	StopMusic();
	PlayAudio("winmusic");
	oSym.Clear(); (SetStyle(a, {
		left: "350px",
		top: "131px",
		width: "200px",
		height: "240px",
		clip: "rect(0,auto,120px,0)",
		cursor: "default"
	})).onclick = null;
	oSym.Init(function(d, e) {++d < 100 ? (SetAlpha(e, d, d * 0.01), oSym.addTask(4, arguments.callee, [d, e])) : function() {
			StopAudio("winmusic");
			PlayAudio("plantsgarden", true);
			SetHidden(EDAll, $("dTop"));
			var f = b.prototype;
			$("iNewPlantCard").src = f.PicArr[f.StaticGif];
			$("iNewPlantCard").style.marginTop = 180 - f.height + "px";
			innerText($("dNewPlantName"), f.CName);
			$("dNewPlantTooltip").innerHTML = f.Tooltip;
			$("btnNextLevel").onclick = function() {
				StopAudio("plantsgarden");
				SelectModal(c)
			};
			SetStyle($("dNewPlant"), {
				visibility: "visible",
				zIndex: 255
			})
		} ()
	},
	[0, $("DivA")])
},
getCookie1 = function(b, g) {
	var d = document.cookie,
	f = d.split(";"),
	c = f.length,
	a,
	e,
	h;
	while (c--) {
		h = (a = f[c]).split("=");
		if (h[0].replace(" ", "") == b) {
			if ((e = h.length) == 2) {
				return unescape(h[1])
			} else {
				h.shift();
				h = h.join("=").split("&");
				if (g == undefined) {
					return unescape(h)
				} else {
					e = h.length;
					while (e--) {
						if ((a = h[e].split("="))[0].replace(" ", "") == g) {
							return (unescape(a[1]))
						}
					}
				}
			}
		}
	}
	return 0
},
getCookie = function(b) {
	var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
	if (a != null) {
		return unescape(a[2])
	}
	return 0
},
addCookie = function(b, d, e) {
	var c = b + "=" + escape(d);
	if (e) {
		var a = new Date();
		a.setTime(a.getTime + e * 3600 * 1000);
		c += ";expire=" + a.toGMTString()
	}
	document.cookie = c
},
deleteCookie = function(a) {
	document.cookie = a + "=0;"
},
WordUTF8 = '<div id="dLogo" style="position:absolute;width:900px;height:600px;z-index:1"><div id="LogoWord" style="position:absolute;color:#FF0;top:285px;width:100%;height:140px"><span style="position:absolute;width:135px;height:100%;left:400px;top:0;cursor:pointer" onclick="PlayAudio(\'gravebutton\');SetBlock($(\'dSurface\'),$(\'iSurfaceBackground\'));ShowNameDiv()"></span><div style="position:absolute;font-size:13px;left:610px;text-align:center;width:140px;top:110px;line-height:1.6;font-weight:bold"><span style="cursor:pointer"><span id="sTime" style="cursor:pointer">（制作组名单）</span></span></div></div><div style="position:absolute;width:155px;height:110px;left:600px;top:340px;cursor:pointer;z-index:300" onclick="SelectModal(\'System/Staff\');/*SetVisible($(\'dProcess\'))*/"></div><div id="dBalloonZombie"><img src="images/interface/balloon_zombie32.png"></div><div id="dSetting" class="dSetting" style="position:absolute;width:60px;height:60px;left:10px;top:10px;cursor:pointer" onclick="SelectModal(\'System/Config\');"></div></div>',
ShowNameDiv = function() {
	oSym.Start(); (function(c) {
		var b = c[0],
		d = 3;
		c.shift();
		while (d--) {
			SetStyle($("dNameDiv" + d).style.top = b[d] + "px")
		}
		c.length && oSym.addTask(b[3], arguments.callee, [c])
	})([[ - 260, 96, 136, 10], [ - 94, 96, 136, 10], [ - 6, 127, 176, 10], [ - 8, 134, 188, 17], [ - 8, 130, 179, 17], [ - 8, 136, 189, 17], [ - 8, 134, 187, 10]])
},
GotoAuthorWebsite = function(b) {
	PlayAudio("tap");
	var a = "http://" + $User.AuthorWebsite;
	confirm("您所玩的网站非游戏官方网站，不支持" + b + "\n\n请到作者网站 " + a + " 登录！\n\n\n点“确定”将跳转到作者网站\n\n点“取消”将继续停留在当前网站") && (location.href = a)
},
ShowLoginDiv = function() {
	$User.isAuthorWebsite ? (PlayAudio("tap"), SetBlock($("dShowMsgLogin"))) : GotoAuthorWebsite("登录和保存功能")
},
SelectModal = function(g, Is_Url = false) {
	HiddenLevel();
	HiddenMiniGame(1);
	HiddenRiddleGame(1);
	HiddenTravelGame(1);
	SetNone($("dShowMsgLogin"));
	AllAudioStop();
	PausedAudioArr = [];
	g == undefined && (g = $User.Visitor.Progress);
	if (g > 35) {
		alert("本关卡暂未开放！");
		SelectModal(__Normal_Start_Room__);
		return
	}
	oS.LvlClearFunc && oS.LvlClearFunc();
	var b = oS.GlobalVariables,
	c = oS.LvlVariables,
	e = oS.SelfVariables,
	a = window,
	d;
	for (d in b) {
		a[d] = b[d]
	}
	for (d in c) {
		a[d] = null
	}
	for (d = e.length; d--; delete oS[e[d]]) {}
	for (d in $Pn) {
		$Pn[d] = null
	}
	oS.GlobalVariables = {};
	oS.LvlVariables = {};
	oS.SelfVariables.length = 0;

	oS.UrlLvList[g] |= !!Is_Url; //是否是url关卡

	SetHidden($("dCardList"), $("tGround"), $("dSelectCard"), $("dTop"), $("dMenu"), $("dHandBook"), $("dNewPlant"), $("dProcess"));
	SetNone($("dSurface"), $("iSurfaceBackground"));
	ClearChild($("dFlagMeterTitleB").firstChild);
	EDAll = $("dBody").replaceChild(EDNewAll, EDAll);
	$("dBody").replaceChild(EDNewFlagMeter, $("dFlagMeter"));
	LoadLvl(g)
},
LoadLvl = function(e, c) {
	oSym.Timer && oSym.Stop();
	var b = oSym.Now == c,
	d = $User,
	a = d.Visitor;
	oS.CenterContent && ((e == 0 && b || e != 0) && (oS.DisplayAD = false));
	SetBlock($("dLvlLink"));
	e = e || 0;
	//$("dServer") && e != 0 && SetNone($("dServer"));
	oSym.Init(function(g, f) {
		(f = $("JSPVZ")) && ClearChild(f);
		if (oS.UrlLvList[g]) NewEle("JSPVZ", "script", 0, {src: (oS.Lvl = g) + (__ONLINE_ALLOW_FRESH__ ? ("?" + Math.random()) : ("")), type: "text/javascript"},document.getElementsByTagName("head").item(0));
		else NewEle("JSPVZ", "script", 0, {src: "level/" + (oS.Lvl = g) + ".js", type: "text/javascript"},document.getElementsByTagName("head").item(0));
		
	}, [e && b ? 0 : e]);
	$("aLvlLink").href = "html/2-1" + (e && !isNaN(e) ? "-" + e: "") + ".htm"
},
AppearTombstones = function(n, e, m, def = () => true) {
	var r = oGd.$Tombstones, k = [], h = oS.R + 1, b, d = 0, q, a, g, f, s = oGd.$, l, p;
	while (--h) {
		g = e; while (g >= n)  ! r[h + "_" + g] && def(h, g) && (k[d++] = [h, g]), --g;
	}
	while (m-- && k.length) {
		q = k[g = Math.floor(Math.random() * k.length)];
		r[p = (h = q[0]) + "_" + (b = q[1])] = 1;
		for (f = 0; f < MAX_PLT_INDEX; f++) { (l = s[p + "_" + f]) && l.Die()
		}
		k.splice(g, 1);
		a = NewEle("dTombstones" + h + "_" + b, "div", "position:absolute;width:86px;height:91px;left:" + (GetX(b) - 43) + "px;top:" + (GetY(h) - 91) + "px", 0, EDAll);
		h = Math.floor(Math.random() * 4);
		b = Math.floor(Math.random() * 2);
		var c; (a.appendChild(c = (NewEle("", "div", "background-position:-" + 86 * h + "px -" + 91 * b + "px", {
			className: "Tom1"
		},
		a)).cloneNode(false))).className = "Tom2"
	}
},
ResetGame = function(b) {
	AllAudioPauseCanceled();
	var a = oSym;
	a.Start();
	innerText(b, "暂停游戏");
	$("dMenu1").onclick = ClickMenu;
	SetNone($("dSurface"), $("dPause"));
	$("dPauseAD").innerHTML = ""
},
PauseGame = function(c, a) {
	var b = oSym;
	AllAudioPaused();
	b.Stop();
	innerText(c, "回到游戏");
	$("dMenu1").onclick = null; ! a && SetBlock($("dSurface"), $("dPause"));
	$("dPauseAD").innerHTML = $User.Client.PC && oS.CenterContent ? '<object width="320" height="240" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="images/link/flash.swf" /><param name="quality" value="high" /><param name="FlashVars" value="pubid=ca-games-pub-9213374815406375&channels=8885000954&contentid=%e9%9a%8f%e4%be%bf%e5%86%99&adType=graphical_fullscreen&adWidth=320&adHeight=240&descriptionUrl=http%3a%2f%2fwww.4399.com&ad_ul=zh_CN" /><embed width="320" height="240" allowscriptaccess="always" allowfullscreen="false" src="images/link/flash.swf?pubid=ca-games-pub-9213374815406375&channels=8885000954&contentid=%e9%9a%8f%e4%be%bf%e5%86%99&adType=graphical_fullscreen&adWidth=320&adHeight=240&descriptionUrl=http%3a%2f%2fwww.4399.com&ad_ul=zh_CN" quality="high" bgcolor="#ffffff" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" /></object>': '<img src="images/Zombies/NewspaperZombie/1.gif">'
},
ClickMenu = function() {
	oSym.Timer && (AllAudioPaused(), PlayAudio("pause"), oSym.Stop(), SetBlock($("dSurface")), innerText($("dMenu0"), "回到游戏"), ShowOptions())
},
OptionsMenuDown = function(b, a) {
	b.className = "OptionsMenuButtonDown";
	a.style.lineHeight = "102px"
},
OptionsMenuUP = function(b, a) {
	b.className = "OptionsMenuButton";
	a.style.lineHeight = "100px"
},
ShowSpeed = function() {
	PlayAudio("gravebutton");
	SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
	SetBlock($("dSpeedContainer"))
},
HiddenSpeed = function() {
	PlayAudio("tap");
	SetNone($("dSpeedContainer"));
	oS.Lvl && (ResetGame($("dMenu0")))
},
CSpeed = function(a, c, b) {
	$User.Visitor.NowStep = oSym.NowStep = a;
	$User.Visitor.TimeStep = oSym.TimeStep = c;
	$("dDisplaySpeed").innerHTML = b
},
ShowLevel = function() {
	PlayAudio("gravebutton");
	SetNone($("dOptionsMenu"));
	SetBlock($("dAdvSmallContainer"))
},
HiddenLevel = function() {
	PlayAudio("tap");
	SetNone($("dOptionsMenuback"), $("dAdvSmallContainer"));
	oS.Lvl && (SetNone($("dSurface")), ResetGame($("dMenu0")))
},
ShowMiniGame = function() {
	PlayAudio("gravebutton");
	SetBlock($("dMiniSmallContainer"))
},
HiddenMiniGame = function(a) { ! a && PlayAudio("tap");
	SetNone($("dMiniSmallContainer"))
},
ShowRiddleGame = function() {
	PlayAudio("gravebutton");
	SetBlock($("dRiddleSmallContainer"))
},
HiddenRiddleGame = function(a) { ! a && PlayAudio("tap");
	SetNone($("dRiddleSmallContainer"))
},
ShowRiddle1 = function() {
	$User.isAuthorWebsite ? (PlayAudio("gravebutton"), SetNone($("dRiddleInx")), SetBlock($("dRiddle1")), $("dRiddleTitle").innerHTML = "益智模式对战版") : GotoAuthorWebsite("益智模式对战的功能")
},
ReturnRiddleInx = function() {
	PlayAudio("tap");
	SetBlock($("dRiddleInx"));
	SetNone($("dRiddle0"), $("dRiddle1"));
	$("dRiddleSmallContainer").className = "TitleSmallContainer  Almanac_IndexBack";
	$("dRiddleTitle").innerHTML = "益智模式"
},
ShowOptions = function() {
	PlayAudio(oS.Lvl ? "gravebutton": "tap");
	SetBlock($("dOptionsMenuback"), $("dOptionsMenu"))
},
HiddenOptions = function() {
	PlayAudio("gravebutton");
	PlayAudio("buttonclick");
	SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
	oS.Lvl && (SetNone($("dSurface")), ResetGame($("dMenu0")))
},
ViewHandBook = function() {
	SetNone($("dOptionsMenuback"), $("dOptionsMenu"));
	oS.Lvl ? (AllAudioPaused(), PlayAudio("gravebutton"), SetNone($("dSurface")), oSym.Stop(), innerText($("dMenu0"), "回到游戏"), $("dMenu1").onclick = null) : (AllAudioPaused(), PlayAudio("tap"));
	PlayAudio("Look up at the Sky", true);
	SetVisible($("dHandBook"))
},
ReturnHandBookInx = function() {
	PlayAudio("tap");
	SetNone($("dHandBookP"), $("dHandBookZ"));
	SetHidden($("dHandBookPZ"))
},
CloseHandBook = function() {
	PlayAudio("tap");
	StopAudio("Look up at the Sky");
	oS.Lvl ? ResetGame($("dMenu0")) : oSym.addTask(100, AllAudioPauseCanceled);
	SetNone($("dHandBookP"), $("dHandBookZ"));
	SetHidden($("dHandBookPZ"), $("dHandBook"))
},
ShowHelp = function() {
	AllAudioPaused();
	PlayAudio("tap");
	SetBlock($("dHelp"))
},
HiddenHelp = function() {
	PlayAudio("tap");
	AllAudioPauseCanceled();
	SetNone($("dHelp"))
},
$ = function(a) {
	return document.getElementById(a)
},
$n = function(a) {
	return document.createElement(a)
},
ClearChild = function() {
	var a = arguments.length,
	c;
	while (a--) {
		try {
			c = arguments[a];
			c && c.parentNode.removeChild(c);
			c = null
		} catch(b) {}
	}
},
SetBlock = function() {
	var a = arguments.length;
	while (a--)  if (arguments[a]?.style) arguments[a].style.display = "block"
	
},
SetNone = function() {
	var a = arguments.length;
	while (a--)  if (arguments[a]?.style) arguments[a].style.display = "none"
	
},
SetHidden = function() {
	var a = arguments.length;
	while (a--) if (arguments[a]?.style) arguments[a].style.visibility = "hidden"
	
},
SetVisible = function() {
	var a = arguments.length;
	while (a--) if (arguments[a]?.style) arguments[a].style.visibility = "visible";
},
SetAlpha = function(c, b, a) {
	c.style.opacity = a
},
SetStyle = function(d, b) {
	var c = d.style,
	a;
	for (a in b) {
		c[a] = b[a]
	}
	return d
},
NewImg = function(f, e, b, c, d) {
	var a = $n("img");
	a.src = e;
	b && (a.style.cssText = b);
	if (d) {
		for (v in d) {
			a[v] = d[v]
		}
	}
	f && (a.id = f);
	c && c.appendChild(a);
	return a
},
EditImg = function(e, f, c, b, a) {
	f && (e.id = f);
	c && (e.src = c);
	b && SetStyle(e, b);
	a && a.appendChild(e);
	return e
},
NewEle = function(h, b, d, a, e, f, g, c) {
	g = $n(b);
	h && (g.id = h);
	d && (g.style.cssText = d);
	if (a) {
		for (c in a) {
			g[c] = a[c]
		}
	}
	if (f) {
		for (c in f) {
			g.setAttribute(c, f[c])
		}
	}
	e && e.appendChild(g);
	return g
},
EditEle = function(g, f, a, e, b, c) {
	if (f) {
		for (c in f) {
			g.setAttribute(c, f[c])
		}
	}
	a && SetStyle(g, a);
	if (b) {
		for (c in b) {
			g[c] = b[c]
		}
	}
	e && e.appendChild(g);
	return g
},
NewO = function(b, a) {
	return (a = function() {}).prototype = b,
	a
},
SetPrototype = function(d, c, a) {
	a = d.prototype;
	for (var b in c) {
		a[b] = c[b]
	}
},
InheritO = function(d, i, c, g, b, h, f, e, a) {
	var g = function() {};
	g.prototype = new d;
	i && SetPrototype(g, i);
	if (c) {
		a = g.prototype;
		for (f in c) {
			b = a[f].slice(0);
			h = c[f];
			for (e in h) {
				b[e] = h[e]
			}
			g.prototype[f] = b
		}
	}
	return g
},
Compare = function(e, b, a, c, d) {
	return d = e < b ? b: e > a ? a: e,
	c ? [c(d), d] : [d]
},
$Switch = function(h, d, c, a, g, b, e) {
	b = 0;
	g = d.length;
	e = c;
	while (b < g) {
		if (e(h, d[b])) {
			break
		}++b
	}
	return a[b]
},
$SEql = function(c, b, a) {
	return (c in b) ? b[c] : b["default"]
};
$SSml = function(d, c, a) {
	var b = 0;
	LX = c.length;
	while (b < LX) {
		if (d < c[b]) {
			break
		}++b
	}
	return a[b]
},
$SGrt = function(d, c, a) {
	var b = 0;
	LX = c.length;
	while (b < LX) {
		if (d > c[b]) {
			break
		}++b
	}
	return a[b]
},
ImgSpriter = function(h, c, e, f, g) {
	var b = e[f],
	d = b[2],
	a = $(h);
	a && (a.style.backgroundPosition = b[0], oSym.addTask(b[1],
	function(j) {
		j > -1 ? ImgSpriter(h, c, e, j, g) : g(h, c)
	},
	[d]))
},
Ajax = function(a, e, d, c) {
	var b; (b = window.XMLHttpRequest ? (new XMLHttpRequest()) : new window.ActiveXObject("Microsoft.XMLHTTP")) && (c && (b.onreadystatechange = function() {
		b.readyState == 4 && b.status == 200 && c(b.responseText)
	}), b.open(e, a, true), e == "get" ? b.send(null) : (b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"), b.send(d)))
},
ShowAD = function(b, a) {
	return "暂未有广告";
},
ViewChat = function(a) {
	a.value == "显示聊天" ? (SetBlock($("dChatView")), a.value = "关闭聊天") : (SetNone($("dChatView")), a.value = "显示聊天")
},
StartAdventure = function(d) {
	if (d != undefined && d != 0) {
		SelectModal(d);
		return
	}
	var c = $("ZombieHand"), b = $("dAdventure"),
	a = NewImg("", "images/interface/ZombieHand.png", "position:absolute;left:0", c);
	b.onclick = b.onmouseover = b.onmouseout = null;
	SetBlock(c), StopMusic();
	PlayAudio("losemusic");
	oSym.addTask(120, function() {
		PlayAudio("evillaugh")
	}, []);
	oSym.addTask(7, function(f, e, g) {
		e.style.left = (g -= 330) + "px"; --f && oSym.addTask(7, arguments.callee, [f, e, g])
	}, [6, a, 0]);

	(function(f, g, e) {
		if (--e) {
			f.style.backgroundPosition = ["top", "bottom"][g];
			oSym.addTask(10, arguments.callee, [f, g ? 0 : 1, e])
		} else {
			f.style.backgroundPosition = "top",
			f.onclick = StartAdventure;
			f.onmouseover = function() {
				this.style.backgroundPosition = "bottom"
			};
			f.onmouseout = function() {
				this.style.backgroundPosition = "top"
			};
			StopAudio("evillaugh");
			SelectModal(d);
			c.innerHTML = ""
		}
	})(b, 1, 50);
};

Date.prototype.format = function(b) {
	var c = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds()
	};
	if (/(y+)/.test(b)) {
		b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (var a in c) {
		if (new RegExp("(" + a + ")").test(b)) {
			b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length))
		}
	}
	return b
};


var Trigger_Plants_Die = function (Obj, R, C, Kind) {}, // 植物死亡后触发
Trigger_Plants_Birth = function (Obj, R, C, Kind) {}, // 种植植物时触发
Trigger_Zombies_Birth = function (Z) {}, // 生成僵尸时触发
Trigger_Zombies_Die = function (Z) {}, // 僵尸死亡后触发
Trigger_Ctk_Plt = function (L, R, C, Obj) { return true; }; // 可以种植植物的统一特殊判定