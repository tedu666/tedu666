/*
基于 Howler.js 的音频

// 创建一个使用HTML5模式的Howl实例
var sound = new Howl({
  src: ['audio/music.mp3'],
  html5: true
});

// 播放音频，并记录返回的ID
var soundId = sound.play();

// 停止该音频的播放
sound.stop(soundId);

// 暂停该音频的播放
sound.pause(soundId);

*/
var MusicLine = { // 音乐音效特殊异步数设置（即该音频最多可同时放几个
	"default": 16, // 默认 16
	"jackinthebox": 1, "zamboni": 1, "dancer": 1, "ballooninflate": 5, "explosion": 5,  // 小丑、冰车、舞王只允许一个，气球和爆炸声则是五个
	"Mountains": 1, "Watery Graves": 1 // 音乐
}, __GlobalMute__ = false; // 是否全局静音

var HowlAudio = class { // 音频接口，有待完善
	Sound = undefined; Onload = false; PLines = null; Lines = null; MaxLine = 16; LastPlay = null; MinPlay = 5; // 目前是 5 毫秒内
	constructor (Json) { let self = this, MLine = Json["line"] || 16; self["Sound"] = new Howl(Json), self["MaxLine"] = MLine, self["Lines"] = [], self["PLines"] = []; };
	isUrl(Str) {
		let Reg = new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i");
		if (Array["isArray"](Str)) Str = Str[0]; return Reg["test"](Str);
	};
	freshline () { // 刷新正在播放的列表
		let self = this; if (!self["Lines"] || !self["Sound"]) return false;

		// 方法 1: 筛选一遍
		// self["Lines"] = self["Lines"]["filter"]((Id) => self["Sound"]["playing"](Id)); // 筛选出正在播放的

		// 方法 2: 筛选出没有暂停的
		let Ret = []; self["Sound"]["_sounds"]["forEach"]((Ele) => self["Sound"]["playing"](Ele["_id"]) && Ret["push"](Ele["_id"]));
		self["Lines"] = Ret;

		return self["Lines"]["length"];
	};
	load () { // 加载
		let self = this; if (!self["Sound"]) return false; // 不存在
		self["Sound"]["load"](), self["Sound"]["once"]("load", function() {
			if (self["Sound"]["state"]() == "loaded") self["Onload"] = true;
		}); // 标记加载好了
	};
	unload () { // 取消加载
		let self = this; if (!self["Sound"]) return false; // 不存在
		self["Sound"]["unload"]();  
	};
	play (Cofig = {}) { // 播放
		let self = this, ID = undefined; if (!self["Sound"]) return false; // 播放中或者不存在
		let { CallBack = (() => {}), Sprite = undefined } = Cofig, D = oSym["SysTime"](), b = self["isUrl"](self["Sound"]["_src"]);
		let NewPlay = Sprite ? [Sprite, ID] : [ID];

		if (D - self["LastPlay"] < self["MinPlay"]) return false; // 短时间内重叠过多
		self["LastPlay"] = D, self["freshline"](); // 刷新列表和播放时间

		if (self["Lines"]["length"] + !!self["PLines"]["length"] < self["MaxLine"]) { // 允许重复播放
			if (self["Onload"] && self["Sound"]["state"]() == "loaded") ID = self["Sound"]["play"](Sprite), (ID != null) && self["Lines"]["push"](ID), CallBack(self); // 播放
			else self["Sound"]["once"](b ? "play" : "load", function() { // 异步检测播放
				if (self["Sound"]["state"]() == "loaded" && self["Onload"] == false) ID = self["Sound"]["play"](...(b ? [ID] : NewPlay)), self["Onload"] = true, (ID != null) && self["Lines"]["push"](ID), CallBack(self); // 加载好的时候才尝试播放一次
			}), self["Sound"]["load"](), b && (ID = self["Sound"]["play"](Sprite)); // 如果是网络文件则先尝试播放一次
		} else if (self["Lines"]["length"] != 0) self["Sound"]["play"](self["Lines"][0]), CallBack(self);
		else if (self["PLines"]["length"] != 0) self["Sound"]["play"](self["PLines"][0]), self["PLines"]["slice"](1, 0), CallBack(self);
	};
	stop (a, ID) { // 停止
		let self = this; if (!self["Sound"]) return false;
		if (self["Onload"] && self["Sound"]["state"]() == "loaded" && !a) self["Sound"]["stop"](ID), self["freshline"](); // 如果加载好了并且有文件正在播放，暂停
		else self["Sound"]["stop"](), self["Sound"]["unload"](), self["PLines"]["length"] = 0, self["freshline"](), self["Onload"] = false; // 否则强制卸载
	};
	pause (Bool, ID) { // 暂停
		let self = this; if (!self["Sound"]) return false;
		if (Bool != true) return self["Sound"]["pause"](ID); // 暂停播放，id 保留
		for (let I of self["Lines"]) self["Sound"]["pause"](I), self["PLines"]["push"](I); // 暂停当前全部
		self["freshline"](); // 刷新
	};
	pausecancel () { // 恢复暂停的
		let self = this; self["freshline"]();
		for (let I = self["PLines"]["length"] - 1, ID = self["PLines"][I]; I >= 0; --I) {
			if (self["Lines"]["length"] >= self["MaxLine"]) break;
			try {
				if (self["Onload"] && self["Sound"]["state"]() == "loaded") ID = self["Sound"]["play"](ID), (ID != null) && self["Lines"]["push"](ID); // 播放
				else self["Sound"]["once"]("load", function() { // 异步
					if (self["Onload"] == false && self["Sound"]["state"]() == "loaded") ID = self["Sound"]["play"](ID), self["Onload"] = true, (ID != null) && self["Lines"]["push"](ID); // 再尝试播放一次
				}), self["Sound"]["load"](); // 先尝试播放一次
			} catch (why) {};
		};
		self["PLines"]["length"] = 0; // 不管放没放玩都清空
	};
	volume (Value, ID) { // 音量
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["volume"](Value, ID) // 调整音量
	};
	muted (Bool) { // 是否静音
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["mute"](Bool) // 调整静音
		for (let I of self["Lines"]) self["Sound"]["mute"](Bool, I); // 设置当前全部
	};
	loop (Bool) { // 循环
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["loop"](Bool) // 调整是否循环
		for (let I of self["Lines"]) self["Sound"]["loop"](Bool, I); // 设置当前全部
	};
	currentTime (Time, ID) { // 设置播放时间
		let self = this; if (!self["Sound"]) return false;
		if (ID) self["Sound"]["seek"](Time, ID); // 设置播放时间
		else {
			self["freshline"](); for (let I of self["Lines"]) self["Sound"]["seek"](Time, I);
		}
	};
	set (Key, Value, ID) {
		let self = this; if (!self["Sound"]) return false;
		self["Sound"][Key](Value, ID)       
	};
};
// 音频相关 (暂不改动)

