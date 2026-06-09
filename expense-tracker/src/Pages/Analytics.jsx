import PieChartBox from "../components/PieChartBox";
import SummaryCards from "../components/SummaryCards";
import InsightCard from "../components/InsightCard";
import SavingsCard from "../components/SavingsCard";
import { useDispatch, useSelector } from "react-redux";
import { generateInsights } from "../utils/generateInsights";
import { useState, useEffect } from "react";
import { fetchMonthlyTransactions, fetchTransactions } from "../redux/expenceSlice";
// import AreaChartBox from "../components/AreaChartBox";
import BarChartBox from "../components/BarChartBox";
import DailySpendingBarChart from "../components/DailySpendingBarChart";

const Analytics = () => {
    const transactionDatas = useSelector((state) => state.expence.transactionDatas);
    const { insights, savingRate } = generateInsights(transactionDatas);;
    // console.log(insights);
    const dispatch = useDispatch()
    const monthlyTrend = useSelector((state) => state.expence.monthlyTrend)

    const [month, setMonth] = useState(
        new Date().getMonth() + 1
    )

    const [year, setYear] = useState(
        new Date().getFullYear()
    )
    useEffect(() => {
        dispatch(fetchTransactions(
            {
                month,
                year
            }
        ));
    }, [dispatch, month, year]);
    useEffect(() => {
        dispatch(fetchMonthlyTransactions());
    }, [dispatch, transactionDatas]);

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-[#020617] p-6 transition-colors duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* Left Content */}

                <div>

                    <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                        Financial Analytics
                    </h1>

                    <p className="mt-2 text-gray-600 dark:text-slate-400">
                        Deep insights into your spending habits
                    </p>

                </div>

                {/* Right Filters */}
                <div className="flex flex-col sm:flex-row gap-3">

                    <select
                        value={month}
                        className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-slate-700  text-black dark:text-slate-200 px-5 py-3 rounded-2xl  outline-none  focus:border-cyan-500 transition-all duration-300"
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    <select
                        value={year}
                        className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-slate-700  text-black dark:text-slate-200 px-5 py-3 rounded-2xl outline-none focus:border-cyan-500 transition-all duration-300"
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>

                </div>

            </div>

            {/* SUMMARY CARDS */}
            <div className="my-6">
                <SummaryCards />
            </div>

            {/* MAIN SECTION */}
            <div className="grid grid-cols-1 gap-6 my-8">
                <PieChartBox />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 my-16">

                <DailySpendingBarChart
                    transactionDatas={transactionDatas}
                />

                <div>

                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg h-full">

                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-black dark:text-white">
                                Monthly Income vs Expense Trend
                            </h2>

                            <p className="text-gray-600 dark:text-slate-400 mt-2">
                                Compare your monthly income and expenses.
                            </p>
                        </div>

                        <BarChartBox monthlyTrend={monthlyTrend} />

                    </div>

                </div>

            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* INSIGHT CARD */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-lg">

                    <InsightCard insights={insights} />

                </div>

                {/* SAVINGS CARD */}
                <SavingsCard savingRate={savingRate} />

            </div>

        </div>
    );
};

export default Analytics;