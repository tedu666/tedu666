/*
	该文件用于定义处理游戏内各种特效的类，类似 PVZTR 中的 oEffects 展示的效果
*/

let oEf = {
	NowVersion: 0, 
	Init: function () {
		let self = this;
		self["NowVersion"] = Math.random(); // 更新版本
	}, 
	Animate (Ele, Style, Duration, Ease, CallBack, Delay = 0, Repetitions = 1) { // 低配版动画效果
		// Ease: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"]
		if (!Ele) return;
		Duration = $SEql(Duration, {"fast": 0.2, "medium": 0.6, "slow": 1.0, "default": Duration ?? 1}); // 处理时间
		let self = this, Ver = self["NowVersion"];
		let Animate = Ele.animate((Array.isArray(Style) ? [Style[0], Style[1]] : [Style]), { // [初始 Style, 目标 Style]
			duration: Duration * 1000, // 动画持续时间
			delay: Delay, // 动画延迟时间
			easing: Ease ?? "linear", // 动画效果，默认线性
			iterations: Repetitions, // 播放次数
			fill: "none" // 动画结束后不停留在最后一个关键帧上
		});
		Animate.onfinish = () => {
			Animate.onfinish = null;
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
