import { configureStore } from '@reduxjs/toolkit';
import orderSlice from '../Slice/orderSlice';
import customerSlice from '../Slice/customerSlice';

const store = configureStore({
	reducer: {
		order: orderSlice,
		listCustomers: customerSlice,
	},
});
export default store;
