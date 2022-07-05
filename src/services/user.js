import { axiosRequest } from "../utils/requests";
import CONFIG from "../common/environment";

const __APIURL = CONFIG.API_URL;

export async function loginService(body) {
  console.log(CONFIG);
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        access_token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBcGkgVGVzdCBMb2dpbiIsImlhdCI6MTY1NzA1NzgzMywiZXhwIjoxNjg4NTkzODYwLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsQGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiSm9obm55IiwiU3VybmFtZSI6IlJvY2tldCIsIkVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsIlJvbGUiOlsiTWFuYWdlciIsIlByb2plY3QgQWRtaW5pc3RyYXRvciJdLCJ1c2VybmFtZSI6IlVzdWFyaW8gVGVzdCIsInVzZXJJZCI6IjEifQ.fpJCUrVx-5H-0g-Lbuw28VNY7ElzHNpw9theT0KopGE",
      },
    });
    // throw new Error("Whoops!");
  });
  return axiosRequest(`${__APIURL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
}
