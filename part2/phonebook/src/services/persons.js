import axios from 'axios'

const baseURL = `${import.meta.env.VITE_API_URL}/persons`

function getAllPersons() {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

function addPerson(newObject) {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}


export default {
    getAllPersons,
    addPerson,
}