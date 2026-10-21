/** @authour Maher
 * @file Contact.jsx
 * @description Contact & Inquiry Form component featuring validation, OTP handling,
 * email suggestions, dynamic inquiry hints, submission flow, and accessible form UI.
 * Provides full backend-integrated inquiry workflow.
 */


import React, { useState, useEffect } from "react";
import axios from "axios";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    inquiryType: "",
    message: "",
    otp: "",
    otpVerified: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Global form error message (top red text)
  const [formError, setFormError] = useState("");

  // submit button shake offset (for error feedback)
  const [shakeOffset, setShakeOffset] = useState(0);

  // ------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // auto-select inquiry type based on email domain (non-destructive)
  useEffect(() => {
    const email = formData.email.toLowerCase();
    if (!email || formData.inquiryType) return;

    let inferred = "";

    if (email.endsWith("@smu.ca")) {
      inferred = "Site Visit Request";
    } else if (email.includes("funeral")) {
      inferred = "Burial Service Query";
    } else if (email.endsWith("@gmail.com")) {
      inferred = "General Inquiry";
    }

    if (inferred && formData.inquiryType !== inferred) {
      setFormData((prev) => ({ ...prev, inquiryType: inferred }));
    }
  }, [formData.email, formData.inquiryType]);

  // small shake animation for submit button when validation fails
  const triggerShake = () => {
    const sequence = [0, -4, 4, -4, 4, 0];
    let i = 0;
    const interval = setInterval(() => {
      setShakeOffset(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 40);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // ------------------------------------------------------------
  // OTP
  // ------------------------------------------------------------
  const handleSendOtp = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Enter a valid email before sending OTP." });
      return;
    }

    try {
      setSendingOtp(true);
      const res = await axios.post("/api/send-otp", { email: formData.email });
      setOtpSent(true);
      alert(res.data.message);
    } catch (err) {
      alert("Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!formData.otp) {
      setErrors({ ...errors, otp: "Enter the OTP before verifying." });
      return;
    }

    try {
      setVerifyingOtp(true);
      const res = await axios.post("/api/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      setFormData({ ...formData, otpVerified: true });
      alert(res.data.message);
    } catch (err) {
      alert("Incorrect OTP.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ------------------------------------------------------------
  // Email domain suggestions (safe helper)
  // ------------------------------------------------------------
  const COMMON_DOMAINS = ["smu.ca", "gmail.com", "outlook.com", "icloud.com", "hotmail.com"];

  const getEmailSuggestions = (email) => {
    if (!email.includes("@")) return [];
    const [local, domainFragment] = email.split("@");
    if (!domainFragment || domainFragment.includes(".")) return [];
    return COMMON_DOMAINS.filter((d) =>
      d.toLowerCase().startsWith(domainFragment.toLowerCase())
    ).map((d) => ({ local, domain: d }));
  };

  const emailSuggestions = getEmailSuggestions(formData.email);

  const applyEmailSuggestion = (local, domain) => {
    const nextEmail = `${local}@${domain}`;
    setFormData({ ...formData, email: nextEmail });
    if (errors.email) setErrors({ ...errors, email: "" });
  };

  // ------------------------------------------------------------
  // Submit
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear previous global error
    setFormError("");

    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email))
      newErrors.email = "Enter a valid email address.";

    // OTP is OPTIONAL now – no required check here

    if (!formData.inquiryType)
      newErrors.inquiryType = "Please choose an inquiry type.";

    // Message is OPTIONAL:
    // only validate if user typed something, and then only for length > 500
    if (formData.message && formData.message.length > 500) {
      newErrors.message = "Message exceeds 500 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      setFormError("Please fill in all required fields correctly before submitting the form.");
      triggerShake();
      return; // stop submission if any required field is wrong
    }

    try {
      setSubmitting(true);
      const res = await axios.post("/api/send-confirmation", {
        email: formData.email,
        fullName: formData.fullName,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });

      alert(res.data.message);
      setSubmitted(true);

      // Reset
      setFormData({
        fullName: "",
        email: "",
        inquiryType: "",
        message: "",
        otp: "",
        otpVerified: false,
      });
      setOtpSent(false);
      setErrors({});
      setFormError("");
    } catch (err) {
      alert("Failed to submit form.");
    } finally {
      setSubmitting(false);
    }
  };

  // ------------------------------------------------------------
  // Clear Form (non-destructive helper)
  // ------------------------------------------------------------
  const handleClear = () => {
    setFormData({
      fullName: "",
      email: "",
      inquiryType: "",
      message: "",
      otp: "",
      otpVerified: false,
    });
    setErrors({});
    setSubmitted(false);
    setOtpSent(false);
    setFormError("");
  };

  // ------------------------------------------------------------
  // Inquiry type helper text (tooltip-style)
  // ------------------------------------------------------------
  const renderInquiryHint = () => {
    if (formData.inquiryType === "General Inquiry") {
      return "For general questions about the woodland site or conservation work.";
    }
    if (formData.inquiryType === "Site Visit Request") {
      return "Use this if you would like to arrange a visit to the site.";
    }
    if (formData.inquiryType === "Burial Service Query") {
      return "Use this for questions about natural burial services and availability.";
    }
    return "";
  };

  const inquiryHint = renderInquiryHint();

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Contact & Inquiry Form
      </h1>

      {/* Success Banner */}
      {submitted && (
        <div className="mb-6 p-4 rounded-md bg-green-100 text-green-800 border border-green-300">
          Your form has been submitted successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-10 bg-white dark:bg-neutral-900 shadow-lg rounded-xl p-6 transition-opacity duration-500"
      >
        {/* GLOBAL ERROR MESSAGE */}
        {formError && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-300">
            <p className="text-red-600 text-sm">{formError}</p>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* Section A: Personal Information */}
        {/* ------------------------------------------------------------ */}
        <div className="transition-opacity duration-500">
          <h2 className="text-xl font-semibold mb-3">Personal Information</h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Full Name <span className="italic text-neutral-400 ml-1">(Required)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                👤
              </span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-2 pl-9 rounded-md border ${
                  errors.fullName
                    ? "border-red-500"
                    : formData.fullName
                    ? "border-green-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block font-medium mb-1">
              Email Address <span className="italic text-neutral-400 ml-1">(Required)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                ✉️
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 pl-9 rounded-md border ${
                  errors.email
                    ? "border-red-500"
                    : formData.email
                    ? "border-green-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

            {/* Email domain suggestions */}
            {emailSuggestions.length > 0 && (
              <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-200">
                <span className="mr-2">Suggestions:</span>
                {emailSuggestions.map(({ local, domain }) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => applyEmailSuggestion(local, domain)}
                    className="inline-flex items-center px-2 py-0.5 mr-2 mt-1 rounded-full border border-neutral-300 dark:border-neutral-600 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {local}@{domain}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={sendingOtp}
              className="mt-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-md"
            >
              {sendingOtp ? "Sending..." : "Send OTP"}
            </button>
          </div>

          {/* OTP Entry */}
          {otpSent && (
            <div className="mb-4 mt-3 p-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
              <label className="block font-medium mb-1">Enter OTP</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  🔑
                </span>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className={`w-full p-2 pl-9 rounded-md border ${
                    errors.otp
                      ? "border-red-500"
                      : formData.otp
                      ? "border-green-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500`}
                />
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
              )}

              <button
                type="button"
                onClick={verifyOtp}
                disabled={verifyingOtp}
                className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-md"
              >
                {verifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>

              {formData.otpVerified && (
                <p className="text-green-600 text-sm mt-1">
                  ✔ Email verified successfully.
                </p>
              )}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Section B: Inquiry Details */}
        {/* ------------------------------------------------------------ */}
        <div className="transition-opacity duration-500">
          <h2 className="text-xl font-semibold mb-3">Inquiry Details</h2>

          {/* Inquiry Type */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Inquiry Type <span className="italic text-neutral-400 ml-1">(Required)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                📂
              </span>
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className={`w-full p-2 pl-9 rounded-md border ${
                  errors.inquiryType
                    ? "border-red-500"
                    : formData.inquiryType
                    ? "border-green-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500`}
              >
                <option value="">Select an option</option>
                <option value="General Inquiry">📌 General Inquiry</option>
                <option value="Site Visit Request">🌲 Site Visit Request</option>
                <option value="Burial Service Query">⚰ Burial Service Query</option>
              </select>
            </div>
            {errors.inquiryType && (
              <p className="text-red-500 text-sm mt-1">{errors.inquiryType}</p>
            )}

            {/* Inquiry type hint (tooltip-style text) */}
            {inquiryHint && (
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                {inquiryHint}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-1">
              Message (500 characters max)
              <span className="italic text-neutral-400 ml-1">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 pointer-events-none">
                📝
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                maxLength="500"
                rows="5"
                style={{ resize: "vertical", minHeight: "110px" }}
                className={`w-full p-2 pl-9 rounded-md border ${
                  errors.message
                    ? "border-red-500"
                    : formData.message
                    ? "border-green-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500`}
              ></textarea>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">
                {errors.message && (
                  <span className="text-red-500">{errors.message}</span>
                )}
              </span>
              <span
                className={`${
                  formData.message.length > 450
                    ? "text-red-500"
                    : "text-neutral-500"
                }`}
              >
                {formData.message.length}/500
              </span>
            </div>

            {/* Live Preview of Message */}
            <div className="mt-4 border border-neutral-200 dark:border-neutral-700 rounded-md p-3 bg-neutral-50 dark:bg-neutral-800 text-sm">
              <p className="font-semibold mb-1">Preview of your message:</p>
              <div className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-100 min-h-[40px]">
                {formData.message.trim()
                  ? formData.message
                  : "Your message preview will appear here as you type."}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Section C: Submit */}
        {/* ------------------------------------------------------------ */}
        <div className="pt-2 transition-opacity duration-500 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={submitting}
            style={{ transform: `translateX(${shakeOffset}px)` }}
            className="w-full sm:w-auto sm:flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold shadow"
          >
            {submitting ? "Submitting..." : "Submit Inquiry"}
          </button>

          {/* Clear Form button */}
          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto sm:flex-none py-3 rounded-lg border border-neutral-400 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
