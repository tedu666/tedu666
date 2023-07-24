// 借鉴于旅行的卷心菜
var oCabbage = InheritO(oPeashooter, {
	EName: "oCabbage",
	CName: "卷心菜投手",
	width: 115,
	height: 103,
	beAttackedPointL: 30,
	beAttackedPointR: 75,
	SunNum: 125,
	AttackGif: 5,
	Attack: 40, // 攻击伤害
	Is_AOE: false,
	Judge_Strength: 1.1,
	Attack_Await_Time: 290, // 等待时间
	AudioArr: ["CabbageAttack1", "CabbageAttack2"], // 音效
	PicArr: function() {
		var b = "new_skin/", a = b + "Images/Plants/Cabbage/";
		return [b + "Images/Card/Cabbage.webp", a + "0.gif", a + "Cabbage.gif", a + "Bullet.png", a + "BulletHit.gif", a + "CabbageAttack.gif"];
	}(),
	Tooltip: '向敌人抛出卷心菜',
	Produce: '向敌人抛出卷心菜<p>伤害：<font color="#FF0000">中等<br></font>范围：<font color="#FF0000">投掷</font></p>卷心菜投手用卷心菜砸僵尸干得很好，它以此赚钱，毕竟，它擅长这个。只是首先他不明白僵尸们是怎么爬上屋顶的。<p>技术支持/素材 - 江南游戏',
	PrivateBirth: function(a) { // 自定义生成
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.pixelLeft + 50) + "px;top:" + (a.pixelTop + 10) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
	},
	getAngle: (x, y, lastX, lastY) => 180 / Math.PI * Math.atan2(y - lastY, x - lastX), // 获取子弹旋转角度
	CheckLoop: function(b, c) { // 攻击以及攻击循环
		var a = this.id;
		($P[a]) && this.NormalAttack(b);
		oSym.addTask(this.Attack_Await_Time + Math.random() * 10 - 5, function(e, f, h) {
			var g; (g = $P[e]) && g.AttackCheck1(f, h)
		}, [a, b, c]);
	},
	HitZombie: function(f, self) {
		f.getPea(f, 0), f.getHit2(f, self.Attack); // getHit2没有声音
	},
	get_S_Vx: function(originalPos, targetPos, vy, gravity, targetXSpeed) { // 当前位置、僵尸位置、速度、重力、僵尸水平速度
		let x = originalPos[0], y = originalPos[1], zX = targetPos[0], zY = targetPos[1];

		let t1 = Math.abs(vy / gravity); // 上行时间
		let topPosition = y - 1 / 2 * gravity * (t1 ** 2); // 最高点坐标
		let relativeY = zY - topPosition; // 相对最高点坐标僵尸的高度
		let t2 = Math.sqrt(2 * Math.abs(relativeY) / gravity); // 下落时间
		let speedX = (10 / oP.ZTimeStep) * targetXSpeed * (t1 + t2) / 10; // 僵尸走动而影响的距离差

		let s = zX - speedX - x, vx = Math.abs(s / (t1 + t2)); // 水平位移，即投手到僵尸的距离; 水平速度
		return [s, vx];
	},
	NormalAttack: function(zid) {
		let self = this, Ele = $(self.id), TaskZombie = oZ.getArZ(self.pixelLeft + self.beAttackedPointR, oS.W, self.R, true).find((Z) => (Z.Altitude != 3)); // 找到最左边的僵尸

		if (!TaskZombie) return; // 没有，摆烂

		let bullet = EditEle(self.BulletEle.cloneNode(), {id: "CB" + Math.random()}, 0, EDPZ); // 生成子弹

		Ele.childNodes[1].src = self.PicArr[self.AttackGif], oSym.addTask(135, function(){$P[self.id] && (Ele.childNodes[1].src = self.PicArr[self.NormalGif]);}); // 攻击图片

		oSym.addTask(70, function() {
			PlayAudio(self.AudioArr[Math.floor(Math.random() * 2)]), SetVisible(bullet); // 攻击，显示子弹
			let x = self.pixelLeft + 30, y = self.pixelTop + 10; // 子弹横、纵坐标
			let width = 15, height = 20; // 子弹宽高
			let gravity = 0.2, vy = -10; // 重力加速度(定值); 竖直方向速度，初速度为定值

			let Z = TaskZombie, Head = Z.HeadTargetPosition, HeadPos = Head[Z.isAttacking] || Head[0]; // 僵尸和僵尸头部坐标

			let zY = parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + HeadPos.y - height; // 僵尸绝对纵坐标
			let zX = parseInt(TaskZombie.Ele.style.left) + HeadPos.x - width; // 投出时僵尸横坐标

			let zSpeed = !TaskZombie.isAttacking * TaskZombie.Speed * (TaskZombie.WalkDirection == 0 ? 1 : -1); // 是否攻击 * 速度 * 方向
			let S_Vx = self.get_S_Vx([x, y], [zX, zY], vy, gravity, zSpeed), s = S_Vx[0], vx = S_Vx[1]; // 获取距离和水平速度

			let x2 = x + s, dt = 2; // 落点坐标、 更新时间

			let lastX = x, lastY = y;
			let defAngle = self.getAngle(x + vx, y + vy + gravity, lastX, lastY); // 旋转、影子
			let bulletShadow = NewEle("Cabbage" + self.id + "_B_" + Math.random() + "_Shadow", "div", "opacity:0.5;background-size:29px;background-repeat:no-repeat;width:29px;left:" + x + "px;top:" + (self.pixelTop + self.height - 10) + "px;", {className: 'Shadow'}, EDPZ);

			(function() {
				vy += gravity * dt; // 竖直方向的速度受重力加速度影响

				bullet.style.left = (x += vx * dt) + 'px', bullet.style.top = (y += vy * dt) + 'px';
				bulletShadow.style.left = x + 'px', bullet.style.transform = "rotate(" + (self.getAngle(x, y, lastX, lastY) - defAngle - 25) + "deg)";
				(!$Z[TaskZombie.id]) && (zY = GetY(self.R) - 70); // 僵尸死亡的时候改变下落坐标

				if ((x >= x2 && y >= zY && vy > 0) || s < 40) { // 僵尸距离太小的情况 / 已经打到它了
					bullet && (bullet.src = self.PicArr[4], bullet.style.transform = "rotate(0deg)", oSym.addTask(120, ClearChild, [bullet])); // 变浆糊
					$Z[TaskZombie.id] && self.HitZombie(TaskZombie, self), ClearChild(bulletShadow); // 暴打僵尸、影子消失
				} else oSym.addTask(dt, arguments.callee), lastX = x, lastY = y; // 重设上一个x,y
			})();
		});
	}
});


