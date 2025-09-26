import React, { useState } from "react";
import { Mail, Shield, ArrowRight, X, Sparkles, Brain } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email.trim()) return;
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/user/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setIsLoading(false);
        setStep("otp");
      }
    } catch (error) {
      console.log(error);
       setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
          if (!otp.trim()) return;
    setIsLoading(true);
    const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,otp}),
      });
      const data = await response.json();
      if(data.token)
      {
        localStorage.setItem("token",data.token);
        onLoginSuccess()
      }
    } catch (error) {
      console.log(error);
    }finally{
    setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Brain className="w-8 h-8 text-white" />
              <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold">Quizify.ai</span>
          </div>

          {step === "email" ? (
            <>
              <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-white/80">Enter your email to get started</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
              <p className="text-white/80">We sent a code to {email}</p>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!email.trim() || isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Verification Code
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-800 text-center text-2xl font-mono tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Didn't receive the code?
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-700 font-medium ml-1"
                    onClick={() => {
                      /* Resend logic */
                    }}
                  >
                    Resend
                  </button>
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={!otp.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:border-purple-300 hover:text-purple-600 transition-all duration-200 font-medium"
                >
                  Back to Email
                </button>
              </div>
            </form>
          )}

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
