import mongoose from "mongoose";

const connection = { isConnected: false };

async function connectDb(): Promise<void> {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("DB Connected");
  connection.isConnected = db.connections[0].readyState !== 0;
}

export default connectDb;
