import {PhotosType, ProfileType} from "../redux/types/types";
import {GetItemsType, instance, ResponseType} from "./api";

type SavePhotoResponseDataType={
    photos: PhotosType
}
export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 3) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`
        ).then(res => {
            return res.data
        })

    },

    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res=>res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res=>res.data) as Promise<ResponseType>
    },
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res=>res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res=>res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(res=>res.data)
    },
    savePhoto(photo: any) {
        const form = new FormData();
        form.append("image", photo)
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res=>res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
    }
}