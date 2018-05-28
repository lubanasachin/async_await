const pxMain = require('../pxRequire.js');
const debug = require('debug')('px-test');
const async = require('async');

let modArr = [
	{ name: 'test', data: {key1: '1001'}, descr: 'should return error for module not found', expect: 1000 },
	{ name: 'apiCheckVisitPurposeExist', data: {key1: '1001'}, descr: 'should run apiCheckVisitPurposeExist successfully', expect: 1001 },
	{ name: 'apiCheckVisit', data: {key1: '1001'}, descr: 'should run apiCheckVisit successfully', expect: 1001 }
];

async.eachSeries(modArr, function(modObj, _cb) {
	debug(modObj.descr);
	pxMain.start(modObj.name, modObj.data)
	.then((resp) => {
		//console.log('RCVD:', JSON.stringify(resp,2,null));
		if(resp.code && resp.code === modObj.expect) debug('Test: success');			
		else debug('Test: failed');
		console.log("\n");	
		return _cb(null);
	})
	.catch((err) => {
		debug(err);
		return _cb(err);
	})

}, function(err) {
	if(err) debug(err);
});
