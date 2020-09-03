import * as axios from "axios";
import { follow } from "../redux/user-reducer";
import Login from "../components/Login/Login";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "76156c43-eeac-4052-8aff-c7c5dc5aa149"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 3) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`

        ).then(response => {
            return response.data
        })

    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
       return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
       return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
     },
     updateStatus(status) {
        return instance.put(`profile/status`,{status:status})
     },
     savePhoto(photo){
        const form = new FormData();
        form.append("image", photo)
        return instance.put(`profile/photo`,form,{
            headers: {
             'content-type': 'multipart/form-data' 
            }})
     },
     saveProfile(profile){
        return instance.put(`profile`, profile)
     }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email,password, rememberMe=false, captcha){
        return instance.post(`/auth/login`,{email, password,rememberMe, captcha})
    },
    logout(){
        return instance.delete(`/auth/login`)
    }
}


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`)
    }
}




