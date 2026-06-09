import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './redux/expenceSlice'
import budgetReducer from './redux/budgetSlice'
import authReducer from'./redux/authSlice'
export const store = configureStore({
  reducer: {
    expence: expenseReducer,
    budgets:budgetReducer,
    auth:authReducer,
    // analytics:analyticsReducer,
  },
})