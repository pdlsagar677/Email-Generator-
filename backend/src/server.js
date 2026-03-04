import express from "express";
import cors from "cors";
import { sendEmail } from "./sendEmail.js";
import { otpTemplate } from "./otpTemplate.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api", authRoutes);

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

app.listen(12345, () => {
  console.log("Server is running on 12345");
});
