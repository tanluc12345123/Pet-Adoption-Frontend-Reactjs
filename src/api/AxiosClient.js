import axios, { HttpStatusCode } from "axios";

REACT_APP_BASE_URL = "http://localhost:8080/api";

const axiosClient = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers: {
        "content-type": "application/json",
    },
    //paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors
        switch (error.response.status) {
            case HttpStatusCode.BadRequest:
                console.log(strings.errorMessageBadRequest);

            case HttpStatusCode.InternalServerError:
                console.log(strings.errorMessageServerDie);

            default:
                console.log(error.message);
        }

        throw null;
    }
);

export default axiosClient;
