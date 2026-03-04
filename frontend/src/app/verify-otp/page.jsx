"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function VerifyOtpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("otpEmail");
    const storedType = sessionStorage.getItem("otpType");
    if (!storedEmail || !storedType) {
      router.replace("/login");
      return;
    }
    setEmail(storedEmail);
    setType(storedType);
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp, type }),
      });
      sessionStorage.removeItem("otpEmail");
      sessionStorage.removeItem("otpType");
      login(data.token, data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!email) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-emerald-400">Verify OTP</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Enter the 6-digit code sent to{" "}
            <span className="text-white">{email}</span>
          </p>
          <p className="text-gray-500 mt-1 text-xs">
            Check your backend console for the OTP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">OTP Code</label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="000000"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </main>
  );
}
