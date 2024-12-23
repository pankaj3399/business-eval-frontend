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
  state: { expectedSalary: number, notes: { expectedSalary: string[] } }; 
  updateState: (key: string, value: number) => void; 
  updateNotes: (key: string, value: string) => Promise<void>
}

const ExpectedSalary: React.FC<Props> = ({ state, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [salary, setSalary] = useState<number>(state.expectedSalary); 
  const [notes, setNotes] = useState<string>(""); 
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(()=>{
    setSalary(state.expectedSalary)
  },[state])

 
  const handleSaveChanges = async () => {
    updateState("expectedSalary", salary);
    await updateNotes("expectedSalary", notes); 
    setNotes("");
    setIsDialogOpen(false); 
  };

  
  const handleCancel = () => {
    setSalary(state.expectedSalary); 
    setNotes(""); 
    setIsDialogOpen(false); 
  };

  return (
    <div className="m-1 h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
     
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
              <h3 className="flex-1 text-xs text-gray-500">Expected Salary</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>  
            <p className="text-xl flex-1  text-blue-500">${state.expectedSalary.toLocaleString()}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.expectedSalary[0] || ""}</p>
          </div>
        </DialogTrigger>

        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expected Salary</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
           
           <label className="font-semibold" htmlFor="salary">
             Expected Salary
           </label>
           <Input
             id="salary"
             type="text"
             value={salary?.toLocaleString()}
             onChange={(e) =>{const numericValue = e.target.value.replace(/,/g, '');
               if (!isNaN(Number(numericValue))) {
                 setSalary(Number(numericValue));
               }
             }}
             placeholder="Enter expected salary"
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
      {isNotesOpen && <Notes notes={state.notes.expectedSalary} title="Expected Salary" close={() => setIsNotesOpen(false)} />} 
    </div>
  );
};

export default ExpectedSalary;