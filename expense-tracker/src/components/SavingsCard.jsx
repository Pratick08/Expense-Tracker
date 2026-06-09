const SavingsCard = ({ savingRate }) => {

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg hover:scale-[1.01] transition-all duration-300">

    {(() => {

        // Opposite Logic:
        // Higher saving = greener
        // Lower saving = redder

        const getColor = (rate) => {

            if (rate >= 50) {
                return "from-emerald-400 to-green-500";
            }

            if (rate >= 20) {
                return "from-cyan-400 to-blue-500";
            }

            return "from-red-500 to-pink-500";
        };

        return (

            <>
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-gray-900 dark:text-white text-xl font-semibold tracking-wide">
                            Savings Rate
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Percentage of income saved
                        </p>

                    </div>

                    {/* ICON */}
                    <div
                        className={`w-14 h-14 rounded-2xl bg-linear-to-br bg-cyan-500/10 flex items-center justify-center text-white text-2xl shadow-lg`}
                    >
                        💰
                    </div>

                </div>

                {/* PERCENT */}
                <div className="mb-5">

                    <h1
                        className={`text-5xl font-bold bg-linear-to-r ${getColor(savingRate)} bg-clip-text text-transparent`}
                    >
                        {savingRate}%
                    </h1>

                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-4 bg-gray-200 dark:bg-[#1e293b] rounded-full overflow-hidden mb-5">

                    <div
                        className={`h-full rounded-full bg-linear-to-r ${getColor(savingRate)} transition-all duration-700`}
                        style={{ width: `${savingRate}%` }}
                    />

                </div>

                {/* MESSAGE */}
                <div className="text-sm leading-relaxed font-medium">

                    {
                        savingRate >= 50 ? (
                            <p className="text-emerald-500">
                                Excellent savings performance 🚀
                            </p>
                        ) : savingRate >= 20 ? (
                            <p className="text-cyan-500">
                                Good savings progress 👍
                            </p>
                        ) : (
                            <p className="text-red-500">
                                Try reducing unnecessary expenses ⚠️
                            </p>
                        )
                    }

                </div>
            </>
        );
    })()}

</div>

    );
};

export default SavingsCard;