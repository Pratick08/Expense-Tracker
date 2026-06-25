import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import axios from 'axios'
import { BACKEND_URL } from '../config/api';
const initialState = {
    budgetDatas: [],
    loading: false
    // localStorage.getItem("budgetDatas")
    //     ? JSON.parse(localStorage.getItem("budgetDatas"))
    //     : []
}
export const fetchBudgets = createAsyncThunk(
    "budgets/fetchBudgets",
    async (_, { getState }) => {
        const token = getState().auth.accessToken
        const res = await axios.get(
            `${BACKEND_URL}/api/budgets`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );

        return res.data.budgets;
    }
)
export const createBudget = createAsyncThunk(
    "budgets/createBudget",
    async (budgetData, { getState }) => {
        const token = getState().auth.accessToken
        const res = await axios.post(
            `${BACKEND_URL}/api/budgets`,
            budgetData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success("Budget Created Successfully")
        return res.data.budget;
    }
)
export const updateBudget = createAsyncThunk(
    "budgets/updateBudget",
    async (updatebudgetdata, { getState }) => {
        const token = getState().auth.accessToken
        const res = await axios.put(
            `${BACKEND_URL}/api/budgets/${updatebudgetdata.id}`,
            updatebudgetdata,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success("Budget Updated Successfully")
        return res.data.budget;
    }
)
export const deleteBudget = createAsyncThunk(
    "budgets/deleteBudget",
    async (id, { getState }) => {
        const token = getState().auth.accessToken
        await axios.delete(
            `${BACKEND_URL}/api/budgets/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success("Budget Deleted Successfully")
        return id;
    }
)

export const budgetSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchBudgets.fulfilled,
                (state, action) => {
                    state.budgetDatas = action.payload
                }
            )
            .addCase(
                createBudget.fulfilled,
                (state, action) => {
                    state.budgetDatas.push(action.payload);
                }
            )
            .addCase(
                deleteBudget.fulfilled,
                (state, action) => {
                    state.budgetDatas = state.budgetDatas.filter(
                        (item) => item._id !== action.payload
                    )
                }
            ).addCase(
                updateBudget.fulfilled,
                (state, action) => {
                    // console.log(action.payload)
                    const index = state.budgetDatas.findIndex(
                        (item) => String(item._id) === String(action.payload._id)
                    )
                    if (index >= 0) {
                        state.budgetDatas[index] = action.payload;
                    }
                }
            )
    }
})

// Action creators are generated for each case reducer function
// export const { incrementByAmount } = budgetSlice.actions

export default budgetSlice.reducer