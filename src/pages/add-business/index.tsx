import { useState } from 'react';
import useBusinessStore from '../../store/buisnessSrore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddBusiness() {
  const [businessData, setBusinessData] = useState({
    business_name: '',
    business_listing_price: '',
    business_gross_revenue: '',
    business_cash_flow: '',
    business_notes: '',
    loan_sba_amount: '',
    loan_sba_amount_type: '1',
    loan_sba_rate: '',
    loan_sba_term: '',
    loan_seller_amount: '',
    loan_seller_amount_type: '1',
    loan_seller_rate: '',
    loan_seller_term: '',
    loan_down_payment: '',
    desired_owner_salary: '',
    additional_startup_capital: '',
    additional_capital_expenses: '',
    expected_annual_growth_rate: '',
  });

  const navigate = useNavigate();
  const { addBusiness, isLoading } = useBusinessStore();

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (
      name.includes('business') ||
      name.includes('loan') ||
      name === 'desired_owner_salary' ||
      name === 'additional_startup_capital' ||
      name === 'additional_capital_expenses'
    ) {
      const rawValue = value.replace(/,/g, '');
      const formattedValue =
        !isNaN(Number(rawValue)) && rawValue !== ''
          ? new Intl.NumberFormat().format(Number(rawValue))
          : value;

      setBusinessData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setBusinessData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const removeCommas = (data: any) => {
    const cleanedData = { ...data };
    for (const key in cleanedData) {
      if (typeof cleanedData[key] === 'string') {
        cleanedData[key] = cleanedData[key].replace(/,/g, '');
      }
    }
    return cleanedData;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let clean_business_data = removeCommas(businessData);
      console.log(clean_business_data);
      if (clean_business_data.loan_seller_amount_type === '2') {
        let loan_seller_amount_in_percentage =
          clean_business_data.loan_seller_amount / 100;
        clean_business_data.loan_seller_amount =
          Number(loan_seller_amount_in_percentage) *
          Number(clean_business_data.business_listing_price);
      }
      if (clean_business_data.loan_sba_amount_type === '2') {
        let loan_sba_amount_in_percentage =
          clean_business_data.loan_sba_amount / 100;
        clean_business_data.loan_sba_amount =
          Number(loan_sba_amount_in_percentage) *
          Number(clean_business_data.business_listing_price);
      }

      delete clean_business_data.loan_seller_amount_type;
      delete clean_business_data.loan_sba_amount_type;

      const res = await addBusiness(clean_business_data);
      toast.success('Business added successfully!');
      navigate('/dashboard/' + res?.newBusiness._id);
    } catch (error: any) {
      const errorMessage =
        (error as any)?.message?.split(',')[0] || 'Failed to add business';
      toast.error(errorMessage);
    }
  };
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="flex items-center justify-between mt-6 sm:mx-[60px] mx-[30px]">
        <div className="text-[#3B37FF] sm:text-[24px] text-[20px] leading-[36px] font-medium ">
          Business Evaluations
        </div>
        <div className="flex items-center gap-4">
          {user_id && token ? (
            <button
              onClick={() => navigate('/compare-results')}
              className="bg-[#3B37FF] text-[#ffff] font-medium sm:px-[40px] sm:py-[11px] px-[20px] py-[8px] rounded-[10px]"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-[#3B37FF] text-[#ffff] font-medium sm:px-[40px] sm:py-[11px] px-[20px] py-[8px] rounded-[10px]"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-[60px] ">
        <h1 className="text-[24px] font-medium leading-[36px] text-center">
          Business Information
        </h1>
        <p className="text-sm font-normal text-center sm:px-[0px] px-[12px]">
          Enter the essential details of the business for accurate evaluation
          and comparison.
        </p>
        <div className="mt-[30px] sm:flex-row flex flex-col gap-4 items-center justify-center">
          <div className="relative">
            <label
              htmlFor="business_name"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Your Business Name
            </label>
            <input
              id="business_name"
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
              name="business_name"
              value={businessData.business_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="business_listing_price"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Listing Price ($)
            </label>
            <input
              name="business_listing_price"
              value={businessData.business_listing_price}
              onChange={handleInputChange}
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
            />
          </div>
        </div>
        <div className="mt-[22px] sm:flex-row flex flex-col gap-5 items-center justify-center">
          <div className="relative">
            <label
              htmlFor="business_gross_revenue"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Gross Revenue ($)
            </label>
            <input
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
              name="business_gross_revenue"
              value={businessData.business_gross_revenue}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="business_cash_flow"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Cash Flow / SDE ($)
            </label>
            <input
              name="business_cash_flow"
              value={businessData.business_cash_flow}
              onChange={handleInputChange}
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
            />
          </div>
        </div>
        <div className="mt-[22px] relative">
          <label
            htmlFor="business_notes"
            className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
          >
            Add any links or notes
          </label>
          <textarea
            className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] min-w-[360px] sm:min-w-[450px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
            name="business_notes"
            value={businessData.business_notes}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="my-[60px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[24px] font-medium leading-[36px] text-center">
            Financing Information
          </h1>
          <p className="text-sm font-normal text-center sm:px-[0px] px-[12px]">
            Provide the financing details to calculate loan terms, payments, and
            overall financial projections.
          </p>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-[30px]">
            <div className="flex flex-col items-center justify-center sm:min-w-[400px] min-w-[360px]">
              <label className="mb-2 font-medium" htmlFor="">
                SBA Loan Details
              </label>
              <div className="flex items-end gap-3 w-full">
                <div className="relative mt-[22px] grow w-full">
                  <label
                    htmlFor="loan_sba_amount"
                    className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
                  >
                    Loan Amount (
                    {businessData.loan_sba_amount_type == '1' ? '$' : '%'})
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text:[14px] focus:outline-none"
                    type="text"
                    name="loan_sba_amount"
                    value={businessData.loan_sba_amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <select
                    name="loan_sba_amount_type"
                    id="loan_sba_amount_type"
                    value={businessData.loan_sba_amount_type}
                    onChange={handleInputChange}
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] min-w-[50px] placeholder:text-[#8F8F8F] placeholder:text:[14px] focus:outline-none"
                  >
                    <option value="1">$</option>
                    <option value="2">%</option>
                  </select>
                </div>
              </div>
              <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-4 mt-[24px]">
                <div className="relative w-full">
                  <label
                    htmlFor="loan_sba_rate"
                    className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
                  >
                    Loan Rate (%)
                  </label>
                  <input
                    className="w-full bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    type="text"
                    name="loan_sba_rate"
                    value={businessData.loan_sba_rate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="loan_sba_term"
                    className="w-fit absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
                  >
                    Loan Term (in yrs)
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    type="text"
                    name="loan_sba_term"
                    value={businessData.loan_sba_term}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center sm:min-w-[400px] min-w-[360px]">
              <label className="mb-2 font-medium" htmlFor="">
                Seller Loan Details
              </label>
              <div className="flex items-end gap-3 w-full">
                <div className="relative mt-[22px] grow">
                  <label
                    htmlFor="loan_seller_amount"
                    className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
                  >
                    Loan Amount (
                    {businessData.loan_seller_amount_type === '1' ? '$' : '%'})
                  </label>
                  <input
                    className="bg-[#3B37FF0D]/5 px-[15px] w-full py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] placeholder:text-[#8F8F8F] placeholder:text:[14px] focus:outline-none"
                    type="text"
                    name="loan_seller_amount"
                    value={businessData.loan_seller_amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-[80px]">
                  <select
                    name="loan_seller_amount_type"
                    id="loan_seller_amount_type"
                    value={businessData.loan_seller_amount_type}
                    onChange={handleInputChange}
                    className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] w-full placeholder:text-[#8F8F8F] placeholder:text:[14px] focus:outline-none"
                  >
                    <option value="1">$</option>
                    <option value="2">%</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-4 mt-[24px]">
                <div className="relative w-full">
                  <label
                    htmlFor="loan_seller_rate"
                    className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
                  >
                    Loan Rate (%)
                  </label>
                  <input
                    className="w-full bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    type="text"
                    name="loan_seller_rate"
                    value={businessData.loan_seller_rate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="loan_seller_term"
                    className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
                  >
                    Loan Term (in yrs)
                  </label>
                  <input
                    className="w-full bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
                    type="text"
                    name="loan_seller_term"
                    value={businessData.loan_seller_term}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[22px]">
          <div className="relative">
            <label
              htmlFor="loan_down_payment"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Down Payment ($)
            </label>
            <input
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
              name="loan_down_payment"
              value={businessData.loan_down_payment}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:mb-[30px]">
        <h1 className="text-[24px] font-medium leading-[36px]">Assumptions</h1>
        <p className="text-sm font-normal text-center sm:px-[0px] px-[12px]">
          Input your assumptions to tailor the evaluation based on your
          financial expectations and business goals
        </p>
        <div className="mt-[30px] flex sm:flex-row flex-col gap-5 items-center justify-center">
          <div className="relative">
            <label
              htmlFor="desired_owner_salary"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Desired Owner Salary ($)
            </label>
            <input
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
              name="desired_owner_salary"
              value={businessData.desired_owner_salary}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="additional_startup_capital"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Additional Startup Capital ($)
            </label>
            <input
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
              name="additional_startup_capital"
              value={businessData.additional_startup_capital}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-[16px] flex sm:flex-row flex-col gap-5 items-center justify-center">
          <div className="relative mt-2">
            <label
              htmlFor="additional_capital_expenses"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Additional Capital Expenses ($)
            </label>
            <input
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
              name="additional_capital_expenses"
              value={businessData.additional_capital_expenses}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative mt-2">
            <label
              htmlFor="additional_capital_expenses"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Expected Annual Growth Rate (%)
            </label>
            <input
              className="bg-[#3B37FF0D]/5 px-[15px] py-[17px] border border-[#3B37FF2B]/15 rounded-[10px] sm:min-w-[400px] min-w-[360px] placeholder:text-[#8F8F8F] placeholder:text-[14px] focus:outline-none"
              type="text"
              name="expected_annual_growth_rate"
              value={businessData.expected_annual_growth_rate}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-[60px]">
        <div className="flex items-center justify-center mt-[30px]">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-[#3B37FF] text-[#ffff] font-medium px-[40px] py-[11px] rounded-[10px]"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Evaluate'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBusiness;
