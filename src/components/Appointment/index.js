import React from "react";
import { Fragment } from 'react'
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
//import classNames from "classnames";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  (props.key === 'last') && console.log('last', props.time);
  return (
    <article className="appointment">
      <Header time={props.time}/>
    {/* {(props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty/>} */}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) }/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form onCancel={()=>back()}/>}
    </article>
  )
}