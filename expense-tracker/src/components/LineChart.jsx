import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const LineChart = ({ transactions = [] }) => {

    // STEP 1: Group by date (daily data for selected month)
    const groupedData = {};

    transactions.forEach((t) => {
        const day = new Date(t.date).getDate();

        if (!groupedData[day]) {
            groupedData[day] = { day, income: 0, expense: 0 };
        }

        if (t.type === "income") {
            groupedData[day].income += Number(t.amount);
        } else {
            groupedData[day].expense += Number(t.amount);
        }
    });

    const chartData = Object.values(groupedData).sort((a, b) => a.day - b.day);

    return (
        <div className="w-full h-95 bg-white dark:bg-[#0b1220] border border-gray-200 dark:border-gray-800 rounded-2xl p-4">

            {/* Chart */}
            <ResponsiveContainer width="100%" height="85%">
                <RechartsLineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                    <XAxis
                        dataKey="day"
                        stroke="#94a3b8"
                    />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "10px",
                            color: "#fff"
                        }}
                    />

                    <Legend />

                    {/* Income Line */}
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />

                    {/* Expense Line */}
                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />

                </RechartsLineChart>
            </ResponsiveContainer>

        </div>
    );
};

export default LineChart;


