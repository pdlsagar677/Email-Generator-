// In-memory data stores
export const usersMap = new Map(); // email → { email, username, passwordHash, verified }
export const otpMap = new Map();   // email → { otp, type, expiresAt }
