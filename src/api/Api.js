import AxiosClient from './AxiosClient';
import Route from './Route';

const Api = {
    login: (username, password) => {
        return AxiosClient.post(Route.LOGIN, {
            phone: username,
            password: password
        })
    },
    changePassword: (userId, oldPassword, newPassword, confirmPassword) => {
        return AxiosClient.put(Route.USER + '/' + userId + Route.CHANGE_PASSWORD, {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })
    }
}

export default Api
