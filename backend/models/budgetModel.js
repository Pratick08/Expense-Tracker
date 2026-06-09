const { Schema, model } = require('mongoose');

const BudgetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
)

const BudgetModel = model("budget", BudgetSchema);
module.exports = BudgetModel;