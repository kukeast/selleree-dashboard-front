import axios from 'axios';
import { format }from "date-fns";

const Api = axios.create()
Api.interceptors.request.use(
    (config) => {
        config.headers = { "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
        return config
    },
    (err) => {
        return Promise.reject(err);
    }
);
Api.interceptors.response.use(
    (config) => {
        return config
    },
    (err) => {
        if(err.response.data === "Token is expired"){
            return refresh()
            .then(res => {
                localStorage.setItem("access-token", JSON.stringify(res.access_token))
                localStorage.setItem("refresh-token", JSON.stringify(res.refresh_token))
                err.config.headers = { "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem("access-token"))}`}
                return axios(err.config)
            })
        }
        return Promise.reject(err);
    }
)

const url = "sellereeback.ngrok.io"

export async function test() {
    const response = await Api.get(`https://${url}/api/test`)
    return response.data;
}

export async function refresh() {
    const response = await axios.post(`https://${url}/api/refresh`, {
        "refresh-token" : JSON.parse(window.localStorage.getItem("refresh-token"))
    });
    return response.data;
}

export async function logIn(user) {
    const response = await axios.post(`https://${url}/api/login`, user);
    return response.data;
}

export async function getToday() {
    const response = await Api.get(`https://${url}/api/today`);
    return response.data;
}

export async function getTodayChart(name) {
    const response = await Api.get(`https://${url}/api/today-chart/${name}`);
    return response.data;
}

export async function getProducts(limit) {
    const response = await Api.get(`https://${url}/api/products/${limit}`);
    return response.data;
}

export async function getOrders(limit, sortBy) {
    const response = await Api.post(`https://${url}/api/orders/${limit}`, {
        sortBy : sortBy
    });
    return response.data;
}

export async function getOrderDetail(orderId) {
    const response = await Api.get(`https://${url}/api/order/${orderId}`);
    return response.data;
}

export async function getShopggu() {
    const response = await Api.get(`https://${url}/api/shopggus`);
    return response.data;
}

export async function getFunnel(dateRange) {
    const response = await Api.post(`https://${url}/api/funnel`, {
        startDate: format(dateRange.startDate, "yyyy.MM.dd"),
        endDate: format(dateRange.endDate, "yyyy.MM.dd"),
    });
    return response.data;
}