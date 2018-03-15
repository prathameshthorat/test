import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
	firstName : {
		type : String,
		required : 'Enter a First Name'
	},
	lastName : {
		type : String,
		required : 'Enter a Last Name'
	},
	email : {
		type : String,
		required : 'Enter a email Id',
		unique : true,
		index: true,
	},
	company : {
		type : String
	},
	phone : {
		type : Number
	},
	createdDate : {
		type : Date,
		default : Date.now
	}

})
