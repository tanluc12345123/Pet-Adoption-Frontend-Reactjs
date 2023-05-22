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
        return AxiosClient.put(Route.USERS + '/' + userId + Route.CHANGE_PASSWORD, {
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
    },
    deletePet: (idPet) => {
        return AxiosClient.put(Route.PET + '/' + idPet + Route.TRASH)
    },
    getTypesSchedule: () => {
        return AxiosClient.get(Route.PET_SCHEDULE + Route.TYPE_PET)
    },
    addSchedulePet: (idType, schedule) => {
        return AxiosClient.post(Route.PET_SCHEDULE + Route.TYPE_PET + '/' + idType, schedule)
    },
    getScheduleByType: (idType) => {
        return AxiosClient.get(Route.PET_SCHEDULE + '/' + idType)
    },
    updateSchedule: (idSchedule, schedule) => {
        return AxiosClient.put(Route.PET_SCHEDULE + '/' + idSchedule, schedule)
    },
    getServices: () => {
        return AxiosClient.get(Route.NO_LOGIN + Route.SERVICES)
    },
    addService: (service) => {
        return AxiosClient.post(Route.SERVICES + Route.ADD_SERVICE, service, config)
    },
    updateService: (id, service) => {
        return AxiosClient.put(Route.SERVICES + '/' + id, service, config)
    },
    deleteService: (id) => {
        return AxiosClient.put(Route.SERVICES + '/' + id + Route.TRASH)
    },
    getOrderedService: () => {
        return AxiosClient.get(Route.USERS + Route.SERVICE + Route.REGISTERED)
    },
    approveOrderedService: (id) => {
        return AxiosClient.put(Route.USERS + Route.BOOKING_SERVICE + '/' + id + Route.APPROVE)
    },
    completeOrderedService: (id) => {
        return AxiosClient.put(Route.USERS + Route.BOOKING_SERVICE + '/' + id + Route.COMPLETE)
    },
    cancelOrderedService: (id) => {
        return AxiosClient.put(Route.USERS + Route.BOOKING_SERVICE + '/' + id + Route.CANCEL)
    },
    getVeterinarians: () => {
        return AxiosClient.get(Route.NO_LOGIN + Route.VETERINARIANS)
    },
    addVeterinarian: (veterinarian) => {
        return AxiosClient.post(Route.VETERINARIANS + Route.ADD_SERVICE, veterinarian, config)
    },
    updateVeterinarian: (id, veterinarian) => {
        return AxiosClient.put(Route.VETERINARIANS + '/' + id, veterinarian, config)
    },
    deleteVeterinarian: (id) => {
        return AxiosClient.put(Route.VETERINARIANS + '/' + id + Route.TRASH)
    },
    getOrderedVeterinarians: () => {
        return AxiosClient.get(Route.USERS + Route.VETERINARIANS + Route.REGISTERED)
    },
    approveOrderedVeterinarian: (id) => {
        return AxiosClient.put(Route.USERS + Route.BOOKING_VETERINARIAN + '/' + id + Route.APPROVE)
    },
    completeOrderedVeterinarian: (id) => {
        return AxiosClient.put(Route.USERS + Route.BOOKING_VETERINARIAN + '/' + id + Route.COMPLETE)
    },
    cancelOrderedVeterinarian: (id) => {
        return AxiosClient.put(Route.USERS + Route.BOOKING_VETERINARIAN + '/' + id + Route.CANCEL)
    },
}

export default Api
