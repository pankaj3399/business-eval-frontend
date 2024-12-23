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
  state: any;
  updateState: (key: string, value: number) => void;
updateNotes: (key: string, value: string) => Promise<void>;
}

const DSCRCalculator: React.FC<Props> = ({ state, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dscrCurrentCashflow, setDscrCurrentCashflow] = useState(state.currentCashflow);
  const [expectedSalary, setExpectedSalary] = useState(state.expectedSalary);
  const [totalDebtPayment, setTotalDebtPayment] = useState(state.totalDebtPayments);
  const [dscr, setDscr] = useState(state.dscr);
  const [notes, setNotes] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);


  useEffect(() => {
    setDscrCurrentCashflow(state.currentCashflow);
    setExpectedSalary(state.expectedSalary);
    setTotalDebtPayment(state.totalDebtPayments);
    setDscr(state.dscr);
    setNotes(state.notes.dscr)
  },[state]);

  const handleSaveChanges = () => {
    updateState("currentCashflow", dscrCurrentCashflow);
    updateState("expectedSalary", expectedSalary);
    updateState("totalDebtPayments", totalDebtPayment);
    updateState("dscr", dscr);
    updateNotes("dscr", notes)
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setDscrCurrentCashflow(state.dscrCurrentCashflow);
    setExpectedSalary(state.expectedSalary);
    setTotalDebtPayment(state.totalDebtPayment);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="m-1 h-full">
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">DSCR</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>  
            <p className="text-xl flex-1  text-blue-500">{` ${state.dscr}`}</p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.dscr || ""}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit DSCR Calculator</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input for DSCR Current Cashflow */}
            <label className="font-semibold" htmlFor="dscrCurrentCashflow">
              DSCR
            </label>
            <Input
              id="dscr"
              type="number"
              value={dscr}
              onChange={(e) => setDscr(Number(e.target.value))}
              placeholder="Enter DSCR current cashflow"
              className="w-full"
            />

            <label className="font-semibold" htmlFor="dscrCurrentCashflow">
              Current Cashflow
            </label>
            <Input
              id="currentCashflow"
              type="text"
              value={dscrCurrentCashflow.toLocaleString()}
              onChange={(e) => {
                if(!isNaN(Number(e.target.value.replace(/,/g, "")))) {
                  const numericValue = e.target.value.replace(/,/g, "");
                  setDscrCurrentCashflow(Number(numericValue));
                }
              }}
              placeholder="Enter DSCR current cashflow"
              className="w-full"
            />

            {/* Input for Expected Salary */}
            <label className="font-semibold" htmlFor="expectedSalary">
              Expected Salary
            </label>
            <Input
              id="expectedSalary"
              type="text"
              value={expectedSalary.toLocaleString()}
              onChange={(e) => {
                if(!isNaN(Number(e.target.value.replace(/,/g, "")))) {
                  const numericValue = e.target.value.replace(/,/g, "");
                  setExpectedSalary(Number(numericValue));
                }
              }}
              placeholder="Enter expected salary"
              className="w-full"
            />

            {/* Input for Total Debt Payment */}
            <label className="font-semibold" htmlFor="totalDebtPayment">
              Total Debt Payment
            </label>
            <Input
              id="totalDebtPayment"
              type="number"
              value={totalDebtPayment}
              disabled
              onChange={(e) => setTotalDebtPayment(Number(e.target.value))}
              placeholder="Enter total debt payment"
              className="w-full"
            />

            {/* Textarea for Notes */}
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
      {isNotesOpen && <Notes notes={[notes]} title="DSCR" close={() => setIsNotesOpen(false)} />}
    </div>
  );
};

export default DSCRCalculator;