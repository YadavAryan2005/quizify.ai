const mongoose =require("mongoose");
require("dotenv").config();
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected")
    } catch (error) {
        console.log(error,"not connected");
    }
}

module.exports=connectDb