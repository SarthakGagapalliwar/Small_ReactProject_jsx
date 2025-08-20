import { useState } from "react";

/*
⚖️ Quick Comparison Table
                    Feature Shallow Copy 🥄	        Deep Copy 🪣
First-level values	    ✅ Copied	              ✅ Copied
Nested objects/arrays	❌ Reference	              ✅ New copy
Independent?	        ❌ No	                  ✅ Yes
Speed	                ⚡ Faster	              🐢 Slower
Use case	             Simple/flat objects	    Complex/nested objects
*/


function DeepClone() {
  const [input, setinput] = useState("");
  const [original, setOriginal] = useState(null);
  const [clone, setClone] = useState(null);


  const structuredClone= (obj)=>{
        if(obj === null || typeof obj !== 'object'){
            return obj;
        }
        const clone =Array.isArray(obj) ? [] : {} //like we card chceking thte thet it is not ana obje then t is array ot obj in hit it is aray then we are assing with empty [] not then assign with empty obj

        for(let key in obj){
            clone[key]=structuredClone(obj[key]);
        }
        return clone;
  }


  const handleDeepClone = () => {
    try {
      const parsedObj = JSON.parse(input);
      setOriginal(parsedObj);
      setClone(structuredClone(parsedObj)); // create deep clone // this is jsut a deep copy not a Shallow Copy
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[100px] min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-bold mb-6">Deep Clone</h1>

      <div className="w-full max-w-3xl">
        {/* Input */}
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Paste JSON here..."
          onChange={(event) => setinput(event.target.value)}
        ></textarea>

        {/* Button */}
        <button
          className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          onClick={handleDeepClone}
        >
          Start Deep Clone
        </button>

        {/* Results */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {original && (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-3">Original Object</h3>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(original, null, 2)}
              </pre>
            </div>
          )}

          {clone && (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-3">Clone Object</h3>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(clone, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeepClone;
