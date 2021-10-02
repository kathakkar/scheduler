import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const interviewerlistitemclass = classNames(
    'interviewers__item',
    {'interviewers__item--selected' : props.selected }
  )
  

  return (
    <li className={interviewerlistitemclass} id={props.id} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      <h6>{props.name}</h6>
    </li>

  
  );
}