import mongoose, { Mongoose } from 'mongoose';
import config from './config';

export default (callback: (db: Mongoose) => void) => {
    mongoose.connect(config.mongoUrl)
        .then((db) => {
            console.log('Connected to MongoDB');
            // Your further Mongoose-related code goes here
            callback(db);
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};
