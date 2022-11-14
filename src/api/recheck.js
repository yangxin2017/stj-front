import request from "@/util/request";

export const getcheckList = (params) => {
    return request(
        "/stj/check/fhlist",
        "get",
        params
    );
}
// /stj/fh/list

export const getRecheckList = (params) => {
    return request(
        "/stj/fh/list",
        "get",
        params
    );
}

// /stj/fh/errlist
export const getRecheckErrList = (params) => {
    return request(
        "/stj/fh/errlist",
        "get",
        params
    );
}

// /stj/fh/setstatus post
export const setRecheckStatus = (params) => {
    return request(
        "/stj/fh/setstatus",
        "post",
        params
    );
}

// /stj/check/fh post
export const setRecheck = (params) => {
    return request(
        "/stj/check/fh",
        "post",
        params
    );
}

// /stj/flow/add post
export const addFlow = (params) => {
    return request(
        "/stj/flow/add",
        "post",
        params
    );
}

// /stj/flow/next post
export const nextFlow = (params) => {
    return request(
        "/stj/flow/next",
        "post",
        params
    );
}

// /stj/fh/search
export const getRecheckSearch = (params) => {
    return request(
        "/stj/fh/search",
        "get",
        params
    );
}

// /stj/flow/last post
export const lastFlow = (params) => {
    return request(
        "/stj/flow/last",
        "post",
        params
    );
}


export const getErrTotal = (params) => {
    return request(
        "/stj/fh/errTotal",
        "get",
        params
    );
}