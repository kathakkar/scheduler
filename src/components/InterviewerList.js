import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';


function InterviewerList(props) {
  const interviewelist = [];

  for(let i = 0; i < props.interviewers.length; i++) {
    interviewelist.push(<InterviewerListItem
    key= {props.interviewers[i].id}
    name={props.interviewers[i].name}
    avatar={props.interviewers[i].avatar}
    selected={props.interviewers[i].id === props.value}
    setInterviewer={event=>props.onChange(props.interviewers[i].id)} />);
  }
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewelist}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers : PropTypes.array.isRequired
};

export default InterviewerList;