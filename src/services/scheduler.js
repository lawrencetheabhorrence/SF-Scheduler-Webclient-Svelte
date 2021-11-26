import axios from 'axios'
const baseUrl = 'https://sf-scheduler-algo.herokuapp.com'
//const baseUrl = "http://127.0.0.1:8000"

export const sendData = (data) => {
  axios.post(`${baseUrl}/scheduler/`, JSON.stringify(data))
}
