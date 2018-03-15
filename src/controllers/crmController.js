import mongoose from 'mongoose'
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
	let newContact = new Contact(req.body);

	newContact.save( (err, contact) => {
		if(err){
			res.send(err);
		}
		res.send(contact);
	});
};

export const getContactFromId = (req, res) => {
	Contact.findById(req.params.contactId, (err, contact) => {
		if(err){
			res.send(err);
		}
		res.json(contact);
	});
};	

export const updateContact = (req, res) => {
	Contact.update( {_id : req.params.contactId}, req.body, { new: true }, (err, contact) => {
		if(err){
			res.send(err);
		}
		res.json(contact);
	});
};

export const getAllContacts = (req, res) => {
	Contact.find({}, (err, contactList) => {
		if(err){
			res.send(err);
		}
		res.send(contactList);
	});
};	

