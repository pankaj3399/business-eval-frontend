import { RiPencilFill } from 'react-icons/ri';
import user from '../../assets/image.svg';
import { CashflowChart } from '../../components/cashflow-chart/cashflow-chart';
import { LineChartCard } from '../../components/linechart';
import { BarChartComponent } from '../../components/barchart';
import DataTable from '../../components/Table';
import useBusinessStore from '../../store/buisnessSrore';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from '../../components/modal';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

function Dashboard() {
  const { fetchBusiness, updateBusiness, business, isLoading, error } =
    useBusinessStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reportFormat, setReportFormat] = useState('csv');
  const { id } = useParams();

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [formData, setFormData] = useState({
    business_name: '',
    business_listing_price: '',
    business_gross_revenue: '',
    business_cash_flow: '',
    business_notes: '',
    loan_sba_amount: '',
    loan_sba_rate: '',
    loan_sba_term: '',
    loan_seller_amount: '',
    loan_seller_rate: '',
    loan_seller_term: '',
    loan_down_payment: '',
    desired_owner_salary: '',
    additional_startup_capital: '',
    additional_capital_expenses: '',
    expected_annual_growth_rate: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFormData({
      business_name: business?.business?.data?.business_name,
      business_listing_price: business?.business?.data?.business_listing_price,
      business_gross_revenue: business?.business?.data?.business_gross_revenue,
      business_cash_flow: business?.business?.data?.business_cash_flow,
      business_notes: business?.business?.data?.business_notes,
      loan_sba_amount: business?.business?.data?.loan_sba_amount,
      loan_sba_rate: business?.business?.data?.loan_sba_rate,
      loan_sba_term: business?.business?.data?.loan_sba_term,
      loan_seller_amount: business?.business?.data?.loan_seller_amount,
      loan_seller_rate: business?.business?.data?.loan_seller_rate,
      loan_seller_term: business?.business?.data?.loan_seller_term,
      loan_down_payment: business?.business?.data?.loan_down_payment,
      desired_owner_salary: business?.business?.data?.desired_owner_salary,
      additional_startup_capital:
        business?.business?.data?.additional_startup_capital,
      additional_capital_expenses:
        business?.business?.data?.additional_capital_expenses,
      expected_annual_growth_rate:
        business?.business?.data?.expected_annual_growth_rate,
    });
  }, [business]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (id) {
      fetchBusiness(id);
    }
  }, [fetchBusiness, id]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const sensitivityAnalysis = business?.business?.metrics?.sensitivityAnalysis;

  const chartData =
    business?.business?.metrics.advancedProjections?.map(
      ({ year, expenses }: { year: number; expenses: number }) => ({
        year,
        expenses,
      })
    ) || [];
  console.log(chartData);

  const LineChartData =
    business?.business?.metrics.advancedProjections?.map(
      ({ year, cash_flow }: { year: number; cash_flow: number }) => ({
        year,
        cash_flow,
      })
    ) || [];

  const cashFlowChartData =
    business?.business?.metrics.advancedProjections?.map(
      ({ year, revenue }: { year: number; revenue: number }) => ({
        year,
        revenue, // Keep revenue as a number
      })
    ) || [];

  const handleUpdate = async () => {
    if (!id) return;
    try {
      const res = await updateBusiness(id, formData);
      if (res) {
        fetchBusiness(id);
      }
      toast.success('Business data updated successfully!');
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSave = async () => {
    await handleUpdate();
    closeModal();
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    window.location.href = '/';
  };

  const generatePDF = (data: any) => {
    let doc: any = new jsPDF();
    doc.setFontSize(14);
    doc.text('Business Report', 10, 10);
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;
    let page = 1;
    doc.page = page;
    Object.entries(data[0]).forEach(([key, value]) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.text(`${key}: ${value}`, 10, y);
      y += 10;
    });

    if (page > 1) {
      doc.save(`business_report_${page}.pdf`);
    } else {
      doc.save('business_report.pdf');
    }
  };

  const downloadExcel = (data: any, filename = 'business_report.xlsx') => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, filename);
  };

  const handleGenerateReport = () => {
    if (business?.business?.metrics) {
      const {
        roi,
        dscr,
        npv,
        irr,
        break_even_revenue,
        payback_period,
        gross_profit_margin,
        net_profit_margin,
        equity_multiple,
        sde_multiple,
        cash_flow_after_purchase,
        yearly_debt_payments,
        sellerLoadPayment,
        cash_flow_projection = [],
        advancedProjections = [],
        sensitivityAnalysis: {
          Pessimistic: {
            growth_rate: growth_rate_pessimistic = 0,
            npv_low_discount: npv_low_pessimistic = 0,
            npv_medium_discount: npv_medium_pessimistic = 0,
            npv_high_discount: npv_high_pessimistic = 0,
          } = {},
          Base: {
            growth_rate: growth_rate_base = 0,
            npv_low_discount: npv_low_base = 0,
            npv_medium_discount: npv_medium_base = 0,
            npv_high_discount: npv_high_base = 0,
          } = {},
          Optimistic: {
            growth_rate: growth_rate_optimistic = 0,
            npv_low_discount: npv_low_optimistic = 0,
            npv_medium_discount: npv_medium_optimistic = 0,
            npv_high_discount: npv_high_optimistic = 0,
          } = {},
        } = {},
      } = business.business.metrics;

      // const formattedAdvancedProjections = advancedProjections
      //   .map(
      //     ({
      //       year,
      //       revenue,
      //       expenses,
      //       cash_flow,
      //     }: {
      //       year: number;
      //       revenue: number;
      //       expenses: number;
      //       cash_flow: number;
      //     }) =>
      //       `Year ${year}:\n  Revenue: $${revenue.toFixed(2)}\n  Expenses: $${expenses.toFixed(2)}\n  Cash Flow: $${cash_flow.toFixed(2)}`
      //   )
      //   .join('\n\n');

      const formatCashFlowProjection: any = {};

      for (const projection of advancedProjections) {
        formatCashFlowProjection['cash_flow_year_' + projection.year] =
          projection.cash_flow;
      }
      for (const projection of advancedProjections) {
        formatCashFlowProjection['revenue_year_' + projection.year] =
          projection.revenue;
      }
      for (const projection of advancedProjections) {
        formatCashFlowProjection['expenses_year_' + projection.year] =
          projection.expenses;
      }

      const reportData = [
        {
          roi,
          dscr,
          npv,
          irr,
          break_even_revenue,
          payback_period,
          gross_profit_margin,
          net_profit_margin,
          equity_multiple,
          sde_multiple,
          cash_flow_after_purchase,
          yearly_debt_payments,
          sellerLoadPayment,
          cash_flow_projection: cash_flow_projection.join(', '),
          growth_rate_pessimistic: growth_rate_pessimistic,
          npv_low_pessimistic: npv_low_pessimistic,
          npv_medium_pessimistic: npv_medium_pessimistic,
          npv_high_pessimistic: npv_high_pessimistic,
          growth_rate_base: growth_rate_base,
          npv_low_base: npv_low_base,
          pv_medium_base: npv_medium_base,
          npv_high_base: npv_high_base,
          growth_rate_optimistic: growth_rate_optimistic,
          npv_low_optimistic: npv_low_optimistic,
          npv_medium_optimistic: npv_medium_optimistic,
          npv_high_optimistic: npv_high_optimistic,
          ...formatCashFlowProjection,
        },
      ];

      if (reportFormat === 'csv' || reportFormat === 'excel') {
        downloadExcel(
          reportData,
          `business_report.${reportFormat === 'excel' ? 'xlsx' : 'csv'}`
        );
      } else if (reportFormat === 'pdf') {
        generatePDF(reportData);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-6">
      <ToastContainer />
      <div className="pt-6 sm:mx-[60px] mx-[30px] flex justify-between items-center">
        <h1 className="text-[#272727] sm:text-[24px] sm:leading-[36px] font-medium">
          Business Evaluations
        </h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate('/')}
            className="bg-[#272727] text-white font-medium px-4 py-3 rounded-[10px]"
          >
            Evaluate business
          </button>
          {user_id && token && (
            <div
              onClick={toggleDropdown}
              className="border-[2px] border-black rounded-full cursor-pointer"
            >
              <img className="p-2" src={user} alt="" />
            </div>
          )}

          {dropdownOpen && (
            <div className="absolute right-10 top-[70px] mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between mx-[60px] mt-[25px]">
        <div className="">
          <h1 className="text-[#3B37FF] text-[26px] leading-[24px] font-bold">
            {business?.business?.data?.business_name}
          </h1>
          <div
            onClick={openModal}
            className="flex items-center gap-1 mt-1 cursor-pointer"
          >
            <h3>Edit values</h3>
            <RiPencilFill className="text-[#2B3674] text-[20px]" />
          </div>
        </div>
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
        >
          <div>
            <h2 className="text-[24px] leading-[36px] font-normal mb-[8px]">
              Business Information
            </h2>
            <div className="grid grid-cols-4 gap-5">
              <div>
                <label className="text-[#A3AED0] text-sm" htmlFor="">
                  Business Name
                </label>
                <input
                  className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                  placeholder="Business Name"
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-[#A3AED0] text-sm" htmlFor="">
                  Listing price ($)
                </label>
                <input
                  className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                  placeholder="Listing price ($)"
                  type="text"
                  name="business_listing_price"
                  value={formData.business_listing_price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-[#A3AED0] text-sm" htmlFor="">
                  Gross Revenue ($)
                </label>
                <input
                  className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                  placeholder="Gross Revenue ($)"
                  type="text"
                  name="business_gross_revenue"
                  value={formData.business_gross_revenue}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-[#A3AED0] text-sm" htmlFor="">
                  SDE / Cash flow ($)
                </label>
                <input
                  className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                  placeholder="SDE / Cash flow ($)"
                  type="text"
                  name="business_cash_flow"
                  value={formData.business_cash_flow}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-[30px]">
            <h2 className="text-[24px] leading-[36px] font-normal mb-[8px]">
              Financing Information
            </h2>
            <div className="flex flex-col">
              <label className="text-[#A3AED0] text-sm" htmlFor="">
                Down Payment
              </label>
              <div>
                <input
                  className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] min-w-[400px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                  placeholder="Down Payment"
                  type="text"
                  name="loan_down_payment"
                  value={formData.loan_down_payment}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-medium mt-4 mb-[2px]">
                SBA Loan Details
              </h3>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Loan Amount
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Loan Amount"
                    type="text"
                    name="loan_sba_amount"
                    value={formData.loan_sba_amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Loan Interest (%)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Loan Interest (%)"
                    type="text"
                    name="loan_sba_rate"
                    value={formData.loan_sba_rate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Loan term (in yrs)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Loan term (in yrs)"
                    type="text"
                    name="loan_sba_term"
                    value={formData.loan_sba_term}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[10px]">
              <h3 className="text-[16px] font-medium mt-4 mb-[2px]">
                Seller Loan Details
              </h3>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Loan Amount
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Loan Amount"
                    type="text"
                    name="loan_seller_amount"
                    value={formData.loan_seller_amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Loan Interest (%)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Loan Interest (%)"
                    type="text"
                    name="loan_seller_rate"
                    value={formData.loan_seller_rate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Loan term (in yrs)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Loan term (in yrs)"
                    type="text"
                    name="loan_seller_term"
                    value={formData.loan_seller_term}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-[24px] leading-[36px] font-normal my-[8px]">
                Assumptions
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Desired Owner Salary ($)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Desired Owner Salary ($)"
                    type="text"
                    name="desired_owner_salary"
                    value={formData.desired_owner_salary}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Additional Capital Expense ($)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Additional Capital Expense ($)"
                    type="text"
                    name="additional_capital_expenses"
                    value={formData.additional_capital_expenses}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Additional Startup Capital ($)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Additional Startup Capital ($)"
                    type="text"
                    name="additional_startup_capital"
                    value={formData.additional_startup_capital}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-[#A3AED0] text-sm" htmlFor="">
                    Expected Annual Growth Rate (%)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    placeholder="Expected Annual Growth Rate (%)"
                    type="text"
                    name="expected_annual_growth_rate"
                    value={formData.expected_annual_growth_rate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
        <div className="flex gap-2 items-center">
          <div>
            <button
              onClick={() => {
                if (user_id && token) navigate('/compare-results');
                else navigate('/login');
              }}
              className="text-[#3B37FF] font-medium px-2 py-[10px] rounded-[10px] border-[#3B37FF] border text-sm"
            >
              Dashboard
            </button>
          </div>

          <div className="space-x-2 flex items-center">
            <button
              className="bg-[#3B37FF] text-[#ffff] font-medium px-4 py-3 rounded-[10px] text-sm"
              onClick={handleGenerateReport}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Report'}
            </button>
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="mb-3 mt-3 border border-[#3B37FF] rounded-[10px] px-2 py-2 text-[#3B37FF] text-sm"
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-[22px] grid sm:grid-cols-7 mx-[60px] gap-[8px]">
        {[
          {
            title: 'ROI',
            subtitle: 'Return on Investment',
            value: `$ ${business?.business?.metrics?.roi || 0}`,
          },
          {
            title: 'DSCR',
            subtitle: 'Debt Service Coverage Ratio',
            value: business?.business?.metrics?.dscr || 0,
          },
          {
            title: 'Net Profit Margins',
            subtitle: 'Post Purchase',
            value: `${business?.business?.metrics?.net_profit_margin || 0} %`,
          },
          {
            title: 'Break-even Point',
            subtitle: '',
            value: `${business?.business?.metrics?.break_even_revenue || 0}x`,
          },
          {
            title: 'Payback Period',
            subtitle: '',
            value: `${business?.business?.metrics?.payback_period || 0} years`,
          },
          {
            title: 'Equity Multiple',
            subtitle: '',
            value: `${business?.business?.metrics?.equity_multiple?.toString().slice(0, 4) || 0}x`,
          },
          {
            title: 'SDE Multiple',
            subtitle: '',
            value: `${business?.business?.metrics?.sde_multiple || 0}x`,
          },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center h-full p-[20px] bg-[#2B3674] rounded-[15px]"
          >
            <div>
              <h3 className="text-[16px] text-[#FFFFFF] font-semibold leading-[24px]">
                {metric.title}
              </h3>
              {metric.subtitle && (
                <p className="text-[#A3AED0] text-xs font-medium">
                  {metric.subtitle}
                </p>
              )}
            </div>
            <h3 className="text-[#FFFFFF] text-[20px] leading-[32px] font-bold">
              {metric.value}
            </h3>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 sm:mx-[60px] my-6 gap-6">
        <div className="col-span-1">
          <div className="sm:p-3">
            <LineChartCard chartData={LineChartData} />
          </div>
          <div className="mt-4">
            <CashflowChart data={cashFlowChartData} />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mt-3">
            <BarChartComponent chartData={chartData} />
          </div>
          <div className="mt-8">
            <DataTable data={sensitivityAnalysis} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
