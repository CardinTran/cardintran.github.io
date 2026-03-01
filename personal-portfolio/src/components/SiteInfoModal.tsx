import { useState } from "react";

export default function SiteInfoModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-black font-bold flex items-center justify-center hover:scale-110 transition"
        aria-label="About this website"
      >
        ?
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative z-50 bg-white rounded-2xl max-w-lg w-[90%] p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              Why This Portfolio Exists
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              This portfolio was designed as an interactive experience
              rather than a traditional static website. The floating
              island system represents different dimensions of my
              academic, technical, and leadership journey.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Instead of navigating through standard pages, visitors
              explore structured sections through spatial interaction.
              This reflects both my technical skills and my interest in
              thoughtful system design.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}