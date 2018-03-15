import mongoose from 'mongoose'
import { UserSchema } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../../config/dev';

const User = mongoose.model('User', UserSchema);

export const registerNewUser = (req, res) => {
	
	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	let user = {};
	user.userName = req.body.userName;
	user.password = hashedPassword;
	let newUser = new User(user);

	User.findOne({ userName: req.body.userName }, (err, user) => {
		console.log(user);
	 	if(err){
	 		res.status(500).send("Error on the server");
	 	}
	 	if(!user){
	 		newUser.save( (err, user) => {
				if(err){
					 return res.status(500).send("Error on the server");
				}

				let token = jwt.sign({ id : user.id }, config.secret, { expiresIn: 1800 /* expires in 30 minutes */ });

				return res.json({ auth: true, token: token });
			});
	 	}
	 	res.status(200).send("User already exits");
	}); 	
};

export const verifyUser = (req, res) => {

	let token = req.headers['x-access-token'];

	User.findOne({ userName: req.body.userName }, (err, user) => {
	 	if(err){
	 		res.status(500).send("Error on the server");
	 	}
	 	if(!user){
	 		res.status(404).send("User Not Found");
	 	}
	 	jwt.verify(token, config.secret, (err, decoded) => {
	 		if(err){
	 			res.status(401).send("Failed to Authenticate Token");
	 		}
	 		User.findById(decoded.id, { Password: 0}, (err, user) => {
	 			if(err){
	 				res.status(500).send("Error on the server");
	 			}
	 			if(!user){
	 				res.status(404).send("User Not Found");
	 			}
	 			res.status(200).send(user);
	 		});
	 	});
	 }) ;
}