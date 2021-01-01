import React from 'react';
import ScheduleService  from '../components/ScheduleService'

export default function ScheduleServicePage(props) {
  return (
    <ScheduleService navigation={props.navigation} params={props.route.params}/>
  );
}

