module.exports = function User(Mongoose){
	var user = new Mongoose.Schema({
		FirstName: String,
		LastName: String,
		Company: String,
		Role: String,
		Email: String,
		MobilePhone: String,
		rating: Number,
		quizHits: Number,
		Q1: String,
		Q2: String,
		Q3: String,
		Q4: String,
		Q5: String,
		Q6: String,
		Q7: String,
		Q8: String
	});

	return Mongoose.model('user', user, 'user');
}