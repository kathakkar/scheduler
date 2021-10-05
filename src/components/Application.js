import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';
import { Fragment } from 'react';
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerListItem from "./InterviewerListItem";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday", 
    days:[],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
//  const [interviewer, setInterviewer] = useState('Sylvia Palmer');
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data }));
    //  console.log(all);
    });

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



  // const interviewers = {
  //   id: 1,
  //   name: "Sylvia Palmer",
  //   avatar: "https://i.imgur.com/LpaY82x.png"
  // };

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          <Fragment>
            { appointments.map((appointment) => {
        
             const interview = getInterview(state, appointment.interview);
              return(
                <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={interviewers}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
                />
              );
            }) }
          
          {/* <Appointment id="last" time="1pm" /> */}
        </Fragment>
      </section>
    </main>
  );
}
