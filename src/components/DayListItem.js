import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const daylistclass = classNames(
    'day-list__item',
    {'day-list__item--selected': props.selected,
     'day-list__item--full' :props.spots === 0  
  });
//  const resSpots;
  const formatSpots = (spots)=>{  
    if(spots === 1){
      return `${spots} spot remaining`;
    }
    if(spots === 0){
      return `no spots remaining`;
    }
    return `${spots} spots remaining`;
  }
  return (
    <li className={daylistclass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>      
    </li>
  )
}