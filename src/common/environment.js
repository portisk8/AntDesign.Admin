import packageJson from "../../package.json";
export default {
  PROJECT_NAME: packageJson["project-name"],
  TITLE: packageJson["title"],
  TITLE_SHORT: packageJson["titleShort"],
  VERSION: packageJson["version"],
  API_URL: process.env.REACT_APP_API_URL,
};
