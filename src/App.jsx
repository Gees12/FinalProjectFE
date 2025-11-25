import React from "react";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import Workflow from "./Components/Workflow";
import Pricing from "./Components/Pricing";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";
import Signup from "./Pages/SignUp";
import SignupForm from "./Pages/SignUpForm";
import SignInForm from "./Pages/SignInForm";
import PaymentForm from "./Pages/Payment";

const ModalShell = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/80 backdrop-blur">
    <div className="absolute inset-0" onClick={onClose} />
    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close dialog"
        className="absolute right-6 top-4 text-xs font-semibold tracking-[0.2em] uppercase text-slate-300 hover:text-white"
      >
        Close
      </button>
      <div className="pt-16">{children}</div>
    </div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenSignupModal = () => {
    setShowSigninModal(false);
    setShowSignupModal(true);
  };

  const handleOpenSigninModal = () => {
    setShowSignupModal(false);
    setShowSigninModal(true);
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowSigninModal(true);
  };

  const handleSigninSuccess = (user) => {
    setIsLoggedIn(true);
    setSubscriptionStatus(user?.subscriptionTier || "Member");
    setShowSigninModal(false);
  };

  const handleOpenPayment = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (plan) => {
    setIsLoggedIn(true);
    setSubscriptionStatus(`${plan?.title || "Custom"} Plan`);
    setShowPaymentModal(false);
  };

  const closePaymentModal = () => {
    setSelectedPlan(null);
    setShowPaymentModal(false);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar
        openSignup={handleOpenSignupModal}
        openSignin={handleOpenSigninModal}
        isLoggedIn={isLoggedIn}
        subscriptionStatus={subscriptionStatus}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-12">
        <section id="hero-section" className="py-12 lg:py-20">
          <HeroSection />
        </section>

        <section id="features-section">
          <FeatureSection />
        </section>

        <section id="workflow-section">
          <Workflow />
        </section>

        <section id="pricing-section" className="mt-20">
          <Pricing openPayment={handleOpenPayment} />
        </section>
        
        <section id="testimonials-section" className="mt-20">
          <Testimonials />
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-12">
        <Footer />
      </footer>

      {showSignupModal && (
        <ModalShell onClose={() => setShowSignupModal(false)}>
          <SignupForm onSuccess={handleSignupSuccess} />
        </ModalShell>
      )}

      {showSigninModal && (
        <ModalShell onClose={() => setShowSigninModal(false)}>
          <SignInForm onSuccess={handleSigninSuccess} />
        </ModalShell>
      )}

      {showPaymentModal && (
        <ModalShell onClose={closePaymentModal}>
          <PaymentForm plan={selectedPlan} onClose={closePaymentModal} onSuccess={handlePaymentSuccess} />
        </ModalShell>
      )}
    </div>
  );
}

export default App;