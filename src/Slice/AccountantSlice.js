import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountingService, getBillOfLadingsService } from "../Services/accountantService";
const initialState = {
    isLoading: false,
    listA: {},
    listAccount: {},
  };

  export const getBillOfLadingsAsync = createAsyncThunk(
    'getBillOfLadings',
    async (pages) => {
      const response = await getBillOfLadingsService(pages);
      return response.data;
    },
  );
  export const getDetailAccounting = createAsyncThunk(
    'getDetailAccounting',
    async (id) => {
      const response = await getAccountingService(id);
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
        .addCase(getDetailAccounting.pending, (state) => {
          state.isloading = true;
        })
        .addCase(getDetailAccounting.fulfilled, (state, action) => {
          if (action.payload) {
            state.listAccount = action.payload;
            state.isloading = false;
          }
        })
      },
    });
    export const selectBillOfLading = (state) => state.BillOfLadings;
    export default AccountantSlice.reducer;