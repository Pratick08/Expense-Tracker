import Budget from '../models/budgetModel.js';

export const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user.id });
        res.status(201).json({
            success: true,
            budgets
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const addBudget = async (req, res) => {
    try {
        const budget = await Budget.create({
            user: req.user.id,
            ...req.body
        });
        res.status(201).json({
            success: true,
            budget
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const deleteBudget = async (req, res) => {
    try {
        const { id } = req.params
        const budget = await Budget.findByIdAndDelete({
            user: req.user.id,
            _id: id
        });
        res.status(201).json({
            success: true,
            budget,
            message: "budget deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const updateBudget = async (req, res) => {
    try {
        const { id } = req.params
        const budget = await Budget.findByIdAndUpdate(
            {
                user: req.user.id,
                _id: id
            },
            req.body,
            { new: true }
        );
        res.status(201).json({
            success: true,
            budget,
            message: "budget updated",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}