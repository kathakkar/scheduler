import React from "react";
import { Fragment } from 'react'
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
//import classNames from "classnames";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING"; 
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  function save(name, interviewer) {
    
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id,interview)
    .then(()=>transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));    
  }



  function onDelete(){
    transition(CONFIRM);
    
  }

  function onConfirm(id) {
    transition(DELETING, true);
    props.cancelInterview(id)
    .then(()=>transition(EMPTY))
    .catch((err)=> {
      transition(ERROR_DELETE, true)
    });
  }
  function onEdit(id){
    transition(EDIT);
  }

  (props.key === 'last') && console.log('last', props.time);
  return (
    <article className="appointment">
      <Header time={props.time}/>
    {/* {(props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty/>} */}
      

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) }/>}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && <Form onCancel={()=>back()} interviewers={props.interviewers} onSave={save}/>}
      {mode === EDIT && <Form onCancel={()=>back()} name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save}/>}
      {mode === SAVING && <Status message='Saving' />}
      {mode === CONFIRM && <Confirm id={props.id} message='Are you sure you would like to delete?' onCancel={()=>back()} onConfirm={onConfirm} />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === ERROR_SAVE && <Error onClose={()=>back()} message="Could not save appointment"/>}
      {mode === ERROR_DELETE && <Error onClose={()=>back()} message="Could not delete appointment"/>}

    </article>
  )
}