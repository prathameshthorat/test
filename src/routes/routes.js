import { addNewContact, getContactFromId , updateContact, getAllContacts } from '../controllers/crmController';
import { registerNewUser, verifyUser } from '../controllers/authController';

const routes = (app) => {
	
	app.route('/contact')
	.get(getAllContacts)
	.post(addNewContact);

	app.route('/contact/:contactId')
	.get(getContactFromId)
	.put(updateContact);

	app.route('/register')
	.post(registerNewUser);

	app.route('/home')
	.post(verifyUser);

}

export default routes;
