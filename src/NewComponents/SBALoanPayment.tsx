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
  updateState: (key: string, value: any) => void;
  updateLoanSba: (value: {
    amount: number;
    term: number;
    rate: number;
}) => void
updateNotes: (key: string, value: string) => Promise<void>;
}

const SbaLoanPaymentCard: React.FC<Props> = ({ state, updateLoanSba, updateState, updateNotes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loanPayment, setLoanPayment] = useState(state.sbaLoanPayment);
  const [loanAmount, setLoanAmount] = useState(state.loan_sba_amount);
  const [loanRate, setLoanRate] = useState(state.loan_sba_rate);
  const [loanTerm, setLoanTerm] = useState(state.loan_sba_term);
  const [notes, setNotes] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);

  useEffect(() => {
    setLoanPayment(state.sbaLoanPayment);
    setLoanAmount(state.loan_sba_amount);
    setLoanRate(state.loan_sba_rate);
    setLoanTerm(state.loan_sba_term);
  }, [state]);

  const handleSaveChanges = () => {
    updateNotes("sbaLoanPayment", notes);
    updateState("sbaLoanPayment", loanPayment);
    updateLoanSba({amount: loanAmount, term: loanTerm, rate: loanRate});
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setLoanPayment(state.sbaLoanPayment);
    setLoanAmount(state.loan_sba_amount);
    setLoanRate(state.loan_sba_rate);
    setLoanTerm(state.loan_sba_term);
    setNotes("");
    setIsDialogOpen(false);
  };

  const calculateLoanPayment = () => {
    if (loanAmount && loanRate && loanTerm) {
      const monthlyRate = loanRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      console.log(loanPayment)
      const payment =
        loanAmount *
        (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments)));
      setLoanPayment(parseFloat(payment.toFixed(2)));
    }
  };



  return (
    <div className="m-1 h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white flex flex-col rounded-xl border border-gray-400 shadow-md p-4 cursor-pointer hover:shadow-lg h-full relative">
          <div className="flex gap-2 mb-2 justify-between items-center">
             <h3 className="flex-1 text-xs text-gray-500">SBA Loan Payment</h3>
              {/* <button className="text-sm text-gray-500 mx-2" onClick={(e) =>{e.preventDefault(); setIsNotesOpen(true)}}>
                <NotepadText className="w-4 h-4" /> 
              </button> */}
            </div>
            <p className="text-xl flex-1  text-blue-500">{`$${state.sbaLoanPayment.toLocaleString()}`} <span className="text-sm text-gray-500">/year</span></p>
            <p className="text-[0.65rem] text-gray-500">{state?.notes?.sbaLoanPayment || ""}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit SBA Loan Payment Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <label className="font-semibold" htmlFor="loanAmount">
              SBA Loan Payment (/year)
            </label>
            <Input
              id="loanAmount"
              type="text"
              disabled
              value={loanPayment.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setLoanPayment(Number(numericValue));
                }
              }}
              placeholder="auto calculated"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="loanAmount">
              Loan Amount
            </label>
            <Input
              id="loanAmount"
              type="text"
              value={loanAmount?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setLoanAmount(Number(numericValue));
                }
              }}
              placeholder="Enter Loan Amount"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="loanRate">
              Loan Rate (%)
            </label>
            <Input
              id="loanRate"
              type="number"
              value={loanRate?.toLocaleString()}
              onChange={(e) => {
                setLoanRate(Number(e.target.value));
              }}
              placeholder="Enter Loan Rate"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="loanTerm">
              Loan Term (Years)
            </label>
            <Input
              id="loanTerm"
              type="text"
              value={loanTerm?.toLocaleString()}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(numericValue))) {
                  setLoanTerm(Number(numericValue));
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
            <Button
              onClick={() => {
                calculateLoanPayment();
                handleSaveChanges();
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {isNotesOpen && <Notes notes={state.notes.sbaLoanPayment} title="SBA Loan Payment" close={() => setIsNotesOpen(false)} />}    
    </div>
  );
};

export default SbaLoanPaymentCard;
