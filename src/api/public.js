import request from "@/util/request";

// /stj/base/triptypes
export const getTripTypes = (params) => {
    return request(
        "/stj/base/triptypes",
        "get",
        params
    );
}