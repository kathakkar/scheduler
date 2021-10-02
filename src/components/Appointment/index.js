import React from "react";
import { Fragment } from 'react'


import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
//import classNames from "classnames";

export default function Appointment(props) {
  (props.key === 'last') && console.log('last', props.time);
  return (
    <article className="appointment">
      <Header time={props.time}/>
    {(props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty/>}
    </article>
  )
}