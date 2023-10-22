// 选项 SelectModal("System/Config")
oS.Init({
	PicArr: ["new_skin/InterFace/Travel_Background.png"],
	backgroundImage: "new_skin/InterFace/Travel_Background.png",
	// LoadMusic: "pure_snows", StartGameMusic: "pure_snows",
	LoadAccess: function() {
		let Staff = oS["Staff_HTML"]["join"]("");
		$("tGround")["style"] = "background:url(new_skin/InterFace/Travel_Background.png) no-repeat;left:0px;top:-100px;width:900px;height:730px;background-size:100% 100%;visibility:visible;", SetVisible($("dMenu")); // 背景图片、暂停按钮
		NewEle("dStaff_Block", "div", "visibility:visible;height:100%;width:100%;z-index:100;display:block;overflow:auto;white-space:pre;", {"className": "WindowFrame Hidden_Container Not_Chose"}, EDAll); // pointer-events:none;
		NewEle("dStaff_HTML", "div", "line-height:1;text-align:center;color:#FFFFFF;font-size:15px;font-family:RanTian,Regular,Briannetod,微软雅黑,Verdana,Tahoma;-webkit-text-stroke-width:0px;-webkit-text-stroke-color:#000000;word-break:break-all;white-space:pre;tab-size:1;", {"innerHTML": Staff}, $("dStaff_Block"));
		InitOnclick(), AllAudioStop(), PlayMusic(oS.LoadMusic = "pure_snows");
	},
	Staff_HTML: [
		'<!-- 样式 -->',
		'<style>.ButtonStyle { width:150px;height:35px;border-radius:12.5px;white-space:pre;background:rgba(0,0,0,0.733);color:rgb(255,255,255);font-family:Regular;font-size:20px;cursor:pointer;visibility:visible; } </style>', 
		'<style>.fade-in { animation: fade-in .25s linear } </style>', 
		'<style>.popup h1[data-v-57e8cd35] { font-size: 20px; margin: 0 0 10px } </style>', 
		'', 
		'<!-- 标题 -->',
		'<a style="font-size:100px;-webkit-text-stroke-width:4px;"><br><br>jspvz - KAC<br><br><br></a><br><br><br>',
		'<a style="font-size:30px;-webkit-text-stroke-width:1px;">（请用鼠标下滑查看设置）<br><br><br></a>',
		'',
		'<!-- 基本功能 -->',
		'<div id="dSavesDiv" style="position:absolute;left:35px;top:655px;font-size:25px;font-family:Regular;color:rgb(255,255,255);white-space:pre;">存档相关: </div>', 
		'<input id="dDownLdSaves" type="button" value="下载存档" class="ButtonStyle" style="float:left;position:absolute;left:175px;top:650px;">', 
		'<input id="dUpLoadSaves" type="button" value="读取存档" class="ButtonStyle" style="float:left;position:absolute;left:350px;top:650px;">', 
		'<input id="dDeleteSaves" type="button" value="清空存档" class="ButtonStyle" style="float:left;position:absolute;left:525px;top:650px;color:#FF0000;">', 

		// '<table border="0" cellspacing="0" cellpadding="0" style="position: absolute; line-height: 30px; font-size: 12px; text-align: center; border-radius: 12.5px; overflow: hidden; left: 15px; top: 85px; height: 500px; width: 210px;"><tbody><tr style="color: rgb(0, 102, 0); font-weight: bold; height: 40px;"><td width="100%" colspan="3" style="font-size: 20px; font-family: Regular; text-align: center; background: rgba(0, 0, 0, 0.733); color: rgb(255, 255, 255);">主动技能</td></tr><tr style="height: 2px; background-color: rgb(255, 255, 255);"><td colspan="3"></td></tr><tr style="color: rgb(0, 102, 0); font-weight: bold;"><td onclick="CopyText(this[&quot;innerText&quot;])" style="font-size: 15px; font-family: 楷体, 宋体, 黑体; text-align: center; background: rgba(0, 0, 0, 0.733); color: rgb(255, 255, 255); width: 15%;"><input type="radio" name="主动技能" value="1" style="width: 15px; height: 15px;"></td><td style="font-size: 15px; font-family: 楷体, 宋体, 黑体; text-align: center; background: rgba(0, 0, 0, 0.733); color: rgb(255, 255, 255); width: 80%;"><a style="font-size: 25px; line-height: 1.5; word-break: break-all; font-family: 楷体;">乱葬岗</a><br><a style="font-size: 15px; line-height: 1.5; word-break: break-all; font-family: 楷体;">使其余玩家在 6-9 列<br>间生长 12 格墓碑</a></td><td style="font-size: 15px; font-family: 楷体, 宋体, 黑体; text-align: center; background: rgba(0, 0, 0, 0.733); color: rgb(255, 255, 255); width: 5%;"></td></tr><tr style="color: rgb(0, 102, 0); font-weight: bold;"><td onclick="CopyText(this[&quot;innerText&quot;])" style="font-size: 15px; font-family: 楷体, 宋体, 黑体; text-align: center; background: rgba(0, 0, 0, 0.733); color: rgb(255, 255, 255); width: 15%;"><input type="radio" name="主动技能" value="1" style="width: 15px; height: 15px;"></td><td style="font-size: 15px; font-family: 楷体, 宋体, 黑体; text-align: center; background: rgba(0, 0, 0, 0.733); color: rgb(255, 255, 255); width: 80%;"><a style="font-size: 25px; line-height: 1.5; word-break: break-all; font-family: 楷体;">天翻地覆</a><br><a style="font-size: 15px; line-height: 1.5; word-break: break-all; font-family: 楷体;">使其余玩家的屏幕<br>每5秒旋转180度<br>（共旋转10次）</a></td><td style="font-size: 15px; font-family: 楷体, 宋体, 黑体; text-align: center; background: rgba(0, 0, 0, 0.733); color: rgb(255, 255, 255); width: 5%;"></td></tr></tbody></table>', 

		/*
		'<!-- 原作 -->',
		'<a style="font-size:65px;-webkit-text-stroke-width:2px;">原作</a><br>',
		'<a style="font-size:35px;line-height:1.3;">lonelystar<br></a><br><a style="font-size:225px;"><br></a>',
		'',
		'<!-- 技术支持 -->',
		'<a style="font-size:65px;-webkit-text-stroke-width:2px;">技术支持</a><br>',
		'<a style="font-size:35px;line-height:1.3;">lonelystar<br>江南游戏<br></a><br><a style="font-size:15px;">（排名不分先后，下同）</a><br><a style="font-size:225px;"><br></a>',
		'',
		'<!-- 图片素材 -->',
		'<a style="font-size:65px;-webkit-text-stroke-width:2px;">素材提供</a><br>',
		'<a style="font-size:35px;line-height:1.3;">lonelystar<br>江南游戏<br>PVZ2素材吧<br></a><br><a style="font-size:225px;"><br></a>',
		'',
		'<!-- 制作人 -->',
		'<a style="font-size:65px;line-height:1.25;-webkit-text-stroke-width:2px;">主要制作人</a><br>',
		'<a style="font-size:35px;line-height:1.3;">我是帅<br></a><br><a style="font-size:225px;"><br></a>',
		'',
		'<!-- 特别感谢 -->',
		'<a style="font-size:65px;line-height:1.25;-webkit-text-stroke-width:2px;">特别感谢</a><br>',
		'<a style="font-size:35px;line-height:1.5;word-spacing:1em;">snz jspvz低玩 WU师葵 白鹤亮翅<br>寒冰投手 B站的J<br>屏幕前的你</a><br><a style="font-size:225px;"><br></a>',
		'',
		'<!-- 音乐列表，可以点击音乐播放 -->',
		'<a style="font-size:55px;-webkit-text-stroke-width:2px;">本地音乐列表</a><br><br>',
		'<a style="font-size:25px;line-height:1.25;">原版植物大战僵尸音乐/音效</a><br> <!-- 本地音乐是jspvz自带的 -->',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play(\'pure_snows\')">pure snows ~  ——  水月陵</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play(\'nice_graveyard\')">素敵な墓場で暮しましょ  ——  上海アリス幻樂団</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play(\'Glorious_Morning\')">Glorious Morning  ——  Waterflame</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play(\'True_Admin\')">聖徳伝説 ～ True Administrator  ——  上海アリス幻樂団</a><br>',
		'<a style="font-size:200px;"><br></a> <!-- 大跨度 -->',
		'',
		'<!-- 在线版音乐列表 -->',
		'<a style="font-size:55px;-webkit-text-stroke-width:2px;">在线音乐列表</a><br><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(0)">鳥の詩 ~  ——  水月陵</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(1)">同じ高みへ  ——  水月陵</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(2)">渚 Warm Piano Arrange  ——  红薙旅人</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(3)">晚星  ——  逆时针向</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(4)">my most precious treasure -orgel-  ——  麻枝准</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(5)">you  ——  M.Graveyard</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(6)">東方緋想天  ——  黄昏フロンティア  /  上海アリス幻樂団</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(7)">To Be...  ——  Valentin</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(8)">enemy country  ——  ANANT-GARDE EYES</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(9)">森林  ——  灰澈</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(10)">空中に沈む輝針城  ——  上海アリス幻樂団</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(11)">寂静之空  ——  傅许</a><br>',
		'<a style="font-size:25px;line-height:1.25;cursor:pointer;" onclick="Play2(12)">Haunted  ——  Shirk</a><br>',
		'<a style="font-size:200px;"><br></a> <!-- 大跨度 -->',
		'',
		'<!-- 免责声明等 -->',
		'<a style="font-size:55px;-webkit-text-stroke-width:2px;color:#FF4141">版权与免责声明</a><br><br><br><br>',
		'<a style="font-size:25px;line-height:1.4;">本游戏属于《植物大战僵尸网页版》的<span class="TXT_RED">非营利性二次创作作品</span>，因此</a><br>',
		'<a style="font-size:25px;line-height:1.4;">本作不进行商业贩售，也禁止任何人将本作直接或间接应用于</a><br>',
		'<a style="font-size:25px;line-height:1.4;"><span class="TXT_RED">任何的盈利性用途</span>，对作品进行二次修改时，应保留原作者等信息，谢绝</a><br>',
		'<a style="font-size:25px;line-height:1.4;">冒充开发者等行为，违者将撤销修改权，必要时依法追究责任。</a><br>',
		'<a style="font-size:50px;"><br></a> <!-- 第二自然段 -->',
		'<a style="font-size:25px;line-height:1.4;">为了追求游戏内体验，游戏中部分素材来自于原游戏、江南游戏</a><br>',
		'<a style="font-size:25px;line-height:1.4;">以及互联网，部分音乐源自于网络，并在未授权的情况下以非商业用途</a><br>',
		'<a style="font-size:25px;line-height:1.4;">使用，且在歌曲列表里注明了歌曲信息，如有版权问题请及时联系我们。</a><br>',
		'<a style="font-size:25px;line-height:1.4;">感谢您的谅解，也感谢不知情的艺术家们的创作。</a><br>',
		'',
		*/

		'<a style="font-size:2000px;"><br></a>'
	],
}, {}, {
	InitOnclick: () => {
		$("dDownLdSaves")["onclick"] = () => DownLoadSaves();
		$("dUpLoadSaves")["onclick"] = async () => (await UpLoadSaves(), location["reload"]());
		$("dDeleteSaves")["onclick"] = async () => {
			AddConfirm("输入 “JSPVZ-LAS” 确认删除！\n删除后将刷新页面。", "JSPVZ-LAS", (Result) => {
				if (Result) UpLoadSaves({}), location["reload"]();
			});
		};
	}, 
	AddConfirm: (TEXT = "输入 “JSPVZ-LAS” 确认删除", Value = "JSPVZ-LAS", CallBack = () => {}) => { // 在游戏内显示一个输入框来让用户确认重大消息
		let DivA = NewEle("DivA", "div", "position:absolute;width:900px;height:600px;background:#FFF;filter:alpha(opacity=0);opacity:0;z-index:240", 0, EDAll);
		let dConfirm = NewEle("dConfirm", "div", "position:fixed;float:center;width:550px;height:275px;background:rgba(0,0,0,0.733);top:150px;left:0px;right:0px;margin:0 auto;border-radius:15px;z-index:250", 0, EDAll);
		let dConfirmText = NewEle("dConfirmText", "div", "position:absolute;left:25px;top:30px;font-size:23px;font-family:Regular;color:#FFFFFF;white-space:pre;", { innerHTML: TEXT }, dConfirm);
		let dConfirmInput = NewEle("dConfirmInput", "textarea", "position:absolute;left:25px;top:130px;height:40px;width:500px;font-size:20px;font-family:Regular;color:#000000;resize:none;background-color:rgb(255,255,255,0.9);border-radius:10px;line-height:1;text-align:left;padding:10px;overflow:hidden;", {}, dConfirm, { type: "text", name: "txtChat", wrap: "off", placeholder: "点击输入文字" });
		let dConfirmAccept = NewEle("dConfirmAccept", "input", "position:absolute;left:300px;top:210px;color:#00FF00;width:100px;", {}, dConfirm, { class: "ButtonStyle", value: "确认", type: "button" });
		let dConfirmCancel = NewEle("dConfirmCancel", "input", "position:absolute;left:425px;top:210px;color:#FF0000;width:100px;", {}, dConfirm, { class: "ButtonStyle", value: "取消", type: "button" });
		if (Value === "") SetHidden(dConfirmInput);
		dConfirmAccept["onclick"] = () => { if (dConfirmInput["value"] == Value) ClearChild(dConfirm, DivA), CallBack(true); };
		dConfirmCancel["onclick"] = () => { ClearChild(dConfirm, DivA), CallBack(false); };
	}
});