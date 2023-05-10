import AxiosClient from './AxiosClient';
import Route from './Route';

const Api = {
    login: (username, password) => {
        return AxiosClient.post(Route.LOGIN, {
            phone: username,
            password: password
        })
    }
}

export default Api
