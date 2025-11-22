import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDone, MdModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

function App() {
  const [newTodo, setNewTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.log("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos((prev) => [...prev, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editingText,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data : todo))
      );
      setEditingTodo(null);
      setEditingText("");
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos((prev) => prev.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggling todo", error);
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditingText(todo.text);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-500
    flex justify-center items-center 
    "
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full
      max-w-lg p-8
      "
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manger</h1>

        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="what needs to be done?"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium
         cursor-pointer
         "
          >
            Add Task
          </button>
        </form>
        <div>
          {todos.length === 0 ? (
            <div className="text-gray-400 mt-4 text-center">
              No tasks yet. Add your first one!
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`border rounded-md px-3 py-2 flex items-center justify-between ${
                    todo.completed
                      ? "bg-green-50 border-green-200"
                      : "border-gray-200"
                  }`}
                >
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        className="flex-1 border rounded px-2 py-1"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <button
                        type="button"
                        className="text-green-600"
                        onClick={() => saveEdit(todo._id)}
                      >
                        <MdOutlineDone size={20} />
                      </button>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => setEditingTodo(null)}
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`flex-1 cursor-pointer ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                        onClick={() => toggleTodo(todo._id)}
                      >
                        {todo.text}
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <button
                          type="button"
                          onClick={() => toggleTodo(todo._id)}
                        >
                          <MdOutlineDone size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => startEditing(todo)}
                        >
                          <MdModeEditOutline size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTodo(todo._id)}
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
