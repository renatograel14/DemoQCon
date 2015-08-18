
var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');


var app = express(); 
app.set('port',process.env.PORT || 8855);
app.set('host',process.envIP || 'localhost');


var Mongoose = require('mongoose');


var environment = process.env.NODE_ENV;

function getDbAddress(env){
	var dbConfig = require('./config/db.js');
	return dbConfig[env || 'development'];
}

function getCorticonConfig(env){
	var corticonConfig = require('./config/corticon.js');
	return corticonConfig[env || 'development'];
}


var dbAdress = getDbAddress(environment);
var corticonConfig = getCorticonConfig(environment);

console.log('Trying to connecto to:',dbAdress);

Mongoose.connect(dbAdress);

var Question = require('./models/Question')(Mongoose);
var questionsController = require('./controllers/questions')(Question);

Mongoose.connection.once('open', function(){
	console.log('DataBase connected in', dbAdress);


	var questionsData = require('./data/questionsData');

	Question.remove({});

	questionsData.forEach(function(question){
		Question.create(question);
	});

});


app.use(express.static(path.resolve(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));

var User = require('./models/User')(Mongoose);
var userController = require('./controllers/users')(User);
var CorticonCall = require('./controllers/corticon')(corticonConfig,userController);

app.get('/user', userController.findAll);
app.post('/user', userController.create,  CorticonCall.checkRatingOne, userController.findOne);
app.put('/user', userController.update, CorticonCall.checkRatingOne, userController.findOne);
app.delete('/user', userController.destroy,  userController.findOne);


app.get('/questions', questionsController.findAll);
app.get('/question/:number', questionsController.findOne);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express listening at", app.get('port'));
});


