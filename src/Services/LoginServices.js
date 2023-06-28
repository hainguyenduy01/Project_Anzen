import request from '../Utils/request';

export const LoginService = (params) => {
	return request(
		'https://api-uat-anzen-tms.azurewebsites.net/api/Account/login',
		{
			method: 'POST',
			data: params,
		},
	);
};
export const getUserProfile = () => {
	return request(
		'https://api-uat-anzen-tms.azurewebsites.net/api/Account/get-user-profile',
		{ method: 'GET' },
	);
};
