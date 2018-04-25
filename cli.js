
const express = require('express')
const path = require('path')
const exec = require('child_process').exec; 
// const program = require('commander');
const app = express()

var static = 'webapp/'
if(process.argv.length > 2){
  static = process.argv[2]; 
}
app.use(express.static(path.join(__dirname, static)))


var server = app.listen(5050, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Easy.To.Do app listening at http://%s:%s', host, port);
});

