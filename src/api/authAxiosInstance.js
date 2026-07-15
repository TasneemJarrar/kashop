import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const accessToken = useAuthStore.getState().token;
const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
  headers: {
    "Accept-language": "en",          
    Authorization: `Bearer ${accessToken}`

  }
});
export default authAxiosInstance;