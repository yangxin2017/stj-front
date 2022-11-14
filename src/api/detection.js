import request from "@/util/request";

// /stj/monitor/search
export const getMonitorSearch = (params) => {
    return request(
        "/stj/monitor/search",
        "get",
        params
    );
}