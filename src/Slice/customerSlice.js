import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCustomerService, deleteCustomerService, getAllCustomerService, updateCustomerService } from "../Services/customerService";

const initialState = {
  isLoading: false,
  listCustomer: {}
};
export const getAllCustomersAsync = createAsyncThunk(
  "getAllCustomers",
  async (pages) => {
    const response = await getAllCustomerService(pages);
    return response.data;
  }
);
export const deleteCustomerAsync = createAsyncThunk(
  "deleteCustomer",
  async (id) => {
    const response = await deleteCustomerService(id);
    return response.data;
  }
);
export const createCustomerAsync = createAsyncThunk(
  "createCustomer",
  async (params) => {
    const response = await createCustomerService(params);
    return response.data;
  }
);
export const customerSlice = createSlice({
  name: "listCustomers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomersAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.listCustomer = action.payload;
        }
      })

      .addCase(deleteCustomerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.list = action.payload;
        }
      })
      .addCase(createCustomerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomerAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.list = action.payload;
        }
      })
  },
});
export const selectCustomers = (state) => state.listCustomers;
export default customerSlice.reducer;
