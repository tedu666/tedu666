// 离线音频资源缓存
// 打开或创建 IndexedDB 数据库
const MusicDB = {
	db: null,

	openDatabase: function() {
	let request = indexedDB.open("musicDatabase", 1);

	request.onerror = function(event) {
		console.error("Database error: " + event.target.errorCode);
	};

	request.onupgradeneeded = function(event) {
		let db = event.target.result;
		let objectStore = db.createObjectStore("music", { keyPath: "id" });
	};

	request.onsuccess = function(event) {
		MusicDB.db = event.target.result;
		console.log("Database opened successfully");
	};
	},

	saveMusic: function(url) {
	if (!MusicDB.db) {
		console.error("Database is not ready");
		return;
	}
	
	let transaction = MusicDB.db.transaction(["music"], "readwrite");
	let objectStore = transaction.objectStore("music");
	let id = MD5(url); // 使用 MD5 函数生成唯一 ID
	let music = { id: id, url: url };

	if (id && url) {
		let addRequest = objectStore.add(music);
		addRequest.onsuccess = function(event) {
		console.log("Music added to database");
		};
		addRequest.onerror = function(event) {
		console.error("Failed to add music to database:", event.target.error);
		};
	} else {
		console.error("Invalid URL or ID");
	}
	},

	loadMusic: function(url, callback) {
	let id = MD5(url); // 使用 MD5 函数生成唯一 ID
	let transaction = MusicDB.db.transaction(["music"]);
	let objectStore = transaction.objectStore("music");
	let getRequest = objectStore.get(id);

	getRequest.onsuccess = function(event) {
		let storedMusic = event.target.result;
		if (storedMusic) {
		console.log("Retrieved music URL from database:", storedMusic.url);
		MusicDB.playMusic(storedMusic.url, callback);
		} else {
		console.log("Music URL not found in database");
		}
	};
	},

	playMusic: function(url, callback) {
	let audio = new Audio(url);
	audio.oncanplaythrough = function() {
		callback(audio);
	};
	}
};

// 使用示例：
MusicDB.openDatabase(); // 打开数据库

// 首次加载音乐执行这个（不可重复保存）：
MusicDB.saveMusic("https://t4.bcbits.com/stream/754f5a52731c66c6e8a79fb1d277e520/mp3-128/1464013070?p=0&ts=1712478138&t=30a114e4c57fd4df881b2854691edd507e7619fc&token=1712478138_71eb87714a2a836562f6861b48ec136788dfe69c"); // 保存音乐 URL 到数据库


// 想要调用执行这个：
MusicDB.loadMusic("https://t4.bcbits.com/stream/754f5a52731c66c6e8a79fb1d277e520/mp3-128/1464013070?p=0&ts=1712478138&t=30a114e4c57fd4df881b2854691edd507e7619fc&token=1712478138_71eb87714a2a836562f6861b48ec136788dfe69c", function(audio) { // 加载音乐并播放
	audio.play();
});
