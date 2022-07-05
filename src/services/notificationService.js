import CONFIG from "../common/environment";
import { axiosRequest } from "../utils/requests";

const __APIURL = CONFIG.API_URL;

export async function getNotificationsService() {
  const token = localStorage.getItem("token");

  return axiosRequest(`${__APIURL}/api/notification`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export async function clearNotificationsService() {
  const token = localStorage.getItem("token");

  return axiosRequest(`${__APIURL}/api/notification/clear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
