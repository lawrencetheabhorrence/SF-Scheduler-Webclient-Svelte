import axios from 'axios'
const baseUrl = 'https://sf-scheduler-algo.herokuapp.com'

export const sendData = (data) => {
  axios.post(`${baseUrl}/scheduler/`, JSON.stringify(data))
}
