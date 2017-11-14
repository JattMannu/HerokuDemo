var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds036577.mlab.com:36577/db_information');
var conn = mongoose.connection;


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.render('pages/index');
});

app.get('/add', function (req, res) {
  new Promise(function (resolve, reject) {
    const entry = {
      headers: req.headers,
      body: req.body
    }
    conn.collection('VaultQ').insert(entry);
    return resolve('Done');
  }).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    console.log(err);
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
