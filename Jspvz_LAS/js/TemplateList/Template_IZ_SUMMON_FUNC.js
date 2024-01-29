let __Template_IZ_ZUMMON_FUNC__ = (() => {
	let RPlt = ["01", "02", "04", "05", "06", "07", "08", "09", "11", "14", "18", "19", "22", "23", "24", "27", "29", "30", "37"]; // 陆地植物列表
	let WPlt = ["20", "25"]; // 水路植物列表

	let RandomArr = (Arr) => Arr["sort"](() => Math["random"]() - 0.5); // 数组打乱
	let ArrRectNullList = (Arr, X1, Y1, X2, Y2, NULL = null, CallBack = (X) => X) => { // 数组矩形部分内空值列表
		let Ret = []; for (let X = X1; X <= X2; ++X) for (let Y = Y1; Y <= Y2; ++Y) (Arr[X][Y] == NULL) && Ret["push"]([X, Y]);
		return CallBack(Ret);
	};
	let FillRectPlt = (Plants, Pos, PltList) => { // 随机选择
		let NewPos = RandomArr(Pos["concat"]()), NewPlt = PltList["concat"](), RIndex;
		for (let L = NewPlt["length"] - 1; L >= 0; --L) NewPlt[L]["Num"] <= 0 && NewPlt["splice"](L, 1);
		while (NewPos["length"] && NewPlt["length"]) {
			RIndex = Math["floor"](Math["random"]() * NewPlt["length"]);
			Plants[NewPos[0][0]][NewPos[0][1]] = NewPlt[RIndex]["ID"];
			!(--NewPlt[RIndex]["Num"] > 0) && (NewPlt["splice"](RIndex, 1));
			NewPos["splice"](0, 1);
		}
		return Plants;
	};
	return (List = 4, RPlant_Num = 10, WPlant_Num = 2, AllPlant_Num = 10, Option = [], RKind = [1, 1, 1, 1, 1]) => {
		let ChoseRPlt = [], ChoseWPlt = [], GRow = RKind["length"], GColumn = List, Plants = Array(GRow + 5)["fill"](-1)["map"](() => Array(GColumn + 5)["fill"](-1)); // GRow: 行数; GColumn: 列数; Plants: 场地数据
		RPlt["forEach"]((Index) => ChoseRPlt["push"]({ Num: Infinity, ID: Index, Water: true, PKind: 1 })); // 选择陆地植物
		WPlt["forEach"]((Index) => ChoseWPlt["push"]({ Num: Infinity, ID: Index, Water: true, PKind: 2 })); // 选择水路植物
		Option["sort"]((A, B) => (B["Level"] != A["Level"]) ? (B["Level"] - A["Level"]) : (Math["random"]() - 0.5)); // 按照任务权重排序，优先处理
		Option["forEach"]((Index) => { // 处理固定位置与限制数量、水路限制、数量限制等操作
			let Ml = { ID: "01", CanShow: true, MaxNum: 10, CanWater: false, Set_Num: 10, Set_XY: [[1, 1]], Set_Line: [1, 1, 1], Level: 255, PKind: 1 };
			let ID = Index["ID"] || "01", NotShow = (Index["CanShow"] === false), MaxNum = Index["MaxNum"] || Infinity, NotWater = (Index["CanWater"] === false), PKind = Index["PKind"] || 1;
			let NeedXY = Index["Set_XY"] || [], NeedLine = Index["Set_Line"] || [];
			let Plt = ((PKind == 1) ? (ChoseRPlt) : (ChoseWPlt)), PltFind = Plt["findIndex"]((_) => _["ID"] == ID);
			NeedXY["forEach"]((f) => (Plants[f[0]][f[1]] = ID));
			if (PltFind != -1) Plt[PltFind]["Num"] = MaxNum, Plt[PltFind]["Water"] = !NotWater;
			if (PltFind != -1 && NotShow == true) Plt["splice"](PltFind, 1);
			if (PltFind == -1 && NotShow == false) Plt["push"]({ Num: MaxNum, ID: ID, Water: !NotWater, PKind: PKind });
		});


		// 行内随机
		let EmptyPlants = []; // 获取每行空余植物
		for (let R = 1; R <= GRow; ++R) EmptyPlants[R] = ArrRectNullList(Plants, R, 1, R, GColumn, -1, RandomArr); // 获取剩余空的植物
		Option["forEach"]((Index) => { // 行内随机
			let Set_Line = Index["Set_Line"], ID = Index["ID"] || "01"; if (!Set_Line) return; // 没有特殊生成，跳过
			for (let I of Set_Line) if (EmptyPlants[I]["length"]) Plants[I][EmptyPlants[I][0][1]] = ID, EmptyPlants[I]["splice"](0, 1);
		});


		// 数量随机
		EmptyPlants = ArrRectNullList(Plants, 1, 1, GRow, GColumn, -1, RandomArr); // 获取场上空余格子
		Option["forEach"]((Index) => { // 随机放置指定个数植物
			let Set_Num = Index["Set_Num"], ID = Index["ID"] || "01", Water = !(Index["CanWater"] === false), PIndex = 0, PKind = Index["PKind"] || 1; if (!Set_Num || !EmptyPlants["length"]) return; // 没有特殊生成，跳过
			while (EmptyPlants["length"] && Set_Num--) {
				PIndex = EmptyPlants["findIndex"]((A) => RKind[A[0] - 1] != 0 && ((PKind == 2) ? (RKind[A[0] - 1] == 2) : (Water || RKind[A[0] - 1] != 2))); // 水路 或 无草皮限制
				if (PIndex != -1) Plants[EmptyPlants[PIndex][0]][EmptyPlants[PIndex][1]] = ID, EmptyPlants["splice"](PIndex, 1); // 确定位置
			}
		});


		// 默认随机
		let AllChosePlant = []; // 最终选择的植物
		ChoseRPlt = RandomArr(ChoseRPlt), ChoseRPlt["length"] = Math["min"](ChoseRPlt["length"], RPlant_Num); // 陆地植物限制
		ChoseWPlt = RandomArr(ChoseWPlt), ChoseWPlt["length"] = Math["min"](ChoseWPlt["length"], WPlant_Num); // 水路植物限制
		AllChosePlant["push"]["apply"](AllChosePlant, ChoseRPlt), AllChosePlant["push"]["apply"](AllChosePlant, ChoseWPlt); // 合并植物列表
		AllChosePlant = RandomArr(AllChosePlant), AllChosePlant["length"] = Math["min"](AllChosePlant["length"], AllPlant_Num); // 水路植物限制
		AllChosePlant["sort"]((A, B) => (B["PKind"] != A["PKind"]) ? (B["PKind"] - A["PKind"]) : (A["Water"] - B["Water"])); // 水路优先，随后纯陆地植物

		// 水路 + 可游泳植物
		EmptyPlants = []; for (let R = 1; R <= GRow; ++R) (RKind[R - 1] == 2) && (EmptyPlants = EmptyPlants["concat"](ArrRectNullList(Plants, R, 1, R, GColumn, -1, RandomArr))); RandomArr(EmptyPlants);
		FillRectPlt(Plants, EmptyPlants, AllChosePlant["filter"]((O) => O["Num"] != 0 && O["Water"] != false));

		// 旱鸭子植物
		EmptyPlants = []; for (let R = 1; R <= GRow; ++R) (RKind[R - 1] != 2) && (EmptyPlants = EmptyPlants["concat"](ArrRectNullList(Plants, R, 1, R, GColumn, -1, RandomArr))); RandomArr(EmptyPlants);
		FillRectPlt(Plants, EmptyPlants, AllChosePlant["filter"]((O) => O["Num"] != 0 && O["PKind"] != 2));


		// 计算最终阵型
		let Ret = "", Lilypad = "17", WaterSet = new Set(WPlt["concat"](AllChosePlant["filter"]((O) => O["PKind"] == 2)["map"]((O) => O["ID"]["toString"]()))); // 返回字符, 荷叶id, 水路列表
		for (let R = 1; R <= GRow; ++R) 
			for (let C = 1; C <= GColumn; ++C) 
				if (Plants[R][C] != -1 && Plants[R][C] != "00") {
					if (!WaterSet["has"](Plants[R][C]["toString"]()) && RKind[R - 1] == 2) Ret += R["toString"]() + C["toString"]() + Lilypad["toString"]()["padStart"](2, "0");
					Ret += R["toString"]() + C["toString"]() + Plants[R][C]["toString"]()["padStart"](2, "0");
				}

		return Ret;
	}
})();


