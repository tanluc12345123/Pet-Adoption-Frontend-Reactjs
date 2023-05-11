import axios, { HttpStatusCode } from "axios";

const REACT_BASE_URL = "http://localhost:8080/api";

const AxiosClient = axios.create({
    baseURL: REACT_BASE_URL,
    headers: {
        "content-type": "application/json",
    },
    //paramsSerializer: params => queryString.stringify(params),
});
AxiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? token : '';
    return config;
});
AxiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors
        switch (error.response.status) {
            case HttpStatusCode.BadRequest:
                console.log(error.message);

            case HttpStatusCode.InternalServerError:
                console.log(error.message);

            default:
                console.log(error.message);
        }

        throw error;
    }
);

export default AxiosClient;
