// import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Legend, YAxis } from "recharts";

interface BarChartComponentProps {
    chartData: Array<{ year: number; expenses: number }>;
}

export function BarChartComponent({ chartData }: BarChartComponentProps) {
    return (
        <div className="bg-white border rounded-[20px] sm:p-6 p-4 sm:mx-auto mx-[20px]">
            <div className="mb-4">
                <h2 className="text-sm text-[#3B37FF] font-semibold">Debt Payment Schedule</h2>
            </div>
            <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="expenses" stackId="a" fill="#2463eb" radius={[0, 0, 4, 4]} />
                    </BarChart>
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