let __Template_Function_NumIZ_RiddleAutoGrow__ = function(str){
	let q = str, j = {"01": oPeashooter, "02": oSunFlower, "03": oCherryBomb, "04": oWallNut, "05": oPotatoMine, "06": oSnowPea, "07": oChomper, "08": oRepeater, "09": oPuffShroom, 10: oSunShroom, 11: oFumeShroom, 12: oGraveBuster, 13: oHypnoShroom, 14: oScaredyShroom, 15: oIceShroom, 16: oDoomShroom, 17: oLilyPad, 18: oSquash, 19: oThreepeater, 20: oTangleKelp, 21: oJalapeno, 22: oSpikeweed, 23: oTorchwood, 24: oTallNut, 25: oSeaShroom, 26: oPlantern, 27: oCactus, 28: oBlover, 29: oSplitPea, 30: oStarfruit, 31: oPumpkinHead, 34: oFlowerPot, 36: oCoffeeBean, 37: oGarlic, 41: oGatlingPea, 42: oTwinSunflower, 43: oGloomShroom, 47: oSpikerock, "CB": oCabbage_Pro, "MP": oMelonPult_Pro, "CC": oCattail}, l = q.length;

	for(let i = 0; i < l; i += 4){
		let y = q.substr(i, 1), x = q.substr(i + 1, 1), id = j[q.substr(i + 2, 2)] || oPeashooter;
		CustomSpecial(id, y, x, 1);
	};
};


