import React, { useState } from "react";

const Login = ({handleLogin}) => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');


  const submitHandler=(e)=>{
      e.preventDefault()

      handleLogin(email,password)
      setEmail('');
      setPassword('');
      
  }


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="bg-white shadow-xl rounded-2xl w-[22rem] p-8 ">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Login
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-5"
          onSubmit={(e)=>{
            submitHandler(e);
          }}  
        >
          {/* Email */}
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            required
            placeholder="Enter email"
            className="border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

          {/* Password */}
          <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            required
            placeholder="Enter password"
            className="border border-gray-300 rounded-lg px-4 py-2 text-black text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

          {/* Login button */}
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg py-2 transition duration-200 shadow-md"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
