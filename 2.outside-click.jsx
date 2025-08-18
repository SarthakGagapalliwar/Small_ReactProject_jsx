import { useEffect, useRef, useState } from "react";

function ClickoutSideDropDown() {
  const [isOpen, setIsOpen] = useState(true);

  const dropdownRef=useRef(null);

//   const toggleDropDown = ()=>

    useEffect(()=>{
        if(!isOpen) return;

        const handleClickOutside = (event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){  //ask dropdownRef.current
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown',handleClickOutside)

        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }

    },[isOpen])

  return (
    <div className="flex flex-col items-center pt-[155px] min-h-screen bg-gray-50">
      <h1>Close dropdown on outside click</h1>
      <div className="relative mt-6 w-48 " ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center border-2 px-3 py-2 rounded"
        >
          Select an option
          <span
            className={`ml-2 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-full border z-10 bg-white shadow-lg rounded">
            <div className="py-1">
              {["option 1", "option 2", "option 3", "option 4"].map(
                (option, index) => (
                  <button
                    key={index}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClickoutSideDropDown;
