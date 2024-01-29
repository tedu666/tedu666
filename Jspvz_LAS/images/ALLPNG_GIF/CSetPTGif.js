// 本文件用于设置所有模拟 GIF 的内容
let oPTG_Store = {
	Store: {}, IMGStore: {}, 
	Load: function (Data, ID) { // 载入 GIF
		let self = this, Name = self["GetRealURL"](ID ?? Data["URL"]);
		self["Store"][Name] = new oPTGif(Data);
		return self["Store"][Name];
	}, 
	GetMove: function (URL) {
		let self = this, Obj1, Obj2, Ret; URL = self["GetRealURL"](URL); 
		Obj1 = self["Store"][URL], Obj2 = self["IMGStore"][URL], Ret;

		if (Obj1) return [Obj1["Setting"]["MoveLeft"], Obj1["Setting"]["MoveTop"]];
		return [0, 0];
	}, 
	Get: function (URL, Time, CallBack = () => {}) { // 获取 GIF 固定时间帧
		let self = this, Obj1, Obj2, Ret; URL = self["GetRealURL"](URL); 
		Obj1 = self["Store"][URL], Obj2 = self["IMGStore"][URL], Ret;
		
		if (Obj1) return (Ret = Obj1["GetImages"](Time), CallBack(Ret), Ret);
		if (Obj2) return (CallBack(Obj2), Obj2);

		Ret = self["IMGStore"][URL] = new Image();
		self["IMGStore"][URL]["src"] = URL;

		return (CallBack(Ret), Ret);
	}, 
	GetRealURL: (URL) => URL.replace(/[?&].*/, ''), 
};

// 以下是加载的图片
{
	let Root = "images/ALLPNG_GIF/";
	oPTG_Store["Load"]({ URL: Root + "FireBall.png", Width: 101, Height: 79, FrameNum: 25, Loop: true, FPS: 12, MoveLeft: 22.5, MoveTop: 22.5 }, "images/Plants/PB10.gif");
	oPTG_Store["Load"]({ URL: Root + "ShroomBullet.png", Width: 66, Height: 32, FrameNum: 6, Loop: true, FPS: 12 }, "images/Plants/ShroomBullet.gif");
	oPTG_Store["Load"]({ URL: Root + "Star.png", Width: 30, Height: 30, FrameNum: 3, Loop: true, FPS: 9 }, "images/Plants/Starfruit/Star.gif");
	oPTG_Store["Load"]({ URL: Root + "Shadow.png", Width: 29, Height: 12, FrameNum: 1, Loop: true, FPS: 1 }, "Bullet_Shadow");

};
