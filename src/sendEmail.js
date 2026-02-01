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

    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.log("Preview URL:", preview);

    return info.messageId;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
