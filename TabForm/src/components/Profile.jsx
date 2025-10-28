import React from "react";

function Profile({ data ,setData, error}) {
  const { name, email, age } = data;

  const handleDataChange = (e,item)=>{
    setData((prev)=>({
        ...prev,
        [item]:e.target.value,
    }));
  }
  return (
    <div>
      <div>
        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={(e)=>handleDataChange(e,"name")} />
        {error.name && <span>{error.name}</span>}
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="email" value={email} onChange={(e)=>handleDataChange(e,"email")}/>
        {error.email && <span>{error.email}</span>}
      </div>
      <div>
        <label htmlFor="">Age</label>
        <input type="number" value={age} onChange={(e)=>handleDataChange(e,"age")} />
        {error.age && <span>{error.age}</span>}
      </div>
    </div>
  );
}

export default Profile;
