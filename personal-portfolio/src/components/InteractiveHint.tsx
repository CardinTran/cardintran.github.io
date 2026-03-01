import { useState } from "react";

export default function InteractionHint() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
      <div
        className="hidden md:!block fixed top-6 right-6 z-40 max-w-xs bg-white/70 backdrop-blur-md text-gray-700 text-sm px-4 py-3 rounded-xl shadow-md"
      >
        <div className="flex justify-between items-start gap-4">
          <p className="leading-relaxed">
            Click an island to explore.  
            Drag to rotate the ring.
          </p>

          <button
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-black text-xs"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[90%] bg-white/80 backdrop-blur-md text-gray-700 text-xs px-4 py-2 rounded-full shadow-md"
      >
        <div className="flex items-center gap-3">
          <p>Tap islands • Swipe to rotate</p>
          <button
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-black text-xs"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}