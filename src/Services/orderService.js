import request from '../Utils/request';
import queryString from 'query-string';
// getDeliveryOrderService
export const getAllDeliveryOrderService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
//deleteDeliveryOrderService
export const deleteOrderService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/${id}`,
		{
			method: 'DELETE',
		},
	);
};
export const getSaleStaffService = () => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/get-sale-staff`,
		{
			method: 'GET',
		},
	);
};
// filterPhoneShipperService
export const filterPhoneCustomerService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/search-by-phone?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
//getShipperService
export const getDetailCustomerService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/${id}`,
		{
			method: 'GET',
		},
	);
};
export const getDetailShipperService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/${id}`,
		{
			method: 'GET',
		},
	);
};
//postDeliveryOrderService
export const postOrderService = (data) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders`,
		{
			method: 'POST',
			data,
		},
	);
};
// getDetailDeliveryOrderService
export const getDetailOrderService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/${id}`,
		{
			method: 'GET',
		},
	);
};
export const getAccountingService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/accounting/${id}`,
		{
			method: 'GET',
		},
	);
};
export const downloadAccountingService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/export-accounting/${id}`,
		{
			method: 'GET',
			responseType: 'blob',
		},
	);
};
export const downloadLadingBillService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/export-receipt/${id}`,
		{
			method: 'GET',
			responseType: 'blob',
		},
	);
};
export const exportGridEService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/export-grid?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
export const getDownloadService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DownloadCenters?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
export const deleteExcelService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DownloadCenters/${id}`,
		{
			method: 'DELETE',
		},
	);
};
export const downloadExcelService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DownloadCenters/link-download/${id}`,
		{
			method: 'GET',
		},
	);
};
export const getInfoImageService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/download-multiple-files-as-links?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
export const downloadImageService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/download-multiple-files-as-zip?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
			responseType: 'blob',
		},
	);
};
export const uploadImageService = (data) => {
	return request(
		'https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/upload',
		{
			method: 'POST',
			data: data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
	);
};
export const getReportService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/RevenueBaselines?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
