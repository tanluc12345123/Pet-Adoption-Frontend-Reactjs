import AxiosClient from './AxiosClient';
import Route from './Route';

const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

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
        return AxiosClient.get(Route.NO_LOGIN + Route.TYPE_PET)
    },
    addTypePet: (nameType) => {
        return AxiosClient.post(Route.TYPE_PET + Route.ADD_TYPE_PET, {
            nameType: nameType
        })
    },
    editTypePet: (id, nameType) => {
        return AxiosClient.put(Route.TYPE_PET + '/' + id, {
            nameType: nameType
        })
    },
    deleteTypePet: (id) => {
        return AxiosClient.delete(Route.TYPE_PET + '/' + id)
    },
    getPets: () => {
        return AxiosClient.get(Route.NO_LOGIN + Route.PET + '?trash=false')
    },
    addPet: (idType, pet) => {

        return AxiosClient.post(Route.PET + Route.TYPE_PET + '/' + idType, pet, config)
    },
    updatePet: (idPet, idType, pet) => {
        return AxiosClient.put(Route.PET + '/' + idPet + Route.TYPE_PET + '/' + idType, pet, config)
    }
}

export default Api
