import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import { localStrategy } from 'passport-local';
import routes from './src/routes/routes';

const app = express();
const PORT = process.env.PORT || 3000;

// setting up mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb',{
	//useMongoClient: true
});

//body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get("/", (req, res) =>{
	res.send(`Hello`);
});

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});

