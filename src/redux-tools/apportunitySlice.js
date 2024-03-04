import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_arbigtrage_apportunies } from "../Services/userAPI";

// export const GetAllApportunities = createAsyncThunk(
//   "get/apportunites",
//   async () => {
//     try {
//       const response = await API_arbigtrage_apportunies();
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const initialState = {
  method: "All",
  data: [],
  error: null,
  loading: false,
};

export const apportunitiesSlice = createSlice({
  name: "apportunities",
  initialState,
  reducers: {
    redux_setApportunities: (state, action) => {
      state.data = action.payload;
    },
    redux_setApportunitiesMethod: (state, action) => {
      state.method = action.payload;
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(GetAllApportunities.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(GetAllApportunities.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//         state.method = "Buy/Sell Arbitrage Opportunities";
//       })
//       .addCase(GetAllApportunities.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
});

export const { redux_setApportunities, redux_setApportunitiesMethod } =
  apportunitiesSlice.actions;
export default apportunitiesSlice.reducer;
