import axios from "axios";
const accessToken = localStorage.getItem('accessToken');
const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
  headers: {
    "Accept-language": "en",          
    Authorization: `Bearer ${accessToken}`

  }
});
export default authAxiosInstance;