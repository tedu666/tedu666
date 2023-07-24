let ___Template__Summon_Ban_Block___ = function(r, c){
	let Img = "new_skin/InterFace/Ban.png", height = 77, width = 74;
	let id = "dBan_" + Math.random(), rc = r + "_" + c;

	let wid = Math.max(GetX(c) - GetX(c - 1), width + 10), hei = (GetY(r) - GetY(r - 1)) - 15;
	let left = GetX(c) - width / 2 - (wid - width), top = GetY(r) - height - (hei - height);

	NewImg(id, Img, "top:" + top + "px;left:" + left + "px;width:" + wid + ";height:" + hei, EDAll);
	oGd.$Creator_Def[rc] = {id: id, r: r, c: c};
};


let ___Template_Protect_Brain___ = {
	dag: [],
	redag: [],
	init_dag: function() {
		dag = [], redag = [];
		dag.add_edge = (u, v) => {
			u = JSON.stringify(u) || u.toString(), v = JSON.stringify(v) || v.toString();
			if(Array.isArray(dag[u])){dag[u].push(v);}else{dag[u] = [v];};
			if(Array.isArray(redag[v])){redag[v].push(u);}else{redag[v] = [u];};
		};
		dag.clear = () => {
			for(let i in dag){if(Array.isArray(dag[i]) && Array.isArray(JSON.parse(i))){delete dag[i];};};
			for(let i in redag){if(Array.isArray(redag[i]) && Array.isArray(JSON.parse(i))){delete redag[i];};};
		};
	},
	dag_zombie_init: function(b) { //初始化
		(isNaN(b.AttackedLX)) ? (b.AttackedLX = b.AttackedLX2) : (b.AttackedLX2 = b.AttackedLX);
		(isNaN(b.AttackedRX)) ? (b.AttackedRX = b.AttackedRX2) : (b.AttackedRX2 = b.AttackedRX);
		(isNaN(b.X)) ? (b.X = b.X2) : (b.X2 = b.X);
		(isNaN(b.ZX)) ? (b.ZX = b.ZX2) : (b.ZX2 = b.ZX);

		(b.Speed2 != b.OSpeed) && (b.Speed2 = b.OSpeed);
		if(b.init) return;
		b.init = true;
	},
	ctk_arrive_grid: function(b, task, reduce, tp, x){ //判断移动是否过头，如果是的话则弄到格子正中央
		let point = (b.beAttackedPointR - b.beAttackedPointL) * 0.5, twotrue = 0;
		let ty = GetY(task[0]), tx = GetX(task[1]);
		let xS = (b.Speed / Math.abs(b.Speed || 1)), yS = (b.RSpeed / Math.abs(b.RSpeed || 1));
		tp = tp + b.height - b.GetDY();
		let finaly = (ty - tp) * yS, finalx = (tx - x) * xS;
		if(finaly > 0) {b.Reduce[0] = 0, b.Ele.style.top = (ty - b.height + b.GetDY()) + 'px', b.RSpeed = 0};
		if(finalx > 0) {
			b.Reduce[1] = 0, b.AttackedLX = b.AttackedLX - b.X, b.AttackedRX = b.AttackedRX - b.X; 
			b.X = tx - point - b.beAttackedPointL, b.AttackedLX = b.AttackedLX + b.X, b.AttackedRX = b.AttackedRX + b.X;
			b.Ele.style.left = b.X + 'px', b.Speed = 0;
		};
		if(b.Reduce[0] == b.Reduce[1] && b.Reduce[0] == 0){
			delete b.Next_Edge;
			delete b.Reduce;
		};
	},
	ctk_change_r: function(b, tp) { //判断行数
		let tp2 = tp + b.height - b.GetDY(), l = GetR(tp2), r = !b.WalkDirection ? -5 : 5;
		if(b.R != l){
			b.ChangeR({
				R: b.R,
				ar: [l],
				CustomTop: tp
			});
			b.ZX -= r, b.AttackedLX -= r, b.AttackedRX -= r, b.X -= r;
			b.Ele.style.left = b.X + "px";
		}
	},
	ctk_final_set: function(b) {
		(b.WalkDirection && b.Speed < 0) && (b.Speed = -b.Speed); //反方向走，则速度取反。
		if(b.WalkDirection && b.Reduce && b.Reduce[1] > 0){ //目标路径走不到，往回走，判定点改变。
			(b.Speed > 0) && (b.Speed *= -b.Reduce[1] / Math.abs(b.Reduce[1] || 0));
		};
		(isNaN(b.AttackedLX)) ? (b.AttackedLX = b.AttackedLX2) : (b.AttackedLX2 = b.AttackedLX);
		(isNaN(b.AttackedRX)) ? (b.AttackedRX = b.AttackedRX2) : (b.AttackedRX2 = b.AttackedRX);
		(isNaN(b.X)) ? (b.X = b.X2) : (b.X2 = b.X);
		(isNaN(b.ZX)) ? (b.ZX = b.ZX2) : (b.ZX2 = b.ZX);
	},
	dag_traversal_of: function(){
		for(let _ in $Z){
			let Eletop, b = $Z[_], r = b.R, point = (b.beAttackedPointR - b.beAttackedPointL) * 0.5, 
				c = GetC(b.ZX + point), to = b.Next_Edge, now = '[' + r + ',' + c + ']', nowArr = [r, c];
			dag_zombie_init(b); //僵尸路线初始化。	

			//如果目前没有目标路径，重新选取路径
			//若选取后仍然没有路径/僵尸无法按照正常路径走，僵尸直走，速度复原。
			if(b.EName == "oZomboni") continue; //冰车除外，他在这是个寄吧
			if(!to && (b.WalkDirection ? redag[now] : dag[now])) {
				if(b.WalkDirection){
					b.Next_Edge = to = redag[now][Math.floor(Math.random() * redag[now].length)];
				}else{
					b.Next_Edge = to = dag[now][Math.floor(Math.random() * dag[now].length)];
				}
			};
			if(!to) {b.RSpeed = 0, b.Speed = b.Speed2; continue;};

			//计算目标路径
			let toArr = JSON.parse(to), Reduce = (b.Reduce = b.Reduce || [nowArr[0] - toArr[0], nowArr[1] - toArr[1]]);
			b.Speed = b.Speed2 * Reduce[1] * (!!b.FreeSlowTime * 0.5 || 1) * (!b.FreeFreezeTime);
			b.RSpeed = b.Speed2 * Reduce[0] * (!!b.FreeSlowTime * 0.5 || 1) * (!b.FreeFreezeTime);

			//上下移动
			Eletop = Number(b.Ele.style.top.split('px')[0]) - b.RSpeed, b.Ele.style.top = Eletop + 'px';
			ctk_arrive_grid(b, toArr, Reduce, Eletop, b.ZX + point);
			ctk_change_r(b, Eletop);
			ctk_final_set(b); //设置最后的操作，比如回退设定值

			// console.log(to);
		}
	},
	dfs: function(x, up){ //dfs the dag(test code).
		console.log(x);
		for(let i in dag[x]){
			let to = dag[x][i];
			if(to == up) continue;
			dfs(to, x);
		}
	}
};

