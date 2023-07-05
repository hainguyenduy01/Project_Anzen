import axios from 'axios';

const request = axios.create({
	timeout: 60000,
	headers: {
		'Content-Type': 'application/json-patch+json',
	},
});
const handleError = (error) => {
	const { response = {} } = error;
	const { data, status, statusText } = response;
	return { data, status, statusText };
};

request.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');
	config.headers.Authorization = `Bearer ${token}`;

	return config;
});

request.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const { response = {} } = error;
		const { status } = response;
		if (status === 401) {
			const refreshToken = localStorage.getItem('refresh_token');
			try {
				const response = await axios.post(
					'https://api-uat-anzen-tms.azurewebsites.net/api/Account/refresh-token',
					{
						refreshToken,
					},
				);
				const { access_token, refresh_token, expires_in } = response.data;
				localStorage.setItem('access_token', access_token);
				localStorage.setItem('refresh_token', refresh_token);
				localStorage.setItem('expires_in', expires_in);
				const originalRequest = error.config;
				originalRequest.headers.Authorization = `Bearer ${access_token}`;
				return axios(originalRequest);
			} catch (error) {
				console.error(error);
			}
		}
		return Promise.reject(error);
	},
	handleError,
);

export default request;
