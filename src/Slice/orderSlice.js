import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	deleteOrderService,
	filterPhoneCustomerService,
	getDetailCustomerService,
	getDetailOrderService,
	getOrderService,
	getSaleStaffService,
	postOrderService,
} from '../Services/orderService';
const initialState = {
	isloading: false,
	listDeliveryOrder: [],
	saleStaft: [],
	shipperList: [],
	filterPhoneShipper: [],
	shiperDetail: [],
	detailDeliveryOrder: [],
};
export const getOrderAsync = createAsyncThunk('getOrder', async (params) => {
	const response = await getOrderService(params);
	return response.data;
});
export const postOrderAsync = createAsyncThunk(
	'postDeliveryOrder',
	async (params) => {
		const response = await postOrderService(params);
		return response.data;
	},
);
export const deleteOrderAsync = createAsyncThunk(
	'deleteDeliveryOrder',
	async (id) => {
		const response = await deleteOrderService(id);
		return response.data;
	},
);
export const getSaleStaffAsync = createAsyncThunk('getSaleStaff', async () => {
	const response = await getSaleStaffService();
	return response.data;
});
export const filterPhoneCusomerAsync = createAsyncThunk(
	'filterPhoneCustomer',
	async (params) => {
		const response = await filterPhoneCustomerService(params);
		return response.data;
	},
);
export const getDetailCustomerAsync = createAsyncThunk(
	'getDetailCustomer',
	async (id) => {
		const response = await getDetailCustomerService(id);
		return response.data;
	},
);
export const getDetailOrderAsync = createAsyncThunk(
	'getDetailOrder',
	async (id) => {
		const response = await getDetailOrderService(id);
		return response.data;
	},
);
export const Order = createSlice({
	name: 'Order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getOrderAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getOrderAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.listDeliveryOrder = action.payload;
					state.isloading = false;
				}
			})
			//post deleveryOrder
			.addCase(postOrderAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(postOrderAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.isloading = false;
				}
			})
			.addCase(getSaleStaffAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getSaleStaffAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.saleStaft = action.payload;
					state.isloading = false;
				}
			})

			.addCase(getDetailCustomerAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getDetailCustomerAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.shiperDetail = action.payload;
					state.isloading = false;
				}
			})
			.addCase(getDetailOrderAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getDetailOrderAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.detailDeliveryOrder = action.payload;
					state.isloading = false;
				}
			})
			.addCase(filterPhoneCusomerAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(filterPhoneCusomerAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.filterPhoneShipper = action.payload;
					state.isloading = false;
				}
			})
			.addCase(deleteOrderAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(deleteOrderAsync.fulfilled, (state, action) => {
				state.isloading = false;
        
			});
	},
});
export const selectOrder = (state) => state.Order;
export default Order.reducer;
