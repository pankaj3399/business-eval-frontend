import { useState, useEffect } from 'react';
import user from '../../assets/image.svg';
import { FaTrashAlt, FaArrowUp, FaArrowDown, FaInfoCircle } from 'react-icons/fa';
import useBusinessStore from '../../store/buisnessSrore';
import { useNavigate } from 'react-router-dom';

function Index() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const { fetchAllBusiness, allBusiness, deleteBusiness } = useBusinessStore();
  const navigate = useNavigate();

  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAllBusiness();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    window.location.href = '/';
  };

  const handleDelete = async (company: string) => {
    console.log(`${company} deleted`);
    try {
      const res = await deleteBusiness(company);
      if (res) fetchAllBusiness();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const sortData = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedBusiness = () => {
    if (!allBusiness) return [];

    const sorted = [...allBusiness].sort((a: any, b: any) => {
      if (!a.metrics || !b.metrics) return 0;

      const valueA = a.metrics[sortConfig.key];
      const valueB = b.metrics[sortConfig.key];

      if (valueA < valueB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  };

  const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {children}
        </div>
        {visible && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-auto p-2 text-sm text-black bg-white rounded shadow-lg z-10">
            {text}
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-6 px-4 sm:px-6 lg:px-12">
      <div className="pt-6 flex justify-between items-center">
        <h1 className="text-[#272727] text-[24px] leading-[36px] font-medium">
          Business Evaluations
        </h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              navigate('/');
            }}
            className="bg-[#272727] text-white font-medium px-4 py-2 rounded-[10px] transition hover:bg-[#3B3B3B]"
          >
            Evaluate Business
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
      <div className="mt-6 text-start">
        <h2 className="text-[26px] text-[#2B3674] leading-[32px] font-bold">
          Dashboard
        </h2>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-4">
        <div className="col-span-1 border min-h-[620px] px-4 py-4 rounded-[10px] shadow">
          <h3 className="text-[#3B37FF] text-[16px] font-medium leading-[25px]">
            Businesses Chosen for Comparison
          </h3>
          <div className="flex flex-col gap-4 text-[#2B3674] font-medium mt-6">
            {sortedBusiness()?.map((company: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1
                    className="hover:text-blue-600 underline cursor-pointer"
                    onClick={() => navigate(`/dashboard/${company?.data?._id}`)}
                  >
                    {company?.data?.business_name}
                  </h1>
                  <Tooltip text={company?.data?.business_notes}>
                    <FaInfoCircle className="ml-2 cursor-pointer text-[#3B37FF] hover:text-[#3B37FF]/60" />
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                  <FaTrashAlt
                    className="cursor-pointer text-[#3B37FF] hover:text-[#3B37FF]/60"
                    onClick={() => handleDelete(company?.data?._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 border p-2 rounded-[10px] shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-center border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="text-[#A3AED0] text-[14px] leading-[18px]">
                  {[
                    'roi',
                    'dscr',
                    'net_profit_margin',
                    'break_even_revenue',
                    'payback_period',
                    'equity_multiple',
                    'sde_multiple',
                    'gross_profit_margin',
                    'yearly_debt_payments',
                    'cash_flow_after_purchase',
                  ].map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                      onClick={() => sortData(key)}
                    >
                      {key.replace(/_/g, ' ').toUpperCase()}
                      <div className="inline-flex ml-2">
                        <FaArrowUp
                          className={`inline-block ${sortConfig.key === key && sortConfig.direction === 'ascending' ? 'text-blue-600' : 'text-gray-400'}`}
                        />
                        <FaArrowDown
                          className={`inline-block ml-1 ${sortConfig.key === key && sortConfig.direction === 'descending' ? 'text-blue-600' : 'text-gray-400'}`}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[#2B3674] text-[14px] leading-[24px] font-semibold">
                {sortedBusiness()?.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.roi}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.dscr}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.net_profit_margin}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.break_even_revenue}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.payback_period}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.equity_multiple}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.sde_multiple}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.gross_profit_margin}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.yearly_debt_payments}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {row?.metrics?.cash_flow_after_purchase}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