/*
	Summon_IZ: 用于生成对战版iz数字阵型
	参数列表: Summon_IZ(List, RPlant_Num, WPlant_Num, AllPlant_Num, Option, RKind)
		List: 阵型列数
		RPlant_Num: 阵型中陆地植物种类最大数量
		WPlant_Num: 阵型中水生植物种类最大数量
		AllPlant_Num: 阵型中植物种类最大数量
		Option: 对象列表，用于定义特殊生成规则
		RKind: 数字列表，用于表述每列陆地属性，其决定阵型的行数

	Option格式:
		一般的, Option = [{...}, {...}, ...]
		其中列表里每一项标准的对象格式为:
			Object = {
				ID: "00", // 该规则下对应的植物id, 一般为字符串 
				CanShow: true, // 该植物是否可出现在阵型里, 一般为布尔值
				CanWater: false, // 该植物是否可种植在水上, 一般为布尔值
				MaxNum: 10, // 该植物在阵型默认生成中最多出现的次数, 一般为正整数
				Set_XY: [[1, 1], [2, 3]], // 设置该植物在场上固定出现的位置, 不受任何限制影响, 一般为列表, 其中列表中每一项为列表, 其对应植物行、列信息, 如 [3, 2] 即第三行第二列种植该植物
				Set_Line: [1, 1, 2, 3, 4, 5], // 设置该植物在特定行中随机位置出现, 一般为数字组成的列表
				Set_Num: 10, // 设置该植物在场上优先生成的数量, 生成位置受陆地属性影响, 不受 MaxNum 影响, 一般为正整数
				Level: 255, // 设置该规则的权重, 阵型规则中权重高的优先处理, 一般为数字
				PKind: 1 // 设置该植物的类型, 1为陆生植物, 2为水生植物
			}
*/