import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
	deleteExcelService,
	deleteOrderService,
	downloadAccountingService,
	downloadExcelService,
	downloadImageService,
	downloadLadingBillService,
	exportGridEService,
	filterPhoneCustomerService,
	getAccountingService,
	getAllDeliveryOrderService,
	getDetailCustomerService,
	getDetailOrderService,
	getDetailShipperService,
	getDownloadService,
	getInfoImageService,
	getReportService,
	getSaleStaffService,
	postOrderService,
	uploadImageService,
} from '../Services/orderService';
import { toast } from 'react-toastify';
const initialState = {
	isloading: false,
	listDeliveryOrder: {},
	listAccounting: {},
	saleStaff: [],
	shiperDetail: [],
	shipper: [],
	filterPhoneShipper: [],
	shipperList: [],
	detailDeliveryOrder: [],
	listDownload: [],
	linkDownload: [],
	listInfoImage: {},
	linkDownloadImage: [],
	uploadImage: [],
	listReport: [],
};
export const getAllDeliveryOrder = createAsyncThunk(
	'getAllDeliveryOrder',
	async (params) => {
		const response = await getAllDeliveryOrderService(params);
		return response.data.result;
	},
);
export const getDetailAccounting = createAsyncThunk(
	'getDetailAccounting',
	async (id) => {
		const response = await getAccountingService(id);
		return response.data;
	},
);
export const downloadAccountingAsync = createAsyncThunk(
	'downloadAccounting',
	async (id) => {
		const response = await downloadAccountingService(id);
		return response.data;
	},
);
export const downloadLadingBillAsync = createAsyncThunk(
	'downloadLadingBill',
	async (id) => {
		const response = await downloadLadingBillService(id);

		return response.data;
	},
);
export const exportGridAsync = createAsyncThunk(
	'exportGrid',
	async (params) => {
		const response = await exportGridEService(params);

		return response.data;
	},
);
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

	return response.data.result;
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
export const getDetailShipperAsync = createAsyncThunk(
	'getDetailShipper',
	async (id) => {
		const response = await getDetailShipperService(id);
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
export const getDownloadAsync = createAsyncThunk(
	'getDownload',
	async (params) => {
		const response = await getDownloadService(params);
		return response.data.result;
	},
);
export const deleteExcelAsync = createAsyncThunk('deleteExcel', async (id) => {
	const response = await deleteExcelService(id);
	return response.data;
});
export const downloadExcelAsync = createAsyncThunk(
	'downloadExcel',
	async (id) => {
		const response = await downloadExcelService(id);
		return response.data;
	},
);
export const getInfoImageAsync = createAsyncThunk(
	'getInfoImage',
	async (params) => {
		const response = await getInfoImageService(params);
		return response.data;
	},
);
export const downloadImageAsync = createAsyncThunk(
	'downloadImage',
	async (params) => {
		const response = await downloadImageService(params);
		return response.data;
	},
);
export const uploadImageAsync = createAsyncThunk(
	'uploadImage',
	async (params) => {
		const response = await uploadImageService(params);
		return response.data;
	},
);
export const getReportAsync = createAsyncThunk('getReport', async (params) => {
	const response = await getReportService(params);
	return response.data;
});
export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllDeliveryOrder.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getAllDeliveryOrder.fulfilled, (state, action) => {
				if (action.payload) {
					state.listDeliveryOrder = action.payload;
					state.isloading = false;
				}
			})
			.addCase(getDetailAccounting.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getDetailAccounting.fulfilled, (state, action) => {
				if (action.payload) {
					state.listAccounting = action.payload;
					state.isloading = false;
				}
			})
			.addCase(downloadAccountingAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(downloadAccountingAsync.fulfilled, (state, action) => {
				if (action.payload) {
					const href = URL.createObjectURL(action.payload);
					const link = document.createElement('a');
					link.href = href;
					link.setAttribute('download', `Biên nhận ${dayjs().format('DD/MM/YYYY')}.pdf`);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(href);
					state.isloading = false;
				} else {
					state.isloading = false;
					toast.success('Tiến hành tải xuống!', {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
						theme: 'light',
					});
				}
			})
			.addCase(downloadLadingBillAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(downloadLadingBillAsync.fulfilled, (state, action) => {
				if (action.payload) {
					const href = URL.createObjectURL(action.payload);
					const link = document.createElement('a');
					link.href = href;
					link.setAttribute(
						'download',
						`Biên nhận ${dayjs().format('DD/MM/YYYY')}.pdf`,
					);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(href);
					state.isloading = false;
				} else {
					state.isloading = false;
					toast.success('Tiến hành tải xuống!', {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
						theme: 'light',
					});
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
			.addCase(exportGridAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(exportGridAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.isloading = false;
				}
			})
			.addCase(getSaleStaffAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getSaleStaffAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.saleStaff = action.payload;
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
			.addCase(getDetailShipperAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getDetailShipperAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.shipper = action.payload;
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
			})
			.addCase(deleteExcelAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(deleteExcelAsync.fulfilled, (state, action) => {
				state.isloading = false;
			})
			.addCase(getDownloadAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getDownloadAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.listDownload = action.payload;
					state.isloading = false;
				}
			})
			.addCase(downloadExcelAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(downloadExcelAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.isloading = false;
					state.linkDownload = action.payload;
				} else {
					state.isloading = false;
					toast.success('Tiến hành tải xuống!', {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						progress: undefined,
						theme: 'light',
					});
				}
			})
			.addCase(getInfoImageAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getInfoImageAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.listInfoImage = action.payload;
					state.isloading = false;
				}
			})
			.addCase(uploadImageAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(uploadImageAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.uploadImage = action.payload;
					state.isloading = false;
				}
			})
			.addCase(downloadImageAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(downloadImageAsync.fulfilled, (state, action) => {
				if (action.payload) {
					const href = URL.createObjectURL(action.payload);
					const link = document.createElement('a');
					link.href = href;
					link.setAttribute('download', `Hình ảnh.zip`);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(href);
				}
				// state.linkDownloadImage = action.payload;
				state.isloading = false;
			})
			.addCase(getReportAsync.pending, (state) => {
				state.isloading = true;
			})
			.addCase(getReportAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.listReport = action.payload;
					state.isloading = false;
				}
			});
	},
});
export const selectOrder = (state) => state.order;
export default orderSlice.reducer;
