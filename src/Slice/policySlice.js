import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	downloadCodeBillService,
	downloadImageService,
	exportGridEService,
	getAllPolicyService,
	getDetailCodeBillService,
	getInfoImageService,
	uploadImageService,
} from '../Services/policyService';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
const initialState = {
	isLoading: false,
	listPolicy: [],
	detailCode: {},
	listInfoImage: {},
	uploadImage: [],
};
export const getAllPolicyAsync = createAsyncThunk(
	'getAllPolicy',
	async (pages) => {
		const response = await getAllPolicyService(pages);
		return response.data;
	},
);
export const downloadCodeBillAsync = createAsyncThunk(
	'downloadCodeBill',
	async (params) => {
		const response = await downloadCodeBillService(params);
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
export const getDetailCodeBillAsync = createAsyncThunk(
	'getDetailCodeBill',
	async (id) => {
		const response = await getDetailCodeBillService(id);
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
export const policySlice = createSlice({
	name: 'listPolicy',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPolicyAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllPolicyAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.isLoading = false;
					state.listPolicy = action.payload;
				}
			})
			.addCase(downloadCodeBillAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(downloadCodeBillAsync.fulfilled, (state, action) => {
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
					state.isLoading = false;
				} else {
					state.isLoading = false;
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
			.addCase(exportGridAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(exportGridAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.isLoading = false;
				}
			})
			.addCase(getDetailCodeBillAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDetailCodeBillAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.detailCode = action.payload;
					state.isLoading = false;
				}
			})
			.addCase(getInfoImageAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInfoImageAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.listInfoImage = action.payload;
					state.isLoading = false;
				}
			})
			.addCase(downloadImageAsync.pending, (state) => {
				state.isLoading = true;
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
					state.isLoading = false;
				} else {
					state.isLoading = false;
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
			.addCase(uploadImageAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadImageAsync.fulfilled, (state, action) => {
				if (action.payload) {
					state.uploadImage = action.payload;
					state.isLoading = false;
				}
			});
	},
});
export const selectPolicy = (state) => state.listPolicy;
export default policySlice.reducer;
