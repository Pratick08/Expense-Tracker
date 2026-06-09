import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid
} from "recharts";

const BarChartBox = ({ monthlyTrend }) => {
    const currentMonth=new Date().getMonth()+1;
    // console.log(currentMonth)
    const currentMonthlyTrend=monthlyTrend.slice(0,currentMonth)
    
    return (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 ">

            {/* <div className="mb-6">
                <h2 className="text-xl font-bold text-black dark:text-white">
                    Monthly Income vs Expense
                </h2>

                <p className="text-gray-600 dark:text-slate-400 text-sm mt-1">
                    Income and expenses from January to current month
                </p>
            </div> */}

            <div className="h-87.5">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={currentMonthlyTrend}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.15}
                        />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        {/* Income */}
                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#22c55e"
                            radius={[8, 8, 0, 0]}
                        />

                        {/* Expense */}
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

export default BarChartBox;