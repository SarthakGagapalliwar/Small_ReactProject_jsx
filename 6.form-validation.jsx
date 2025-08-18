import { useState } from "react";

function FormValidation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being typed
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newError = {};

    // Name validation
    if (!form.name.trim()) {
      newError.name = "Name is required";
    } else if (form.name.trim().length < 3) {
      newError.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!form.email.trim()) {
      newError.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newError.email = "Invalid email format";
    }

    // Age validation
    if (!form.age) {
      newError.age = "Age is required";
    } else if (isNaN(form.age) || form.age <= 0) {
      newError.age = "Age must be a valid positive number";
    }

    return newError;
  };

  const handleformSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      alert("Form submitted successfully ✅");
      // Here you could send `form` data to backend
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[100px] min-h-screen bg-gray-50">
      <form
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow space-y-6"
        onSubmit={handleformSubmit}
      >
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {error.name && <p className="text-red-600 text-sm">{error.name}</p>}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
        </div>

        {/* Age Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your age"
          />
          {error.age && <p className="text-red-600 text-sm">{error.age}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg 
                     hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {submitted && (
          <p className="text-green-600 text-center mt-4">Form submitted successfully ✅</p>
        )}
      </form>
    </div>
  );
}

export default FormValidation;
