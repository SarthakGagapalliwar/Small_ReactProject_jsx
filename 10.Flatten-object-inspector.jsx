import { useState } from "react";

function FlattenObjectInspector() {
  const [input, setInput] = useState("");
  const [flatten, setFlatten] = useState(null);

  const flattenObject = (obj, parentKey = "", result = {}) => {
    for (let key in obj) {
      const path = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], path, result);
      } else {
        result[path] = obj[key];
      }
    }
    return result;
  };

  const handleParse = () => {
    try {
      const parsedResult = JSON.parse(input);
      const flatRes = flattenObject(parsedResult);
      setFlatten(flatRes);
    } catch (e) {
      console.error("Invalid JSON:", e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[155px] min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold">Flatten Object Inspector</h1>
      <div className="grid grid-cols-2 gap-5 mt-11 w-4/5">
        {/* Input Section */}
        <div>
          <textarea
            className="w-full h-64 p-3 border border-gray-300 rounded text-sm resize-none"
            placeholder="Enter your JSON here"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            onClick={handleParse}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Flatten
          </button>
        </div>

        {/* Output Section */}
        <div>
          {flatten && (
            <div className="border border-gray-300 overflow-x-auto rounded">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-2 border-b">Key</th>
                    <th className="text-left p-2 border-b">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(flatten).map(([key, value]) => (
                    <tr key={key}>
                      <td className="p-2 border-b">{key}</td>
                      <td className="p-2 border-b">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlattenObjectInspector;
