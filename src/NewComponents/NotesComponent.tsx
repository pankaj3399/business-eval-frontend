import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Props {
  state: any;
  updateState: (key: string, value: any) => void;
}

const NotesComponent: React.FC<Props> = ({ state }) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleOpenNotes = () => {
    setIsOpen(true);
  };

  const handleCloseNotes = () => {
    setIsOpen(false);
  };

  return (
    <div className="mx-1">
      <Button className="bg-blue-500 text-white" onClick={handleOpenNotes}>All Notes</Button>

      {/* Modal for viewing notes */}
    {isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Notes</h3>
        <button
          onClick={handleCloseNotes}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4 max-h-[50vh] overflow-y-auto">
        {Object.entries(state.notes).map(([key, noteArray]) => (
          <div key={key} className="space-y-2">
            <h4 className="font-medium text-gray-600">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </h4>
            
            {
              key !== 'business' && Array.isArray(noteArray) && noteArray.map((note: string, index: number) => (
                <p
                  key={index}
                  className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-700"
                >
                  {note}
                </p>
              ))
            }
            
            {
              key == 'business' && (<p
                key={'business'}
                className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-700"
              >
                {state.notes.business}
              </p>)
            }
          </div>
        ))}

        {/* Default "No Notes" Message */}
        {!Object.keys(state.notes).length && (
          <p className="text-center text-gray-500 italic">
            No notes available
          </p>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCloseNotes}
          className="px-5 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default NotesComponent;
