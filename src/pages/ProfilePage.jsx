import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile'
import { loadUser } from '../services/UserServices'

export default function ProfilePage(props) {




  return (
    <UserProfile navigation={props.navigation}/>
  );
}

