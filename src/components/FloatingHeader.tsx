import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface Props {
  selectedIndex: number | null;
  setSelectedIndex: (val: number | null) => void;
}

export default function FloatingHeader({ selectedIndex, setSelectedIndex }: Props) {
  const sections = ["About", "Projects", "Work", "Awards", "Education", "Involvement"];

  return (
    <>
      <div className="hidden sm:!block fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-2xl border border-gray-200"
        >
          {sections.map((label, index) => (
            <NavButton
              key={label}
              label={label}
              active={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <a
            href="https://github.com/CardinTran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black hover:scale-110 transition"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/cardin-tran-a307742ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black hover:scale-110 transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      <div className="sm:hidden absolute top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%]">
        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-full shadow-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <NavButton
              label="About"
              active={selectedIndex === 0}
              onClick={() => setSelectedIndex(0)}
            />

            <NavButton
              label="Involvement"
              active={selectedIndex === 5}
              onClick={() => setSelectedIndex(5)}
            />
          </div>

          <MobileDropdown selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />

          <div className="flex items-center gap-2 ml-2">
            <a
              href="https://github.com/CardinTran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/cardin-tran-a307742ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={` px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
        ${
          active
            ? "bg-black text-white shadow-md"
            : "text-gray-900 hover:text-[#f5c27c] hover:bg-gray-100"
        }
      `}
    >
      {label}
    </button>
  );
}

function MobileDropdown({
  setSelectedIndex,
}: {
  selectedIndex: number | null;
  setSelectedIndex: (val: number | null) => void;
}) {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Projects", index: 1 },
    { label: "Work", index: 2 },
    { label: "Awards", index: 3 },
    { label: "Education", index: 4 },
  ];

  return (
    <div className="relative ml-3">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 text-sm font-semibold bg-gray-100 rounded-full"
      >
        More
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl p-3 w-40">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setSelectedIndex(item.index);
                setOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:text-black"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
