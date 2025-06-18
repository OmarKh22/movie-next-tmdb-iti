export default function Pagination({ totalPageNumber, pageNumber, setPageNumber }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPageNumber <= maxVisible) {
      for (let i = 1; i <= totalPageNumber; i++) pages.push(i);
    } else {
      if (pageNumber <= 3) {
        pages.push(1, 2, 3, 4, 5, "...");
      } else if (pageNumber >= totalPageNumber - 2) {
        pages.push("...", totalPageNumber - 4, totalPageNumber - 3, totalPageNumber - 2, totalPageNumber - 1, totalPageNumber);
      } else {
        pages.push("...", pageNumber - 1, pageNumber, pageNumber + 1, "...");
      }
    }

    return pages;
  };

  const handleClick = (p) => {
    if (p !== "..." && p !== pageNumber) {
      setPageNumber(p);
    }
  };

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPageNumber) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="flex justify-center mt-8 space-x-2 items-center select-none">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={pageNumber === 1}
        className="text-xl px-2 py-1 hover:text-yellow-500 disabled:text-gray-300"
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((p, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(p)}
          disabled={p === "..."}
          className={`w-9 h-9 flex items-center justify-center rounded ${
            p === pageNumber
              ? "bg-yellow-300 text-black font-bold shadow"
              : "text-gray-700 hover:bg-gray-200"
          } ${p === "..." ? "cursor-default text-gray-400" : ""}`}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={pageNumber === totalPageNumber}
        className="text-xl px-2 py-1 hover:text-yellow-500 disabled:text-gray-300"
      >
        &gt;
      </button>
    </div>
  );
}
