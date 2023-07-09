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
