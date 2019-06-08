const mongoose = require('mongoose');
const config = require('config');
const { host, resource, query, name } = config.get('mongo.uri');
const dbCredentials = config.get('mongo.credentials');

const settings = {
	...dbCredentials,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
};

const dbURI = `${name}://${host}/${resource}${query}`;

const connectDB = () =>
	console.log('Trying to connect to mongodb [URI] ', dbURI);

mongoose
	.connect(dbURI, settings)
	.then(() => console.log('MoongoDB Connected'))
	.catch(err => console.log('MoongoDB not connected', err));

module.exports = {
	connectDB,
	settings,
	dbURI
};
