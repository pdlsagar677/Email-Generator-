import express from "express";
import { sendEmail } from "./sendEmail.js";
import { otpTemplate } from "./otpTemplate.js";

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { email, username } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    const info = await sendEmail({
      to: email,
      subject: "Your OTP Code",
      html: otpTemplate({ otp, username }),
    });

    const previewUrl = info.messageId.includes("@ethereal.email")
      ? info.previewUrl
      : null;

    res.json({
      success: true,
      message: "Email sent successfully",
      otp,
      messageId: info.messageId,
      previewUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
