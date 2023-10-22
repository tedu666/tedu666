oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad, oSquash, oThreepeater, oTangleKelp, oJalapeno, oSpikeweed, oTorchwood, oTallNut, oSeaShroom, oPlantern, oCactus, oBlover, oSplitPea, oStarfruit, oPumpkinHead, oFlowerPot, oCoffeeBean, oGarlic, oGatlingPea, oGloomShroom, oTwinSunflower, oSpikerock],
	ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFootballZombie],
	PicArr: ["new_skin/InterFace/background_new_1.png"],
	backgroundImage: "new_skin/InterFace/background_new_1.png",
	LevelName: "EX-1 新家园",
	LvlEName: "EX_New_Home_1",
	StartGameMusic: "nice_graveyard",
	CanSelectCard: 1,
	MaxSunNum: 750,
	MusicMode: 1,
	SunNum: 250,
	DKind: 0,
	LevelProduce: "选卡界面会限制你选的卡，你选的卡阳光总和不能超过750，以及阳光上限改为750",
	LargeWaveFlag: {
		10: $("imgFlag2"),
		20: $("imgFlag1")
	}
}, {
	AZ: [[oZombie, 1, 4], [oZombie2, 1, 4], [oZombie3, 1, 4], [oConeheadZombie, 2, 1], [oPoleVaultingZombie, 2, 5], [oBucketheadZombie, 2, 2], [oFootballZombie, 1, 1, [1]]],
	FlagNum: 20,
	FlagToSumNum: {
		a1: [   3, 5, 7,  9, 10, 13, 15, 19],
		a2: [3, 4, 2, 3, 10,  5,  9, 16, 30]
	},
	FlagToMonitor: {
		9: [ShowLargeWave, 0],
		19: [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
 		NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:160", 0, EDMove);
		NewImg("imgSF", "images/Card/Plants/Torchwood.png", "left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDMove, {onclick: function() {GetNewCard(this, oTorchwood_Pro, 0);}});
		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDMove);
//		NewImg("imgSF", "images/interface/trophy.png", "left:43.5%;top:220px", EDMove, {onclick: function() {SelectModal(0);PlayAudio("winmusic");}});
//		NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:51%", EDMove);
		Win_Travel(1, 2);
	}
},{
	SelectCard: function(c) {
		PlayAudio("tap");
		let h = $("Card" + c).childNodes, f = h[0], b = ArPCard[c], i = b.PName.prototype, g, a, j, e = $("btnOK");
		let AllSun = (ArPCard.AllSun |= 0);

		if (!b.Select) {
			if (! (ArPCard.SelNum |= 0)) {
				e.disabled = "", e.style.color = "#FC6"
			} else {
				if (ArPCard.SelNum > 9 || ArPCard.AllSun + i.SunNum > oS.MaxSunNum) {return;}
			};
			++ArPCard.SelNum, ArPCard.AllSun += i.SunNum, b.Select = 1;
			oS.StaticCard && (g = NewEle("dCard" + c, "div", "", {onclick: function() {SelectCard(c);}},$("dCardList")), NewImg(0, f.src, "width:100px;height:120px", g), innerText(NewEle("sSunNum" + c, "span", 0, 0, g), i.SunNum), f.style.top = "-42px");
		} else {
			ArPCard.AllSun -= i.SunNum, b.Select = 0; 
			!--ArPCard.SelNum && (e.disabled = "disabled", e.style.color = "#888"); (g = $("dCard" + c)).onclick = null;
			ClearChild(g.firstChild, g.childNodes[1], g.lastChild, g), f.style.top = 0
		}
	},
	MoveClickSun: function(b) {
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
	}
});
