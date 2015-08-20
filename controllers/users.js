module.exports = function userController(User){
	var userController = {}


	userController.getModel = function(){
		return User;
	}

	userController.create = function(req, res, next){
		delete req.body._id;
		User.create(req.body, function(err, userCreated){
			if(err) console.error('ERROR:',err);
			console.log('User created:',userCreated._id);
			req.body._id = userCreated._id;

			next();
		});
	};

	userController.createGet = function(req, res, next){
		delete req.query._id;
		User.create(req.query, function(err, userCreated){
			if(err) console.error('ERROR:',err);
			console.log('User created:',userCreated._id);
			req.query._id = userCreated._id;

			next();
		});
	}

	userController.update = function(req, res, next){
		User.findOneAndUpdate({_id: req.body._id},req.body,function(err, userUpdated){
			if(!err) {
				console.log('User updated:',userUpdated._id);
			}
			next();
		});
	}

	userController.destroy = function(req, res, next){
		User.remove({_id: req.body._id}, function(err, userDeleted){
			if(err) console.error('ERROR:',err);
			next();
		});
	}

	userController.findAll = function(req,res,next){
		User.find({},function(err, users){
			if(!err) res.json(users);
		});
	};

	userController.findOne= function(req,res,next){
		User.findOne({_id: req.body._id}, function(err, user){
			if(err) res.json({});
			res.json(user);
		});
	}

	userController.findOneGet = function(req,res,next){
		User.findOne({_id: req.query._id}, function(err, user){
			if(err) res.json({});
			res.json(user);
		});
	}

	userController.setRating = function(user){
		User.findOneAndUpdate({_id: user._id}, user, function(err, userUpdated){
			if(err) console.error('ERROR:',err);
			console.log('User rating updated:',userUpdated);
			return userUpdated;
		});
	}


	return userController;

}