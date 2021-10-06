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
//  const [interviewer, setInterviewer] = useState('Sylvia Palmer');
  
  
useEffect(() => {
  const url = "ws://localhost:8000";
  const webSocket = new WebSocket(url);
//  webSocket.send('ping');
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ])
  .then((all) => {
    setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data }));
  //  console.log(all);
  });
  return  webSocket.close();

}, []);



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

    
      for(let i = 0; i < state.days.length; i++){
          if(state.days[i].appointments.includes(id)){
            state.days[i].spots = state.days[i].spots - 1;
            const days = state.days;
            setState({...state, appointments, days});   
          }
      }
      console.log(state);
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

      for(let i = 0; i < state.days.length; i++){
        if(state.days[i].appointments.includes(id)){
          state.days[i].spots = state.days[i].spots + 1;
          const days = state.days;
          setState({...state, appointments, days});   
        }
      }

      setState({...state, appointments});   
      resolve(res);  
    })
    .catch(error => {
      reject(error.message);
    })
  })

}


  return {state, setDay, bookInterview, cancelInterview};


}
