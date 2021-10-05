import {useState, useEffect} from "react";
import axios from 'axios';


export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday", 
    days:[],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  
  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`,{interview})
      .then(res => {
        
        console.log(res.status); 
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
      
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };   
        setState({...state, appointments});   
        resolve(res)  
      })
      .catch(error => {
        reject(error.message);
      })
    })
      
  }
  
  function cancelInterview(id){
    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
      .then(res => {
        console.log(res.status); 
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
      
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };   
        setState({...state, appointments});   
        resolve(res);  
      })
      .catch(error => {
        reject(error.message);
      })
    })
  
  }

  return (state, setState, setDay, bookInterview, cancelInterview);


}
