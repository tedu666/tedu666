// 制作名单 SelectModal("System/Staff")
oS.Init({
	PicArr: ["new_skin/Images/InterFace/Travel_Background.png"],
	backgroundImage: "new_skin/Images/InterFace/Travel_Background.png",
	// LoadMusic: "pure_snows", StartGameMusic: "pure_snows",
	LoadAccess: function() {
		let Staff = oS["Staff_HTML"]["join"]("");
		$("tGround")["style"] = "background:url(new_skin/Images/InterFace/Travel_Background.png) no-repeat;left:0px;top:-100px;width:900px;height:730px;background-size:100% 100%;visibility:visible;", SetVisible($("dMenu")); // 背景图片、暂停按钮
		NewEle("dStaff_Block", "div", "visibility:visible;height:100%;width:100%;z-index:100;display:block;overflow:auto;white-space:pre;", {"className": "WindowFrame Hidden_Container Not_Chose"}, EDAll); // pointer-events:none;
		NewEle("dStaff_HTML", "div", "line-height:1;text-align:center;color:#FFFFFF;font-size:15px;font-family:RanTian,Regular,Briannetod,微软雅黑,Verdana,Tahoma;-webkit-text-stroke-width:0px;-webkit-text-stroke-color:#000000;word-break:break-all;white-space:pre;tab-size:1;", {"innerHTML": Staff}, $("dStaff_Block"));
		AllAudioStop(), PlayMusic(oS.LoadMusic = "pure_snows");
	},
	Staff_HTML: [
		'<!-- 制作名单 -->',
		'<a style="font-size:100px;-webkit-text-stroke-width:4px;"><br><br>jspvz - LAS<br><br><br></a><br><br><br>',
		'<a style="font-size:30px;-webkit-text-stroke-width:1px;">（请用鼠标下滑查看）<br><br><br><br><br><br><br><br><br><br></a>',
		'',
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
		'<a style="font-size:35px;line-height:1.3;">lonelystar<br>江南游戏<br>PVZ2素材吧<br>jspvz低玩<br>B站的J<br></a><br><a style="font-size:225px;"><br></a>',
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
		'<a style="font-size:200px;"><br></a>'
	],
}, {}, {
	"Play": (N) => (StopMusic(oS.LoadMusic), PlayMusic(oS.LoadMusic = N)), // 播放音乐
	"Internet_URL_Music_List": ["761323", "22706973", "760979", "1319520140", "471936", "786262", "22765919", "857905", "471834", "495562302", "28219117", "461074907", "1312561189"],
	"Can_Play_Internet": true,
	"Play2": function (i) { // 网络音乐
		if (window["Can_Play_Internet"] == false) return alert("您点击的速度太快了，请稍后再试！");
		window["Can_Play_Internet"] = false, setTimeout(() => (Can_Play_Internet = true), 5000); // 五秒间隔
		StopMusic(oS.LoadMusic), (delete oAudio["_OL_STAFF_Music_"]);
		NewURLAudio({url: "https://music.163.com/song/media/outer/url?id=" + window["Internet_URL_Music_List"][i] + ".mp3", audioname: "_OL_STAFF_Music_", loop: true}), PlayMusic(oS.LoadMusic = "_OL_STAFF_Music_");
	}
});
