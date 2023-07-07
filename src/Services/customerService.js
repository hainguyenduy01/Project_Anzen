import request from "../Utils/request";
import queryString from 'query-string';
export const getAllCustomerService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers?${queryString.stringify(data)}`, {
        method: 'GET'
    })
}

export const deleteCustomerService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/${id}`, {
        method: 'DELETE'
    })
}

export const createCustomerService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Customers`, {
        method: 'POST',
        data
    })
}
export const exportGridEService = (params) => {
	return request(
		`https://api-uat-anzen-tms.azurewebsites.net/api/Customers/export-grid?${queryString.stringify(
			params,
		)}`,
		{
			method: 'GET',
		},
	);
};
