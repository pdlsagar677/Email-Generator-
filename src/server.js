import express from "express";
import { sendEmail } from "./sendEmail.js";
import { otpTemplate } from "./otpTemplate.js";

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { email, username } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      html: otpTemplate({ otp, username }),
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

