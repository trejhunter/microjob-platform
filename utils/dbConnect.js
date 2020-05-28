import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) return;

  const db = await mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log('MongoDB connection established');
    }
  );

  connection.isConnected = db.connections[0].readyState;
  console.log(`Database connection status: ${connection.isConnected}`);
}

export default dbConnect;
