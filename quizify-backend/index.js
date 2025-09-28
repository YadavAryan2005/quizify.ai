require("dotenv").config();
const express=require("express");
const User=require("./modal/user");
const jwt =require("jsonwebtoken");
const nodemailer=require("nodemailer");
const connectDb=require("./db/connectDb");
const cors=require("cors");
const runGemini = require("./utils/gemini");
const authMiddleware=require("./middleware/auth");
const app=express();
app.use(express.json());
app.use(cors());

connectDb();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
       user: process.env.GMAIL_USER, 
    pass:process.env.GMAIL_APP_PASS, 
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}
app.get("/",(req,res)=>{
    res.send("hellow world");
})

app.post("/user/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    console.log(otp,"otp here");
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
      html: `<h2>Your OTP is: <b>${otp}</b></h2>`,
    };

    await transporter.sendMail(mailOptions);
    await User.findOneAndUpdate(
      { email },
      { otp },
      { new: true, upsert: true } 
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const token = jwt.sign(
      { userId: userData._id, email: userData.email }, 
      process.env.JWT_SECRET,
    );

    return res.json({
      success: true,
      message: "Login success",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/generateQuiz",async(req,res)=>{
  try {
    const {topic,noOfQuestion}=req.body;
    const response=await runGemini(topic,noOfQuestion);
    const generatedQuiz=await JSON.parse(response
      ?.text().replace(/```json\n?|\n```/g, ""));
    res.json({
      success:true,
      generatedQuiz:generatedQuiz
    })
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({success:false,message:"Server error"});
  }
})

app.listen(5000);