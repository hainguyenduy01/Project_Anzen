import { configureStore } from '@reduxjs/toolkit';
import orderSlice from '../Slice/orderSlice';
import customerSlice from '../Slice/customerSlice';

const store = configureStore({
	reducer: {
		order: orderSlice,
		listCustomers: customerSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActionPaths: ['meta.arg', 'payload.timestamp'], // Loại bỏ các trường dữ liệu
				ignoredPaths: ['items.dates'], // Loại bỏ các đường dẫn dữ liệu cụ thể trong state
				ignoredActions: ['downloadAccounting/fulfilled'],
			},
		}),
});
export default store;
