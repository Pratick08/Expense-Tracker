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

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const groupedData = {};

    transactions.forEach((t) => {
        const monthIndex = new Date(t.date).getMonth();
        const monthName = monthNames[monthIndex];

        if (!groupedData[monthName]) {
            groupedData[monthName] = {
                month: monthName,
                income: 0,
                expense: 0,
                monthIndex
            };
        }

        if (t.type === "income") {
            groupedData[monthName].income += Number(t.amount);
        } else {
            groupedData[monthName].expense += Number(t.amount);
        }
    });

    const chartData = Object.values(groupedData).sort(
        (a, b) => a.monthIndex - b.monthIndex
    );
    return (
        <div className="w-full h-95 bg-white dark:bg-[#0b1220] border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
           
            {/* Chart */}
            <ResponsiveContainer width="100%" height="85%">
                <RechartsLineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                    <XAxis
                        dataKey="month"
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


