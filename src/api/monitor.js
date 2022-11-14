import request from "@/util/request";

// /stj/monitor/list
export const getMonitorList = (params) => {
    return request(
        '/stj/monitor/list',
        'get',
        params
    )
}

// /stj/monitor/errlist
export const getMonitorErrList = (params) => {
    return request(
        '/stj/monitor/errlist',
        'get',
        params
    )
}

// /stj/monitor/yxlist
export const getMonitorYxList = (params) => {
    return request(
        '/stj/monitor/yxlist',
        'get',
        params
    )
}

// /stj/monitor/setstatus
export const setMonitorStatus = (params) => {
    return request(
        '/stj/monitor/setstatus',
        'post',
        params
    )
}

export const getMonitorErrTotal = (params) => {
    return request(
        '/stj/monitor/errTotal',
        'get',
        params
    )
}
