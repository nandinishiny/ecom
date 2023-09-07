import axios from "axios";

export const newRequest = axios.create({
    baseURL:"https://pleasebuy.onrender.com/api/v1",
    withCredentials:true
})
