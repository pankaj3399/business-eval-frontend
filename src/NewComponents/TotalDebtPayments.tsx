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

const TotalDebtPayments: React.FC<Props> = ({ state, updateState,updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalDebtPayments, setTotalDebtPayments] = useState(state.totalDebtPayments);
  const [sbaLoanPayment, setSbaLoanPayment] = useState(state.sbaLoanPayment);
  const [additionalLoanPayment, setAdditionalLoanPayment] = useState(state.additionalLoanPayment);
  // const [additionalDebt, setAdditionalDebt] = useState(state.additionalDebt);
  const [notes, setNotes] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    setTotalDebtPayments(state.totalDebtPayments);
    setSbaLoanPayment(state.sbaLoanPayment);
    setAdditionalLoanPayment(state.additionalLoanPayment);
    // setAdditionalDebt(state.additionalDebt);
    setNotes(state.notes.totalDebtPayments)
  } ,[state]);

  const handleSaveChanges = () => {
    updateNotes("totalDebtPayments", notes);
    updateState("totalDebtPayments", totalDebtPayments);
    updateState("sbaLoanPayment", sbaLoanPayment);
    updateState("additionalLoanPayment", additionalLoanPayment);
    // updateState("additionalDebt", additionalDebt);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setTotalDebtPayments(state.totalDebtPayments);
    setSbaLoanPayment(state.sbaLoanPayment);
    setAdditionalLoanPayment(state.additionalLoanPayment);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="m-1 h-full">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">Total Debt Payments</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl flex-1  text-blue-500">{`$${state.totalDebtPayments.toLocaleString()}`} <span className="text-sm text-gray-500">/year</span></p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.totalDebtPayments || ""}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Total Debt Payments Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="totalDebtPayments">
              Total Debt Payments
            </label>
            <Input
              id="totalDebtPayments"
              type="text"
              value={totalDebtPayments.toLocaleString()}
              disabled
              onChange={(e) => setTotalDebtPayments(parseFloat(e.target.value))}
              placeholder="Auto Calculated"
              className="w-full"
            />
            
            <label className="font-semibold" htmlFor="sbaLoanPayment">
              SBA Loan Payment
            </label>
            <Input
              id="sbaLoanPayment"
              type="text"
              value={sbaLoanPayment.toLocaleString()}
              disabled
              onChange={(e) => setSbaLoanPayment(parseFloat(e.target.value))}
              placeholder="Enter SBA Loan Payment"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="additionalLoanPayment">
              Additional Loan Payment
            </label>
            <Input
              id="additionalLoanPayment"
              type="text"
              disabled
              value={additionalLoanPayment.toLocaleString()}
              onChange={(e) => setAdditionalLoanPayment(parseFloat(e.target.value))}
              placeholder="Enter Additional Loan Payment"
              className="w-full"
            />
            {/* <label className="font-semibold" htmlFor="sbaLoanPayment">
              Additional Debt
            </label>
            <Input
              id="sbaLoanPayment"
              type="number"
              value={additionalDebt}
              onChange={(e) => setAdditionalDebt(parseFloat(e.target.value))}
              placeholder="Enter Additional Debt"
              className="w-full"
            /> */}
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
      {isNotesOpen && <Notes notes={[notes]} title="Total Debt Payments" close={() => setIsNotesOpen(false)} />}    
    </div>
  );
};

export default TotalDebtPayments;