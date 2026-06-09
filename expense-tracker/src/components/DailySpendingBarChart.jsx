import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";

const DailySpendingBarChart = ({ transactionDatas }) => {
    // console.log("data",transactionDatas)
    // const day=new Date()
    const dailySpendingData = {};
    transactionDatas.forEach((t) => {
        const day = new Date(t.date).getDate();
        // console.log("day",day)
        if (!dailySpendingData[day]) {
            dailySpendingData[day] = {
                day: day,
                expense: 0
            };
        }
        if (t.type === "expense") {
            dailySpendingData[day].day = day
            dailySpendingData[day].expense += t.amount
            // monthlyData[month].income += t.amount;
        }
    })
    // const chartData = Object.values(dailySpendingData).sort(
    //     (a, b) => a.day - b.day
    // );
    const chartData = [];
    const currentDay=new Date().getDate();
    for (let day = 1; day <= currentDay; day++) {
      chartData.push({
        day,
        expense: dailySpendingData[day]?.expense || 0,
      });
    }
    return (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-black dark:text-white">
                    Daily Spending Trend
                </h2>

                <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">
                    Track your daily expenses throughout the month
                </p>
            </div>

            {/* Chart */}
            <div className="h-87.5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.15}
                        />

                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="expense"
                            name="Expense"
                            fill="#ef4444"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default DailySpendingBarChart;