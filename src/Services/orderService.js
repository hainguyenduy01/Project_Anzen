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