var NewMusic = function(a) { // 新音乐
	NewAudio({
		loop: true,
		source: a
	});
}, PauseMusic = function() { // 暂停音乐
	let a = oAudio[oS.LoadMusic]; a.currentTime(0); a.pause();
},
oAudio = {}, PausedAudioArr = [],
NewAudio = function(b, jn = {}) { // 新音效
	let src = b.source, autoplay = b.autoplay, loop = b.loop, volume = b.volume, line = b.mline || $SEql(src, MusicLine);
	if (oAudio[src]) return oAudio[src];

	let UrlPre = ["audio/"], UrlSuf = [".mp3"], SrcList = []; // 后缀
	for (let PreI of UrlPre) for (let SufI of UrlSuf) SrcList["push"](PreI + src + SufI); // 所有有可能的 url

	let Json = __Template_ReSet_Object__({ // 确定好 json
		format: ["mp3"], // 只留 MP3
		src: SrcList, // 列表
		loop: loop, // 循环
		volume: volume, // 声音
		line: line, // 通道数
		preload: false, 
		html5: true // 开启html5模式
	}, jn);

	let Ret = new HowlAudio(Json); // 定义并确定对象

	return (autoplay && Ret.play(), oAudio[src] = Ret); // 返回
},
PlayMusic = function(b) { // 播放音乐
	let a = oAudio[b];
	if (a) a.stop(1), a.MaxLine = 1, a.play(); // 先强制卸载
	else NewMusic(b), oAudio[b].MaxLine = 1, oAudio[b].play();
},
PlayAudio = function(c, a) { // 播放音效
	let b = oAudio[c];
	b ? (b.loop(!!a), b.play()) : (NewAudio({ source: c, loop: !!a })).play()
},
PauseAudio = function(a) { // 暂停音效
	oAudio[a].pause();
},
StopMusic = function() { // 停止音乐
	let a = oAudio[oS.LoadMusic];
	if (a) a.stop(1);
},
StopAudio = function(b, c) { // 停止音效
	let a = oAudio[b];
	if (a) a.stop(c);
},
AllAudioStop = function(c) { // 停止所有音效
	for (let a in oAudio) {
		let b = oAudio[a]; b.stop(true); // 强制卸载所有音效
	}
},
AllAudioPaused = function() { // 暂停所有音效
	for (let a in oAudio) {
		let b = oAudio[a]; 
		b && b.Sound.playing() && (PausedAudioArr.push(a), b.pause(true)); // 如果在播放中，暂停
	}
},
AllAudioPauseCanceled = function() { // 取消暂停
	var a = PausedAudioArr.length;
	while (a--) oAudio[PausedAudioArr[a]].pausecancel();
	PausedAudioArr.length = 0
},
AllAudioMuted = function() { // 静音
	for (let a in oAudio) oAudio[a].muted(true); __GlobalMute__ = true;
},
AllAudioMuteCanceled = function() { // 取消静音
	for (let a in oAudio) oAudio[a].muted(false); __GlobalMute__ = false;
};


var NewURLAudio = function(b, jn = {}) {
	let src = b.url, id = b.audioname || src, autoplay = b.autoplay, loop = b.loop, volume = b.volume, line = b.mline || $SEql(id, MusicLine), html5 = (b.html5 === false) ? false : true, seek = (b.seek >= 0) ? b.seek : undefined;
	if (oAudio[id]) return oAudio[id];
	let Json = __Template_ReSet_Object__({ // 确定好 json
		src: [src], // 列表
		loop: loop, // 循环
		volume: volume, // 声音
		line: line, // 通道数
		seek: seek, // 播放进度
		preload: false, 
		html5: html5 // 开启html5模式
	}, jn);

	let Ret = new HowlAudio(Json); // 定义并确定对象

	return (autoplay && Ret.play(), oAudio[id] = Ret); // 返回
};


var CheckSilence = function(a) { // 声音
	var b = a.checked ? 1 : 0;
	addCookie("JSPVZSilence", oS.Silence = b), b ? AllAudioMuted() : AllAudioMuteCanceled();
};