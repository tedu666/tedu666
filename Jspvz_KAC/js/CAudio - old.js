// 音频相关 (暂不改动)
var NewMusic = function(a) {
	NewAudio({
		autoplay: true,
		loop: true,
		source: a
	})
}, PauseMusic = function() {
	var a = oAudio[oS.LoadMusic];
	a.currentTime = 0;
	a.pause()
},
oAudio = {},
PausedAudioArr = [],
NewAudio = function(b) {
	var a = b.source;
	if (oAudio[a]) {
		return
	}
	var f = document.createElement("audio"),
	c = b.autoplay,
	g = b.loop,
	m,
	h = {
		mp3: "audio/mpeg",
		ogg: "audio/ogg",
		aac: "audio/mp4"
	},
	k = b.preload,
	l = b.callback,
	j = ["mp3", "ogg"],
	e = j.length,
	d;
	f.autoplay = c ? true: false;
	g && f.addEventListener("ended",
	function() {
		f.play()
	},
	false);
	while (e--) { (m = document.createElement("source")).type = h[d = j[e]];
		m.src = "audio/" + a + "." + d;
		f.appendChild(m)
	}
	f.preload = k == undefined ? "auto": ["auto", "meta", "none"][k];
	f.muted = oS.Silence;
	l && f.addEventListener("canplaythrough", l, false);
	return (oAudio[a] = f)
},
PlayMusic = function(b) {
	var a = oAudio[b];
	if (a) {
		try {
			a.currentTime = 0
		} catch(c) {}
		a.play()
	} else {
		NewMusic(b);
		oAudio[b].play()
	}
},
PlayAudio = function(c, a) {
	var b = oAudio[c];
	b ? (b.loop = !!a, b.play()) : (NewAudio({
		source: c,
		loop: !!a
	})).play()
},
PauseAudio = function(a) {
	try{
		oAudio[a].pause()
	} catch(b) {console.error(b)};
},
StopMusic = function() {
	var a = oAudio[oS.LoadMusic];
	try {
		a.currentTime = 0
	} catch(b) {}
	a.pause()
},
StopAudio = function(b) {
	var a = oAudio[b];
	try {
		a.currentTime = 0
	} catch(c) {}
	a.pause()
},
AllAudioStop = function(c) {
	var a, b;
	for (a in oAudio) {
		b = oAudio[a];
		try {
			b.currentTime = 0
		} catch(d) {}
		b.pause()
	}
},
AllAudioPaused = function() {
	var a, b;
	for (a in oAudio) {
		b = oAudio[a]; ! (b.paused || b.ended) && (PausedAudioArr.push(a), b.pause())
	}
},
AllAudioPauseCanceled = function() {
	var a = PausedAudioArr.length;
	while (a--) {
		oAudio[PausedAudioArr[a]].play()
	}
	PausedAudioArr.length = 0
},
AllAudioMuted = function() {
	var a;
	for (a in oAudio) {
		oAudio[a].muted = true
	}
},
AllAudioMuteCanceled = function() {
	var a;
	for (a in oAudio) {
		oAudio[a].muted = false
	}
};


var NewURLAudio = function(b) {
	var a = b.url,names=b.audioname || a;
	if (oAudio[names]) { return oAudio[names]; };
	var f = document.createElement("audio"),c = b.autoplay,g = b.loop,m,k = b.preload,l = b.callback,j = ["audio/mpeg", "audio/ogg"],e = j.length,d;
	while (e--) {
		(m = document.createElement("source")).type = j[e];
		m.src = a,f.appendChild(m);
	};
	f.autoplay = (c ? true: false) , f.preload = (k == undefined ? "auto": ["auto", "meta", "none"][k]),f.muted = oS.Silence;
	g && f.addEventListener("ended",function() {f.play()},false);
	l && f.addEventListener("canplaythrough", l, false);
	return (oAudio[names] = f);
};


var CheckSilence = function(a) { // 声音
	var b = a.checked ? 1 : 0;
	b != oS.Silence && (addCookie("JSPVZSilence", oS.Silence = b), b ? AllAudioMuted() : AllAudioMuteCanceled())
}