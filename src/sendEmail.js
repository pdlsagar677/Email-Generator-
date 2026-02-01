import { transporter } from "./mailer.js";
import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,  
    });

    console.log("Email sent:", info.messageId);
  info.previewUrl = nodemailer.getTestMessageUrl(info) || null;

    return info; 

  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
