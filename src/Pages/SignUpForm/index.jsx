import React from "react";
import { useState } from "react";

const API_URL = "http://localhost:3000/users";

const initialFormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = ({ onSuccess }) => {
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

    if (!formData.fullName || !formData.email || !formData.password) {
      setStatus({ type: "error", message: "Please fill out all fields!" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      setStatus({ type: "success", message: "Account created successfully! Please sign in." });
      setFormData(initialFormState);
      if (onSuccess) {
        onSuccess();
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
      <div className="w-full max-w-2xl bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl p-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
            Join us
          </p>
          <h1 className="text-4xl font-semibold mt-3 ">Create an account</h1> 
          
          <p className="text-slate-400 mt-3">
            Enter your details below and become part of the community in a few
            clicks.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Full name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Alex Johnson"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="alex@email.com"
              />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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

            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 font-semibold shadow-lg shadow-pink-500/30 transition hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
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

export default SignupForm;