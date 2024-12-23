import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../../NewComponents/Card";
import CurrentCashflow from "../../NewComponents/CurrentCashflow";
import ExpectedSalary from "../../NewComponents/ExpectedSalary";
import GrossRevenue from "../../NewComponents/GrossRevenue";
import AskingPrice from "../../NewComponents/AskingPrice";
import SDE from "../../NewComponents/SDE";
import DSCRCalculator from "../../NewComponents/DSCRCalculator";
import ProjectedCashflow from "../../NewComponents/ProjectedCashflow";
import GrossMultiple from "../../NewComponents/GrossMultiple";
import SDEMultiple from "../../NewComponents/SDEMultiple";
import SBALoanPayment from "../../NewComponents/SBALoanPayment";
import AdditionalLoanPayment from "../../NewComponents/AdditionalLoanPayment";
import TotalDebtPayments from "../../NewComponents/TotalDebtPayments";
import ProjectedNetProfitMargin from "../../NewComponents/ProjectedNetProfitMargin";
import CustomMetric from "../../NewComponents/CustomMetric";
import TopBar from "../../NewComponents/TopBar";
import { Button } from "../../components/ui/button";
import MetricCard from "../../NewComponents/MetricCard";
import { useParams, useNavigate } from "react-router-dom";
import useBusinessStore from "../../store/buisnessSrore";
import ReportModal from "../../NewComponents/ReportModal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  const params = useParams();
  const { fetchBusiness, updateBusiness, addBusiness } = useBusinessStore();
  const businessid = params.id;
  const [businessData, setBusinessData] = useState<any>();
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isUnAdded, setIsUnAdded] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentCashflow: 0,
    expectedSalary: 0,
    grossRevenue: 0,
    askingPrice: 0,
    sde: 0,
    projectedCashflow: 0,
    totalDebtPayments: 0,
    sbaLoanPayment: 0,
    additionalLoanPayment: 0,
    customMetric: 0,
    projectedNetProfitMargin: 0,
    dscr: 0,
    grossMultiple: 0,
    sdeMultiple: 0,
    loan_sba_amount: 0,
    loan_sba_term: 0,
    loan_sba_rate: 0,
    additional_loan_term: 0,
    additional_loan_rate: 0,
    additional_loan_amount: 0,
    newExpenses: 0,
    additionalDebt: 0,
    notes: {
      currentCashflow: [],
      expectedSalary: [],
      grossRevenue: [],
      askingPrice: [],
      sde: [],
      projectedCashflow: [],
      totalDebtPayments: [],
      sbaLoanPayment: [],
      additionalLoanPayment: [],
      customMetric: [],
      projectedNetProfitMargin: [],
      dscr: [],
      grossMultiple: [],
      sdeMultiple: [],
      business: [],
    },
  });

  const [customMetrics, setCustomMetrics] = useState<
    {
      metricName: string;
      metricValue: string;
      metricType: "X" | "$" | "%" | "N";
      notes: string[];
    }[]
  >([]);

  const [cardOrder, setCardOrder] = useState([
    "currentCashflow",
    "expectedSalary",
    "grossRevenue",
    "askingPrice",
    "sde",
    "DSCRCalculator",
    "ProjectedCashflow",
    "GrossMultiple",
    "SDEMultiple",
    "SBALoanPayment",
    "AdditionalLoanPayment",
    "TotalDebtPayments",
    "ProjectedNetProfitMargin",
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusiness(businessid || "");
      console.log(data)
      setBusinessData(data?.business);
      setState({
        ...state,
        currentCashflow: data?.business?.data?.current_cashflow?.value || 0,
        expectedSalary: data?.business?.data?.expected_salary?.value || 0,
        grossRevenue: data?.business?.data?.gross_revenue?.value || 0,
        askingPrice: data?.business?.data?.asking_price?.value || 0,
        sbaLoanPayment: data?.business?.data?.sba_loan_payment?.value || 0,
        loan_sba_term: data?.business?.data?.loan_sba?.term || 0,
        loan_sba_rate: data?.business?.data?.loan_sba?.rate || 0,
        additional_loan_amount:
          data?.business?.data?.additional_loan.amount || 0,
        additional_loan_term: data?.business?.data?.additional_loan?.term || 0,
        additional_loan_rate: data?.business?.data?.additional_loan?.rate || 0,
        additionalLoanPayment:
          data?.business?.data?.additional_loan?.amount || 0,
        totalDebtPayments:
          data?.business?.data?.total_debt_payments?.value || 0,
        projectedNetProfitMargin:
          data?.business?.metrics?.net_profit_margin?.value || 0,
        dscr: data?.business?.metrics?.dscr?.value || 0,
        grossMultiple: data?.business?.metrics?.gross_multiple?.value || 0,
        sdeMultiple: data?.business?.metrics?.sde_multiple?.value || 0,
        sde: data?.business?.data?.sde?.value || 0,
        projectedCashflow: data?.business?.data?.projected_cashflow?.value || 0,
        loan_sba_amount: data?.business?.data?.loan_sba?.amount || 0,
        newExpenses: data?.business?.data?.new_expenses?.value || 0,
        additionalDebt: data?.business?.data?.additional_debt?.value || 0,
        notes: {
          ...state.notes,
          currentCashflow: data?.business?.data?.current_cashflow?.notes || [] ,
          expectedSalary: data?.business?.data?.expected_salary?.notes || [],
          grossRevenue: data?.business?.data?.gross_revenue?.notes || [],
          askingPrice: data?.business?.data?.asking_price?.notes || [],
          business: data?.business?.data?.business_notes || [],
          sde: data?.business?.data?.sde?.notes || [],
          sdeMultiple: data?.business?.data?.sde_multiple?.notes || [],
          projectedCashflow: data?.business?.data?.projected_cashflow?.notes || [],
          totalDebtPayments: data?.business?.data?.total_debt_payments?.notes || [],
          sbaLoanPayment: data?.business?.data?.loan_sba?.notes || [],
          additionalLoanPayment: data?.business?.data?.additional_loan?.notes || [],
          projectedNetProfitMargin: data?.business?.data?.projected_net_profit_margin?.notes || [],
          grossMultiple: data?.business?.data?.gross_multiple?.notes || [],
          dscr: data?.business?.data?.dscr?.notes || [],
        },
      });

      setCustomMetrics(
        data?.business?.data?.custom_fields?.map((field: any) => ({
          metricName: field.name,
          metricValue: field.value,
          metricType: field.type,
          notes: field.notes,
        })) || []
      );
      
    };
    
    if (localStorage.getItem("user_id")) {
      
      fetchData();
      
      if (localStorage.getItem("business_payload")) {
        setIsUnAdded(true);
        const business = JSON.parse(localStorage.getItem("business_payload")!);
        setBusinessData({ data: business });
        setState({
          ...state,
          currentCashflow: business?.current_cashflow.value || 0,
          expectedSalary: business?.expected_salary.value || 0,
          grossRevenue: business?.gross_revenue.value || 0,
          askingPrice: business?.asking_price.value || 0,
          sbaLoanPayment: business?.sba_loan_payment.value || 0,
          loan_sba_term: business?.loan_sba.term || 0,
          loan_sba_rate: business?.loan_sba.rate || 0,
          additional_loan_amount: business?.additional_loan.amount || 0,
          additional_loan_term: business?.additional_loan.term || 0,
          additional_loan_rate: business?.additional_loan.rate || 0,
          additionalLoanPayment: business?.additional_loan.amount || 0,
          totalDebtPayments:
            business?.loan_sba.amount + business?.additional_loan.amount || 0,
          projectedNetProfitMargin: business?.net_profit_margin || 0,
          dscr: business?.dscr || 0,
          sdeMultiple: business?.sde_multiple || 0,
          sde: business?.sde.value || 0,
          projectedCashflow: business?.projected_cashflow.value || 0,
          loan_sba_amount: business?.loan_sba.amount || 0,
          newExpenses: business?.new_expenses.value || 0,
          additionalDebt: business?.additional_debt.value || 0,
          notes: {
            ...state.notes,
            currentCashflow: business?.current_cashflow?.notes || [],
            expectedSalary: business?.data?.expected_salary?.notes || [],
            grossRevenue: business?.gross_revenue?.notes || [],
            askingPrice: business?.asking_price?.notes || [],
            business: business?.business_notes || [],
          },
        });
      }
    }else{      
      const business = localStorage.getItem("business");
      setIsUnAdded(true);
      if (business) {
        setBusinessData({ data: JSON.parse(business) });
        setState({
          ...state,
          currentCashflow: JSON.parse(business)?.current_cashflow.value || 0,
          askingPrice: JSON.parse(business)?.asking_price.value || 0,
        });
        console.log("business", JSON.parse(business));
      }
    }
  }, []);

  function calculateYearlyPayment(
    loan_amount: number,
    loan_term: number,
    loan_rate: number
  ) {
    if (loan_amount <= 0 || loan_term <= 0 || loan_rate <= 0) {
      return 0; // No payment needed if any parameter is zero or negative
    }

    // Convert the annual rate to a decimal
    const r = loan_rate / 100;

    // Calculate yearly payment using the annuity formula
    const yearlyPayment = (r * loan_amount) / (1 - Math.pow(1 + r, -loan_term));

    return Number(yearlyPayment.toFixed(2)); // Round to 2 decimal places
  }

  useEffect(() => {
    const calculateMetrics = () => {
      const additionalLoanPayment = Math.round( calculateYearlyPayment(
        state.additional_loan_amount,
        state.additional_loan_term,
        state.additional_loan_rate
        ));
      const sbaLoanPayment = Math.round(calculateYearlyPayment(
        state.loan_sba_amount,
        state.loan_sba_term,
        state.loan_sba_rate
      ));

      const dscr =
        state.totalDebtPayments > 0
          ? Number(
              (
                (state.currentCashflow - state.expectedSalary) /
                state.totalDebtPayments
              ).toFixed(4)
            )
          : 0;

      const projectedCashflow =
        state.currentCashflow - state.totalDebtPayments - state.newExpenses;

      const grossMultiple =
        state.grossRevenue > 0
          ? Number((state.askingPrice / state.grossRevenue).toFixed(2))
          : 0;

      const sdeMultiple =
        state.sde > 0 ? Number((state.askingPrice / state.sde).toFixed(2)) : 0;

      const projectedNetProfitMargin =
        state.grossRevenue > 0
          ? Number(((projectedCashflow / state.grossRevenue) * 100).toFixed(2))
          : 0;

      setState((prevState) => ({
        ...prevState,
        // totalDebtPayments,
        dscr,
        projectedCashflow,
        grossMultiple,
        sdeMultiple,
        projectedNetProfitMargin,
        additionalLoanPayment,
        sbaLoanPayment,
      }));
    };

    calculateMetrics();
  }, [
    state.totalDebtPayments,
    state.currentCashflow,
    state.expectedSalary,
    state.totalDebtPayments,
    state.askingPrice,
    state.grossRevenue,
    state.sde,
    state.loan_sba_amount,
    state.additional_loan_amount,
    state.newExpenses,
    state.additionalDebt,
  ]);

  useEffect(() => {
    const totalDebtPayments =
      Number((state.sbaLoanPayment + state.additionalLoanPayment).toFixed(2)) ||
      0;
    setState((prevState) => ({
      ...prevState,
      totalDebtPayments,
    }));
  }, [state.additionalLoanPayment, state.sbaLoanPayment]);

  const handleSave = async () => {
    let payload: any = {
      current_cashflow: {
        value: state.currentCashflow,
        notes: state.notes.currentCashflow,
      },
      expected_salary: {
        value: state.expectedSalary,
        notes: state.notes.expectedSalary,
      },
      gross_revenue: {
        value: state.grossRevenue,
        notes: state.notes.grossRevenue,
      },
      asking_price: {
        value: state.askingPrice,
        notes: state.notes.askingPrice,
      },
      loan_sba: {
        amount: state.loan_sba_amount,
        term: state.loan_sba_term,
        rate: state.loan_sba_rate,
        notes: state.notes.sbaLoanPayment,
      },
      additional_loan: {
        amount: state.additional_loan_amount,
        term: state.additional_loan_term,
        rate: state.additional_loan_rate,
        notes: state.notes.additionalLoanPayment,
      },
      sde: { value: state.sde, notes: state.notes.sde },
      dscr: { value: state.dscr, notes: state.notes.dscr },
      gross_multiple: { value: state.grossMultiple, notes: state.notes.grossMultiple },
      sde_multiple: { value: state.sdeMultiple, notes: state.notes.sdeMultiple },
      projected_cashflow: { value: state.projectedCashflow, notes: state.notes.projectedCashflow },
      projected_net_profit_margin: { value: state.projectedNetProfitMargin, notes: state.notes.projectedNetProfitMargin },
      total_debt_payments: { value: state.totalDebtPayments, notes:state.notes.totalDebtPayments },
      sba_loan_payment: { value: state.sbaLoanPayment, notes: state.notes.sbaLoanPayment },
      additional_loan_payment: { value: state.additionalLoanPayment, notes: state.notes.additionalLoanPayment },
      new_expenses: { value: state.newExpenses },
      additional_debt: { value: state.additionalDebt },
    };

    if (customMetrics.length >= 0) {
      payload = {
        ...payload,
        custom_fields: customMetrics.map((metric) => ({
          name: metric.metricName,
          value: metric.metricValue,
          type: metric.metricType,
          notes: metric.notes,
        })),
      };
    }
    if (localStorage.getItem("user_id")) {
      if (isUnAdded) {
        const updated = await addBusiness({
          ...businessData?.data,
          ...payload,
        });
        console.log("updated", updated);
        setHasChanges(false);
        setIsUnAdded(false);
        localStorage.removeItem("business_payload");
        localStorage.removeItem("business");
        if(updated.business){
          toast.success("Business added successfully!");
        } else {
          toast.error("Failed to add business!");
        }
      } else {
        const updated = await updateBusiness(businessid || "", payload);
        console.log("updated", updated);
        setHasChanges(false);
        if(updated.updatedBusiness){
          toast.success("Business updated successfully!");
        } else {
          toast.error("Failed to update business!");
        }
      }
    } else {
      localStorage.setItem(
        "business_payload",
        JSON.stringify({ ...businessData?.data, ...payload })
      );
      toast.warn("Please login to save!");
      navigate("/login");
      setHasChanges(false);
    }

  };

  const updateLoanSba = (value: {
    amount: number;
    term: number;
    rate: number;
  }) => {
    setState((prevState) => ({
      ...prevState,
      loan_sba_amount: value.amount,
      loan_sba_term: value.term,
      loan_sba_rate: value.rate,
    }));
  };
  const updateLoanAdditionalLoan = (value: {
    amount: number;
    term: number;
    rate: number;
  }) => {
    setState((prevState) => ({
      ...prevState,
      additional_loan_amount: value.amount,
      additional_loan_term: value.term,
      additional_loan_rate: value.rate,
    }));
  };

  const updateNotes = async (key: string, value: string) => {
    setHasChanges(true);
    setState((prevState) => ({
      ...prevState,
      notes: {
        ...prevState.notes,
        [key]: value,
      },
    }));
  };



  const metricCards = cardOrder.map((id) => ({
    id,
    name: id.replace(/([A-Z])/g, " $1"), // Convert camelCase to readable text
    value: state[id as keyof typeof state],
  }));

  const updateState = async (key: string, value: number | string) => {
    setHasChanges(true);
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newOrder = Array.from(cardOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);

    setCardOrder(newOrder);
  };

  const renderCard = (id: string) => {
    switch (id) {
      case "currentCashflow":
        return (
          <Card
            value={state.currentCashflow}
            onSave={(value) => updateState("currentCashflow", value)}
          >
            <CurrentCashflow
              updateNotes={updateNotes}
              state={state}
              updateState={updateState}
            />
          </Card>
        );
      case "expectedSalary":
        return (
          <Card
            value={state.expectedSalary}
            onSave={(value) => updateState("expectedSalary", value)}
          >
            <ExpectedSalary
              updateNotes={updateNotes}
              state={state}
              updateState={updateState}
            />
          </Card>
        );
      case "grossRevenue":
        return (
          <Card
            value={state.grossRevenue}
            onSave={(value) => updateState("grossRevenue", value)}
          >
            <GrossRevenue
              updateNotes={updateNotes}
              state={state}
              updateState={updateState}
            />
          </Card>
        );
      case "askingPrice":
        return (
          <Card
            value={state.askingPrice}
            onSave={(value) => updateState("askingPrice", value)}
          >
            <AskingPrice
              updateNotes={updateNotes}
              state={state}
              updateState={updateState}
            />
          </Card>
        );
      case "sde":
        return (
          <Card value={state.sde} onSave={(value) => updateState("sde", value)}>
            <SDE updateNotes={updateNotes} state={state} updateState={updateState} />
          </Card>
        );
      case "DSCRCalculator":
        return (
          <Card value={state.sde} onSave={(value) => updateState("sde", value)}>
            <DSCRCalculator state={state} updateState={updateState} updateNotes={updateNotes} />
          </Card>
        );
      case "ProjectedCashflow":
        return (
          <Card
            value={state.projectedCashflow}
            onSave={(value) => updateState("projectedCashflow", value)}
          >
            <ProjectedCashflow state={state} updateState={updateState} updateNotes={updateNotes} />
          </Card>
        );
      case "GrossMultiple":
        return (
          <Card value={state.sde} onSave={(value) => updateState("sde", value)}>
            <GrossMultiple state={state} updateState={updateState} updateNotes={updateNotes} />
          </Card>
        );
      case "SDEMultiple":
        return (
          <Card value={state.sde} onSave={(value) => updateState("sde", value)}>
            <SDEMultiple state={state} updateState={updateState} updateNotes={updateNotes} />
          </Card>
        );
      case "SBALoanPayment":
        return (
          <Card
            value={state.sbaLoanPayment}
            onSave={(value) => updateState("sbaLoanPayment", value)}
          >
            <SBALoanPayment
              updateLoanSba={updateLoanSba}
              state={state}
              updateState={updateState} updateNotes={updateNotes}
            />
          </Card>
        );
      case "AdditionalLoanPayment":
        return (
          <Card
            value={state.additionalLoanPayment}
            onSave={(value) => updateState("additionalLoanPayment", value)}
          >
            <AdditionalLoanPayment
              updateAdditionalLoan={updateLoanAdditionalLoan}
              state={state}
              updateState={updateState} updateNotes={updateNotes}
            />
          </Card>
        );
      case "TotalDebtPayments":
        return (
          <Card
            value={state.totalDebtPayments}
            onSave={(value) => updateState("totalDebtPayments", value)}
          >
            <TotalDebtPayments state={state} updateState={updateState} updateNotes={updateNotes} />
          </Card>
        );
      case "ProjectedNetProfitMargin":
        return (
          <Card value={state.sde} onSave={(value) => updateState("sde", value)}>
            <ProjectedNetProfitMargin state={state} updateState={updateState} updateNotes={updateNotes} />
          </Card>
        );
      case "customMetric":
        return (
          <Card value={state.sde} onSave={(value) => updateState("sde", value)}>
            <MetricCard
              state={customMetrics[0]}
              updateMetric={setCustomMetrics}
              deleteCard={(name) => {
                setHasChanges(true);
                setCustomMetrics(
                  customMetrics.filter((metric) => metric.metricName !== name)
                );
              }}
            />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container min-h-screen bg-blue-100 ">
      <TopBar state={state} data={businessData?.data} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="metrics-grid">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: "#E3F2FD", // Tailwind gray-300
                borderRadius: "12px", // Rounded corners
                padding: "16px", // Padding for spacing
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "12px",
                minHeight: "100px",
              }}
              className="shadow-sm"
            >
              {metricCards
                .filter(
                  (card) =>
                    ![
                      "sba_loan_amount",
                      "sba_loan_rate",
                      "sba_loan_term",
                      "additional_debt",
                      "additional_loan_amount",
                      "additional_loan_rate",
                      "additional_loan_term",
                      "growth_rate",
                    ].includes(card.id)
                )
                .map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                          // backgroundColor: "#FFFFFF", // White card background
                          borderRadius: "8px", // Card corners
                          // padding: "8px",
                          // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {renderCard(card.id)}
                      </div>
                    )}
                  </Draggable>
                ))}

              {customMetrics.map((card, index) => (
                <Draggable
                  key={card.metricName}
                  draggableId={card.metricName}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.8 : 1,
                        // backgroundColor: "#FFFFFF", // White card background
                        borderRadius: "8px", // Card corners
                        // padding: "8px",
                        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Card
                        value={state.sde}
                        onSave={(value) => updateState("sde", value)}
                      >
                        <MetricCard
                          state={customMetrics[index]}
                          updateMetric={setCustomMetrics}
                          deleteCard={(name) => {
                            setHasChanges(true);
                            setCustomMetrics(
                              customMetrics.filter(
                                (metric) => metric.metricName !== name
                              )
                            );
                          }}
                        />
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-between mx-4 mt-4 pb-3">
        {/* <Button className="bg-blue-500 text-white" onClick={() => setReportModalOpen(true)}>Download Report</Button>
       <NotesComponent state={state} updateState={updateState} />
        */}
        <div>
        <Card value={0} onSave={(value) => updateState("customMetric", value)}>
          <CustomMetric
            customMetrics={customMetrics}
            setCustomMetrics={setCustomMetrics}
            setHasChanges={setHasChanges}
            state={state}
            updateState={updateState}
          />
        </Card></div>
        <div>
        {(hasChanges || isUnAdded) && (
          <Button className="bg-green-500 text-white" onClick={handleSave}>
            Save Changes
          </Button>
        )}
        <ToastContainer />
        </div>
      </div>
      {reportModalOpen && (
        <ReportModal data={state} close={() => setReportModalOpen(false)} />
      )}
    </div>
  );
};

export default App;