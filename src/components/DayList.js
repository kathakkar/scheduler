
import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";

export default function DayList(props){

  const daylist = [];
  for(let i = 0; i < props.days.length; i++){
    daylist.push(<div>
      <DayListItem 
        name={props.days[i].name} 
        spots={props.days[i].spots} 
        selected={props.days[i].name === props.day}
        setDay={props.setDay}
      /></div>);
  }
  return(
    <ul>      
      {daylist}
    </ul>
  )
}