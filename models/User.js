module.exports = function User(Mongoose){
	var user = new Mongoose.Schema({
		FirstName: String,
		LastName: String,
		Company: String,
		Role: String,
		Email: String,
		MobilePhone: String,
		quizHits: Number,
		rating: Number,
		'__metadata': {
			'#type': String,
			'#id': String
		}
	});


	return Mongoose.model('user', user, 'user');
}