/*
	该文件用于定义 处理游戏内各种特效 以及 处理拆解的GIF 的类
		oEf: 类似 PVZTR 中的 oEffects 展示的效果
		oPTGif: 类似拆解 GIF
*/

let oEf = {
	NowVersion: 0, PlayingAnimate: {}, 
	Init: function () {
		let self = this;
		self["ClearAllAnimate"](); // 清除先前预留动画
		self["NowVersion"] = Math.random(); // 更新版本
		self["PlayingAnimate"] = {};
	}, 
	PauseAllAnimate () { // 暂停所有动画事件
		let self = this, APool = self["PlayingAnimate"];
		for (let O in APool) APool[O]["pause"]();
	}, 
	PlayAllAnimate () { // 恢复所有的动画事件
		let self = this, APool = self["PlayingAnimate"];
		for (let O in APool) APool[O]["play"]();
	}, 
	StopAllAnimate () { // 取消所有的动画事件
		let self = this, APool = self["PlayingAnimate"];
		for (let O in APool) APool[O]["cancel"]();
	}, 
	ClearAllAnimate () {
		let self = this, APool = self["PlayingAnimate"];
		self["StopAllAnimate"](), self["PlayingAnimate"] = {};
	}, 
	Animate (Ele, Style, Duration, Ease, CallBack, Delay = 0, Repetitions = 1) { // 低配版动画效果
		// Ease: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"]
		if (!Ele) return;
		Duration = $SEql(Duration, {"fast": 0.2, "medium": 0.6, "slow": 1.0, "default": Duration ?? 1}); // 处理时间
		let self = this, Ver = self["NowVersion"], AnimateID = Math.random();
		let Animate = Ele.animate((Array.isArray(Style) ? [Style[0], Style[1]] : [Style]), { // [初始 Style, 目标 Style]
			duration: Duration * 1000, // 动画持续时间
			delay: Delay, // 动画延迟时间
			easing: Ease ?? "linear", // 动画效果，默认线性
			iterations: Repetitions, // 播放次数
			fill: "none" // 动画结束后不停留在最后一个关键帧上
		});

		self["PlayingAnimate"][AnimateID] = Animate; // 设置占位

		Animate.onfinish = () => {
			if (Array.isArray(Style)) Style = Style[Style.length - 1];
			Animate.onfinish = null;
			delete self["PlayingAnimate"][AnimateID]; // 删除占位
			if (Ver === self["NowVersion"]) {
				for (let Key in Style) Ele["style"][Key] = Style[Key]; // 关键帧结束，直接赋值
				if (CallBack) CallBack(Ele); // 防止因切换关卡而导致的错误触发回调
			}
		};

		return Animate;
	}, 
	AnimatePromise (Ele, Style, Duration, Ease, Delay, Repetitions) { // 异步 Promise
		return new Promise((Resolve) => {
			oEf.Animate(Ele, Style, Duration, Ease, Resolve, Delay, Repetitions);
		});
	}
};


