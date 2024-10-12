// import { TrendingUp } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, YAxis, Legend } from "recharts";

interface ChartData {
    year: number;
    cash_flow: number;
}

export function LineChartCard({ chartData }: { chartData: ChartData[] }) {
    const chartConfig = {
        cash_flow: {
            label: "Cash Flow",
            color: "#3a37ff",
        },
    };

    return (
        <div className="bg-[white] border rounded-[20px] sm:p-6 p-4 sm:mx-auto mx-[20px]">
            <div className="mb-4">
                <h2 className="text-sm text-[#3B37FF] font-semibold">Projected Cash Flow</h2>
            </div>

            <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="cash_flow"
                            stroke={chartConfig.cash_flow.color}
                            strokeWidth={2}
                            dot={{ fill: chartConfig.cash_flow.color }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* <div className="flex flex-col items-start gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2 font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-gray-500">Showing cash flow for the next 5 years</div>
            </div> */}
        </div>
    );
}
