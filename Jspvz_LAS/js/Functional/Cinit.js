var NewF = function(b, a) {
	return (a = a || function() {}).prototype = b, a;
};


var FunStr = NewF(
	{
		toString: function(){
			let b = this.StrFunc;
			return (typeof b === "function") ? (this.StrFunc()).toString() : ((b != undefined) ? b.toString() : "undefined");
		}
	}, function(fun){
		if (!(this instanceof FunStr)) throw new TypeError('Function constructor FunStr cannot be invoked without "new"');
		this.StrFunc = fun;
	}
);


var oEffect = NewF( //画布效果，effect
	{
		oEffect_List: {},
		[Symbol.toStringTag]: "oEffect",
		Did: null, Dev: null, Canvas: null, Ctx: null,
		Width: 900, Height: 600, Top: 0, Left: 0,
		Dev_Attribute: {}, Canvas_Attribute: {}, Dev_Style: {}, Canvas_Style: {},
		__Dev_Style__: {"pointer-events": "none", "left": "0px", "top": "0px", "position": "absolute", "width": "900px", "height": "600px", "z-index": "200"},
		__Canvas_Style__: {"pointer-events": "none", "border": "0px solid red", "top": "0px", "left": "0px", "z-index": "200"},
		__Dev_Attr__: {}, __Canvas_Attr__: {width: "Width", height: "Height"},
		__Init__: function (Pt, HTML_Node) { // 生成画布
			for (let index in Pt) this[index] = Pt[index]; // 覆盖
			let self = this, Rd = Math.random(), Did = {Dev: "Dev_Canvas_" + Rd, Canvas: "Canvas_" + Rd, ID: Rd};
			self["Did"] = Did, self["Dev"] = NewEle(Did["Dev"], "div", "", self["Dev_Attribute"], HTML_Node), self["Canvas"] = NewEle(Did["Canvas"], "canvas", "", self["Canvas_Attribute"], self["Dev"]);
			for (let index in self["__Dev_Attr__"]) self["Dev"][index] = self[self["__Dev_Attr__"][index]];
			for (let index in self["__Canvas_Attr__"]) self["Canvas"][index] = self[self["__Canvas_Attr__"][index]];
			for (let index in self["__Dev_Style__"]) self["Dev"]["style"][index] = self["__Dev_Style__"][index];
			for (let index in self["__Canvas_Style__"]) self["Canvas"]["style"][index] = self["__Canvas_Style__"][index];
			for (let index in self["Dev_Style"]) self["Dev"]["style"][index] = self["Dev_Style"][index];
			for (let index in self["Canvas_Style"]) self["Canvas"]["style"][index] = self["Canvas_Style"][index];
			self["Ctx"] = self["Canvas"]["getContext"]('2d'), self["oEffect_List"][Did["ID"]] = Did; // 队列里加入
		},
		__Delete__: function () {
			let self = this, Did = self["Did"];
			ClearChild(self["Canvas"], self["Dev"]), (delete self["oEffect_List"][Did["ID"]]);
			for (let index in self) delete self[index]; self["__Delete__"] = () => {};
		},
		Clear_Canvas: function () { this["Ctx"] && this["Ctx"]["clearRect"](0, 0, this["Canvas"]["width"], this["Canvas"]["height"]); }, // 清除画布内容
		ReBinding: function () { // 重新绑定元素
			let self = this, Did = self["Did"];
			self["Canvas"] = $(Did["Canvas"]);
			self["Dev"] = $(Did["Dev"]);
			self["Ctx"] = self["Canvas"]["getContext"]('2d');
		}, 
		Can_Draw: true, // 画布是否在进行内部变动
		Gradient_Image: function (Img, dx, dy, Init = 1, Arr = [], Hz = 1, CallBack) { // 图片
			for (let index in Arr) if (Arr[index]["length"] != 2) throw new Error("Bad array format"); // 合法检测
			let Canvas_Img = NewEle("", "canvas", "", {width: Img["width"], height: Img["height"]}), Canvas_Img_CTX = Canvas_Img["getContext"]('2d'); Canvas_Img_CTX["drawImage"](Img, 0, 0);
			let self = this, Canvas = self["Canvas"], Ctx = self["Ctx"], Set_Draw = (Alpha) => {Ctx["save"](), Ctx["globalAlpha"] = Alpha, self["Clear_Canvas"](), Ctx["drawImage"](Canvas_Img, dx, dy), Ctx["restore"]();}; // 画布
			let Get_Range_Alpha = (Now, Task, Time, Hz) => (Task - Now) / (Time / (Hz || 1)), MulNum = (x) => x / Math.abs(x || 1), Get_Type = (x, Now, Task) => (x * MulNum(Now - Task) <= Task * MulNum(Now - Task)); // 每 tick 增长值、 数的正负性、 是否过了增长期
			let ConstAlpha = Init, NowAlpha = Init, NowRangeAdd = 0, NowTask = 0, NowAlphaID = 0, Arrlen = Arr.length;
			Ctx["globalAlpha"] = 1, self["Clear_Canvas"](), Set_Draw(Init), self["Can_Draw"] = false; // 首次颜色

			NowAlphaID = 0, ConstAlpha = Init, NowAlpha = Init, NowRangeAdd = Get_Range_Alpha(NowAlpha, Arr[NowAlphaID][0], Arr[NowAlphaID][1], Hz), NowTask = Arr[NowAlphaID][0];
			oSym.addTask(Hz, function () { // 伪闭包异步
				NowAlpha += NowRangeAdd, Set_Draw(NowAlpha); // 先判断再设置
				if (Get_Type(NowAlpha, ConstAlpha, NowTask)) ++NowAlphaID; // 先加 id
				if (NowAlphaID >= Arrlen) return (self["Can_Draw"] = true), Set_Draw(Arr[NowAlphaID - 1][0]), (CallBack && CallBack()); // 判断完成了，回调
				if (Get_Type(NowAlpha, ConstAlpha, NowTask)) ConstAlpha = NowAlpha = Arr[NowAlphaID - 1][0], NowRangeAdd = Get_Range_Alpha(NowAlpha, Arr[NowAlphaID][0], Arr[NowAlphaID][1], Hz), NowTask = Arr[NowAlphaID][0], Set_Draw(NowAlpha); // 没完成，继续下个阶段
				oSym.addTask(Hz, arguments.callee, []); // 异步
			}, []);
		},
		Gradient_Rect: function (Init = 1, Arr = [], Hz = 1, RGB = [0, 0, 0], CallBack) { // (0, [[0.5, 100], [0.8, 200], [0.9, 300]], 5, [0, 0, 0]) = 0% --> 50%(1s) --> 80%(2s) --> 90%(3s);  5tick
			for (let index in Arr) if (Arr[index]["length"] != 2) throw new Error("Bad array format"); // 合法检测
			let self = this, Canvas = self["Canvas"], Ctx = self["Ctx"], Set_rgba = (Alpha) => {Ctx["fillStyle"] = `rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]}, ${Alpha})`, self["Clear_Canvas"](), Ctx["fillRect"](0, 0, Canvas["width"], Canvas["height"]);}; // 画布、 rgb
			let Get_Range_Alpha = (Now, Task, Time, Hz) => (Task - Now) / (Time / (Hz || 1)), MulNum = (x) => x / Math.abs(x || 1), Get_Type = (x, Now, Task) => (x * MulNum(Now - Task) <= Task * MulNum(Now - Task)); // 每 tick 增长值、 数的正负性、 是否过了增长期
			let ConstAlpha = Init, NowAlpha = Init, NowRangeAdd = 0, NowTask = 0, NowAlphaID = 0, Arrlen = Arr.length;
			Ctx["globalAlpha"] = 1, self["Clear_Canvas"](), Set_rgba(Init), self["Can_Draw"] = false; // 首次颜色

			NowAlphaID = 0, ConstAlpha = Init, NowAlpha = Init, NowRangeAdd = Get_Range_Alpha(NowAlpha, Arr[NowAlphaID][0], Arr[NowAlphaID][1], Hz), NowTask = Arr[NowAlphaID][0];
			oSym.addTask(Hz, function () { // 伪闭包异步
				NowAlpha += NowRangeAdd, Set_rgba(NowAlpha); // 先判断再设置
				if (Get_Type(NowAlpha, ConstAlpha, NowTask)) ++NowAlphaID; // 先加 id
				if (NowAlphaID >= Arrlen) return (self["Can_Draw"] = true), Set_rgba(Arr[NowAlphaID - 1][0]), (CallBack && CallBack()); // 判断完成了，回调
				if (Get_Type(NowAlpha, ConstAlpha, NowTask)) ConstAlpha = NowAlpha = Arr[NowAlphaID - 1][0], NowRangeAdd = Get_Range_Alpha(NowAlpha, Arr[NowAlphaID][0], Arr[NowAlphaID][1], Hz), NowTask = Arr[NowAlphaID][0], Set_rgba(NowAlpha); // 没完成，继续下个阶段
				oSym.addTask(Hz, arguments.callee, []); // 异步
			}, []);
		}
	}, function(Pt, HTML_Node){ // {}, EDAll
		if (!(this instanceof oEffect)) throw new TypeError('Function constructor oEffect cannot be invoked without "new"');
		return this["__Init__"](Pt, HTML_Node), this;
	}
);