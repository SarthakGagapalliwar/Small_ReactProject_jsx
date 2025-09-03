import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';

const CreateTask = () => {
  const [taskDetail, setTaskDetail] = useState({
    title: "",
    date: "",
    category: "",
    description: "",
    active:false,
    newTask:true,
    failed:false,
    complete:false,
  })

  const [userData,setUserData] = useContext(AuthContext);

  const [asignTo, setAsignTo]=useState('')

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setTaskDetail((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
  e.preventDefault();

  const updatedEmployees = userData.map((emp) => {
    if (asignTo === emp.firstName) {
      return {
        ...emp,
        tasks: [...(emp.tasks || []), taskDetail],
        taskNumbers: {
          ...emp.taskNumbers,
          newTask: (emp.taskNumbers?.newTask || 0) + 1,
        },
      };
    }
    return emp;
  });

  // ✅ keep userData as array
  setUserData(updatedEmployees);

  // Optionally update localStorage if needed
  localStorage.setItem("employees", JSON.stringify(updatedEmployees));

  console.log("Updated employees:", updatedEmployees);

  // reset form
  setTaskDetail({
    title: "",
    date: "",
    category: "",
    description: "",
    active: false,
    newTask: true,
    failed: false,
    complete: false,
  });
  setAsignTo("");
};


  return (
    <div className="mt-10 flex justify-center bg-[#1c1c1c]">
      <form
        onSubmit={handleSubmit}
        className="flex gap-8 w-full max-w-6xl rounded-2xl shadow-lg p-8 bg-[#1c1c1c] border-1 border-gray-300"
      >
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Task Title
            </h3>
            <input
              name="title"
              value={taskDetail.title}
              onChange={handleChange}
              type="text"
              placeholder="Enter the task name"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Date</h3>
            <input
              name="date"
              value={taskDetail.date}
              onChange={handleChange}
              type="date"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Assign To
            </h3>
            <input
              name="assignTo"
              value={asignTo}
              onChange={(e)=>setAsignTo(e.target.value)}
              type="text"
              placeholder="Enter employee name"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Category
            </h3>
            <input
              name="category"
              value={taskDetail.category}
              onChange={handleChange}
              type="text"
              placeholder="Design, Dev, etc."
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Column (Description + Button) */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h3>
          <textarea
            name="description"
            value={taskDetail.description}
            onChange={handleChange}
            placeholder="Write task details here..."
            className="flex-grow px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none min-h-64"
          ></textarea>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition self-end"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
