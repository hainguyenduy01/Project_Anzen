import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAccountingService,
  getBillOfLadingsService,
  getDetailBillOfLadingsService,
  updateCompletedAccountingService,
} from "../Services/accountantService";
const initialState = {
  isLoading: false,
  listA: {},
  detailCode: {},
  detailAccounting: {},
};

export const getBillOfLadingsAsync = createAsyncThunk(
  "getBillOfLadings",
  async (values) => {
    const response = await getBillOfLadingsService(values);
    return response.data;
  }
);
export const getDetailBillOfLadings = createAsyncThunk(
  "getDetailBillOfLadings",
  async (id) => {
    const response = await getDetailBillOfLadingsService(id);
    return response.data;
  }
);
export const getDetailAccountingAsync = createAsyncThunk(
  "getDetailAccounting",
  async (id) => {
    const response = await getAccountingService(id);
    return response.data;
  }
);
export const updateCompletedAsync = createAsyncThunk(
  "updateCompleted",
  async (id) => {
    const response = await updateCompletedAccountingService(id);
    return response.data;
  }
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
          state.detailCode = action.payload;
        }
      })
      .addCase(getDetailAccountingAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetailAccountingAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.detailAccounting = action.payload;
        }
      })
      .addCase(updateCompletedAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompletedAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.listA = action.payload;
        }
      });
  },
});
export const selectBillOfLading = (state) => state.BillOfLadings;
export default AccountantSlice.reducer;
