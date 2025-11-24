import React from "react";
import { useState } from "react";

const PaymentForm = ({ plan, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (
      !formData.name ||
      !formData.cardNumber ||
      !formData.expiry ||
      !formData.cvv ||
      !formData.email
    ) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus({
        type: "success",
        message: `Payment for ${plan?.title || "the selected plan"} received!`,
      });
      if (onSuccess) {
        onSuccess(plan);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl shadow-2xl p-10">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300 text-center">
            Secure Checkout
          </p>
          <h1 className="text-4xl font-semibold mt-3 text-center">
            Complete your payment
          </h1>
          {plan && (
            <div className="mt-6 bg-slate-800/60 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{plan.title} Plan</p>
                <p className="text-slate-400 text-sm">Billed monthly</p>
              </div>
              <p className="text-3xl font-bold">{plan.price}</p>
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Name on card</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Alex Johnson"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Email receipt</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="alex@email.com"
            />
          </label>

          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-slate-300">Card number</span>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-300">Expiry</span>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-slate-300">CVV</span>
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="123"
                  maxLength={4}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 font-semibold shadow-lg shadow-pink-500/30 transition hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Pay now"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-200 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
          </div>
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

export default PaymentForm;
