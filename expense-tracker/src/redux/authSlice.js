import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BACKEND_URL } from '../config/api';
// import toast from 'react-hot-toast';


const initialState =
{
    accessToken: null,
    user: null,
    loading: false,
    error: null,
    authChecked: false
}
export const authregister = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/auth/register`,
                userData, {
                withCredentials: true
            }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }
);
export const authLogin = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/auth/login`,
                userData,
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }
);
export const refreshAccessToken = createAsyncThunk(
    "auth/refreshToken",
    async () => {
        const response = await axios.get(
            `${BACKEND_URL}/api/auth/refresh-token`,
            {
                withCredentials: true
            }

        );
        return response.data;
    }
);
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        const response = await axios.get(
            `${BACKEND_URL}/api/auth/logout`,
            {
                withCredentials: true
            }

        );
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            authregister.fulfilled,
            (state, action) => {
                state.accessToken = action.payload.accessToken
                state.user = action.payload.user
            }
        ).addCase(authregister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(
            authLogin.fulfilled,
            (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.authChecked = true;
            }
        ).addCase(authLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(
            refreshAccessToken.fulfilled,
            (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user
                state.authChecked = true;
            }
        ).addCase(
            refreshAccessToken.rejected,
            (state) => {
                state.authChecked = true;
            }
        ).addCase(
            logout.fulfilled,
            (state) => {
                state.accessToken = null,
                    state.user = null,
                    state.authChecked = false
            }
        )
    }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer