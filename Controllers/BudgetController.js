const BudgetController= require('../Models/BudgetModel');

// @desc    Create a new budget limit
// @route   POST /api/budgets
exports.createBudget = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Logic: Ensure end date isn't before start date
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: "End date must be after the start date."
            });
        }

        const budget = await Budget.create(req.body);

        res.status(201).json({
            success: true,
            data: budget
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all budgets for a user with Category details
// @route   GET /api/budgets/user/:userId
exports.getuserBudget = async (req, res) => {
    try {
        // .populate('CategoryId') allows you to see the category name/icon instead of just the ID
        const Budgets = await Budget.find({ useId: req.params.userId })
                                    .populate('CategoryId', 'name icon'); 

        res.status(200).json({
            success: true,
            count: budgets.length,
            data: budgets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// @desc    Update a budget (e.g., increase the limit)
// @route   PUT /api/budgets/:id
exports.updateBudget = async (req, res) => {
    try {
        const Budget = await Budget.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!Budget) {
            return res.status(404).json({ success: false, message: "Budget not found" });
        }

        res.status(200).json({
            success: true,
            data: budget
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete a budget
// @route   DELETE /api/budgets/:id
exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findByIdAndDelete(req.params.id);

        if (!budget) {
            return res.status(404).json({ success: false, message: "Budget not found" });
        }

        res.status(200).json({
            success: true,
            message: "Budget removed"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports=BudgetController;