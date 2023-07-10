import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  getBillOfLadingsService, getDetailBillOfLadingsService } from "../Services/accountantService";
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
  export const getDetailBillOfLadings = createAsyncThunk(
    'getDetailBillOfLadings',
    async (id) => {
      const response = await getDetailBillOfLadingsService(id);
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
        .addCase(getDetailBillOfLadings.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getDetailBillOfLadings.fulfilled, (state, action) => {
          if (action.payload) {
            state.isLoading = false;
            state.listAccount = action.payload;
          }
        })
      },
    });
    export const selectBillOfLading = (state) => state.BillOfLadings;
    export default AccountantSlice.reducer;