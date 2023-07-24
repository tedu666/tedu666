var rc4 = (str, key) => {
	var s = [], j = 0, x, res = '';
	for (var i = 0; i < 256; i++) {
		s[i] = i;
	};
	for (i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i], s[i] = s[j], s[j] = x;
	};
	i = 0, j = 0;
	for (var y = 0; y < str.length; y++) {
		i = (i + 1) % 256, j = (j + s[i]) % 256, x = s[i], s[i] = s[j], s[j] = x;
		res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	};
	return res;
};

var StringNumFix = (num,length) => {
	return (Array(length).join("0") + num).slice(-length);
};

var str_to_number = (str) => {
	let ret = '';
	for (let i in str){
		ret += StringNumFix(str.charCodeAt(i), 5);
	}
	return ret;
};

var number_to_str = (str) => {
	if(str.length % 5) return '';
	let ret = '';
	for (let i = 0; i < str.length; i += 5){
		ret += String.fromCharCode(Number(str.substr(i,5)) || 0);
	}
	return ret;
}

var rc_num = (str, key = '') => {
	return str_to_number(rc4(str,key));
};

var rc_str = (str, key = '') => {
	return rc4(number_to_str(str), key);
};



// rc4(JSON.stringify(level_data_json),'__JN324G_PVZ123_TRAVEL!%#@$as123');

// rc4(number_to_str('2135927097292273710265507'),'__RC4_JSPVZ_!%#@$%^&*()_+-=KEY唯一标识码__');

// str_to_number(rc4('text','key'));

// rc4(number_to_str('text'),'key');

// rc4(number_to_str(str_to_number(rc4('text','key'))),'key');


// '__JN324G_PVZ123_TRAVEL!%#@$as123'


