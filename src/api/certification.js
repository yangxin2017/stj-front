import request from "@/util/request"

// /stj/check/list
export const getCheckList = (params) => {
    return request(
        '/stj/check/list',
        'get',
        params
    )
}

// /stj/check/errlist
export const getCheckErrList = (params) => {
    return request(
        '/stj/check/errlist',
        'get',
        params
    )
}

// /stj/check/setstatus
export const setCheckStatus = (params) => {
    return request(
        '/stj/check/setstatus',
        'post',
        params
    )
}

export const getCheckErrTotal = (params) => {
    return request(
        '/stj/check/errTotal',
        'get',
        params
    )
}