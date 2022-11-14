import request from "@/util/request"

// /stj/cpf/data
export const getData = (params) => {
    return request(
        '/stj/cpf/data',
        'get',
        params
    )
}

// /stj/cpf/add post
export const addData = (params) => {
    return request(
        '/stj/cpf/add',
        'post',
        params
    )
}

// /stj/cpf/update post
export const updateData = (params) => {
    return request(
        '/stj/cpf/update',
        'post',
        params
    )
}

// /stj/project/data
export const getProjectData = (params) => {
    return request(
        '/stj/project/data',
        'get',
        params
    )
}

// /stj/project/add post
export const addProjectData = (params) => {
    return request(
        '/stj/project/add',
        'post',
        params
    )
}

// /stj/project/update post
export const updateProjectData = (params) => {
    return request(
        '/stj/project/update',
        'post',
        params
    )
}