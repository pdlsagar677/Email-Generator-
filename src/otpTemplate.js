export function otpTemplate({ otp, username }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 50px auto;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #333333;
      }
      p {
        font-size: 16px;
        color: #555555;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #1a73e8;
        letter-spacing: 5px;
      }
      .footer {
        font-size: 12px;
        color: #999999;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>OTP Verification</h2>
      <p>Hi ${username || "User"},</p>
      <p>Your OTP code is:</p>
      <p class="otp">${otp}</p>
      <p>This OTP expires in 5 minutes.</p>
    </div>
  </body>
  </html>
  `;
}
