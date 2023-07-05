import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBillOfLadingsService } from "../Services/accountantService";
const initialState = {
    isLoading: false,
    listA: {}
  };

  export const getBillOfLadingsAsync = createAsyncThunk(
    'getBillOfLadings',
    async (pages) => {
      const response = await getBillOfLadingsService(pages);
      return response.data;
    },
  );
  export const AccountantSlice = createSlice({
    name: "BillOfLadings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBillOfLadingsAsync.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getBillOfLadingsAsync.fulfilled, (state, action) => {
          if (action.payload) {
            state.isLoading = false;
            state.listA = action.payload;
          }
        })
      },
    });
    export const selectBillOfLading = (state) => state.BillOfLadings;
    export default AccountantSlice.reducer;