import React from "react";

function Interest({ data, setData, error }) {
  const { interest } = data;

  const handleDataChange = (e) => {
    const { name, checked } = e.target;

    setData((prev) => ({
      ...prev,
      interest: checked
        ? [...prev.interest, name] // add interest if checked
        : prev.interest.filter((i) => i !== name), // remove if unchecked
    }));
  };

  return (
    <div>
      <h3>Select your interests:</h3>

      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interest.includes("coding")}
            onChange={handleDataChange}
          />
          Coding
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interest.includes("music")}
            onChange={handleDataChange}
          />
          Music
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="javaScript"
            checked={interest.includes("javaScript")}
            onChange={handleDataChange}
          />
          JavaScript
        </label>
      </div>
      {error.interest && <span>{error.interest}</span>}
    </div>
  );
}

export default Interest;
