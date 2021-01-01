import React from 'react';
import ServicesOfferList  from '../components/ServicesOfferList'

export default function ServiceOfferListPage(props) {
  return (
    <ServicesOfferList navigation={props.navigation} params={props.route.params}/>
  );
}

