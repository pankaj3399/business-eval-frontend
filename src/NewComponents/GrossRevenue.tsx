import React, { useEffect, useState } from "react";
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
// import { NotepadText } from "lucide-react";
import Notes from "./Notes";

interface Props {
  state: { grossRevenue: number, notes: { grossRevenue: string[] } };
  updateState: (key: string, value: number) => void; 
  updateNotes: (key: string, value: string) => void
}

const GrossRevenue: React.FC<Props> = ({ state, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [revenue, setRevenue] = useState<number>(state.grossRevenue); 
  const [notes, setNotes] = useState<string>(""); 
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(()=>{
    setRevenue(state.grossRevenue)
  },[state])

  
  const handleSaveChanges = () => {
    updateState("grossRevenue", revenue); 
    updateNotes("grossRevenue", notes)
    setNotes(""); 
    setIsDialogOpen(false); 
  };

  
  const handleCancel = () => {
    setRevenue(state.grossRevenue); 
    setNotes(""); 
    setIsDialogOpen(false); 
  };

  return (
    <div className="m-1 h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">Gross Revenue</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl flex-1  text-green-500">${state.grossRevenue.toLocaleString()}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.grossRevenue[0] || ""}</p>
          </div>
        </DialogTrigger>


        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gross Revenue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
           
            <label className="font-semibold" htmlFor="revenue">
              Gross Revenue
            </label>
            <Input
              id="revenue"
              type="text"
              value={revenue?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setRevenue(Number(numericValue));
                }
              }}
              placeholder="Enter gross revenue"
              className="w-full"
            />

            <label className="font-semibold" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes here..."
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
      {isNotesOpen && <Notes notes={state.notes.grossRevenue} title="Gross Revenue" close={() => setIsNotesOpen(false)} />}  
    </div>
  );
};

export default GrossRevenue;