import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Legend, YAxis } from "recharts";

interface CashflowData {
    year: number;
    revenue: number;
}

interface CashflowChartProps {
    data: CashflowData[];
}

export function CashflowChart({ data }: CashflowChartProps) {
    return (
        <div className="bg-white border rounded-[20px] sm:p-6 p-4 sm:mx-auto mx-[20px]">
            <div className="mb-4">
                <h2 className="text-sm text-[#3B37FF] font-semibold">Cashflow Over the Years</h2>
            </div>
            <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#60a8fa" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#60a8fa" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            formatter={(value: number) => `$${value.toLocaleString()}`}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3a37ff"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* <div className="flex items-start gap-2 text-sm text-gray-700">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-gray-500">Year-wise Data</div>
                </div>
            </div> */}
        </div>
    );
}
