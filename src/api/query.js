import request from "@/util/request";

// /stj/search/total
export const getTotal = (params) => {
    return request(
        '/stj/search/total',
        'get',
        params
    )
}

// /stj/search/datatype
export const getDataType = (params) => {
    return request(
        '/stj/search/datatype',
        'get',
        params
    )
}

// /stj/search/search
export const getSearch = (params) => {
    return request(
        '/stj/search/search',
        'get',
        params
    )
}