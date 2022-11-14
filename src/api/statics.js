import request from "@/util/request";

export const getActiveUser = () => {
  return request(
    "/stj/statics/total",
    "get"
  )
}

export const getGreenTrip = () => {
  return request(
    "/stj/statics/green",
    "get"
  )
}

export const getHourGreenTrip = () => {
  return request(
    "/stj/statics/hour",
    "get"
  )
}
