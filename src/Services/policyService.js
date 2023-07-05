import request from '../Utils/request'
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
}
export const deletePolicyService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/${id}`, {
        method: 'DELETE'
    })
}

export const createPolicyService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings`, {
        method: 'POST',
        data
    })
}

export const updatePolicyService = (id, data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/${id}`, {
        method: 'PUT',
        data
    })
}