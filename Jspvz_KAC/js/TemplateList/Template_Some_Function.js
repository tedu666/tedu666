let __Template_ReSet_Object__ = function(a, b){
	let ret = {};
	for(let i in a) ret[i] = a[i];
	for(let i in b) ret[i] = b[i];
	return ret;
};

