
export const generateInsights = (transactions) => {
    
    const totalIncome = transactions.filter(
        (item) => item.type === "income"
    )
        .reduce((acc, item) => acc + item.amount, 0)

    const totalExpense = transactions.filter(
        (item) => item.type === "expense"
    )
    .reduce((acc, item) => acc + item.amount, 0);

    const balance = totalIncome - totalExpense;


    const categoryMap = {};
    transactions.forEach((t) => {
        if (t.type === "expense") { categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount); }
    });
    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

    const savingRate = Math.round((balance / totalIncome) * 100);


    const insights = [];
    if (totalExpense > totalIncome) {
        insights.push({
            type: "danger",
            text: "⚠️ Your expenses are higher than income"
        })
    }
    if (balance > totalIncome * 0.3) {
        insights.push({
            type: "success",
            text: "💰 Great job! Your savings are healthy"
        });
    }
    if (topCategory) {
        insights.push({
            type: "warning",
            text: `Highest spending on ${topCategory[0]}`
        });
    }
    if (transactions.length === 0) {
        insights.push({
            type: "neutral",
            text: "📊 Add transactions to generate insights"
        });
    }
    // console.log("Insights:",insights)
    return { insights, savingRate };
}
