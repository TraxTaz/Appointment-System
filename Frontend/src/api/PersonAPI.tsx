import axios from "axios"
import { LOCAL_HOST } from "./APIAdresses"
import { Person } from "../types/person"

const personAPI = {
    getPersons: () => axios.get<{ people: Person[]}>(LOCAL_HOST + "people")
    .then(response => response.data),

    createPerson: (newPerson: Person) => axios.post(LOCAL_HOST + "people", newPerson)
}

export default personAPI