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
  state: any; // Parent state containing askingPrice
  updateState: (key: string, value: number) => void; 
  updateNotes: (key: string, value: string) => void// Function to update parent state
}

const AskingPriceCard: React.FC<Props> = ({ state, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility state
  const [askingPrice, setAskingPrice] = useState(state.askingPrice); // Local asking price state
  const [notes, setNotes] = useState<string[]>(state.notes.askingPrice); // Notes input state
 
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    setAskingPrice(state.askingPrice); 
  },[state])

  // Save changes and update parent state
  const handleSaveChanges = () => {
    updateState("askingPrice", askingPrice);
    updateNotes("askingPrice",notes.join("\n"))
    setIsDialogOpen(false); // Close dialog
  };

  // Reset changes and close dialog
  const handleCancel = () => {
    setAskingPrice(state.askingPrice); // Revert to parent state value
    setNotes(state.notes.askingPrice); // Clear notes
    setIsDialogOpen(false); // Close dialog
  };

  return (
    <div className="m-1 h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Trigger to open dialog */}
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">Asking Price</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl flex-1  text-green-500">{`$${state.askingPrice.toLocaleString()}`}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.askingPrice || ""}</p>
          </div>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Asking Price</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input for asking price */}
            <label className="font-semibold" htmlFor="askingPrice">
              Asking Price
            </label>
            <Input
              id="askingPrice"
              type="text"
              value={askingPrice?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setAskingPrice(Number(numericValue));
                }
              }}
              placeholder="Enter asking price"
              className="w-full"
            />

            {/* Textarea for notes */}
            <label className="font-semibold" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes.join("\n")}
              onChange={(e) => setNotes(e.target.value.split("\n"))}
              placeholder="Add notes here..."
              className="w-full"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {isNotesOpen && <Notes notes={state.notes.askingPrice} title="Asking Price" close={() => setIsNotesOpen(false)} />} 
    </div>
  );
};

export default AskingPriceCard;