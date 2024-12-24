import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";

function MovieModal({ handleClose, title, overview, }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-[600px] rounded-lg shadow-lg p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <IoIosCloseCircle
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            size={28}
            onClick={handleClose}
          />
        </div>
        <div className="text-gray-700">
          <p>{overview}</p>
        </div>
      </div>
    </div>

  )
}

export default MovieModal