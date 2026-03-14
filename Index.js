const express = require('express');
const app = express();
const port = 4000;

const AccountRouter = require('./Router/AccountRouter');
const CategoryRouter = require('./Router/CategoryRouter');
const BudgetRouter = require('./Router/BudgetRouter');
const authRouter = require('./Router/AuthRouter');
const RecordRouter = require('./Router/RecordRouter');
const LabelRouter = require('./Router/LabelRouter');

const connectDB = require('./Config/db');
connectDB();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/accounts', AccountRouter);
app.use('/api/labels', LabelRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/budgets', BudgetRouter);
app.use('/api/records', RecordRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//test comment