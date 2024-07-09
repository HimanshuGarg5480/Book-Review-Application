import React, { useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ email, setOtpFormShow, otpFormShow }) => {
  const [otpBlock1, setOtpBlock1] = useState("");
  const [otpBlock2, setOtpBlock2] = useState("");
  const [otpBlock3, setOtpBlock3] = useState("");
  const [otpBlock4, setOtpBlock4] = useState("");

  const navigate=useNavigate();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const otp = `${otpBlock1}${otpBlock2}${otpBlock3}${otpBlock4}`;
      console.log({ email, otp });
      const response = await axios.post(
        "http://localhost:8000/api/auth/verify-otp",
        { email, otp }
      );

      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate('/completeProfile')
    } catch (error) {
      console.log(error);
    }
  };
  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/resend-otp",
        { email }
      );
      if (response.data.userId) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      
      <div className="h-screen w-full absolute top-0 bg-black bg-opacity-60">
        <div className="flex justify-center items-center h-full">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <div className="text-black text-4xl font-bold flex justify-end">
              <RxCross2
                onClick={() => {
                  setOtpFormShow(!otpFormShow);
                }}
              />
            </div>
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
              <p className="text-[15px] text-slate-500">
                Enter the 4-digit verification code that was sent to your Email
                ID.
              </p>
            </header>
            <form id="otp-form">
              <div className="flex items-center justify-center gap-3">
                <input
                  type="text"
                  value={otpBlock1}
                  onChange={(e) => {
                    e.preventDefault();
                    setOtpBlock1(e.target.value);
                  }}
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  pattern="\d*"
                  maxLength="1"
                />
                <input
                  type="text"
                  value={otpBlock2}
                  onChange={(e) => {
                    e.preventDefault();
                    setOtpBlock2(e.target.value);
                  }}
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                />
                <input
                  type="text"
                  value={otpBlock3}
                  onChange={(e) => {
                    e.preventDefault();
                    setOtpBlock3(e.target.value);
                  }}
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                />
                <input
                  type="text"
                  value={otpBlock4}
                  onChange={(e) => {
                    e.preventDefault();
                    setOtpBlock4(e.target.value);
                  }}
                  className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                />
              </div>
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  onClick={handleVerifyOTP}
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                >
                  Verify Account
                </button>
              </div>
            </form>
            <div className="text-sm text-slate-500 mt-4">
              Didn't receive code?{" "}
              <div
                onClick={handleResendOtp}
                className="font-medium text-indigo-500 hover:text-indigo-600"
              >
                Resend
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
