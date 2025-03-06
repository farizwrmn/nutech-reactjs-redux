import { useState, useEffect } from "react";

function LoadingScreen ({ loading }) {
  return (
    loading && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-white w-16 h-16 mb-4"></div>
          {/* Loading text */}
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  );
}

export default LoadingScreen;
