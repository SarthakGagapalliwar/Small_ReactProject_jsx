import React from "react";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

const AdminDashboard = ({changeUser}) => {
  return (
    <div className="min-h-screen w-full p-10 bg-black">
      <Header changeUser={changeUser}/>
      <CreateTask></CreateTask>
      <AllTask></AllTask>
    </div>
  );
};

export default AdminDashboard;