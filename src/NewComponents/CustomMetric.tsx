import { PlusIcon } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  state: any;
  updateState: (key: string, value: any) => void;
  customMetrics:{
    metricName: string;
    metricValue: string;
    metricType: "X" | "$" | "%" | "N";
    notes: string[];
}[]
  setCustomMetrics: Dispatch<SetStateAction<{ metricName: string; metricValue: string; metricType: "X" | "$" | "%" | "N"; notes: string[]; }[]>>;
  setHasChanges: Dispatch<SetStateAction<boolean>>;
}

const CustomMetric: React.FC<Props> = ({ customMetrics, setCustomMetrics, setHasChanges }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metricName, setMetricName] = useState("");
  const [metricValue, setMetricValue] = useState<number | string>("");
  const [metricType, setMetricType] = useState<"X" | "$" | "%" | "N">("$");
  const [notes, setNotes] = useState<string[]>([]);

  const handleSaveChanges = () => {
    setCustomMetrics([...customMetrics, { metricName, metricValue: metricValue.toString(), metricType, notes }]);
    setMetricName("");
    setMetricValue("");
    setMetricType("$");
    setNotes([]);
    setIsOpen(false);
    setHasChanges(true);
  };

  const handleCancel = () => {
    setMetricName("");
    setMetricValue("");
    setMetricType("$");
    setNotes([]);
    setIsOpen(false);
  };

  return (
    <div className="m-1 h-full">
     

      
                  <button onClick={() => setIsOpen(true)} className="bg-white shadow-md p-4  cursor-pointer hover:shadow-lg rounded-full  relative">
                    <div className="flex flex-col justify-center items-center rounded-full">
                      <h3 className="text-2xl"><PlusIcon className="w-4 h-4" /></h3>
                     
                    </div>
                  </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add Custom Metric</h3>

            <div className="grid gap-4 py-2">
              <label htmlFor="metricName" className="font-semibold">
                Metric Name
              </label>
              <input
                id="metricName"
                type="text"
                value={metricName}
                onChange={(e) => setMetricName(e.target.value)}
                placeholder="Enter Metric Name"
                className="w-full p-2 border rounded-md"
              />

              <label htmlFor="metricValue" className="font-semibold">
                Value
              </label>
              <input
                id="metricValue"
                type="number"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                placeholder="Enter Metric Value"
                className="w-full p-2 border rounded-md"
              />

              <label htmlFor="metricType" className="font-semibold">
                Metric Type
              </label>
              <select
                id="metricType"
                value={metricType}
                onChange={(e) => setMetricType(e.target.value as "X" | "$" | "%" | "N")}
                className="w-full p-2 border rounded-md"
              >
                <option value="$">$</option>
                <option value="X">X</option>
                <option value="N">N</option>
                <option value="%">%</option>
              </select>

              <label htmlFor="notes" className="font-semibold">
                Notes
              </label>
              <textarea
                id="notes"
                value={notes.join("\n")}
                onChange={(e) => setNotes(e.target.value.split("\n"))}
                placeholder="Add Notes"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Metric
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMetric;
