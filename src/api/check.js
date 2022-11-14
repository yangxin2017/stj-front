import request from "@/util/request";

// /stj/check/search
export const getCheckSearch = (params) => {
    return request(
        "/stj/check/search",
        "get",
        params
    );
}