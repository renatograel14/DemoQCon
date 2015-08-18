module.exports = function User(Mongoose){
	var question = new Mongoose.Schema({
		number: Number,
		Question: String,
		Answers: [{
			letter: String,
			answer: String,
			isCorrect: Boolean
		}]
	});


	return Mongoose.model('question', question, 'question');
}