import React from 'react';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onSave: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[978px] mx-4 max-h-[95vh] overflow-auto">
                <div className="px-6 py-4 flex justify-end items-center">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &#10005;
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {children}
                </div>
                <div className="px-6 py-4 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-4 py-2 text-sm bg-[#3a37ff] hover:bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
