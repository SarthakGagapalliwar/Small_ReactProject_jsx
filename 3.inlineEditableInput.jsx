import { useEffect, useRef, useState } from "react"

function InlineEditabeInput() {
  const [item, setItem] = useState([
    { id: 1, text: "hello" },
    { id: 2, text: "sangam" },
  ])



const [currentEditedID, setCurrentEditedID]=useState(null);
const [currentEditedvalue, setCurrentEditedvalue]=useState(null);

const inputRef =useRef(null);
useEffect(()=>{
    if(currentEditedID != null && inputRef.current){
        inputRef.current.focus();
    }
},[currentEditedID])



const handleEdit = (id,text)=>{
    setCurrentEditedID(id);
    setCurrentEditedvalue(text);
}

const handleBlue = (event) =>{  // to handle outside click
    if(currentEditedID !== null){
       saveChanges() 
    }
}

const handleKeydown=(event)=>{
    console.log(event.key);
    if(event.key==='Enter'){
        saveChanges()
    }else if(event.key==='Escape'){
        setCurrentEditedID(null);
    }   
    
}

const saveChanges=()=>{
    if(currentEditedID !==null){
        setItem(
            item.map(item => item.id===currentEditedID ? {...item, text :currentEditedvalue}:item)
        )

        setCurrentEditedID(null)
    }
}

// console.log(currentEditedID,currentEditedvalue);
 
  return (
    <div className="flex flex-col items-center pt-[155px] min-h-screen bg-gray-50">
      <h1>Inline Editable input</h1>

      <div className="mt-10 flex flex-col gap-4 w-64">
        {item.map((item) => (

          currentEditedID===item.id ? <input type="text" 
          ref={inputRef}
          value={currentEditedvalue}
          onChange={(event)=>setCurrentEditedvalue(event.target.value)}
          onBlur={handleBlue}
          onKeyDown={handleKeydown}
          /> : 

          <div
            key={item.id}
            className=" flex justify-between bg-gray-300 items-center cursor-pointer group px-4 py-2 rounded"
            onClick={()=>handleEdit(item.id, item.text)}
          >
            <span>{item.text}</span>
            <button className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity">
              ✏️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InlineEditabeInput
