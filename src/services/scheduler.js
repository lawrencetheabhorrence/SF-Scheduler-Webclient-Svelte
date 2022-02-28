import axios from 'axios'
//const baseUrl = 'https://sf-scheduler-algo.herokuapp.com' // server backend
//const baseUrl = "http://127.0.0.1:8000" // local host
const baseUrl = "https://young-cove-10921.herokuapp.com"

export const sendData = (data) => {
  axios.post(`${baseUrl}/webclient/`, JSON.stringify(data))
}
