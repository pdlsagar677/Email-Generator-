import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usersMap, otpMap } from "../store.js";
import { sendEmail } from "../sendEmail.js";
import { otpTemplate } from "../otpTemplate.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email, username, otp) {
  console.log(`[DEV] OTP for ${email}: ${otp}`);
  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    html: otpTemplate({ otp, username }),
  });
}

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ success: false, message: "Email, username, and password are required" });
    }

    if (usersMap.has(email)) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    usersMap.set(email, { email, username, passwordHash, verified: false });

    const otp = generateOtp();
    otpMap.set(email, { otp, type: "signup", expiresAt: Date.now() + 5 * 60 * 1000 });

    await sendOtpEmail(email, username, otp);

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = usersMap.get(email);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { email: user.email, username: user.username, verified: user.verified },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /api/verify-otp
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, type } = req.body;

    if (!email || !otp || !type) {
      return res.status(400).json({ success: false, message: "Email, OTP, and type are required" });
    }

    const stored = otpMap.get(email);
    if (!stored) {
      return res.status(400).json({ success: false, message: "No OTP found. Please request a new one" });
    }

    if (Date.now() > stored.expiresAt) {
      otpMap.delete(email);
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
    }

    if (stored.otp !== otp || stored.type !== type) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    otpMap.delete(email);

    const user = usersMap.get(email);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (type === "signup") {
      user.verified = true;
    }

    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Verification successful",
      token,
      user: { email: user.email, username: user.username, verified: user.verified },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET /api/me
router.get("/me", authenticateToken, (req, res) => {
  const user = usersMap.get(req.user.email);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({
    success: true,
    user: { email: user.email, username: user.username, verified: user.verified },
  });
});

export default router;
