module.exports = function questionController(Question){
	var questionController = {}


	questionController.findAll = function(req,res,next){
		Question.find({}, function(err, questions){
			res.json(questions);
		});
	};

	questionController.findOne = function(req,res,next){
		console.log({ "number": req.params.number});
		Question.findOne({ "number": req.params.number},function(err, question){
			if(err)console.error(err);
			res.json(question);
		});
	}


	return questionController;

}