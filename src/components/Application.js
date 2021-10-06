import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';
import { Fragment } from 'react';
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerListItem from "./InterviewerListItem";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  



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