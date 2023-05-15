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
    },
    getTypesPet: () => {
        return AxiosClient.get(Route.TYPE_PET)
    },
    addTypePet: (nameType) => {
        return AxiosClient.post(Route.ADD_TYPE_PET, {
            nameType: nameType
        })
    },
    editTypePet: (id, nameType) => {
        return AxiosClient.put(Route.EDIT_TYPE_PET + '/' + id, {
            nameType: nameType
        })
    },
    deleteTypePet: (id) => {
        return AxiosClient.delete(Route.EDIT_TYPE_PET + '/' + id)
    }
}

export default Api
