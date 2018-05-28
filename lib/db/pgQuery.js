let pg = require('pg')

/* Execute query on postgresql server */
function select (qry, dbName) {
  let deferred = q.defer()
  let config = require('../config/db.json')[dbName.toUpperCase()]

  if (!config) {
    //return deferred.reject(commonFun.sendErrorResponse('S1007'))
  }

  let pool = new pg.Pool(config)

  if (qry === null) {
    // log.e('Error in query string: ' + JSON.stringify(qry))
    //return deferred.reject(commonFun.sendErrorResponse('S1008'))
  }
  pool.connect()
    .then(client => {
      // client.query("SET statement_timeout = '1800s';");
      client.query(qry).then(res => {
        client.release()
        client.end()
        return deferred.resolve(res.rows)
      })
        .catch(e => {
          client.release()
          client.end()
          console.error('query error in', e.message, e.stack)
          //return deferred.reject(commonFun.sendErrorResponse('S1005', null, '500'))
        })
    }).catch(e => {
      console.error('query error out', e.message, e.stack)
      //deferred.reject(commonFun.sendErrorResponse('S1006', null, '500'))
    })
  return deferred.promise
}

// Exports
exports.select = select