var oMelonPult = InheritO(oCabbage, {
	EName: "oMelonPult",
	CName: "西瓜投手",
	width: 190,
	height: 120,
	beAttackedPointL: 65,
	beAttackedPointR: 120,
	SunNum: 250,
	coolTime: 7.5,
	AttackGif: 4,
	Attack: 90, // 西瓜伤害
	Attack2: 30, // 溅射伤害
	Is_AOE: true,
	Judge_Strength: 2.2,
	Attack_Await_Time: 290, // 等待时间
	AudioArr: ["CabbageAttack1", "CabbageAttack2", "melonimpact1", "melonimpact2"],
	PicArr: function () {
		var a = "new_skin/", b = a + "Images/Plants/MelonPult/";
		return [a + "Images/Card/MelonPult.webp", b + "0.webp", b + "static.webp", b + "Bullet.webp", b + "attack.webp"];
	}(),
	Tooltip: '可以对成群的僵尸造成巨大伤害',
	Produce: '西瓜投手可以对成群的僵尸造成巨大伤害。<p>伤害：<font color="#FF0000">高</font><br>范围：<font color="#FF0000">投掷</font><br>特点：<font color="#FF0000">西瓜可以对目标附近的僵尸造成伤害</font></p>低调从来不是西瓜投手的风格。<p>技术支持/素材 - 江南游戏',
	PrivateBirth: function(a) {a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.pixelLeft + 50) + "px;top:" + (a.pixelTop + 10) + "px;width:40px;visibility:hidden;z-index:" + (a.zIndex + 2));},
	HitZombie: function(f, self, x2, zY, realX, realY) {
		PlayAudio(self.AudioArr.slice(2, 4)[Math.floor(Math.random() * 2)]), $Z[f.id] && f.getHit2(f, self.Attack);

		let R = self.R, C = self.C, e, b;

		for (let i = Math.max(1, R - 1); i <= Math.min(R + 1, oS.R); ++i) {
			b = oZ.getArZ(x2 - 60, x2 + 80, i), e = b.length; // 获取
			while(e--) (b[e] != f && b[e].Altitude == 1) && b[e].getHit2(b[e], self.Attack2); // 溅射
		}
	},
	NormalAttack: function(zid) {
		let self = this, Ele = $(self.id), TaskZombie = oZ.getArZ(self.pixelLeft + self.beAttackedPointR, oS.W, self.R).find((Z) => (Z.Altitude != 3)); // 找到最左边的僵尸

		if (!TaskZombie) return; // 没有，摆烂

		let bullet = EditEle(self.BulletEle.cloneNode(), {id: "MP" + Math.random()}, 0, EDPZ); // 生成子弹

		Ele.childNodes[1].src = self.PicArr[self.AttackGif], oSym.addTask(135, function(){$P[self.id] && (Ele.childNodes[1].src = self.PicArr[self.NormalGif]);}); // 攻击图片

		oSym.addTask(70, function() {
			PlayAudio(self.AudioArr[Math.floor(Math.random() * 2)]), SetVisible(bullet); // 攻击，显示子弹
			let x = self.pixelLeft + 30, y = self.pixelTop + 10; // 子弹横、纵坐标
			let width = 15, height = 20; // 子弹宽高
			let gravity = 0.2, vy = -10; // 重力加速度(定值); 竖直方向速度，初速度为定值

			let Z = TaskZombie, Head = Z.HeadTargetPosition, HeadPos = Head[Z.isAttacking] || Head[0]; // 僵尸和僵尸头部坐标

			let zY = parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + HeadPos.y - height; // 僵尸绝对纵坐标
			let zX = parseInt(TaskZombie.Ele.style.left) + HeadPos.x - width; // 投出时僵尸横坐标

			let zSpeed = !TaskZombie.isAttacking * TaskZombie.Speed * (TaskZombie.WalkDirection == 0 ? 1 : -1); // 是否攻击 * 速度 * 方向
			let S_Vx = self.get_S_Vx([x, y], [zX, zY], vy, gravity, zSpeed), s = S_Vx[0], vx = S_Vx[1]; // 获取距离和水平速度

			let x2 = x + s, dt = 2; // 落点坐标、 更新时间

			let lastX = x, lastY = y;
			let defAngle = self.getAngle(x + vx, y + vy + gravity, lastX, lastY); // 旋转、影子
			let bulletShadow = NewEle("Melon" + self.id + "_B_" + Math.random() + "_Shadow", "div", "opacity:0.5;background-size:40px;background-repeat:no-repeat;width:40px;left:" + x + "px;top:" + (self.pixelTop + self.height - 10) + "px;", {className: 'Shadow'}, EDPZ);

			(function() {
				vy += gravity * dt; // 竖直方向的速度受重力加速度影响

				bullet.style.left = (x += vx * dt) + 'px', bullet.style.top = (y += vy * dt) + 'px';
				bulletShadow.style.left = x + 'px', bullet.style.transform = "rotate(" + (self.getAngle(x, y, lastX, lastY) - defAngle - 25) + "deg)";
				(!$Z[TaskZombie.id]) && (zY = GetY(self.R) - 70); // 僵尸死亡的时候改变下落坐标

				// 僵尸距离太小的情况 / 已经打到它了
				if ((x >= x2 && y >= zY && vy > 0) || s < 40) ClearChild(bullet), self.HitZombie(TaskZombie, self, x2, zY, x, y - vy * dt), ClearChild(bulletShadow); // 暴打僵尸、影子消失
				else oSym.addTask(dt, arguments.callee), lastX = x, lastY = y; // 重设上一个x,y
			})();
		});
	}
});


