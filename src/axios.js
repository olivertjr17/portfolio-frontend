import axios from "axios"
import { router } from "./router"

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: "GuestLogin" })
    }

    throw error
  }
)

export default axiosClient
