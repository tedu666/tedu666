var oDiggerZombie = InheritO(OrnNoneZombies, {
	EName: "oDiggerZombie",
	CName: "矿工僵尸",
	Lvl: 2, SunNum: 75, HP: 370, BreakPoint: 50,
	width: 167, height: 170, GetDTop: 20,
	beAttackedPointL: 65, beAttackedPointR: 120,
	OSpeed: 5, Speed: 5, Altitude: 0, // 挖矿
	CardGif: 0, StandGif: 1, StaticGif: 2, NormalGif: 3, WalkGif0: 3, WalkGif1: 4, WalkGif2: 5,
	AttackGif: 3, AttackGif_Up0: 6, AttackGif_Up1: 7, HeadGif: 8, DieGif: 9, 
	UpGif: 10, DownGif: 11, BoomDieGif: 12, LostHeadGif: 5, LostHeadAttackGif: 5,
	Produce: '矿工僵尸可以当老六',
	BirthCallBack: function(f) {
		var e = f.delayT, d = f.id, c = f.Ele = $(d);
		f.EleShadow = c.firstChild, f.EleBody = c.childNodes[1], SetHidden(f.EleShadow);
		e ? oSym.addTask(e, function(h, g) {var i = $Z[h]; i && (i.FreeSetbodyTime = 0, SetBlock(g));}, [d, c]) : SetBlock(c);
	},
	HeadTargetPosition: [{x: 42, y: 146}, {x: 40, y: 147}],
	getShadow: function(a) {
		return "left:" + a.beAttackedPointL + "px;top:" + (a.height - 20) + "px"
	},
	PicArr: (function() {
		var a = "images/Zombies/Diggerzombie/";
		return ["images/Card/Zombies/Diggerzombie.png", a + "0.gif", a + "DiggerZombie.gif", a + "Walk1.gif", a + "Walk2.gif", a + "Walk3.gif", a + "Attack1.gif", a + "Attack2.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "Up.gif" + $Random, a + "Down.gif" + $Random, a + "BoomDie.gif"]
	} ()),
	AudioArr: ["zombie_entering_water"],
	Go_Up: function(a, WD) { // WD: 方向，1右0左
		a.beAttacked && (a.WalkDirection = WD, PlayAudio("zombie_entering_water"), a.Altitude = 4, SetVisible(a.EleShadow), a.EleBody.src = a.PicArr[a.UpGif] + Math.random(), a.OSpeed = a.Speed = 0), a.ChkActs = function() {return 1;}; // 跳起来
		oSym.addTask(100, function(c, b) {
			WD ? (b.AttackGif = b.AttackGif_Up0, b.AttackedRX += 30, b.beAttackedPointL = 70, b.beAttackedPointR = 130, b.Ele.lastChild.style.left = "40px", b.JudgeAttack = b.JudgeAttack_Up1) : (b.AttackGif = b.AttackGif_Up1); // GIF
			$Z[c] && b.beAttacked && (WD && b.ExchangeLR(b, WD), b.Altitude = 1, b.isAttacking = 0, b.EleBody.src = b.PicArr[b.NormalGif = b.DownGif]); // 眩晕
			$Z[c] && b.beAttacked && oSym.addTask(WD ? 400 : 0, function(c, b){ // 行走
				b.EleBody.src = b.PicArr[b.NormalGif = (WD ? b.WalkGif1 : b.WalkGif2)], b.OSpeed = b.Speed = 2, b.ChkActs = OrnNoneZombies["prototype"][WD ? "ChkActs1" : "ChkActs"];
			}, [c,b]);
		}, [a.id, a]);
	},
	ChkActs: function(f, d, g, c) { // 到了左边自己钻出来
		if(f.Altitude == 0 && f.AttackedRX < GetX(1) - 15) return f.Go_Up(f, 1), 1;

		var b, a, e; ! (f.FreeFreezeTime || f.FreeSetbodyTime) ? (f.beAttacked && !f.isAttacking && f.JudgeAttack_Dig(), !f.isAttacking ? ((a = f.AttackedRX -= (b = f.Speed)) < -50 ? (g.splice(c, 1), f.DisappearDie(), e = 0) : (a < 100 && !f.PointZombie && (f.PointZombie = 1, !oS.CardKind && (StopMusic(), PlayAudio("losemusic", false)), f.ChangeR({
			R: d, ar: [oS.R - 1], CustomTop: 400 - f.height + f.GetDY()
		})), f.ZX = f.AttackedLX -= b, f.Ele.style.left = Math.floor(f.X -= b) + "px", e = 1)) : e = 1) : e = 1;
		return e
	},
	CanDig: {"oPotatoMine": true},
	JudgeAttack_Dig: function() {
		var g = this, d = g.ZX, e = g.R + "_", f = GetC(d), h = oGd.$, c;
		((c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) && (g.CanDig[$P[c[1]]["EName"]])) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0, g.EleBody.src = g.PicArr[g.NormalGif])
	},
	JudgeAttack_Up1: function() {
		var g = this,
		d = g.AttackedRX,
		e = g.R + "_",
		f = GetC(d),
		h = oGd.$,
		c; (c = g.JudgeSR(g, e, f, d, h) || g.JudgeLR(g, e, f, d, h)) ? (!g.isAttacking && (g.isAttacking = 1, g.EleBody.src = g.PicArr[g.AttackGif]), g.NormalAttack(c[0], c[1])) : g.isAttacking && (g.isAttacking = 0, g.EleBody.src = g.PicArr[g.NormalGif])
	},
	Stone_of_Sinan_Up: function() { // 被磁铁吸了镐子调用的函数
		var g = this; g.Go_Up(g, 0), g.Stone_of_Sinan_Up = function() {};
	}
});