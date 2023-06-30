import { configureStore } from '@reduxjs/toolkit';
import orderSlice from '../Slice/orderSlice';
import customerSlice from '../Slice/customerSlice';

const store = configureStore({
	reducer: {
<<<<<<< HEAD
		order: orderSlice,
		listCustomers: customerSlice,
=======
		orderDelivery: orderSlice,
>>>>>>> 39820bb04364f9f029c208099d1d0b1b9605f514
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
