import {useRouter, withRouter} from 'next/router'
import React, {useEffect, useState} from 'react';
import BaseService from "./components/BaseService";

const Service = () => {
  const [loading, setLoading]=useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    if(loading){
      return null;
    }

  return (
     <BaseService/>
  )
}

export default Service;