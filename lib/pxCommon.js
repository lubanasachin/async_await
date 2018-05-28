const fs = require('fs');
const debug = require('debug')('px-common');
const config = require(__baseDir+'/config/config.js');
const resCode = require(__baseDir+'/config/resCodes.json');

module.exports = {

	//check if node environment variable is set 
	"checkEnv": () => {
		let procEnv = (process.env.NODE_ENV && process.env.NODE_ENV != '' ) ? process.env.NODE_ENV : 'development';
		procEnv = procEnv.toLowerCase();
		if(procEnv != 'production' && procEnv != 'development') {
  		debug("Invalid NODE_ENV. Hence quiting!!");
  		debug("USAGE: NODE_ENV='[development||production]' DEBUG='px-*' npm start");
  		process.exit();
		}
		return procEnv;
	},
	
	//check if file exists
	"checkIfFileExists": (fileName) => fs.existsSync(fileName),

	//send success response
	"sendSuccessResponse": (code,data) => {
    let message = resCode[code] || 'Request processed successfully';
    let resp = {
      type: 'success',
      code,
      message,
      data: data || []
    }
    return resp;
	},

	//send error response
	"sendErrorResponse": (code,errData) => {
		let message = resCode[code] || 'Something went wrong, please retry after sometime';
		let resp = {
			type: 'error',
			code,
			message,
			data: errData || []
		}
		return resp;
	}

}
