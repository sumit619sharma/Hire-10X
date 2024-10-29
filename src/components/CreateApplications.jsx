import { getApplications } from '@/api/apiApplications';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import ApplicationCard from './ApplicationCard';
import useFetch from '@/hooks/use-fetch';

const CreateApplications = () => {
    const {isLoaded, user} = useUser();
    const {fn: fnApplications, data: applications, loading: loadingApplications} = useFetch(getApplications,{user_id: user.id});

    useEffect(() => {
        if(isLoaded) fnApplications();
    },[isLoaded])

    if(!isLoaded || loadingApplications) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    }

  return (
    <div className="flex flex-col gap-2">
    {applications?.map((application) => {
      return (
        <ApplicationCard
          key={application.id}
          application={application}
          isCandidate={true}
        />
      );
    })}
  </div>
  )
}

export default CreateApplications