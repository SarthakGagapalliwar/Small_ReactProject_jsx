import { useEffect, useRef, useState } from "react";

function OtpInput() {
  const OTP_LEN = 4;
  const [otp, setOtp] = useState(Array(OTP_LEN).fill(""));
  const inputRefs = useRef([]);
  const [error, setError] = useState("");

  //   useEffect(()=>{
  //     inputRefs.current=inputRefs.current.slice(0,OTP_LEN);

  // },[])

  const handleOtpChange = (getcurrentInutINdex, getcurrentvalue) => {
    if (isNaN(getcurrentvalue)) {
      setError("❌ Input is not a number!");
      return
    } else {
      setError(""); // clear error if valid
    }

    if (getcurrentInutINdex.length > 1) {
      getcurrentvalue = getcurrentvalue.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[getcurrentInutINdex] = getcurrentvalue;
    setOtp(newOtp);

    // if (newOtp.some((ch) => ch !== "" && isNaN(Number(ch)))) {
    //   setError("❌ OTP must contain only numbers!");
    //   return;
    // } else {
    //   setError(""); // clear error if valid
    // }

    if (getcurrentvalue && getcurrentInutINdex < OTP_LEN - 1) {
      inputRefs.current[getcurrentInutINdex + 1]?.focus();
    }
  };

  const handleKeyDown = (inputIndex, event) => {
    if (event.key === "Backspace" && inputIndex > 0 && otp[inputIndex] === "") {
      inputRefs.current[inputIndex - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center pt-[100px] min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-700">OTP Input</h1>

      <div className="flex mt-10 justify-center gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) => handleOtpChange(index, event.target.value)}
            className="w-14 h-14 text-center text-xl font-medium border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
            autoFocus={index === 0}
            onKeyDown={(event) => handleKeyDown(index, event)}
            ref={(el) => {
              inputRefs.current[index] = el; //ask for the help
            }}
          />
        ))}
      </div>
      {error && <h1 className="text-red-600 font-bold">{error}</h1>}

      <button
        className="mt-8 px-8 py-3 text-lg font-medium rounded-xl shadow-md 
             transition-all duration-200
             bg-black text-white 
             hover:bg-gray-800 focus:outline-none 
             focus:ring-2 focus:ring-offset-2 focus:ring-black
             disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
        disabled={otp.some((digit) => digit === "")}
      >
        Verify
      </button>
    </div>
  );
}

export default OtpInput;
