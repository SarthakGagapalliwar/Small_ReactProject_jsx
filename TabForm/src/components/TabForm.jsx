import React, { useState } from "react";
import Profile from "./Profile";
import Interest from "./Interest";
import Setting from "./Setting";

const TabForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    interest: [],
    theme: "dark",
  });

  const [error, setError] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name.length < 2) {
          err.name = "Name is not valid";
        }
        if (!data.age || Number(data.age) < 18) {
          err.age = "Age is not valid";
        }
        if (!data.email || data.email.length < 2) {
          err.email = "Email is not valid";
        }
        setError(err);
        return Object.keys(err).length === 0;
      },
    },
    {
      name: "Interest",
      component: Interest,
      validate: () => {
        const err = {};
        if (data.interest.length < 1) {
          err.interest = "Select at least one interest";
        }
        setError(err);
        return Object.keys(err).length === 0;
      },
    },
    {
      name: "Setting",
      component: Setting,
      validate: () => true, // Added to prevent error when calling .validate()
    },
  ];

  const handleNextClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", data);
  };

  const ActiveTabComponent = tabs[activeTab].component;

  return (
    <div>
      <div>
        {tabs.map((t, index) => (
          <div key={index} onClick={() => tabs[activeTab].validate() && setActiveTab(index)}>
            {t.name}
          </div>
        ))}
      </div>

      <div>
        <ActiveTabComponent data={data} setData={setData} error={error} />
      </div>

      {activeTab < tabs.length - 1 && (
        <button onClick={handleNextClick}>Next</button>
      )}
      {activeTab > 0 && <button onClick={handlePrevClick}>Prev</button>}
      {activeTab === tabs.length - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default TabForm;
