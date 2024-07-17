import exp from 'constants';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI 

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log('Already connecting...');
    return;
  }

  if (connectionState === 2) {
    console.log('connecting...');
    return;
  }


  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: 'next14restapi',
      bufferCommands: true, 
    });
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Error connecting to MongoDB', error);
  }



};

export default connect;