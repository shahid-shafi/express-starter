import mongoose, { ConnectOptions } from 'mongoose';
import { DATABASE_URL } from './env.config';

const connectDatabase = () => {
    mongoose
        .connect(DATABASE_URL, { autoIndex: true } as ConnectOptions)
        .then(() => {
            console.log('✅ DataBase Connected Successfully...');
        })
        .catch((error) => console.log('❌ Error:', error));
};

export default connectDatabase;
