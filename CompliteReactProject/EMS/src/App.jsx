import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./components/context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null); // "admin" | "employee" | null
  const [loggedInUserData, setLoggedInUserData] = useState(null); // employee object if role=employee
  const [userData, setUserData] = useContext(AuthContext);

  // Restore user from localStorage on refresh
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userDataNow = JSON.parse(loggedInUser);

      setUser(userDataNow.role);

      if (userDataNow.role === "employee") {
        setLoggedInUserData(userDataNow.data); // ✅ full employee object
      } else {
        setLoggedInUserData(null); // admin doesn't need extra data
      }
    }
  }, []);

  // Handle login
  const handleLogin = (email, password) => {
    if (email === "admin@example.com" && password === "123") {
      setUser("admin");
      setLoggedInUserData(null);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else {
      const employee = userData?.find(
        (e) => email === e.email && e.password === password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      }
    }
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user === "employee" ? (
        <EmployeeDashboard data={loggedInUserData} changeUser={setUser} />
      ) : null}
    </>
  );
};

export default App;
