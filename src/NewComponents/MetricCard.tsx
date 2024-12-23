import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {  Trash2 } from "lucide-react"; // For the delete icon
import Notes from "./Notes";

interface Props {
  state: any;
  updateMetric: React.Dispatch<
    React.SetStateAction<
      {
        metricName: string;
        metricValue: string;
        metricType: "X" | "$" | "%" | "N";
        notes: string[];
      }[]
    >
  >;
  deleteCard: (id: string) => void; // Pass a delete function as prop
}

const MetricCard: React.FC<Props> = ({ state, updateMetric, deleteCard }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [metricName, setMetricName] = useState(state.metricName || "");
  const [metricValue, setMetricValue] = useState(state.metricValue || "");
  const [metricType, setMetricType] = useState(state.metricType || "$");
  const [notes, setNotes] = useState(state.notes || []);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  const handleSaveChanges = () => {
    updateMetric((prev: any) =>
      prev.map((metric: any) =>
        metric.metricName === state.metricName
          ? { ...metric, metricName, metricValue, metricType, notes }
          : metric
      )
    );
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setMetricName(state.metricName);
    setMetricValue(state.metricValue);
    setMetricType(state.metricType);
    setNotes(state.notes);
    setIsDialogOpen(false);
  };

  return (
    <div className="m-1 h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative"
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">{metricName}</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCard(state.metricName);
                }}
                className="text-xl text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xl flex-1  text-blue-500">
              {metricType === "$" ? `$${Number(metricValue).toLocaleString()}` : metricValue}
            </p>
            <p className="text-[0.65rem] text-gray-500">{notes || ""}</p>
          </div>
        </DialogTrigger>

        {/* Edit Modal */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Metric Card</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="metricName">
              Metric Name
            </label>
            <Input
              id="metricName"
              type="text"
              value={metricName}
              onChange={(e) => setMetricName(e.target.value)}
              className="w-full"
            />

            <label className="font-semibold" htmlFor="metricValue">
              Metric Value
            </label>
            <Input
              id="metricValue"
              type="number"
              value={metricValue}
              onChange={(e) => setMetricValue(e.target.value)}
              className="w-full"
            />

            <label className="font-semibold" htmlFor="metricType">
              Metric Type
            </label>
            <select
              id="metricType"
              value={metricType}
              onChange={(e) => setMetricType(e.target.value)}
              className="w-full"
            >
              <option value="$">$</option>
              <option value="X">X</option>
              <option value="N">N</option>
              <option value="%">%</option>
            </select>

            <label className="font-semibold" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      {isNotesOpen && <Notes notes={notes} title={metricName} close={() => setIsNotesOpen(false)} />}
    </div>
  );
};

export default MetricCard;
