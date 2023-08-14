import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "https://server.vikrambots.in",
})
export default axiosInstance