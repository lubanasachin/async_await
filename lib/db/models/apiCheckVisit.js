const debug = require('debug')('px-apiCheckVisit');
const Promise = require('promise');

let func1 = function() {
	return new Promise(function (resolve,reject) {
		return resolve(1);
	});
} 

let func2 = function(params) {
	return new Promise(function (resolve,reject) {
		return resolve(2);
	});
} 

let func3 = function(params) {
	return new Promise(function (resolve,reject) {
		return resolve(3);
	});
} 

let func4 = function(params) {
	return new Promise(function (resolve,reject) {
		return resolve(4);
	});
} 

module.exports = {

	start: async (dataParams) => {
		try {
			let resp1 = await func1();
			let resp2 = await func2(resp1);
			let resp3 = await func3(resp2);
			let resp4 = await func4(resp3);
			return [resp1, resp2, resp3, resp4];
		} catch(err) {
			return err;
		}
	}

}

