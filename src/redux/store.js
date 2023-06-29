import { configureStore } from '@reduxjs/toolkit';
import orderSlice from '../Slice/orderSlice';

const store = configureStore({
	reducer: {
		orderDelivery: orderSlice,
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
