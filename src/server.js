import express from "express";
import { sendEmail } from "./sendEmail.js";

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendEmail({
      to: email,
      subject: "your otp code ",
      html: `
        <h2>Login Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
        `,
    });
    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
app.listen(3000,()=>{
    console.log("server is running in 3000");
});

