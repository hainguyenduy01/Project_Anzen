import request from "../Utils/request";
import queryString from 'query-string';

export const getAllUserService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser?${queryString.stringify(data)}`, {
        method: 'GET'
    })
}

export const deleteUserService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser/${id}`, {
        method: 'DELETE'
    })
}

export const createUserService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser/register`, {
        method: 'POST',
        data
    })
}

