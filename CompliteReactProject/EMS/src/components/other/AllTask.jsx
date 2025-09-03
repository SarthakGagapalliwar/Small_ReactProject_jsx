import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const AllTask = () => {
  const [userData] = useContext(AuthContext);

    if (!userData) {
    return <p className="text-white">Loading tasks...</p>;
  }
  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5 ">
        <div
          className="bg-red-400 mb-2 py-4 px-2 flex justify-between rounded"
          >
          <h1 className="w-1/5 ">Employee Name</h1>
          <h3 className="w-1/5 ">New Task</h3>
          <h5 className="w-1/5 ">Active Task</h5>
          <h5 className="w-1/5 ">Completed</h5>
          <h5 className="w-1/5 ">Failed</h5>
        </div>


    <div className="">
      {userData.map((emp, idx) => (
          
          <div
          key={idx}
          className=" mb-2 py-4 px-2 flex justify-between rounded border-1 "
          >
            {/* {console.log(emp)
            } */}
          <h1 className="w-1/5 text-lg font-medium text-white-600">{emp.firstName}</h1>
          <h3 className="w-1/5 text-lg font-medium  text-blue-600">{emp.taskNumbers.newTask}</h3>
          <h5 className="w-1/5 text-lg font-medium  text-yellow-400">{emp.taskNumbers.active}</h5>
          <h5 className="w-1/5 text-lg font-medium  text-green-600">{emp.taskNumbers.completed}</h5>
          <h5 className="w-1/5 text-lg font-medium  text-red-600">{emp.taskNumbers.failed}</h5>
        </div>
      ))}
    </div>


    </div>
  );
};

export default AllTask;
