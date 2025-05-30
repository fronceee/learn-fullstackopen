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

function deletePerson(id) {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

function updatePerson(id, updatedObject) {
    const request = axios.put(`${baseURL}/${id}`, updatedObject)
    return request.then(response => response.data)
}

export default {
    getAllPersons,
    addPerson,
    deletePerson,
    updatePerson
}