//let ___Template__New_$Flower___ = function(){return {}};
let ___Template__Summon_Flower___ = function(r, c){
	let Img = "new_skin/InterFace/FlowerLine2.png", height = 81, width = 38;
	let id = "dFlower_" + Math.random(), rc = r + "_" + c;
	let left = GetX(c), hei = GetY(r) - GetY(r - 1), top = GetY(r) - height - (hei - height);
	NewImg(id, Img, "top:" + top + "px;left:" + left + "px;width:" + width + ";height:" + hei, EDMove);
	$Flower[rc] = {R: r, C: c, id: id};
};

let ___Template__Ctk_Rc_Zombie___ = function(r, c){
	for(let i = 0; i <= oZ.$[r].length; i++){
		let d = oZ.$[r][i] || {}, zx = d.ZX, ar = d.Altitude, f = GetC(zx);
		if(f == c && ar == 1 && d.WasDied != true) return true;
	}
	return false;
}

let ___Template__Start_Ctk_Flower___ = function(){
	for(let _ in $Flower){
		let b = $Flower[_], r = b.R, c = b.C, id = b.id;
		if(__Ctk_Rc_Zombie__(r, c)) return (oSym.addTask(100, GameOver, []), SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), StopMusic(), PlayAudio("losemusic", false), -1);
	}
	oSym.addTask(1, arguments.callee, []);
}





let ___Template__Summon_Dangerous_Block___ = function(r, c){
	let Img = "new_skin/InterFace/Protect.png", height = 77, width = 74;
	let id = "dDangerous_" + Math.random(), rc = r + "_" + c;

	let ys = GetY1Y2(r), y1 = ys[0], y2 = Math.min(ys[1], 580), xs = GetX1X2(c), x1 = xs[0], x2 = xs[1];
	let wid = x2 - x1, hei = y2 - y1, left = x1, top = y1;

	NewImg(id, Img, "top:" + (top - 5) + "px;left:" + left + "px;width:" + wid + ";height:" + hei, EDMove);
	Dangerous_Block[r + "_" + c + "_" + 1] = 1;
	return id;
};

let ___CTK_SAVE_BLOCK___ = function(){
	(function(){
		for(let _ in Dangerous_Block){
			let d = _, b = Dangerous_Block[d];
			if(b == 1 && oGd.$[_]) Dangerous_Block[d] = 2;
			else if(b == 2 && !oGd.$[_]) return (oSym.addTask(100, GameOver, []), SetHidden($("dCardList"), $("dSunNum"), $("tdShovel")), StopMusic(), PlayAudio("losemusic", false), -1);
		};
		oSym.addTask(0, arguments.callee, []);
	})();
};