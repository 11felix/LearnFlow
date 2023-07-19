import 'dotenv/config';
import mongoose from "mongoose";

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = "LearnFlow";
const ConnectDb = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${userName}:${password}@database1.ggpnfpk.mongodb.net/${dbName}
        ?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(conn.connection.host);
  } catch (err) {
    console.log(err);
  }
};

// module.exports=ConnectDb;
export default ConnectDb;