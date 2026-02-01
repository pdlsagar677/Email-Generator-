export function otpTemplate({ otp, username }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
      /* ALL STYLES MUST BE INLINE OR IN THIS STYLE TAG */
      body {
        font-family: 'Courier New', Courier, monospace, sans-serif;
        background-color: #0f172a;
        margin: 0;
        padding: 20px;
        color: #d1d5db;
      }
      .container {
        max-width: 500px;
        margin: 0 auto;
        background-color: #1e293b;
        border: 2px solid #059669;
        border-radius: 10px;
        overflow: hidden;
      }
      .header {
        background-color: #111827;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #374151;
      }
      .dots {
        display: flex;
        gap: 8px;
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .dot-red { background-color: #ef4444; }
      .dot-yellow { background-color: #f59e0b; }
      .dot-green { background-color: #10b981; }
      .title {
        color: #10b981;
        font-size: 14px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
      }
      .command {
        color: #10b981;
        margin-right: 8px;
        font-weight: bold;
      }
      .text-blue { color: #60a5fa; }
      .text-green { color: #10b981; }
      .text-cyan { color: #22d3ee; }
      .text-yellow { color: #f59e0b; }
      .text-gray { color: #9ca3af; }
      .indent {
        margin-left: 24px;
        margin-top: 8px;
      }
      .otp-box {
        background-color: #000000;
        border: 1px solid #374151;
        border-radius: 8px;
        padding: 25px;
        margin: 25px 0;
        text-align: center;
      }
      .otp {
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 8px;
        color: #10b981;
        margin: 20px 0;
        font-family: monospace;
      }
      .footer {
        margin-top: 25px;
        padding-top: 20px;
        border-top: 1px solid #374151;
        font-size: 12px;
        color: #9ca3af;
      }
      .status {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .status-active {
        background-color: #10b981;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Terminal Header -->
      <div class="header">
        <div class="dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <div class="title">▲ SECURE VERIFICATION TERMINAL</div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <!-- System Status -->
        <div>
          <div><span class="command">$</span> <span class="text-blue">system_status</span> --secure --verification</div>
          <div class="indent">
            <div>> <span class="status status-active"></span>SECURITY SYSTEM: <span class="text-green">ACTIVE</span></div>
            <div>> ENCRYPTION: <span class="text-green">AES-256 ✓</span></div>
            <div>> CONNECTION: <span class="text-green">SECURED ✓</span></div>
          </div>
        </div>
        
        <!-- User Greeting -->
        <div style="margin-top: 25px;">
          <div><span class="command">$</span> <span class="text-blue">greet_user</span> --name "${username || 'USER'}"</div>
          <div class="indent">
            <div>> HELLO, <span class="text-cyan">${username || 'SECURE_USER'}</span></div>
            <div>> VERIFICATION SEQUENCE INITIATED...</div>
          </div>
        </div>
        
        <!-- OTP Display -->
        <div style="margin-top: 25px;">
          <div><span class="command">$</span> <span class="text-blue">generate_otp</span> --expires 300s</div>
          <div class="otp-box">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 12px;">
              <span class="text-gray">[ENCRYPTED_TOKEN]</span>
              <span class="text-yellow">VALID FOR 5:00</span>
            </div>
            <div class="otp">${otp}</div>
     <div style="color: #6b7280; font-size: 14px; margin-top: 10px;">
  ${String(otp).split('').map(() => '▮').join(' ')}
</div>


          </div>
          <div class="indent">
            <div>> TOKEN GENERATED: <span class="text-green">SUCCESS</span></div>
            <div>> EXPIRES: <span class="text-yellow">5 MINUTES</span></div>
          </div>
        </div>
        
        <!-- Instructions -->
        <div style="margin-top: 25px;">
          <div><span class="command">$</span> <span class="text-blue">instructions</span></div>
          <div class="indent">
            <div>> ENTER THIS CODE IN THE VERIFICATION FIELD</div>
            <div>> DO NOT SHARE WITH ANYONE</div>
            <div>> TOKEN SELF-DESTRUCTS AFTER 300s</div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div><span class="command">$</span> <span class="text-blue">system_security</span> --status</div>
          <div class="indent">
            <div>> SECURITY LEVEL: <span class="text-green">MAXIMUM</span></div>
            <div>> SESSION: <span class="text-green">ENCRYPTED_END_TO_END</span></div>
          </div>
          <div style="margin-top: 15px; text-align: center;">
            © ${new Date().getFullYear()} SecureAuth System v2.1
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}