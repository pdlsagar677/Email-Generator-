Exactly — you **just need to make a setting in your Gmail account**, and then your code will work perfectly. ✅

Here’s the **exact thing you need to do**:

---

## Step 1: Enable 2-Step Verification

1. Go to **[Google Account → Security](https://myaccount.google.com/security)**
2. Under **“Signing in to Google”**, find **2-Step Verification**
3. Turn it **ON** (follow the prompts)

> This is required before you can create an App Password.

---

## Step 2: Create an App Password

1. In the same **Security** section, click **App passwords**
2. Select:

   * **App:** Mail
   * **Device:** Other (Custom name) → type e.g., `NodeMailer`
3. Click **Generate**
4. Copy the **16-character password** that Google gives you

> This is the password you’ll use in `.env` for `EMAIL_PASS`.

---

## Step 3: Update Your `.env` File

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_char_app_password
```

* Replace `yourgmail@gmail.com` with your Gmail
* Replace `your_16_char_app_password` with the App Password you just generated

---

## Step 4: Restart Your Server

```bash
node src/server.js
```

✅ Now your server can **send real emails** to any inbox

---

## Step 5: Test with Postman

**POST** → `http://localhost:3000/send-email`

Body:

```json
{
  "email": "receiver_email@gmail.com"
}
```

* You should **receive the OTP in your inbox**
* No more `EBADNAME` errors

---

If you want, I can **give you a step-by-step visual guide showing exactly how to create the App Password** so you don’t get stuck.

Do you want me to do that?
