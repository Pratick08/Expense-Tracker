const mongoose=require('mongoose');
const dns=require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const dotenv=require('dotenv');
//lode env config
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);  
  } 
}
module.exports=connectDB;