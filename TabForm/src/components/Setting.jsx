import React from "react";

function Setting({ data, setData }) {
  const { theme } = data;

  const handleDataChange = (e)=>{
    setData((prev)=>({
        ...prev,
        theme:e.target.name
    }));
  }

  return (
    <div>
      <div>
        <label htmlFor="">
          <input type="radio" name="dark" checked={theme === "dark"} onChange={(e)=>handleDataChange(e)} />
          Dark
        </label>
      </div>
      <div>
        <label htmlFor="">
          <input type="radio" name="light" checked={theme === "light"} onChange={(e)=>handleDataChange(e)} />
          Light
        </label>
      </div>

    </div>
  );
}

export default Setting;
