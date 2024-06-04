import axios from "axios"
import { LOCAL_HOST } from './APIAdresses'
import { Meeting } from "../types/meeting"

const AppointmentAPI = {
    getAppoinments: () => axios.get(LOCAL_HOST + "appointments")
    .then(response => response.data.appointments),

    createAppointment: (newAppointment: any) => axios.post(LOCAL_HOST + "appointments", newAppointment),

    getAppointmentsByEmployeeId: (emplId: number) => axios.get<{ meetings: Meeting[]}>(LOCAL_HOST + `appointments/by-person?personId=${emplId}`, { headers: { 'Content-Type': 'application/json'}})
}

export default AppointmentAPI