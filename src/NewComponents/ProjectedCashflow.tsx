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

const ProjectedCashflowCard: React.FC<Props> = ({ state, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectedCashflow, setProjectedCashflow] = useState(state.projectedCashflow);
  const [currentCashflow, setCurrentCashflow] = useState(state.currentCashflow);
  const [totalDebtPayments, setTotalDebtPayments] = useState(state.totalDebtPayments);
  const [newExpenses, setNewExpenses] = useState(state.newExpenses);
  const [notes, setNotes] = useState("");

  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(()=>{
    setProjectedCashflow(state.projectedCashflow);
    setCurrentCashflow(state.currentCashflow);
    setTotalDebtPayments(state.totalDebtPayments);
    setNewExpenses(state.newExpenses);
    setNotes(state.notes.projectedCashflow)
  },[state])

  const handleSaveChanges = () => {
    updateState("projectedCashflow", projectedCashflow);
    updateState("currentCashflow", currentCashflow);
    updateState("totalDebtPayments", totalDebtPayments);
    updateState("newExpenses", newExpenses);
    updateNotes("projectedCashflow", notes);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setProjectedCashflow(state.projectedCashflow);
    setCurrentCashflow(state.currentCashflow);
    setTotalDebtPayments(state.totalDebtPayments);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="m-1 h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
            <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">Projected Cashflow</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl flex-1  text-blue-500">{` $${state.projectedCashflow.toLocaleString()} `}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.projectedCashflow || ""}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Projected Cashflow Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="projectedCashflow">
              Projected Cashflow
            </label>
            <Input
              id="projectedCashflow"
              type="text"
              value={projectedCashflow?.toLocaleString()}
              disabled
              onChange={(e) => setProjectedCashflow(Number(e.target.value))}
              placeholder="auto calculated"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="currentCashflow">
              Current Cashflow
            </label>
            <Input
              id="currentCashflow"
              type="text"
              value={currentCashflow?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setCurrentCashflow(Number(numericValue));
                }
              }}
              placeholder="Enter current cashflow"
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
            <label className="font-semibold" htmlFor="totalDebtPayments">
              Total Debt Payments
            </label>
            <Input
              id="totalDebtPayments"
              type="text"
              value={totalDebtPayments?.toLocaleString()}
              disabled
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setTotalDebtPayments(Number(numericValue));
                }
              }}
              placeholder="Enter total debt payments"
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
      {isNotesOpen && <Notes notes={state.notes.projectedCashflow} title="Projected Cashflow" close={() => setIsNotesOpen(false)} />}   
    </div>
  );
};

export default ProjectedCashflowCard;