import React from "react";
import { useState } from "react";

const API_URL = "http://localhost:3002/users";

const initialFormState = {
  email: "",
  password: "",
};

const SignInForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!formData.email || !formData.password) {
      setStatus({ type: "error", message: "Email and password are required." });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_URL}?email=${encodeURIComponent(formData.email.trim().toLowerCase())}`
      );

      if (!response.ok) {
        throw new Error("Unable to reach the server. Is json-server running?");
      }

      const users = await response.json();
      const matchedUser = users.find(
        (user) =>
          user.email === formData.email.trim().toLowerCase() &&
          user.password === formData.password
      );

      if (!matchedUser) {
        setStatus({ type: "error", message: "Invalid email or password." });
        return;
      }

      setStatus({
        type: "success",
        message: `Welcome back, ${matchedUser.fullName || "friend"}!`,
      });
      setFormData(initialFormState);
      if (onSuccess) {
        onSuccess(matchedUser);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl p-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            Welcome back
          </p>
          <h1 className="text-4xl font-semibold mt-3 ">Sign in</h1>
          <p className="text-slate-400 mt-3">
            Access your account using the email and password you registered with.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="you@email.com"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/30 transition hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {status.message && (
          <p
            className={`mt-6 text-center ${
              status.type === "error" ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignInForm;