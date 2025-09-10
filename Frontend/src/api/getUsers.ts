import axiosInstance from "src/api";
import { BaseResponse } from "src/types";

export interface UserData {
    id: string;
    username: string;
    email?: string;
}

export interface GetUsersResponse extends BaseResponse {
    data: UserData[];
}

export const getUsers = (start: number, limit: number) => {
    const token = localStorage.getItem("access-token");
    const url = `/user/users/${start}/${limit}`;
    
    return axiosInstance.get<GetUsersResponse>(url, {
        withCredentials: true, // ensures cookies are sent
        headers: {
            "access-token": token ?? "",
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then(res => res.data);
};
