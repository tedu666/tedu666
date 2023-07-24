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

var HowlAudio = class { // 音频接口，有待完善
	Sound = undefined; PlayId = undefined; Onload = false;
	constructor (Json) { let self = this; Json["html5"] = true, self["Sound"] = new Howl(Json); };
	load () { // 加载
		let self = this; if (!self["Sound"]) return false; // 不存在
		self["Sound"]["load"]();
	};
	unload () { // 取消加载
		let self = this; if (!self["Sound"]) return false; // 不存在
		self["Sound"]["unload"]();	
	};
	play () { // 播放
		let self = this, ID = null; if (!self["Sound"]) return false; // 播放中或者不存在
		if (self["Onload"]) ID = self["Sound"]["play"](self["PlayId"]), self["PlayId"] = (ID != null ? ID : undefined); // 播放
		else self["load"](), self["Sound"]["once"]('load', function() { // 异步
			ID = self["Sound"]["play"](self["PlayId"]), self["PlayId"] = (ID != null ? ID : undefined), self["Onload"] = true; // 播放
		}), ID = self["Sound"]["play"](self["PlayId"]), self["PlayId"] = (ID != null ? ID : undefined);
	};
	stop (a) { // 停止
		let self = this; if (!self["Sound"]) return false;
		if (self["Onload"] && self["Sound"]["playing"]() && !a) self["Sound"]["stop"](self["PlayId"]);
		else self["Sound"]["stop"](self["PlayId"]), self["Sound"]["unload"](), self["Onload"] = false;
		self["PlayId"] = undefined; // 停止播放
	};
	pause () { // 暂停
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["pause"](self["PlayId"]); // 暂停播放，id 保留
	};
	volume (Value) { // 音量
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["volume"](Value, self["PlayId"]) // 调整音量
	};
	muted (Bool) { // 是否静音
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["mute"](Bool, self["PlayId"]) // 调整静音
	};
	loop (Bool) { // 循环
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["loop"](Bool, self["PlayId"]) // 调整是否循环
	};
	currentTime (Time) { // 设置播放时间
		let self = this; if (!self["Sound"]) return false;
		self["Sound"]["seek"](Time, self["PlayId"]) // 设置播放时间
	};
	set (Key, Value) {
		let self = this; if (!self["Sound"]) return false;
		self["Sound"][Key](Value, self["PlayId"])		
	};
}
/*
	先分成两个部分: 
		1.音乐（一个时刻内只允许播放一次）
		2.音频
*/

// 音频相关 (暂不改动)

var NewMusic = function(a) { // 新音乐
	NewAudio({
		autoplay: true,
		loop: true,
		source: a
	})
}, PauseMusic = function() { // 暂停音乐
	let a = oAudio[oS.LoadMusic]; a.currentTime(0); a.pause();
},
oAudio = {}, PausedAudioArr = [],
NewAudio = function(b) { // 新音效
	let src = b.source, autoplay = b.autoplay, loop = b.loop, volume = b.volume;
	if (oAudio[src]) return;

	let UrlPre = ["audio/"], UrlSuf = [".ogg", ".mp3"], SrcList = []; // 后缀
	for (let PreI of UrlPre) for (let SufI of UrlSuf) SrcList["push"](PreI + src + SufI); // 所有有可能的 url

	let Json = { // 确定好 json
		src: SrcList, // 列表
		loop: loop, // 循环
		volume: volume, // 声音
		html5: true  // 开启html5模式
	};

	let Ret = new HowlAudio(Json); // 定义并确定对象

	return (autoplay && Ret.play(), oAudio[src] = Ret); // 返回
},
PlayMusic = function(b) { // 播放音乐
	let a = oAudio[b];
	if (a) a.stop(), a.play();
	else NewMusic(b), oAudio[b].play();
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
	if (a) a.stop();
},
StopAudio = function(b) { // 停止音效
	let a = oAudio[b];
	if (a) a.stop();
},
AllAudioStop = function(c) { // 停止所有音效
	for (let a in oAudio) {
		let b = oAudio[a]; b.stop(true);
	}
},
AllAudioPaused = function() { // 暂停所有音效
	for (let a in oAudio) {
		b = oAudio[a]; 
		b && b.Sound.playing() && (PausedAudioArr.push(a), b.pause()); // 如果在播放中，暂停
	}
},
AllAudioPauseCanceled = function() { // 取消暂停
	var a = PausedAudioArr.length;
	while (a--) oAudio[PausedAudioArr[a]].play();
	PausedAudioArr.length = 0
},
AllAudioMuted = function() { // 静音
	for (let a in oAudio) oAudio[a].muted(true);
},
AllAudioMuteCanceled = function() { // 取消静音
	for (let a in oAudio) oAudio[a].muted(false);
};


var NewURLAudio = function(b) {
	let src = b.url, id = b.audioname || src, autoplay = b.autoplay, loop = b.loop, volume = b.volume;
	if (oAudio[id]) return oAudio[id];

	let Json = { // 确定好 json
		src: [src], // 列表
		loop: loop, // 循环
		volume: volume, // 声音
		html5: true  // 开启html5模式
	};

	let Ret = new HowlAudio(Json); // 定义并确定对象

	return (autoplay && Ret.play(), oAudio[id] = Ret); // 返回
};


var CheckSilence = function(a) { // 声音
	var b = a.checked ? 1 : 0;
	b != oS.Silence && (addCookie("JSPVZSilence", oS.Silence = b), b ? AllAudioMuted() : AllAudioMuteCanceled())
};