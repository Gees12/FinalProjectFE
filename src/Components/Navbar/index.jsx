import React from "react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "../../Constants";

const Navbar = ({ openSignup, openSignin, isLoggedIn, subscriptionStatus }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-tight">VirtualR</span>
          </div>

          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {isLoggedIn ? (
              <span className="py-2 px-3 border border-emerald-500/50 text-emerald-200 rounded-md">
                You are logged in
                {subscriptionStatus ? ` (${subscriptionStatus})` : ""}
              </span>
            ) : (
              <>
                <button
                  onClick={openSignin}
                  className="py-2 px-3 border rounded-md"
                >
                  Sign In
                </button>
                <button
                  onClick={openSignup}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 py-2 px-3 rounded-md"
                >
                  Create an account
                </button>
              </>
            )}
          </div>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              {isLoggedIn ? (
                <span className="py-2 px-3 border border-emerald-500/50 text-emerald-200 rounded-md">
                  You are logged in
                  {subscriptionStatus ? ` (${subscriptionStatus})` : ""}
                </span>
              ) : (
                <>
                  <button
                    onClick={openSignin}
                    className="py-2 px-3 border rounded-md"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={openSignup}
                    className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                  >
                    Create an account
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
