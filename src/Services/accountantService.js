import queryString from "query-string";
import request from "../Utils/request";

export const getBillOfLadingsService = (data) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings?${queryString.stringify(data)}`,
		{
			method: 'GET',
		},
	);
};
export const getDetailBillOfLadingsService = (id) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/${id}`,
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
export const updateCompletedAccountingService = (id) => {
	return request(
		`ttps://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/mark-done/${id}`,
		{
			method: 'POST',
		},
	);
};
