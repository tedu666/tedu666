// 基本数据结构代码声明部分，let 方便修改调试

// 1. 优先队列（最小堆）
let PriorityQueue = class { // 参数约定：插入对象并有 GetValue 函数获得权
	constructor() { this["heap"] = []; }; // 初始化堆
	Compare(A, B) { return A < B; }; // 其决定了最大堆最小堆
	LChildIndex(PIndex) { return (PIndex << 1) + 1; }; // 获取左子节点的索引，传入 Parent Index
	RChildIndex(PIndex) { return (PIndex << 1) + 2; }; // 获取右子节点的索引
	ParentIndex(CIndex) { return (CIndex - 1) >> 1; }; // 获取父节点，位移节省时间
	swap(I1, I2) { [this["heap"][I1], this["heap"][I2]] = [this["heap"][I2], this["heap"][I1]]; }; // 交换堆中两个元素的位置
	size() { return this["heap"]["length"]; }

	HeapifyUp() { // 将最后一个元素插入堆中，并执行堆化操作（向上）
		let self = this, Index = self["heap"]["length"] - 1;
		while (Index > 0) { // 直到走到头
			const Element = self["heap"][Index], PIndex = self["ParentIndex"](Index), Parent = self["heap"][PIndex];
			if (self["Compare"](Element["GetValue"](), Parent["GetValue"]())) self["swap"](Index, PIndex), Index = PIndex;
			else break;
		}
	};

	// 执行堆化操作（向下）
	HeapifyDown() {
		let self = this, Index = 0;
		const Length = self["heap"]["length"], Element = this["heap"][0];

		while (true) {
			const LIndex = self["LChildIndex"](Index), RIndex = self["RChildIndex"](Index);
			let LChild, RChild, SwapIndex = null;

			if (LIndex < Length) LChild = self["heap"][LIndex], self["Compare"](LChild["GetValue"](), Element["GetValue"]()) && (SwapIndex = LIndex); // 左子存在
			if (RIndex < Length) {
				RChild = self["heap"][RIndex];
				if ((SwapIndex === null && self["Compare"](RChild["GetValue"](), Element["GetValue"]())) || (SwapIndex !== null && self["Compare"](RChild["GetValue"](), LChild["GetValue"]()))) SwapIndex = RIndex; // 右子存在且比左子小或者只有右子存在且比当前节点小
			}

			if (SwapIndex === null) break; // 找不到，退出

			self["swap"](Index, SwapIndex), Index = SwapIndex;
		}
	};

	getMedian() { // 获取堆的中位值
		const size = this.size(); if (size == 0) return null;
		const medianIndex = Math.floor(size / 2);
		return this["heap"][medianIndex];
	}


	push(Obj) { this["heap"]["push"](Obj), this["HeapifyUp"](); }; // 向堆中插入一个对象带权
	top() { return this["heap"][0]; }; // 获取堆中的最小元素（即堆顶元素）
	pop() { // 从堆中删除并返回最小元素
		const MinElement = this["heap"][0], LastElement = this["heap"]["pop"]();
		if (this["heap"]["length"]) this["heap"][0] = LastElement, this["HeapifyDown"]();
		return MinElement;
	};
};

let LimitAVL = class { // 基于 Avl + 值域 的区间查询删除系统
	constructor (Scope = 1000) {  this["Scope"] = Scope, this["AVL"] = new AVLTree(); }; // 初始化值域 Avl 树、 值域范围
	push (Obj) {
		let self = this, T = Obj["GetValue"](), K = Math["max"](0, Math["floor"](T / self["Scope"])), Data = self["AVL"]["find"](K), Arr; // 获取值与所在的值域区间
		if (Data === null) return Arr = [Obj], Arr["Order"] = true, self["AVL"]["insert"](K, Arr); // 加入新的元素
		Arr = Data["data"], Arr["Order"] = false, Arr["push"](Obj); // 插入值域
	};
	pushList (inArr) {
		let self = this, M = {}, T, K, Q, Data, Arr;
		for (let _ of inArr) T = _["GetValue"](), K = Math["max"](0, Math["floor"](T / self["Scope"])), M[K] ? M[K]["push"](_) : (M[K] = [_]);
		for (let dNum in M) Q = Number(dNum), Data = self["AVL"]["find"](Q), (Data === null) ? (Arr = M[dNum], Arr["Order"] = false, self["AVL"]["insert"](Q, Arr)) : (Arr = Data["data"], Arr["Order"] = false, Arr["push"]["apply"](Arr, M[dNum]));
	};
	Qfind (Arr, f) {
		let L = 0, R = Arr["length"] - 1, Mid;
		while (L <= R) Mid = (L + R) >> 1, f(Arr[Mid]) ? (R = Mid - 1) : (L = Mid + 1);
		return L;
	};
	QueryLimit (LimitR, Del = true) { // 筛选出 Key 以下的所有对象并返回，是否删除
		let self = this, T = LimitR, K = Math["floor"](T / self["Scope"]), Arr = [], ret = [];
		self["AVL"]["range"](-Infinity, K, (Obj) => { if (Obj["key"] > K) return true; Arr["push"]({ T: Obj["key"], TQ: Obj["data"] }); });

		for (let O of Arr) {
			let dT = O["T"], dArr = O["TQ"], dSort = dArr["Order"], l = dArr["length"]; // 拆包
			if (!dSort) dArr["sort"]((A, B) => A["GetValue"]() - B["GetValue"]()), dArr["Order"] = true; // 如果不是有序的，先排序
			while (l-- && dArr[l]["GetValue"]() > T); /* K == dT && (l = self["Qfind"](dArr, (A) => A["GetValue"]() > T) - 1); */
			ret["push"]["apply"](ret, dArr[["splice", "slice"][!Del | 0]](0, l + 1)); // 插入队列
			if (!dArr["length"]) self["AVL"]["remove"](dT);
		}

 		return ret;
	};
};

