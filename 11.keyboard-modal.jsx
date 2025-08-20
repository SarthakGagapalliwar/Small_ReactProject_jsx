import { useEffect, useRef, useState } from "react";

function KeyboardModal() {
  const [open, setOpen] = useState(false);

  const oncloseHandle = useRef(null);
  const handleKeyDowm = (event) => {
    if (event.key === "Escape") setOpen(false);
  };
  const handleClickOutside = (event) => {
    if (
      oncloseHandle.current &&
      !oncloseHandle.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDowm); //we use it specifically inside useeffect because we're touching real dom and to avoid attaching multiple event listeners becausse of re-renders 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDowm);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
  <h1 className="text-2xl font-bold">Keyboard Modal</h1>

  <div className="mt-5">
    <button
      onClick={() => setOpen(true)}
      className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
    >
      Open Modal
    </button>
    {open && (
      <>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>

        {/* Modal */}
        <div
          ref={oncloseHandle}
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-md 
                     bg-white rounded-2xl shadow-2xl p-6 
                     transform -translate-x-1/2 -translate-y-1/2 
                     animate-fadeIn"
        >
          <h3 className="text-2xl font-semibold mb-3">Modal Title</h3>
          <p className="text-gray-700">This is the modal content.</p>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2 bg-red-500 text-white rounded-lg shadow 
                         hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </>
    )}
  </div>
</div>

  );
}
export default KeyboardModal;
