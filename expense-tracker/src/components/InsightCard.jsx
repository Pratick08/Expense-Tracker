const InsightCard = ({ insights }) => {

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:scale-[1.01] transition-all duration-300">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-black dark:text-white text-xl font-semibold">
                    AI Insights
                </h2>

                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
                    Live
                </span>

            </div>

            {/* INSIGHTS */}
            <div className="space-y-3">

                {insights.map((item, index) => (

                    <div
                        key={index}
                        className={`p-4 rounded-2xl border text-sm font-medium transition-colors duration-300

                ${item.type === "danger" &&
                            "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20"}

                ${item.type === "warning" &&
                            "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"}

                ${item.type === "success" &&
                            "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"}

                ${item.type === "neutral" &&
                            "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-500/20"}
                `}
                    >

                        {item.text}

                    </div>

                ))}

            </div>

        </div>
    );
};

export default InsightCard;