let oPTGif = class {
	/*
		图片数据统一格式: 
		Data: {
			URL: "地址", Width: 单帧宽度, Height: 单帧高度, 
			FrameNum: 帧数, // 帧数编号为 [1 ~ FrameNum]
			FPS: 数字 / [{ End: 此部分结尾帧数, FPS: 10 }, ...], // 帧率为 1 秒内帧数，每部分的控制帧ID为 [上个End + 1  ~  End]，必须保证这是有序的
			Loop: Bool / { // 默认 true
				Delay: 数字 | [开始, 第二次, ..., 剩余], // 默认 0，首帧开始前等待的时间（已经播放了首帧），开始立即播放即为 0 
				EndDelay: 数字 | [开始, 第二次, ..., 剩余], // 默认 0，进行下一次循环等待的时间（停留在最后一帧），无等待即为 0 
				LoopTime: 循环次数, // 默认 infinity 即永久播放
				LoopEnd: ID | "Head" | "Tail", // 全部循环结束后停留的帧，默认 "Tail" 末尾帧，可以选择 "Head" 以及数字帧
			}, 
		}
	*/
	Setting = { URL: "", Width: 32, Height: 32, MoveLeft: 0, MoveTop: 0, FrameNum: 60, FPS: [{ End: Infinity, FPS: 60 }], Loop: { Delay: [0], EndDelay: [0], LoopTime: Infinity, LoopEnd: "Tail" }, }; // 默认配置
	ImgEle = null; Canvas = { Ele: null, Ctx: null }; // 图片元素
	LoopData = { // 内部变量，请勿更改
		LoopEnter: [], // 记录进入第 N 次循环所用的时间，如果是无限循环最后一个元素一定是 Inf
		SumFPSArr: [], FPSSum: null, DT: null, ET: null, // 单次帧所用总时间、常规开始等待时间、常规结束等待时间
	}; 
	SetData (Data) { // 传入的数据必须有除 Loop 外的所有数据，这里不做判断
		if (Object.prototype.toString.call(Data) != "[object Object]") return; // 不是 JSON 直接返回
		let self = this, { URL, Width, Height, MoveLeft, MoveTop, FrameNum, FPS, Loop } = Data; // 拆包
		// 矫正数据格式
		{
			// 处理图片偏移
			if (isNaN(MoveLeft)) MoveLeft = 0;
			if (isNaN(MoveTop)) MoveTop = 0;

			// 处理数字 FPS 转为数组形式
			if (!isNaN(FPS)) FPS = [{ End: Infinity, FPS: FPS }];

			// 处理数字 Loop 转为对象形式
			if (!isNaN(Loop)) Loop = { LoopTime: !!Loop * Infinity };

			// 先补齐 Loop 对象内参数
			Loop = Object.assign({ Delay: [0], EndDelay: [0], LoopTime: Infinity, LoopEnd: "Tail" }, Loop);
			if (!isNaN(Loop["Delay"])) Loop["Delay"] = [Loop["Delay"]];
			if (!isNaN(Loop["EndDelay"])) Loop["EndDelay"] = [Loop["EndDelay"]];
			if (!isNaN(Loop["LoopEnd"]) && !["Head", "Tail"]["includes"](Loop["LoopEnd"])) Loop["LoopEnd"] = "Tail";
		};

		// 创建对象
		self["Setting"] = { URL, Width, Height, MoveLeft, MoveTop, FrameNum, FPS, Loop }; // 覆盖配置
		self["ImgEle"] = new Image(); // 创建 Ele
		self["ImgEle"]["src"] = URL; // 设置图片 URL

		self["Canvas"]["Ele"] = NewEle("", "canvas", "", { width: Width, height: Height }); // 创建画布
		self["Canvas"]["Ctx"] = self["Canvas"]["Ele"]["getContext"]("2d"); // 获取 CTX

		// 计算各个循环所用时以及其累计用时
		{ 
			let NowTime = 0, FPSSum = 0, LoopTime = 0, SumFPSArr = [0]; // 当前用时
			let DT = Loop["Delay"][Loop["Delay"]["length"] - 1], ET = Loop["EndDelay"][Loop["EndDelay"]["length"] - 1];
			for (let O of FPS) FPSSum += (Math["min"](O["End"], FrameNum) - LoopTime) * (1 / O["FPS"]), SumFPSArr["push"](FPSSum), LoopTime = Math["min"](O["End"], FrameNum);
			LoopTime = 0, self["LoopData"] = { LoopEnter: [], SumFPSArr: SumFPSArr, FPSSum: FPSSum, DT: DT, ET: ET, };
			while (LoopTime < Loop["LoopTime"] && (Loop["Delay"][LoopTime] || Loop["EndDelay"][LoopTime])) {
				self["LoopData"]["LoopEnter"]["push"](NowTime);
				NowTime += Number(Loop["Delay"][LoopTime] ?? DT) + Number(FPSSum) + Number(Loop["EndDelay"][LoopTime] ?? ET), ++LoopTime;
			};
			self["LoopData"]["LoopEnter"]["push"](NowTime);	
			if (Loop["LoopTime"] == Infinity) self["LoopData"]["LoopEnter"]["push"](Infinity);
		};
	};
	GetFrame (Tick) { // 获取第 Tick 帧的画面，返回的是 Canvas
		let self = this, Wid = self["Setting"]["Width"], Hei = self["Setting"]["Height"]; 

		switch (Tick) {
			case "Head": Tick = 0; break;
			case "Tail": Tick = Infinity; break;
			default: if (isNaN(Tick)) return null; // 错误的值
		}

		self["Canvas"]["Ctx"]["clearRect"](0, 0, Wid, Hei); // 清理画布
		Tick = Math["max"](Math["min"](Tick, self["Setting"]["FrameNum"]), 1); // 取临界值
		self["Canvas"]["Ctx"]["drawImage"](self["ImgEle"], (Tick - 1) * Wid, 0, Wid, Hei, 0, 0, Wid, Hei);
		return self["Canvas"]["Ele"];
	}; 
	GetImages (Time) { // 单位: 秒，用于获取 GIF 播放 Time 秒后显示的是哪个图片画面，返回瞬时性的 Canvas
		let self = this, Range, FPSRange, Index, { LoopEnter, SumFPSArr, FPSSum, DT, ET } = self["LoopData"];
		
		if (Time <= 0) Time = 0; // 特判

		// 获取当前循环次数
		{ 
			let L = 0, R = LoopEnter["length"] - 1, Mid;
			while (L < R) {
				Mid = (L + R + 1) >> 1;
				if (LoopEnter[Mid] > Time) R = Mid - 1;
				else L = Mid;
			};
			Range = L + 1; // 循环次数要加一
		};


		let LastRange = Number(DT) + Number(FPSSum) + Number(ET);
		Time -= LoopEnter[Range - 1]; // 减去开始时间
		if (Range >= LoopEnter["length"] - 1) Range += Math["floor"](Time / LastRange), Time %= LastRange; // 如果是无限循环，模去每次时间

		// 特判
		Time -= (self["Setting"]["Loop"]["Delay"][Range - 1] ?? Number(DT)); // 减去开始等待时间
		if (Range > self["Setting"]["Loop"]["LoopTime"]) return self["GetFrame"](self["Setting"]["Loop"]["LoopEnd"]); // 如果超过重复播放限制，直接返回
		else if (Time <= 0) return self["GetFrame"](0); // 如果还未开始，返回第一帧
		else if (Time >= Number(FPSSum)) return self["GetFrame"](Infinity); // 如果结束了，返回最后一帧

		{
			let L = 0, R = SumFPSArr["length"] - 1, Mid;
			while (L < R) {
				Mid = (L + R + 1) >> 1;
				if (SumFPSArr[Mid] > Time) R = Mid - 1;
				else L = Mid;
			};
			FPSRange = L + 1; // 循环次数要加一		
		};
		Time -= SumFPSArr[FPSRange - 1];
		Index = (self["Setting"]["FPS"][FPSRange - 2]?.["End"] ?? 0) + Math["floor"](1 + Time * self["Setting"]["FPS"][FPSRange - 1]["FPS"]);

		return self["GetFrame"](Index); 
	};  
	constructor (Data) { let self = this; self["SetData"](Data); }; // 设置图片数据

	static DrawImage(Ctx, Img, X = 0, Y = 0, Horizontal = 1, Vertical = 1, Angle = 0, Src = "") {
		let [MoveX, MoveY] = oPTG_Store["GetMove"](Src);

	    Ctx["save"](); // 保存当前画布状态

	    Ctx["translate"](X + Img["width"] * 0.5 - MoveX, Y + Img["height"] * 0.5 - MoveY); // 移动绘图原点到图像中心
	    Ctx["scale"](Horizontal, Vertical); // 调整缩放
	    Ctx["rotate"](Angle / 180 * Math["PI"]); // 旋转图像

	    Ctx["drawImage"](Img, - Img["width"] * 0.5, - Img["height"] * 0.5, Img["width"], Img["height"]); // 将图像绘制到画布上

	    Ctx["restore"](); // 恢复画布状态
	};
};