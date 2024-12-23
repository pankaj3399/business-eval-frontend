// import React from "react";
import { X, FileText } from "lucide-react";
import ReportModal from "./ReportModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FilesProps {
  state: any;
  files: {url: string, name: string}[];
  close: () => void;
}

function shortenURL(url: string, maxLength = 30): string {
  return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
}

const FilesModal = ({ files, close, state }: FilesProps) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const closeReportModal = () => {
    setShowReportModal(false);
  }
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">Attached Files</h2>
          <button
            onClick={close}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {files.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">No files attached</p>
          ) : (
            files.map((file, index) => (
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                <FileText className="h-5 w-5 text-gray-500" />
                <span>{`${index + 1}. ${shortenURL(file.name)}`}</span>
              </a>
            ))
          )}
        </div>
        <div className="flex justify-center items-center p-3">
          <Button onClick={() => setShowReportModal(true)}>Download Report</Button>
        </div>
        {showReportModal && <ReportModal data={state} close={closeReportModal} />}
      </div>
    </div>
  );
};

export default FilesModal;
