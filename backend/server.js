const express = require('express');
const app = express();
const port = 3000;
const cors=require('cors')
const transactionRouters=require('./routers/transactionRouters')
const budgetRouters=require('./routers/budgetRouters');
const authRouter=require('./routers/authRouter');
const cookieParser=require('cookie-parser')

// ✅ CORS FIX
app.use(cors({
  origin: ["http://localhost:5173","https://expense-tracker-frontend-pi-roan.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
const connectDB=require('./config/db')
connectDB();

app.use('/api',transactionRouters);
app.use('/api',budgetRouters);
app.use('/api/auth',authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});