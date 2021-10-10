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
  
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data }));
    });

  }, []);



  function bookInterview(id, interview, flag) {
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

        if(flag === "save") {
        	const days = JSON.parse(JSON.stringify(state.days));
      	  for(let i = 0; i < days.length; i++){
      	    if(days[i].appointments.includes(id)){
      	      days[i].spots = days[i].spots - 1;
              setState({...state, appointments, days});   
      	    }
      	  }
      	} else {
          setState({...state, appointments});
        }
        resolve(res)  
      })
      .catch(error => {
        reject(error.message);
      })
    })
      
  }

  function cancelInterview(id) {
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

        const days = JSON.parse(JSON.stringify(state.days));
      	for(let i = 0; i < days.length; i++){
      	 if(days[i].appointments.includes(id)){
      	   days[i].spots = days[i].spots + 1;
      	      setState({...state, appointments, days});    
      	    }
      	  }	

        resolve(res);  
      })
      .catch(error => {
        reject(error.message);
      })
    })

  }
  return {state, setDay, bookInterview, cancelInterview};


}