let TimerObj = class {
	constructor(Obj, VKey) { for (let Key in Obj) this[Key] = Obj[Key]; this["VKey"] = VKey; }; // 初始化对象
	GetValue() { return this[this["VKey"]]; }; // 获取 Value
};

/* 
————————————————以下是oSym暴力代码

	oSym = {
		DebugMode: true,
		Init: function(b, a) {
			this.Now = 0;
			this.Timer = this.execTask = null;
			this.TQ = [{
				T: 0,
				f: b,
				ar: a || []
			}];
			this.NowStep = 1;
			this.TimeStep = 10;
			this.Start()
		},
		Clear: function() {
			this.TQ.length = 0
		},
		Start: function() {
			if (this.Timer == null) { (function() {
					var a = oSym;
					try {
						a.Now += a.NowStep
					} catch(b) {
						alert("超时退出游戏");
						location.reload()
					}
					a.Timer = setTimeout(arguments.callee, a.TimeStep)
				})(); (function() {
					var d = oSym,
					a = d.TQ,
					c = a.length,
					b, e;
					while (c--) {
						if (d.Now >= (b = a[c]).T) {
							if(d.DebugMode){
								try{(e = b.f).apply(e, b.ar);}catch(why){console.error(why);};
							}else (e = b.f).apply(e, b.ar);
							d.removeTask(c);
						};
					};
					d.execTask = setTimeout(arguments.callee, d.TimeStep)
				})()
			}
		},
		Stop: function() {
			clearTimeout(oSym.Timer);
			clearTimeout(oSym.execTask);
			oSym.Timer = null;
			oSym.execTask = null
		},
		addTask: function(b, c, a) {
			var d = this.TQ;
			d[d.length] = {
				T: this.Now + b,
				f: c,
				ar: a
			};
			return this
		},
		removeTask: function(a) {
			this.TQ.splice(a, 1);
			return this
		}
	}

————————————————以下是被淘汰的代码（优先队列）

oSym = {
	DebugMode: true,
	Init: function(b, a) {
		let self = this;
		self["Now"] = 0, self["Timer"] = null; // 重置时间
		self["NowStep"] = 1, self["TimeStep"] = 10; // 重置速度
		self["TQ"] = new PriorityQueue(), self["TQ"]["push"](new TimerObj({ T: 0, f: b, ar: a || [] }, "T")); // 创建优先队列
		self["AddTaskQ"] = []; // 待加入的 TQ，防止死循环
		self["Start"](); // 开始
	},
	SysTime: function() { // Date["now"](); window["performance"]["now"]()
		return $User["HTML5"] ? window["performance"]["now"]() : Date["now"](); // 获取精度问题
	}, 
	Clear: function() {
		this["AddTaskQ"]["length"] = 0, this["TQ"]["heap"]["length"] = 0; // 清除优先队列
	},
	Start: function() {
		if (this["Timer"] == null) { 
			this["Timer"] = Infinity, (function() { 
				let a = oSym, b = a["TQ"], c, e, f = a["AddTaskQ"], D = a["SysTime"](); a["Now"] += a["NowStep"];

				while (f["length"]) a["TQ"]["push"](f[f["length"] - 1]), --f["length"]; // 处理待加入的队列

				while (c = b["top"]()) {
					if (c == undefined) break;
					if (a["Now"] >= c["T"] || Number["isNaN"](c["T"])) {
						if (a["DebugMode"]) { try { (e = c["f"]).apply(e, c["ar"]); } catch (why) { console.error(why); };
						} else (e = c["f"]).apply(e, c["ar"]);
						b["pop"](); // 弹出最先的
					} else break;
				}

				// Plan B
`
					while (f["length"]) a["TQ"]["heap"]["push"](f[f["length"] - 1]), --f["length"]; // 处理待加入的队列

					for (let i = b["heap"]["length"] - 1; i >= 0; --i) {
						c = b["heap"][i];
						if (a["Now"] >= c["T"] || Number["isNaN"](c["T"])) {
							if (a["DebugMode"]) { try { (e = c["f"]).apply(e, c["ar"]); } catch (why) { console.error(why); };
							} else (e = c["f"]).apply(e, c["ar"]);
							b["heap"]["splice"](i, 1);
						}
					}
`;				

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
}
*/