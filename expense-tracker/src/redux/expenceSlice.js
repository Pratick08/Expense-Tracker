import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import axios from 'axios'
import { BACKEND_URL } from '../config/api';

const initialState =
{
    transactionDatas: [],
    monthlyTrend: [],  // Jan  Income: 50k  Expense: 30k
    loading: false
}

export const fetchTransactions =
    createAsyncThunk(
        "transactions/fetchTransactions",
        async ({ month, year }, { getState }) => {
            const token = getState().auth.accessToken;
            const response = await axios.get(
                `${BACKEND_URL}/api/transactions?month=${month}&year=${year}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data.transactions;
        }

    )

export const fetchMonthlyTransactions =
    createAsyncThunk(
        "transactions/fetchMonthlyTransactions",
        async (_,{ getState }) => {
            // console.log("backend url:",BACKEND_URL)
            const token = getState().auth.accessToken;
            const response = await axios.get(
                `${BACKEND_URL}/api/analytics/monthly`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data.chartData;
        }

    )


export const addTransaction =
    createAsyncThunk(

        "transactions/addTransaction",

        async (transactionData, { getState }) => {
            const token = getState().auth.accessToken
            const response = await axios.post(
                `${BACKEND_URL}/api/transactions`,
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
            );

            toast.success(
                "Transaction Created Successfully"
            );

            return response.data.transaction;

        }

    )

export const deleteTransaction =
    createAsyncThunk(

        "transactions/deleteTransaction",

        async (id, { getState }) => {
            const token = getState().auth.accessToken

            await axios.delete(
                `${BACKEND_URL}/api/transactions/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            toast.success(
                "Transaction Deleted Successfully"
            );

            return id;

        }

    )
export const updateTransaction =
    createAsyncThunk(
        "transactions/updateTransaction",

        async ({ id, transactionData }, { getState }) => {
            const token = getState().auth.accessToken;

            const response = await axios.put(
                `${BACKEND_URL}/api/transactions/${id}`,
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
            );

            toast.success(
                "Transaction Updated Successfully"
            );

            return response.data.updatedTransaction;

        }

    )

export const expenceSlice = createSlice({
    name: 'expence',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(
            fetchTransactions.fulfilled,
            (state, action) => {
                // console.log("action-payload", action.payload);
                state.transactionDatas = action.payload;
            }
        )
            .addCase(
                fetchMonthlyTransactions.fulfilled,
                (state, action) => {
                    // console.log("action-payload", action.payload);
                    state.monthlyTrend = action.payload;
                }
            )
            .addCase(
                addTransaction.fulfilled,
                (state, action) => {
                    state.transactionDatas.push(
                        action.payload
                    );
                }
            ).addCase(
                deleteTransaction.fulfilled,
                (state, action) => {
                    state.transactionDatas =
                        state.transactionDatas.filter(
                            (item) => item._id !== action.payload
                        )
                }
            ).addCase(
                updateTransaction.fulfilled,
                (state, action) => {
                    const index = state.transactionDatas.findIndex(
                        (item) => String(item._id) === String(action.payload._id)
                    )
                    if (index >= 0) {
                        state.transactionDatas[index] = action.payload;
                    }
                }
            )

    }
})

// Action creators are generated for each case reducer function
// export const { updateTransaction } = expenceSlice.actions

export default expenceSlice.reducer