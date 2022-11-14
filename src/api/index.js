import request from "@/util/request"

// /stj/user/login
export const login = (params) => {
    return request(
        '/stj/user/login',
        'post',
        params
    )
}


// /stj/main/total
export const total = (params) => {
    return request(
        '/stj/main/total',
        'get',
        params
    )
}

// /stj/main/month
export const month = (params) => {
    return request(
        '/stj/main/month',
        'get',
        params
    )
}

// /stj/main/ctypes
export const ctypes = (params) => {
    return request(
        '/stj/main/ctypes',
        'get',
        params
    )
}

// /stj/main/typedatas
export const typedatas = (params) => {
    return request(
        '/stj/main/typedatas',
        'get',
        params
    )
}