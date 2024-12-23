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
  updateAdditionalLoan: (value: { amount: number; term: number; rate: number }) => void;
  updateNotes: (key: string, value: string) => Promise<void>
}

const AdditionalLoanPayment: React.FC<Props> = ({ state, updateAdditionalLoan, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [additionalLoanPayment, setAdditionalLoanPayment] = useState(state.additionalLoanPayment);
  const [additionalLoanAmount, setAdditionalLoanAmount] = useState(state.additional_loan_amount);
  const [additionalLoanRate, setAdditionalLoanRate] = useState(state.additional_loan_rate);
  const [additionalLoanTerm, setAdditionalLoanTerm] = useState(state.additional_loan_term);
  const [notes, setNotes] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {   
    setAdditionalLoanPayment(state.additionalLoanPayment);
    setAdditionalLoanAmount(state.additional_loan_amount);
    setAdditionalLoanRate(state.additional_loan_rate);
    setAdditionalLoanTerm(state.additional_loan_term);
  }, [state]);

  const handleSaveChanges = () => {
    updateAdditionalLoan({ amount: additionalLoanAmount, term: additionalLoanTerm, rate: additionalLoanRate });
    updateNotes("additionalLoanPayment", notes);
    updateState("additionalLoanPayment", additionalLoanPayment);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setAdditionalLoanPayment(state.additionalLoanPayment);
    setAdditionalLoanAmount(state.additional_loan_amount);
    setAdditionalLoanRate(state.additional_loan_rate);
    setAdditionalLoanTerm(state.additional_loan_term);
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
             <h3 className="flex-1 text-xs text-gray-500">Additional Loan Payment</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) => {e.stopPropagation(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" />
              </button> */}
            </div>
            <p className="text-xl flex-1  text-blue-500">{`$${state.additionalLoanPayment.toLocaleString()}`} <span className="text-sm text-gray-500">/year</span></p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.additionalLoanPayment || ""}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Additional Loan Payment Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="additionalLoanPayment">
              Additional Loan Payment (Yearly)
            </label>
            <Input
              id="additionalLoanPayment"
              type="text"
              value={additionalLoanPayment?.toLocaleString()} 
              disabled
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setAdditionalLoanPayment(Number(numericValue));
                }
              }}
              placeholder="Enter Additional Loan Payment"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="additionalLoanAmount">
              Additional Loan Amount
            </label>
            <Input
              id="additionalLoanAmount"
              type="text"
              value={additionalLoanAmount?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setAdditionalLoanAmount(Number(numericValue));
                }
              }}
              placeholder="Enter Loan Amount"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="additionalLoanRate">
              Additional Loan Rate (%)
            </label>
            <Input
              id="additionalLoanRate"
              type="number"
              value={additionalLoanRate}
              onChange={(e) => {
                setAdditionalLoanRate(Number(e.target.value));
              }}
              placeholder="Enter Loan Rate"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="additionalLoanTerm">
              Additional Loan Term (Years)
            </label>
            <Input
              id="additionalLoanTerm"
              type="text"
              value={additionalLoanTerm?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setAdditionalLoanTerm(Number(numericValue));
                }
              }}
              placeholder="Enter Loan Term"
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
      {isNotesOpen && <Notes notes={state.notes.additionalLoanPayment} title="Additional Loan Payment" close={() => setIsNotesOpen(false)} />}
    </div>
  );
};

export default AdditionalLoanPayment;
