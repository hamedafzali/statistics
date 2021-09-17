import { apiUrl, apiUrlDev } from "../config.json";
const api = process.env.REACT_APP_ENV === "development" ? apiUrlDev : apiUrl;
console.log(api, process.env.REACT_APP_ENV);
export default api;
