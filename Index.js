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
<<<<<<< HEAD
app.use('/api', authRouter);
app.use('/api',LabelRouter);
app.use('/api',CategoryRouter);
app.use('/api',BudgetRouter);


=======
app.use('/api/auth', authRouter);
app.use('/api/accounts', AccountRouter);
app.use('/api/labels', LabelRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/budgets', BudgetRouter);
app.use('/api/records', RecordRouter);
>>>>>>> 33e0cf815030f63f2525856f07e9ca4956b901db
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//test comment