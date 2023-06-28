import request from '../Utils/request';
import stringify from 'query-string';
// getDeliveryOrderService
export const getOrderService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders?${stringify(
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
		`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/search-by-phone?${stringify(
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
