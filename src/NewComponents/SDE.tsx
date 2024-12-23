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
// import { MessageCircle } from "lucide-react";

interface Props {
  state: any;
  updateState: (key: string, value: number) => void;
  updateNotes: (key: string, value: string) => Promise<void>
}

const SDE: React.FC<Props> = ({ state, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sde, setSDE] = useState(state.sde);
  const [notes, setNotes] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    setSDE(state.sde);
  }, [state]);

  const handleSaveChanges = () => {
    updateState("sde", sde);
    updateNotes("sde", notes);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setSDE(state.sde);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="m-1 h-full">
      
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500" /> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">SDE/EBIDTA</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl flex-1  text-blue-500">{`$${state.sde.toLocaleString()}`}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.sde[0] || ""}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit SDE/EBIDTA Value</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="sde">
              SDE/EBIDTA Value
            </label>
            <Input
              id="sde"
              type="text"
              value={sde?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setSDE(Number(numericValue));
                }
              }}
              placeholder="Enter SDE value"
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
      {isNotesOpen && <Notes notes={state.notes.sde} title="SDE Value" close={() => setIsNotesOpen(false)} />}   
    </div>
  );
};

export default SDE;