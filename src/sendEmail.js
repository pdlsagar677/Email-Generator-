import { transporter } from "./mailer.js";
import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: `"Auth System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent");
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

  return info.messageId;
}
