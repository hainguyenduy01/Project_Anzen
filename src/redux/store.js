import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../Slice/orderSlice";
import customerSlice from "../Slice/customerSlice";
import driverSlice from "../Slice/driverSlice";
import AccountantSlice from "../Slice/AccountantSlice";

const store = configureStore({
  reducer: {
    order: orderSlice,
    listCustomers: customerSlice,
    listDrivers: driverSlice,
    BillOfLadings: AccountantSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["meta.arg", "payload.timestamp"], // Loại bỏ các trường dữ liệu
        ignoredPaths: ["items.dates"], // Loại bỏ các đường dẫn dữ liệu cụ thể trong state
        ignoredActions: ["downloadAccounting/fulfilled"],
      },
    }),
});
export default store;
