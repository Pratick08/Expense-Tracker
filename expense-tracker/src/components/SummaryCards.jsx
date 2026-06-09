import { useSelector } from "react-redux";
const SummaryCards = () => {
  const transactionDatas = useSelector((state) => state.expence.transactionDatas);
  // console.log("backend data",transactionDatas);
  const income = transactionDatas
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0)

  //creating expense variable
  const expense = transactionDatas
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0)

  //creating balance variable
  const balance = income - expense;

  const totalTransaction = transactionDatas.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {/* Balance */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-colors duration-300">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Balance
            </p>

            <h1 className="text-4xl font-bold text-black dark:text-white mt-2">
              ₹{balance}
            </h1>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-2xl text-cyan-400">
            💰
          </div>

        </div>

      </div>

      {/* Income */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-colors duration-300">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Income
            </p>

            <h1 className="text-4xl font-bold text-green-500 dark:text-green-400 mt-2">
              ₹{income}
            </h1>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl text-green-400">
            📈
          </div>

        </div>

      </div>

      {/* Expense */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-colors duration-300">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Expenses
            </p>

            <h1 className="text-4xl font-bold text-red-500 dark:text-red-400 mt-2">
              ₹{expense}
            </h1>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center text-2xl text-red-400">
            📉
          </div>

        </div>

      </div>

      {/* Total Transactions */}
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-colors duration-300">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Transactions
            </p>

            <h1 className="text-4xl font-bold text-cyan-500 dark:text-cyan-400 mt-2">
              {totalTransaction}
            </h1>

          </div>

          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl text-blue-400">
            💳
          </div>

        </div>

      </div>

    </div>
  )
}

export default SummaryCards
