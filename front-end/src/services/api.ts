import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})
api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('@MobCar:token')

    config.headers = {
      Authorization: `Bearer ${token}`,
    }
    return config
  },
  error => {
    Promise.reject(error)
  },
)

export default api
