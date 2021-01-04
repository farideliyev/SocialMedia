import axios from "axios";
import {UserType} from "../redux/types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "76156c43-eeac-4052-8aff-c7c5dc5aa149"
    }
})
export type GetItemsType={
    items: Array<UserType>
    totalCount:number
    error:string | null
}
export enum ResultCodesEnum{
    Success=0,
    Error=1
}

export enum ResultCodeForCaptchaEnum{
    captchaIsRequired=10
}


export type ResponseType<D = {}, RC = ResultCodesEnum | ResultCodeForCaptchaEnum> = {
    data: D,
    resultCode: RC,
    messages: Array<string>
}