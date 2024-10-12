interface DataTableProps {
    data: {
        Pessimistic: ScenarioData;
        Base: ScenarioData;
        Optimistic: ScenarioData;
    };
}

interface ScenarioData {
    growth_rate: number;
    npv_low_discount: number;
    npv_medium_discount: number;
    npv_high_discount: number;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    if (!data) return null;

    const rows = [
        { scenario: 'Pessimistic', ...data.Pessimistic },
        { scenario: 'Base', ...data.Base },
        { scenario: 'Optimistic', ...data.Optimistic }
    ];

    return (
        <div className="bg-white rounded-[20px] border sm:p-6 p-4 sm:mx-auto mx-[20px]">
            <div className="mb-4">
                <h2 className="text-sm text-[#3B37FF] font-semibold">Sensitivity Chart</h2>
            </div>
            <table className="min-w-full text-center table-auto">
                <thead className="text-sm font-medium text-gray-500 bg-gray-100">
                    <tr>
                        <th className="py-2 text-sm">Scenario</th>
                        <th className="py-4">
                            <div className="flex items-center justify-center space-x-2 text-sm">
                                <span>Growth Rate</span>
                            </div>
                        </th>
                        <th className="py-4">
                            <div className="flex items-center justify-center space-x-2 text-sm">
                                <span>NPV <br />(Low Discount)</span>
                            </div>
                        </th>
                        <th className="py-4 text-sm">NPV <br /> (Medium Discount)</th>
                        <th className="py-4 text-sm">NPV <br />(High Discount)</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {rows.map((item, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 even:bg-gray-50 hover:bg-gray-100"
                        >
                            <td className="py-3">{item.scenario}</td>
                            <td className="py-3">{item.growth_rate} %</td>
                            <td className="py-3">${item.npv_low_discount.toLocaleString()}</td>
                            <td className="py-3">${item.npv_medium_discount.toLocaleString()}</td>
                            <td className="py-3">${item.npv_high_discount.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
