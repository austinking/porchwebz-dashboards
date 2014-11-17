var fs = require('fs');
var path = require('path');

var sqlite3 = require('sqlite3').verbose();

module.exports = function() {

var db = initDB();

function initDB() {
  var db = new sqlite3.Database('metrics-pump.sqlite3');
  db.on('error', function(err) {
  	console.log('DB Error', err);
  });
  return db;
};

db.serialize(function() {
  
  db.all('SELECT version FROM schema', function(err, rows) {
    if (err || rows.length == 0) {
    	if (err) {
	    	console.log('ERROR', err);
	      db = initDB();
		    var createTables = fs.readFileSync(path.join(__dirname, 'sql/000-create-schema.sql'), {encoding: 'utf8'});
		    db.exec(createTables);	
    	} else {
    		console.log('Expected results but was ', rows);
    	}
    	
    } else {
      console.log('SCHEMA: ', rows[0].version);
/*
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
*/

    }
  });
});

db.close();	
}
