'use strict'

global.__baseDir = __dirname; 

const common = require(__baseDir+'/lib/pxCommon');
const debug = require('debug')('px-require');
const __env = common.checkEnv(); 

module.exports = { 
	start: (modName,dataParams) => pxRequire(modName,dataParams)
}

let pxRequire = async (modName,dataParams) => {
	try {
		let reqMod = __baseDir+"/lib/db/models/"+modName+'.js';
		if(!common.checkIfFileExists(reqMod)) return common.sendErrorResponse(1000);
		let reqFile = require(reqMod);
		let resp = await reqFile.start(dataParams);
		return common.sendSuccessResponse(1001,resp);
	} catch (error) { return common.sendErrorResponse(1002,error); }
}


