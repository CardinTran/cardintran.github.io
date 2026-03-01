import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { useState } from "react";
import { ISLANDS } from "./data/islands";
import FloatingHeader from "./components/FloatingHeader";
import IslandPanel from "./components/IslandPanel";
import InteractionHint from "./components/InteractiveHint";
import SiteInfoModal from "./components/SiteInfoModal";
import Footer from "./components/Footer";

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <FloatingHeader selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      <InteractionHint />
      <Canvas camera={{ position: [-4, 24, 50], fov: 45 }}>
        <Scene selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </Canvas>
      <Footer />
      {selectedIndex !== null && (
        <button
          onClick={() => setSelectedIndex(null)}
          className="absolute top-23 sm:top-6 left-6 bg-white/80 backdrop-blur-md rounded-full w-10 h-10 text-black font-bold z-50"
        >
          ✕
        </button>
      )}
      {selectedIndex !== null && (
        <>
          <button
            onClick={() =>
              setSelectedIndex((prev) => (prev !== null ? (prev + 1) % ISLANDS.length : null))
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full z-50"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setSelectedIndex((prev) =>
                prev !== null ? (prev - 1 + ISLANDS.length) % ISLANDS.length : null
              )
            }
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full z-50"
          >
            ›
          </button>
        </>
      )}
      <IslandPanel selectedIndex={selectedIndex} />
      <SiteInfoModal />
    </div>
  );
}
