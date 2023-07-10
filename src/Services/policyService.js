import request from '../Utils/request';
import queryString from 'query-string';
export const getAllPolicyService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
export const downloadCodeBillService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/export?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
			responseType: 'blob',
		},
	);
};
export const exportGridEService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/export-grid?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
export const getDetailCodeBillService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/${id}`,
		{
			method: 'GET',
		},
	);
};
export const getInfoImageService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/download-multiple-files-as-links?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
export const downloadImageService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/download-multiple-files-as-zip?${queryString.stringify(
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
		'https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/upload',
		{
			method: 'POST',
			data: data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
	);
};
export const getProductToGoService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/getforbl?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
export const postProductService = (data) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings`,
		{
			method: 'POST',
			data,
		},
	);
};
