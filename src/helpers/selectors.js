
export function getAppointmentsForDay(state, day) {
  const finalResult = [];
  if (state.days.length === 0) {
    return [];
  }
  const result = state.days.filter((dayObj) => {
    return (dayObj.name === day) ? true : false;
  });
  if (result.length === 0) {
    return result;
  }
  for(let appointmentObj in state.appointments){
    for(let appointmentArr of result[0].appointments){
     if(appointmentArr === state.appointments[appointmentObj].id){
       finalResult.push(state.appointments[appointmentObj]);
     }
   }
  }
  return finalResult;
}


export function getInterviewersForDay(state, day) {
  const finalResult = [];
  if (state.days.length === 0) {
    return [];
  }
  const result = state.days.filter((dayObj) => {
    return (dayObj.name === day) ? true : false;
  });
  if (result.length === 0) {
    return result;
  }
  for(let interviewObj in state.interviewers){
    for(let interviewArr of result[0].interviewers){
     if(interviewArr === state.interviewers[interviewObj].id){
       finalResult.push(state.interviewers[interviewObj]);
     }
   }
  }
  return finalResult;
}

export function getInterview(state, interview) {
  const interviewObj = {};
 //return interview;
  if(interview){
    for(let interviewObjKey in state.interviewers ){
      if(state.interviewers[interviewObjKey].id === interview.interviewer) {
        interviewObj.student = interview.student
        interviewObj.interviewer = state.interviewers[interviewObjKey];
      }
    }
  } else {
    return null;
  }
  return interviewObj;

  
}