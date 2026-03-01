export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = "March 2026";

  return (
    <footer className="fixed bottom-0 w-full text-white text-sm px-4 py-3 pointer-events-none">
      <div className="flex flex-col sm:flex-row justify-between">
        <p className="text-center sm:text-left">© {currentYear} Cardin Tran</p>

        <p className="text-center sm:text-right text-gray-300">Last updated: {lastUpdated}</p>
      </div>
    </footer>
  );
}
