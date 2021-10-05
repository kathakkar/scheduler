import React from "react";
import { Fragment } from 'react'
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
//import classNames from "classnames";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview)
    .then(()=>transition(SHOW));
  }

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
      {mode === CREATE && <Form onCancel={()=>back()} interviewers={props.interviewers} onSave={save}/>}
      {mode === SAVING && <Status message='SAVING' />}
    </article>
  )
}