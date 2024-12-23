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

interface CurrentCashflowProps {
  state:any; 
  updateState: (key: string, value: number) => Promise<void>; 
  updateNotes: (key: string, value: string) => Promise<void>
}

const CurrentCashflowCard: React.FC<CurrentCashflowProps> = ({
  state,
  updateState,
  updateNotes
}) => {
  
  const [cashflow, setCashflow] = useState<number>(state.currentCashflow);
  const [newExpenses, setNewExpenses] = useState<number>(state.newExpenses);
  const [notes, setNotes] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    
    setCashflow(state.currentCashflow);
    setNewExpenses(state.newExpenses);
    
  }, [state]);

  const handleSaveChanges = async () => {
    await updateState("currentCashflow", cashflow);
    await updateNotes("currentCashflow", notes);
    await updateState("newExpenses", newExpenses);
    setNotes(""); 
    setIsDialogOpen(false); 
  };

 
  const handleCancel = () => {
    setCashflow(state.currentCashflow); 
    setNewExpenses(state.newExpenses);
    setNotes(""); 
    setIsDialogOpen(false); 
  };

  return (
    <div className="m-1 h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Trigger to open dialog */}
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
           <div className="flex gap-2 mb-2 justify-between items-center">
              <h3 className="flex-1 text-xs text-gray-500">Current Cashflow</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl text-yellow-500 flex-1">${state.currentCashflow.toLocaleString()}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.currentCashflow || ""}</p>
          </div>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Current Cashflow</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input for cashflow */}
            <label className="font-semibold" htmlFor="cashflow">
              Current Cashflow
            </label>
            <Input
              id="cashflow"
              type="text"
              value={cashflow?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setCashflow(Number(numericValue));
                }
              }}
              className="w-full"
            />
            <label className="font-semibold" htmlFor="cashflow">
              New Expenses
            </label>
            <Input
              id="expenses"
              type="text"
              value={newExpenses?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setNewExpenses(Number(numericValue));
                }
              }}
              placeholder="Enter new expenses" 
              className="w-full"
            />

            {/* Textarea for notes */}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      {isNotesOpen && <Notes close={() => setIsNotesOpen(false)} notes={state?.notes?.currentCashflow || []} title="Current Cashflow Notes" />}
    </div>
  );
};

export default CurrentCashflowCard;