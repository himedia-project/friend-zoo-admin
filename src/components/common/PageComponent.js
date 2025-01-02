import React from "react";

const PageComponent = ({ serverData, movePage, size }) => {
  return (
    <div className="m-2 sm:m-6 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
      {serverData.prev && (
        <button
          className="px-4 py-2 text-sm sm:text-base font-semibold text-blue-500 bg-white rounded-lg shadow-sm hover:bg-blue-50 border border-blue-200 transition-all duration-200"
          onClick={() => movePage({ page: serverData.prevPage, size })}
        >
          이전
        </button>
      )}

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {serverData.pageNumList.map((pageNum) => (
          <button
            key={pageNum}
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg font-semibold transition-all duration-200
              ${
                serverData.current === pageNum
                  ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                  : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
              }`}
            onClick={() => movePage({ page: pageNum, size })}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {serverData.next && (
        <button
          className="px-4 py-2 text-sm sm:text-base font-semibold text-blue-500 bg-white rounded-lg shadow-sm hover:bg-blue-50 border border-blue-200 transition-all duration-200"
          onClick={() => movePage({ page: serverData.nextPage, size })}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default PageComponent;
