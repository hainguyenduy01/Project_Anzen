import request from "../Utils/request";
import queryString from 'query-string';

export const getAllDriverService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers?${queryString.stringify(data)}`, {
        method: 'GET'
    })
}

export const deleteDriverService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/${id}`, {
        method: 'DELETE'
    })
}

export const createDriverService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers`, {
        method: 'POST',
        data
    })
}

export const updateDriverService = (id,data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/${id}`, {
        method: 'PATCH',
        data
    })
}

export const searchLicensePlateService = (id) =>{
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/search-by-licenseplate/${id}`,{
        method: 'GET'
    })
}
