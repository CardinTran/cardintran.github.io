import { ISLANDS } from "../data/islands";
import { CONTENT } from "../data/content";

interface Props {
  selectedIndex: number | null;
}

export default function IslandPanel({ selectedIndex }: Props) {
  if (selectedIndex === null) return null;

  const island = ISLANDS[selectedIndex];

  let content;

  switch (island.id) {
    case "center":
      content = CONTENT.about;
      break;
    case "research":
      content = CONTENT.research;
      break;
    case "engineering":
      content = CONTENT.engineering;
      break;
    case "education":
      content = CONTENT.education;
      break;
    case "awards":
      content = CONTENT.awards;
      break;
    case "drag":
      content = CONTENT.drag;
      break;
    default:
      return null;
  }

  return (
    <div
      className="absolute bottom-0 left-0 w-full h-64 md:h-80 bg-white/95 backdrop-blur-lg rounded-t-3xl shadow-2xl transition-transform duration-500 translate-y-0"
    >
      <div className="h-full overflow-y-auto p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{content.title}</h1>

        {"paragraphs" in content &&
          content.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-gray-700 leading-relaxed">
              {p}
            </p>
          ))}

        {"items" in content &&
          content.items.map((item, i) => (
            <div key={i} className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold">{item.heading}</h2>
              <p className="text-gray-700 mt-2">{item.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
