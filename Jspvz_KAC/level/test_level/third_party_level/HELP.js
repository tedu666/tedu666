alert("本关为第三方关卡，原作者：白鹤亮翅。");

(!window["oZombossW"]) && (oZombossW = InheritO(oZombie, {
	EName: "oZombossW",
	CName: "大脑号仿尸机器人W型",
	Attack: Infinity,
	HP: Infinity,
	Lvl: 10000,
	width: 166,
	height: 144,
	beAttackedPointL: 82,
	beAttackedPointR: 101,
	OSpeed: 3.2,
	Speed: 3.2,
	ShowBool: false,
	Can_gethurt: true,
	BreakPoint: 100,
	StartGIF: 0,
	MinHP: 0,
	first_init: [50100, oImp, 650],
	AllLevelsHpNums: [	30100,18100,10100,4100],//血量到达这个的时候变别的僵尸
	AllLevelsZombie: [oJackinTheBoxZombie, oFootballZombie, oZomboni, oDancingZombie],//变身的结果僵尸
	AllLevelsSkills: [ 
		[{T:1000,f:
			function(d){d.ZX += 5, d.AttackedLX += 5, d.AttackedRX += 5, d.X += 5;d.ChangeR({R: d.R});}
		},{T:2000,f:
			function(d){Guard_skill(d, 1);}
		},{T:1700,f:
			function(d){d.Skill_Summon_Zombies(3, d);}
		}],

		[{T:1000,f:
			function(d){d.ZX += 5, d.AttackedLX += 5, d.AttackedRX += 5, d.X += 5;d.ChangeR({R: d.R});}
		},{T:2000,f:
			function(d){Guard_skill(d, 2);}
		},{T:1700,f:
			function(d){d.Skill_Summon_Zombies(5, d);}
		}],

		[{T:700,f:
			function(d){d.ZX += 5, d.AttackedLX += 5, d.AttackedRX += 5, d.X += 5;d.ChangeR({R: d.R});}
		},{T:1700,f:
			function(d){Guard_skill(d, 3);}
		},{T:1500,f:
			function(d){d.Skill_Summon_Zombies(7, d);}
		}],

		[{T:700,f:
			function(d){d.ZX += 5, d.AttackedLX += 5, d.AttackedRX += 5, d.X += 5;d.ChangeR({R: d.R});}
		},{T:1700,f:
			function(d){Guard_skill(d, 4);}
		},{T:0, f:
			function(d){Guard_skill(d, 4, "CHANGE_BG");}
		},{T:1500,f:
			function(d){d.Skill_Summon_Zombies(10, d);}
		}],

		[{T:500,f:
			function(d){d.ZX += 5, d.AttackedLX += 5, d.AttackedRX += 5, d.X += 5;d.ChangeR({R: d.R});}
		},{T:1200,f:
			function(d){Guard_skill(d, 5);}
		},{T:0, f:
			function(d){if(Math.floor(Math.random() * 1000000) == 0) d.HP = 50100, alert("恭喜你，即将面临无法挽回的局面。");}
		},{T:0, f:
			function(d){Guard_skill(d, 5, "SAVE_HP");}
		},{T:1000,f:
			function(d){d.Skill_Summon_Zombies(12, d);}
		}]
	],
	SumZombiesList: [oImp, oZombie, oConeheadZombie, oBucketheadZombie, oPoleVaultingZombie, oScreenDoorZombie, oFootballZombie, oZomboni, oJackinTheBoxZombie, oDancingZombie],
	Skill_Summon_Zombies: function(SumNum, d){
		let R = 0;
		for(let i = 0; i < d.SumZombiesList.length; i++){
			for(let j = 1; j <= SumNum; j++){
				R = Math.floor(Math.random() * oS.R + 1), ++oP.NumZombies;
				SummonZombie(d.SumZombiesList[i], R, 11);
			}
		}
	},
	SkillsNums: -1,
	NowObj: oFlagZombie,
	NowLevelsNum: 0,
	NowGifNum: 10,
	PicArr: (function(){
		EndGIF = [];
		EndGIF=EndGIF.concat(oFlagZombie.prototype.PicArr);//10个图片
		EndGIF=EndGIF.concat(oImp.prototype.PicArr);//6个图片
		EndGIF=EndGIF.concat(oJackinTheBoxZombie.prototype.PicArr);//12个图片
		EndGIF=EndGIF.concat(oFootballZombie.prototype.PicArr);//12个图片
		EndGIF=EndGIF.concat(oZomboni.prototype.PicArr);//10个图片
		EndGIF=EndGIF.concat(oDancingZombie.prototype.PicArr);//19个图片
		return EndGIF;
	})(),
	Produce: '韧性：<font color="#FF0000">不死之身</font></p>由 Wosb 设计， 我是帅 打造的 大脑号仿尸机器人W型 ',
	Birth: function() {
		var c = this;
		$Z[c.id] = c;
		oZ.add(c);
		c.BirthCallBack(c);
		StopMusic(oS.LoadMusic);
		oSym.addTask(20,function(f){
			if(f.X <= f.first_init[2]){//进场
				PlayMusic(oS.LoadMusic = oS.StartGameMusic = "Boss");

				f.HP = f.HP2 = f.first_init[0],f.X = f.first_init[2], f.ZX = f.X - f.beAttackedPointL,f.OSpeed = f.Speed = 0,f.ShowBool=true;
				let fs = f.first_init[1];
				f.BoomTransform(f,fs,fs.prototype.PicArr.length); //变身
				f.CanPass = function(d, c) {return c;}; //无视水路
			}else{
				f.Attack = Infinity;
				oSym.addTask(10,arguments.callee,[f]);
			}//继续检测
		},[this]);
	},
	BoomTransform: function(f,EndObj,NxtGifNum){
		g=EndObj.prototype;
		boomimg = NewImg("", "images/Zombies/JackinTheBoxZombie/Boom.gif", "width:306px;height:300px;left:" + (f.X - 16) + "px;top:" + (f.pixelTop - 90) + "px;z-index:20");
		EDPZ.appendChild(boomimg);
		oSym.addTask(70, ClearChild, [boomimg]);//爆炸动画
		PlayAudio('explosion');//爆炸音效
		//变身部分
		f.StartGIF += f.NowGifNum;
		f.NowGifNum = NxtGifNum;
		if(f.StartGIF >= f.PicArr.length){
			f.NormalDie();
			return;
		};
		Endgethits = function(a,b,c,d){
			if(!f.Can_gethurt)	OrnNoneZombies.prototype.getHit(a,0,c,d);
			else	OrnNoneZombies.prototype.getHit(a,b,c,d);
			f.CheckZombieHPLevels(f.HP,f);
			f.Attack = Infinity;
		};//伤害更改
		f.NowObj=EndObj;f.StandGif=f.StartGIF+g.StandGif;f.NormalGif=f.StartGIF+g.NormalGif;f.DieGif=f.StartGIF+g.DieGif;f.BoomDieGif=f.StartGIF+g.BoomDieGif;f.HeadGif=f.StartGIF+g.HeadGif;f.LostHeadGif=f.StartGIF+g.LostHeadGif;f.LostHeadAttackGif=f.StartGIF+g.LostHeadAttackGif;f.AttackGif=f.StartGIF+g.AttackGif;f.StaticGif=f.StartGIF+g.StaticGif;f.DieGif=f.StartGIF+g.DieGif;f.WalkGif0=f.StartGIF+g.WalkGif0;f.WalkGif1=f.StartGIF+g.WalkGif1;f.PlayNormalballAudio=g.PlayNormalballAudio;f.X-=g.beAttackedPointL-f.beAttackedPointL;f.AttackedLX-=g.beAttackedPointL-f.beAttackedPointL;f.AttackedRX-=g.beAttackedPointL-f.beAttackedPointL;f.beAttackedPointL=g.beAttackedPointL;f.beAttackedPointR=g.beAttackedPointR;f.BreakPoint=g.BreakPoint;f.width=g.width;f.height=g.height;f.getHit=f.getHit0=f.getHit1=f.getHit2=f.getHit3=Endgethits;f.GetDX=g.GetDX;f.GetDY=g.GetDY;f.GetDTop=g.GetDTop;f.getShadow=g.getShadow;f.EleShadow.style=f.getShadow(f);f.Ele.style.left=f.X+"px",f.Ele.style.top=(GetY(f.R)-f.height+f.GetDY(f))+"px";f.EleBody.src=f.PicArr[f.NormalGif=f.StandGif];
		f.Ele.childNodes[1].style.top = + f.GetDTop + "px";

		f.SkillsNums++;
		f.UseZombieSkill(f.SkillsNums,f,f.AllLevelsSkills[f.SkillsNums],true);//施放本阶段所有主动技能
	},
	CheckZombieHPLevels : function(HP,f){//判断技能状态
		//$("imgFlagMeterFull").style.clip = "rect(0,157px,21px,"+ ((HP / f.HP2 * 150).toFixed(2)) +"px)";
		if(f.AllLevelsHpNums[f.NowLevelsNum] == undefined){
			return;
		}
		if(HP <= f.AllLevelsHpNums[f.NowLevelsNum]){//如果血量小于这一级，进行下一级
			f.BoomTransform(f,f.AllLevelsZombie[f.NowLevelsNum],f.AllLevelsZombie[f.NowLevelsNum].prototype.PicArr.length);
			f.NowLevelsNum++;
		}
	},
	UseZombieSkill : function(NowLevelsNum,f,ZombieSkills,cantuse){//技能
		if(NowLevelsNum < 0 || NowLevelsNum != f.SkillsNums){
			return;//不放技能
		};
		ZombieSkills = ZombieSkills || [];
		ZombieSkills.forEach((NowSkillsInfo)=>{
			if(!cantuse || !NowSkillsInfo.T){//初始技能或者本次不放技能
				try{
					NowSkillsInfo.f(f);
				}catch(why){
					console.error(why);
				}
			};
			if(NowSkillsInfo.T){//如果不是一次性技能
				oSym.addTask(NowSkillsInfo.T,f.UseZombieSkill,[NowLevelsNum,f,[NowSkillsInfo],false]);
			}
		});
	},
	getCrushed: function(){
		return false;
	},
	ExplosionDie: function(){
		this.getHit0(this, 1800, 0);
	},
	DisappearDie: function(){
		this.getHit0(this, 1800, 0);
	},
	getRaven: function() {
		return this.getHit0(this, 100, 0), 0;
	},
	bedevil: function(){},
	NormalDie: function() {
		for(i in $Z){i != this.id && $Z[i].NormalDie();};
		boomimg = NewImg("", "images/Zombies/JackinTheBoxZombie/Boom.gif", "width:306px;height:300px;left:" + (this.X - 16) + "px;top:" + (this.pixelTop - 90) + "px;z-index:20");
		EDPZ.appendChild(boomimg);
		oSym.addTask(70, ClearChild, [boomimg]);//爆炸动画
		PlayAudio('explosion');
		var c = this;
		c.SkillsNums = Infinity;
		c.EleBody.src = c.PicArr[c.DieGif] + Math.random();
		oSym.addTask(250, ClearChild, [c.Ele]);
		c.HP = 0;
		oP.NumZombies = 1, oP.MonPrgs();

		delete $Z[c.id];
	}
})
);



oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTorchwood, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGatlingPea, oGloomShroom, oTwinSunflower, oSpikerock],
	ZName: [oZombossW, oImp, oBackupDancer, oZombie, oZombie2, oZombie3, oPoleVaultingZombie, oConeheadZombie, oBucketheadZombie, oNewspaperZombie, oScreenDoorZombie, oFootballZombie, oDancingZombie, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oDolphinRiderZombie, oSnorkelZombie, oZomboni, oJackinTheBoxZombie, oBalloonZombie],
	PicArr: ["images/interface/background1.jpg", "images/interface/background2.jpg", "images/interface/fog0.png", "images/interface/fog0.png", "images/interface/fog1.png", "images/interface/fog2.png", "images/interface/fog3.png"],
	backgroundImage: "images/interface/background1.jpg",
	CanSelectCard: 1,
	SunNum: Infinity,
	MaxSunNum: Infinity,
	LevelName: "绝望",
	LvlEName: "HELP",
	DKind: 1,
	LargeWaveFlag: {
		11: $("imgFlag1"),
	},
	StartGameMusic: "To_Be",
	UserDefinedFlagFunc: function(a) {
		if(oP.FlagNum == oP.FlagZombies){
			delete oAudio['Boss'];
			NewURLAudio({
				url: "https://music.163.com/song/media/outer/url?id=471834.mp3",
				audioname: "Boss",
				loop: true
			});//导入boss音乐

			oSym.addTask(1,function(AudioName){
				nowaudio = oAudio[AudioName];
				if(nowaudio.volume > 0){
					nowaudio.volume = Math.max(0,nowaudio.volume - 0.01);
					oSym.addTask(1,arguments.callee,[AudioName]);
				}else{
					StopAudio(AudioName);
					nowaudio.volume = 1;
				}
			},[oS.LoadMusic]);
		}
	},
	LoadAccess: function(start_game){
		delete oAudio['To_Be'];
		NewURLAudio({
			url: "https://music.163.com/song/media/outer/url?id=857905.mp3",
			audioname: "To_Be",
			loop: true
		});

		//load new bg
		let wid = 900, hei = 600;
		NewEle("Dev_Canvas_A", "div", "left:0px; top:0px; pointer-events:none; position:absolute;width:900px;height:600px;z-index:200", 0, EDAll);
		NewEle("CanvasA", "canvas", "pointer-events:none; border:0px solid red;top:0px;left:0px;z-index:200;", {height:hei,width:wid}, $("Dev_Canvas_A"));
		NewEle("Dev_Canvas_B", "div", "left:0px; top:0px; pointer-events:none; position:absolute;width:900px;height:600px;z-index:200", 0, EDAll);
		NewEle("CanvasB", "canvas", "pointer-events:none; border:0px solid red;top:0px;left:0px;z-index:200;", {height:hei,width:wid}, $("Dev_Canvas_B"));
		NewEle("Dev_Canvas_C", "div", "left:0px; top:0px; pointer-events:none; position:absolute;width:900px;height:600px;z-index:200", 0, EDAll);
		NewEle("CanvasC", "canvas", "pointer-events:none; border:0px solid red;top:0px;left:0px;z-index:200;", {height:hei,width:wid}, $("Dev_Canvas_C"));

		//隐秘式，用于生成图案
		NewEle("Dev_Canvas_MAKE", "div", "pointer-events:none; position:absolute;width:900px;height:600px;z-index:-255", 0, EDAll);
		NewEle("CanvasCache", "canvas", "pointer-events:none; border:0px solid red;top:0px;left:0px;z-index:-255;", {height:600, width:2000}, $("Dev_Canvas_MAKE"));
		//第二背景
		NewImg("BackGround_Night", "images/interface/background2.jpg", "opacity:0;left:-115", EDAll);

		//霧
		for(let i = 0; i < 4; i++){
			NewImg("", "images/interface/fog" + i + ".png", "opacity:0;z-index:-255;", EDAll);
		}
		start_game();
	//	Skill_List[0].func();
	},
	StartGame: function() {
		StopMusic();
		SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			PlayMusic(oS.LoadMusic = oS.StartGameMusic = "To_Be");
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
			BeginCool();
			oSym.addTask(1500,
			function() {
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"))
			},
			[])
		})
	}
}, {
	AZ: [[oZombossW, 0, 100, [10]], [oFlagZombie, 1, 0]],
	FlagNum: 10,
	FlagToSumNum: {
		a1: [   9],
		a2: [0,  1]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
	},
	FlagToEnd: function() {
		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDAll, {
			onclick: function() {
				SelectModal(0);
				PlayAudio("winmusic");
			}
		});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDAll)
	}
},{
	Bad_Word_List: ["耀武扬威事不事的????????????","赫赫朱波事不事畏缩????????????","魔怔神胡言乱语事不事的????????????","词汇小偷事不事鹦鹉学舌????????????","朱波带蛇无能逃逸事不事的????????????","你们都是????????怎么着????????????","我把你连成太空人暴打你行不行的????????????","我vape拉满9872364326371828473暴打你行不行的????????????","看到我的都是Loser怎么着????????????","拉跨乐子还不与你神爹????????单挑????????????"],
	Allowed_Card: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oHypnoShroom, oScaredyShroom, oSquash, oThreepeater, oSpikeweed, oTorchwood, oTallNut, oCactus, oSplitPea, oStarfruit, oGarlic],
	SummonZombie : function(id , e , b) {  //僵尸obj，行，列
		e = Math.min(Math.max(e , 1) , oS.R),b = Math.min(Math.max(b , -2) , 11);
		asyncInnerHTML((a = new id).CustomBirth(e, b, 1, "auto"),
		function(n, m) {
			EDPZ.appendChild(n);
			m.Birth();
		},a);
		return a;//返回僵尸数据
	},
	SetTimeoutSummonZombie: function(c,y,x) {
		var f = [],d = [],e = 0,a = c.length;
		d[0] = (f[0] = new c).CustomBirth(y,x,100);
		oP.AppearUP(d, f, 1);
		return f[0];
	},
	Draw_Img: [], //{img: "11", x:1, y:1}
	CanvasText: [], //{Text: "111", X: 900, Y: 100, dx: -1, dy: 0, type: "drawImage"}
	Canvas_Min_PX: {X1: -2000, X2: Infinity, Y1: -2000, Y2: 2000, refT: 0},
	NOW_CANVAS_ID_TIMES: 1,
	ClearCanvas: function(div){
		div.getContext('2d').clearRect(0, 0, div.width, div.height);
	},
	CANVAS_TEXT_MOVE: function(div){
		let ctx = div.getContext('2d');	
		oSym.addTask(1, function(ctx, div, nowid){
			(nowid == NOW_CANVAS_ID_TIMES) && (oSym.addTask(1, arguments.callee, [ctx, div, nowid]));
			if(Canvas_Min_PX.refT == oSym.Now) return;
			ClearCanvas(div), Canvas_Min_PX.refT = oSym.Now;
			for(let i = 0; i < CanvasText.length; i++){
				let T = CanvasText[i], t = T.Text, x = T.X, y = T.Y;
				let x1 = Canvas_Min_PX.X1, x2 = Canvas_Min_PX.X2, y1 = Canvas_Min_PX.Y1, y2 = Canvas_Min_PX.Y2;

				if(T.type){ctx[T.type](t, x, y);}else{ctx.fillText(t, x, y);};
				(T.dx) && (T.X += T.dx), (T.dy) && (T.Y += T.dy);
			};

			let x1 = Canvas_Min_PX.X1, x2 = Canvas_Min_PX.X2, y1 = Canvas_Min_PX.Y1, y2 = Canvas_Min_PX.Y2;
			for(let i = CanvasText.length - 1; i >= 0; --i){
				let T = CanvasText[i], t = T.Text, x = T.X, y = T.Y;
				if(x < x1 || x > x2 || y < y1 || y > y2) CanvasText.splice(i, 1);
			}
		},[ctx, div, NOW_CANVAS_ID_TIMES]);
	},
	Cav_Draw_Img: function(Canvas, Show_ctx){
		ClearCanvas(Canvas);
		let tmp = new Image();
		for(let i in Draw_Img){
			let d = Draw_Img[i], img = d.img, x = d.x, y = d.y, tmpval;
			for(let j in d.style){
				tmpval = Show_ctx[j];
				Show_ctx[j] = d.style[j];
				d.style[j] = tmpval;
			}
			tmp.src = img;
			Show_ctx.drawImage(tmp, x, y);
			for(let j in d.style){
				tmpval = Show_ctx[j];
				Show_ctx[j] = d.style[j];
				d.style[j] = tmpval;
			}
		}
	},
	Skill_List: [
{
	Name: "空间跳跃",
	EName: "Zombie_TP",
	Produce: "全场僵尸向前瞬移3格",
	weight: 15,
	func: function(dboss = {}, num, This){
		for(let i in $Z){
			let d = $Z[i], l = GetX(GetC(d.ZX)) - GetX(GetC(d.ZX) - 2);
			if(isNaN(l) || d.EName == dboss.EName) continue;
			d.ZX -= l, d.AttackedLX -= l, d.AttackedRX -= l, d.X -= l;
		};
	}
},
{
	Name: "喜怒无常",
	EName: "GOOD_LUCK",
	Produce: "75%概率僵尸加3.2速度加1400攻击,boss减500血；25%概率僵尸加200血,boss加500血",
	weight: 20,
	func: function(dboss = {}, num, This){
		let ram = Math.floor(1 + Math.random() * 100);
		let bossadd = (ram <= 75 ? -500 : 500);
		for(let i in $Z){
			let d = $Z[i];
			if(d.EName == dboss.EName) continue;
			if(ram <= 75){
				d.OSpeed += 3.2, d.Speed += 3.2, d.Attack += 1400;
			}else{
				d.HP += 200;
			};
		};
		dboss.HP += bossadd;
	}
},
{
	Name: "百鬼夜行",
	EName: "CHANGE_BG",
	Only_Manual: true,
	Only_1: true, //只发动一次的技能
	IS_USE: false,
	Produce: "背景切换至黑夜草地，并且场上出现100个小鬼",
	weight: 0,
	func: function(dboss = {}, num, This){
		let Show_canvas = document.getElementById('CanvasB'), Show_ctx = Show_canvas.getContext('2d');
		oSym.addTask(1, function(canvas, ctx, alpha, kind){
			ClearCanvas(canvas);
			ctx.fillStyle = 'rgba(0,0,0,' + alpha +')', ctx.fillRect(0, 0, canvas.width, canvas.height);
			if(kind == 0 && alpha <= 1){
				oSym.addTask(1, arguments.callee, [canvas, ctx, alpha + 0.02, kind]);
			}else if(alpha >= 0){
				if(kind == 0){
					oS.DKind = 0, $("BackGround_Night").style.opacity = 1, $("tGround").style.opacity = 0;
					for(let i = 1; i <= 100; i++){
						let x = Math.floor(Math.random() * oS.C) + 1, y = Math.floor(Math.random() * oS.R) + 1;
						SetTimeoutSummonZombie(oImp, y, x);
					};
				};
				oSym.addTask(1, arguments.callee, [canvas, ctx, alpha - 0.02, 1]);
			}else{
				ClearCanvas(canvas);
			};
		}, [Show_canvas, Show_ctx, 0, 0]);
	}
},
{
	Name: "万变归宗",
	EName: "CHANGE_PLT",
	Produce: "全场植物变成同一种植物",
	weight: 10,
	func: function(dboss = {}, num, This){
		let Show_canvas = document.getElementById('CanvasB'), Show_ctx = Show_canvas.getContext('2d');
		oSym.addTask(1, function(canvas, ctx, alpha, kind){
			ClearCanvas(canvas);
			ctx.fillStyle = 'rgba(0,0,0,' + alpha +')', ctx.fillRect(0, 0, canvas.width, canvas.height);
			if(kind == 0 && alpha <= 1){
				oSym.addTask(1, arguments.callee, [canvas, ctx, alpha + 0.05, kind]);
			}else if(alpha >= 0){
				if(kind == 0){
					let tmp = Allowed_Card[Math.floor(Math.random() * Allowed_Card.length)];
					for(let i = 1; i <= oS.R; i++){
						for(let j = 1; j <= oS.C; j++){
							let d = oGd.$[i + '_' + j + '_1'];
							if(!d) continue;
							CustomSpecial(tmp, i, j);
						}
					}
				};
				oSym.addTask(1, arguments.callee, [canvas, ctx, alpha - 0.05, 1]);
			}else{
				ClearCanvas(canvas);
			};
		}, [Show_canvas, Show_ctx, 0, 0]);
	}
},
{
	Name: "斗转星移",
	EName: "RESET_PLT",
	Produce: "全场植物位置随机调换",
	weight: 25,
	func: function(dboss = {}, num, This){
		let Show_canvas = document.getElementById('CanvasB'), Show_ctx = Show_canvas.getContext('2d');
		oSym.addTask(1, function(canvas, ctx, alpha, kind){
			ClearCanvas(canvas);
			ctx.fillStyle = 'rgba(0,0,0,' + alpha +')', ctx.fillRect(0, 0, canvas.width, canvas.height);
			if(kind == 0 && alpha <= 1){
				oSym.addTask(1, arguments.callee, [canvas, ctx, alpha + 0.05, kind]);
			}else if(alpha >= 0){
				if(kind == 0){
					let plt = [];
					for(let i = 1; i <= oS.R; i++){
						for(let j = 1; j <= oS.C; j++){
							let d = oGd.$[i + '_' + j + '_1'];
							if(!d) continue;
							plt.push(d.EName);
						}
					}
					plt.sort(() => {return Math.random() - 0.5});
					let tmp = 0;
					for(let i = 1; i <= oS.R; i++){
						for(let j = 1; j <= oS.C; j++){
							let d = oGd.$[i + '_' + j + '_1'];
							if(!d) continue;
							CustomSpecial(window[plt[tmp++]], i, j);
						}
					}
				};
				oSym.addTask(1, arguments.callee, [canvas, ctx, alpha - 0.05, 1]);
			}else{
				ClearCanvas(canvas);
			};
		}, [Show_canvas, Show_ctx, 0, 0]);
	}
},
{
	Name: "自相矛盾",
	EName: "MAKE_FOG",
	Produce: "所有植物周围3x3的植物每秒受到20伤害",
	weight: 15,
	func: function(dboss = {}, num, This){
		let Show_canvas = document.getElementById('CanvasC'), Show_ctx = Show_canvas.getContext('2d');
		let fogNum = 9, a = 2 * fogNum + 3, twx = GetX(-1) - 30, globalAlpha = 0.4;
		Draw_Img =  []; //{img: "11", x:1, y:1, sytle: {}}
		for(let ri = 1, tx = 0, g = 0; ri < 7; g = 0, ri++){
			for(let ci = 0; ci <= a; ci++){
				let img = 'images/interface/fog' + Math.floor(Math.random() * 4) + '.png';
				Draw_Img.push({
					img: img,
					x: twx + g,
					y: tx,
					style: {globalAlpha: globalAlpha}
				});
				g += 35;
			};
			tx += 90;
		};

		ClearCanvas(Show_canvas);
		//检测是否到下一技能，并且释放霾的伤害
		let ctk_is_next_skill = function(NowNum, endarr){
			for(let i = 1; i <= oS.R; i++){
				for(let j = 1; j <= oS.C; j++){
					let d = oGd.$[i + "_" + j + "_" + 1];
					if(!d) continue;
					for(let r = Math.max(i - 1, 1); r <= Math.min(i + 1, oS.R); r++){
						for(let c = Math.max(j - 1, 1); c <= Math.min(j + 1, oS.C); c++){
							if(r == i && c == j) continue;
							for(let k = 3; k >= 0; k--){
								let s = oGd.$[r + "_" + c + "_" + k];
								if(!s) continue;
								s.getHurt({}, 3, 20);
								break;
							};
						};
					};
				};
			};
			if(Use_Skill_Num == NowNum){
				oSym.addTask(100, arguments.callee, [NowNum, endarr]);
			}else{
				oSym.addTask(1, function(canvas, ctx, alpha, globalAlpha){
					Draw_Img.forEach((i) => {i.style.globalAlpha = alpha});
					ClearCanvas(canvas), Cav_Draw_Img(canvas, ctx);
					if(alpha > globalAlpha){
						oSym.addTask(1, arguments.callee, [canvas, ctx, alpha - 0.02, globalAlpha]);
					}else{
						Draw_Img.forEach((i) => {i.style.globalAlpha = globalAlpha});
						ClearCanvas(canvas), Cav_Draw_Img(canvas, ctx), Draw_Img = [];
					};
				}, endarr);
			};
		};
		oSym.addTask(1, function(canvas, ctx, alpha, globalAlpha, ctk_is_next_skill){
			Draw_Img.forEach((i) => {i.style.globalAlpha = alpha});
			ClearCanvas(canvas), Cav_Draw_Img(canvas, ctx);
			if(alpha < globalAlpha){
				oSym.addTask(1, arguments.callee, [canvas, ctx, alpha + 0.01, globalAlpha, ctk_is_next_skill]);
			}else{
				Draw_Img.forEach((i) => {i.style.globalAlpha = globalAlpha});
				ClearCanvas(canvas), Cav_Draw_Img(canvas, ctx);
				ctk_is_next_skill(Use_Skill_Num, [Show_canvas, Show_ctx, globalAlpha, 0]);
			};
		}, [Show_canvas, Show_ctx, 0, globalAlpha, ctk_is_next_skill]);
	}
},
{
	Name: "牢不可破",
	EName: "SAVE_HP",
	Produce: "锁血10秒",
	weight: 15,
	func: function(dboss = {}, num, This){
		dboss.Can_gethurt = false;
		oSym.addTask(1000, function(dboss){
			dboss.Can_gethurt = true;
		}, [dboss]);
	}
}
	],
	Use_Skill_Num: 0,
	Guard_skill: function(d, stage, must){//d:僵尸，stage:阶段，must：单一执行
		let mt, can_use_list = [], AllWeight = 0, Chose_Func = null;
		if((mt = Skill_List.findIndex((i) => {return i.EName == must})) != -1) return Skill_List[mt].func(d, Use_Skill_Num, Skill_List[mt]);

		for(let i = 0; i < Skill_List.length; i++){
			let d = Skill_List[i];
			if(!d.Only_Manual && !(d.Only_1 * d.IS_USE)){
				can_use_list.push([d.weight || 1, i]);
				AllWeight += d.weight;
			}
		}

		can_use_list.sort((fir, sec) => {return sec[0] - fir[0]});
		let RWeight = Math.floor(Math.random() * AllWeight);

		for(let i = 0; i < can_use_list.length; i++){
			RWeight -= can_use_list[i][0];
			if(!(RWeight > 0)){
				Chose_Func = can_use_list[i][1]; break;
			}
		};

		Use_Skill_Num++, Skill_List[Chose_Func].IS_USE = true;
		return Skill_List[Chose_Func].func(d, Use_Skill_Num, Skill_List[Chose_Func]);
	}
});

