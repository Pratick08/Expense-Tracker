import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { useMemo } from "react";

const AreaChartBox = ({ transactions }) => {

    // Convert transactions → daily summary data
    const data = useMemo(() => {

        const map = {};

        transactions?.forEach((t) => {
            const date = t.date; // assuming "YYYY-MM-DD"

            if (!map[date]) {
                map[date] = { date, income: 0, expense: 0 };
            }

            if (t.type === "income") {
                map[date].income += Number(t.amount);
            } else {
                map[date].expense += Number(t.amount);
            }
        });

        return Object.values(map).sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

    }, [transactions]);

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>

                    <defs>
                        <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>

                        <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    {/* Income Area */}
                    <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#incomeColor)"
                    />

                    {/* Expense Area */}
                    <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        fillOpacity={1}
                        fill="url(#expenseColor)"
                    />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaChartBox;