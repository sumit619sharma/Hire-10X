import { getSavedJobs } from '@/api/apiJobs';
import JobCard from '@/components/job-card';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';

const SavedJob = () => {
  const {fn: fnSavedJobs, data: savedJobs, loading: loadingSavedJobs} = useFetch(getSavedJobs);
  const {isLoaded} = useUser(); 
  console.log('saved jobs==',savedJobs);
  useEffect(()=> {
    if(isLoaded) fnSavedJobs();
  }, [isLoaded])

  if(!isLoaded || loadingSavedJobs){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
   }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>
     {loadingSavedJobs===false &&  (

        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>{
          savedJobs && savedJobs.length>0 ?
          savedJobs.map((saved) => {
          // chech saved job contains this job or not
          return <JobCard key={saved.id} job={saved?.job}
                  isMyJob={false}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
           />})
        : 
        <div>No Saved Jobs 👀</div>
        }
        </div>
      )}
    </div>
  )
}

export default SavedJob