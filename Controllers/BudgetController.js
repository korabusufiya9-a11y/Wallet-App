const Budget = require('../Models/BudgetModel'); 
const Record = require('../Models/RecordModel'); 

const calculateBudgetVariance = (budgetedAmount, actualSpent) => {
    return budgetedAmount - actualSpent;
};

// 1. CREATE Budget
exports.createBudget = async (req, res) => {
    try {
        const newBudget = await Budget.create(req.body);
        res.status(201).json({ success: true, data: newBudget });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 2. GET ALL BUDGETS (With Variance Calculation)
exports.getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find();
        
    
        const budgetsWithAnalysis = await Promise.all(budgets.map(async (budget) => {
            
         
            const records = await Record.find({ 
                category: budget.category, 
                type: 'expense' 
            });

            const totalSpent = records.reduce((acc, curr) => acc + curr.amount, 0);
            const variance = calculateBudgetVariance(budget.amount, totalSpent);

            return {
                ...budget._doc,
                totalSpent,
                variance,
                status: variance < 0 ? "Over Budget" : "Under Budget"
            };
        }));

        res.status(200).json({ success: true, data: budgetsWithAnalysis });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. GET SINGLE BUDGET
exports.getBudgetById = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) return res.status(404).json({ success: false, message: "Budget sapadle nahi" });
        
        res.status(200).json({ success: true, data: budget });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. UPDATE BUDGET
exports.updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: budget });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 5. DELETE BUDGET
exports.deleteBudget = async (req, res) => {
    try {
        await Budget.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Budget delete zale!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};