var oCattail = InheritO(oPeashooter, {
	EName: "oCattail",
	CName: "猫尾草",
	width: 190, height: 90,
	beAttackedPointL: 75,
	beAttackedPointR: 130,
	SunNum: 225, coolTime: 30, HP: 400,
	AttackGif: 4,
	Attack: 20, // 伤害
	BookHandBack: 4,
	Is_AOE: false,
	Judge_Strength: 1.2,
	Attack_Await_Time: 210, Twice_Await_Time: 70, // 等待时间
	__Open_Async_Picture__: true, 
	AudioArr: ["CabbageAttack1", "CabbageAttack2"], // 音效
	PicArr: (function() {
		var a = "images/Plants/Cattail/"; // 素材取自 jspvz低玩
		return ["images/Card/Plants/Catttail.png", a + "0.gif", a + "Cattail.gif", a + "Projectile32.png", a + "Attack.gif"]
	})(),
	Tooltip: '能够攻击任何线上的僵尸以及气球僵尸<br>(需要睡莲)',
	Produce: '攻击任何线上的僵尸以及气球僵尸。<p><font color="#FF0000">必须种植在睡莲上。</font></p>“嗷！”猫尾草说，“嗷！嗷！嗷！这让你困惑么？你不会看到我的名字里有猫，还有我看着像只猫就期待喵喵喵的叫？这里可不是这样的，我可不想被随便归类。” <p>素材来源 - jspvz低玩',
	PrivateBirth: function(a) { // 自定义生成
		a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.pixelLeft + 50) + "px;top:" + (a.pixelTop + 10) + "px;visibility:hidden;z-index:" + 20);
		oGd.$[a.R + "_" + a.C + "_0"] && oGd.$[a.R + "_" + a.C + "_0"].Die(); // 扬了睡莲
	},
	getTriggerR: (a) => [1, oS.R], // 列
	getTriggerRange: (a, b, c) => [[100, oS.W, 0]], // 全屏
	getShadow: (a) => "left:0:top:0;display:none", // 影子 style
	AttackCheck2: (c) => true, // 第二层检测，是个东西就打
	GetDY: (b, c, a) => -5,
	CheckLoop: function(b, c) { // 攻击以及攻击循环
		var a = this.id, self = this;
		(function(t){ // 连发
			($P[a]) && self.NormalAttack(b, t == 1);
			(--t > 0) && oSym.addTask(self.Twice_Await_Time, arguments.callee, [t]);
		})(2); // 两次
		oSym.addTask(this.Attack_Await_Time + Math.random() * 20 - 10, function(e, f, h) {var g; (g = $P[e]) && g.AttackCheck1(f, h); }, [a, b, c]);
	},
	HitZombie: function(f, self, Angle, _) { // 打到了
		f && f.Altitude == 3 && f.Drop && f.Drop(), _ = (((Angle + 90) % 360) > 180); // 再打一下就会爆炸
		f.getPea(f, 0, _), f.getHit0(f, self.Attack, _); // getHit2没有声音
	},
	CanGrow: function(b, a, d) {
		var c = b[0]; return c && c.EName == "oLilyPad" && !b[1]; // 紫卡 - 荷叶
	},
	Get_Distance: function(f, X, Y) { // 勾股定理距离
		if (!f) return Infinity; // 没有僵尸，inf
		let dx = f.ZX - X, dy = GetY(f.R) - Y;
		return Math.sqrt(dx * dx + dy * dy);
	},
	Get_Attack: function(dX, dY) { // 寻找最近的僵尸
		let self = this, X = dX || GetX(self.C), Y = dY || GetY(self.R);
		let Arz, MinDis = Infinity, MinZ, NowDis, NowZ, IsBall = !!Object["values"]($Z)["find"]((f) => f.EName == "oBalloonZombie" && f.Altitude == 3 && f.ZX <= oS.W); // 是否还有气球
		for (let i = 1; i <= oS.R; ++i) { // 左半部分
			NowZ = null, Arz = oZ.getArZ(100, X, i), NowZ = Arz.findLast((f) => f.EName == "oBalloonZombie" && f.Altitude == 3); // 如果有气球
			(!NowZ && !IsBall) ? (NowZ = Arz.findLast((f) => !f.WasDied && f.Altitude >= 1)) : (IsBall = true);
			(NowZ) && (NowDis = self.Get_Distance(NowZ, X, Y), (NowDis <= MinDis) && (MinDis = NowDis, MinZ = NowZ)); // 有的话，计算右的距离
		}
		for (let i = 1; i <= oS.R; ++i) { // 右半部分
			NowZ = null, Arz = oZ.getArZ(X, oS.W, i), NowZ = Arz.find((f) => f.EName == "oBalloonZombie" && f.Altitude == 3); // 如果有气球
			(!NowZ && !IsBall) ? (NowZ = Arz.find((f) => !f.WasDied && f.Altitude >= 1)) : (IsBall = true);
			(NowZ) && (NowDis = self.Get_Distance(NowZ, X, Y), (NowDis <= MinDis) && (MinDis = NowDis, MinZ = NowZ)); // 有的话，计算右的距离
		}
		return [MinDis, MinZ];
	},
	Pos_Angle_Fd: function(X1 = 0, Y1 = 0, Dis = 0, Angle = 0) { // 某个角度前进
		Angle = Angle / 180 * Math.PI, X1 += Dis * Math.cos(Angle), Y1 += Dis * Math.sin(Angle);
		return [X1, Y1];
	},
	Get_Angle: function(X1 = 0, Y1 = 0, X2 = 0, Y2 = 0) { // 计算方位角
		let Angle1 = Math.atan((Y1 - Y2) / (X1 - X2)) * 180 / Math.PI, Angle2 = - Angle1 + 90 + (X1 - X2 >= 0) * 180;
		return (Number["isNaN"](Angle2)) ? (270) : (Angle2);
	},
	Number_Type: function(x) {
		return x / Math.abs(x || 1);
	},
	Abs_Num_Min: function(X1, X2, Mods, MinN) {
		X1 = (X1 % Mods + Mods) % Mods, X2 = (X2 % Mods + Mods) % Mods;
		let ret = (Math.abs(X2 - X1) < MinN || Mods - Math.abs(X2 - X1) < MinN) ? (X2) : (X1 + this.Number_Type(X2 - X1) * Math.min(Math.abs(X2 - X1), MinN) * ((Math.abs(X2 - X1) < Mods - Math.abs(X2 - X1)) ? 1 : -1));
		return (ret % Mods + Mods) % Mods;
	},
	NormalAttack: function(Zid, LastShoot) {
		let self = this, Ele = $(self.id), TaskZombie = self.Get_Attack()[1]; // 找到最左边的僵尸

		LastShoot && oSym.addTask(105, function(){$P[self.id] && (Ele.childNodes[1].src = self.PicArr[self.NormalGif]);}); // 攻击图片

		if (!TaskZombie || !$Z[TaskZombie["id"]] || !$P[self["id"]]) return; // 没有，摆烂

		Ele.childNodes[1].src = self.PicArr[self.AttackGif];

		let bullet = EditEle(self.BulletEle.cloneNode(), {id: "PL" + Math.random()}, 0, EDPZ); // 生成子弹

		oSym.addTask(75, function() {
			PlayAudio(self.AudioArr[Math.floor(Math.random() * 2)]), SetVisible(bullet); // 攻击，显示子弹
			let x = self.pixelLeft + 60, y = self.pixelTop + 12.5; // 子弹横、纵坐标
			let Angle = 0, Fd = 7, MaxAngle = 10; // 初始角度, 前进速度, 最大拐弯度
			let width = 20, height = 20, dt = 2; // 子弹宽高, 帧率

			let Z = TaskZombie, Head = Z.HeadTargetPosition, HeadPos = Head[Z.isAttacking] || Head[0]; // 僵尸和僵尸头部坐标
			let zX1 = TaskZombie.AttackedLX, zX2 = TaskZombie.AttackedRX, zX = (zX1 + zX2) / 2, zY1 = parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + HeadPos.y - height, zY2 = parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + TaskZombie.GetDTop, zY = (zY1 + zY2) / 2; // 僵尸坐标
			let bulletShadow = NewEle("PL" + self.id + "_B_" + Math.random() + "_Shadow", "div", "opacity:0.5;background-size:40px;background-repeat:no-repeat;width:15px;left:" + x + "px;top:" + (y + 90) + "px;", {className: 'Shadow'}, EDPZ);
			let Posret = [0, 0], Can_Change = 0; // 是否可以获取坐标

			(function(Step){
				(Step >= 5 && Can_Change == 0) && (Can_Change = 1);
				(Can_Change == 1) && (Head = Z.HeadTargetPosition, HeadPos = Head[Z.isAttacking] || Head[0]); // 重新计算头坐标
				(Can_Change == 1) && (zX1 = TaskZombie.AttackedLX, zX2 = TaskZombie.AttackedRX, zX = (zX1 + zX2) / 2, zY1 = parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + HeadPos.y - height, zY2 = parseInt(TaskZombie.Ele.style.top) + TaskZombie.DivingDepth + TaskZombie.height - TaskZombie.GetDTop, zY = (zY1 + zY2) / 2); // 重新获取僵尸坐标
				(Can_Change == 1) && (Angle = self.Abs_Num_Min(Angle, self.Get_Angle(x, -y, zX, -zY) - 90, 360, MaxAngle)); // 旋转，因为子弹是横所以要左90
				Posret = self.Pos_Angle_Fd(x, y, Fd, Angle), x = Posret[0], y = Posret[1]; // 前进

				bullet.style.left = x + 'px', bullet.style.top = y + 'px';
				bulletShadow.style.left = x + 'px', bulletShadow.style.top = (y + 90) + 'px', bullet.style.transform = "rotate(" + Angle + "deg)";
				(!$Z[TaskZombie.id] || $Z[TaskZombie.id]?.WasDied == true) && (TaskZombie = self.Get_Attack(x, y)[1] || TaskZombie, Can_Change = 1); // 僵尸死亡的时候切换目标
				(!$Z[TaskZombie.id] || $Z[TaskZombie.id]?.WasDied == true) && (Can_Change = 10); // 如果重新定位还是没有，那么子弹报废

				// 僵尸距离太小的情况 / 已经打到它了
				if ((Can_Change != 10) && (zX1 <= x && x <= zX2 && zY1 <= y && y <= zY2)) ClearChild(bullet), self.HitZombie(TaskZombie, self, Angle), ClearChild(bulletShadow); // 暴打僵尸、影子消失
				else if (x < 0 - 2 * width || x > oS.W + 2 * width || y < 0 - 2 * height || y > oS.H + 2 * height || Number.isNaN(x + y)) ClearChild(bullet, bulletShadow);
				else oSym.addTask(dt, arguments.callee, [Step + dt]);
			})(0);
		});
	}
});
