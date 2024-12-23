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
// import { MessageCircle } from 'lucide-react';

interface Props {
  state: any;
  updateState: (key: string, value: number) => void;
updateNotes: (key: string, value: string) => Promise<void>;
}

const GrossMultipleCard: React.FC<Props> = ({ state, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [grossMultiple, setGrossMultiple] = useState(state.askingPrice / state.grossRevenue);
  const [askingPrice, setAskingPrice] = useState(state.askingPrice);
  const [grossRevenue, setGrossRevenue] = useState(state.grossRevenue);
  const [notes, setNotes] = useState("");
  
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(()=>{
    setGrossMultiple(state.grossMultiple);
    setAskingPrice(state.askingPrice);
    setGrossRevenue(state.grossRevenue);
    setNotes(state.notes.grossMultiple)
  },[state])

  const handleSaveChanges = () => {
    updateState("grossMultiple", grossMultiple);
    updateState("askingPrice", askingPrice);
    updateState("grossRevenue", grossRevenue);
    updateNotes("grossMultiple", notes);
    
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setGrossMultiple(state.askingPrice / state.grossRevenue);
    setAskingPrice(state.askingPrice);
    setGrossRevenue(state.grossRevenue);
    setNotes("");
    setIsDialogOpen(false);
  };

  const handleAskingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setAskingPrice(Number(numericValue));
                  setGrossMultiple(Number(numericValue) / grossRevenue);
                }
  };

  const handleGrossRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setGrossRevenue(Number(numericValue));
                  setGrossMultiple(askingPrice / Number(numericValue));
                }
  };

  return (
    <div className="m-1 h-full">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">Gross Multiple</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl flex-1  text-blue-500">{` ${grossMultiple.toFixed(2)} `}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.grossMultiple || ""}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Gross Multiple Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="askingPrice">
              Asking Price
            </label>
            <Input
              id="askingPrice"
              type="text"
              value={askingPrice.toLocaleString()}
              onChange={handleAskingPriceChange}
              placeholder="Enter asking price"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="grossRevenue">
              Gross Revenue
            </label>
            <Input
              id="grossRevenue"
              type="text"
              value={grossRevenue.toLocaleString()}
              onChange={handleGrossRevenueChange}
              placeholder="Enter gross revenue"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="grossMultiple">
              Gross Multiple (Calculated)
            </label>
            <Input
              id="grossMultiple"
              type="number"
              value={grossMultiple.toFixed(2)}
              disabled
              placeholder="Gross multiple is auto-calculated"
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
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {isNotesOpen && <Notes notes={state.notes.grossMultiple} title="Gross Multiple" close={() => setIsNotesOpen(false)} />} 
    </div>
  );
};

export default GrossMultipleCard;