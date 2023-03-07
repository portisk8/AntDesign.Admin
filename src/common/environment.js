import packageJson from "../../package.json";
export default {
  CLIENT_NAME: packageJson["client-name"],
  PROJECT_NAME: packageJson["project-name"],
  PROJECT_VERSION: packageJson["version"],
  TITLE: "Title Long",
  TITLE_SHORT: "Short",
  API_URL: process.env.REACT_APP_API_URL,
  MENU: {
    TYPE: "top", //top | side
    THEME: "dark", //light | dark
  },
  GOOGLE: {
    isEnable: process.env.REACT_APP_GOOGLE_CLIENT_ID != null,
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  },
};
