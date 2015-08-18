var request = require('request');

module.exports = function corticonCall(corticonConfig,userController){

	var CorticonCall = {};

	var getUserMetada = function(user,index){
		if(!!index) return "User_id_" + index;
		return "User";
	}

	var requestBody = function requestBody(user){
		var userBody = [];
		
		user.__metadata = {
			"#id": getUserMetada(user,1),
			"#type": getUserMetada(user)
		};
		userBody.push(user);

		return { Objects: userBody };
	} 

	var buildRequest = function(user){

		var options = {
			uri: corticonConfig.uri,
			method: 'POST',
			headers: {
				'dsName': corticonConfig.dsName
			},
			'Content-Type': 'application/json',
			json: requestBody(user)
		}


		return options;
	}

	

	CorticonCall.checkRatingOne = function(req,res,next){
		console.log(req.body);
		request(buildRequest(req.body),function(err, response, body){
			if(!!err) res.send(err);
			var users = body.Objects;
			users.forEach(function(u){
				userController.setRating(u);
				req.body = u;
			});
			next();
		});
	}

	return CorticonCall;
}