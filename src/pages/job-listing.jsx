import { getJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useSession } from '@clerk/clerk-react'
import React from 'react'
import { useEffect } from 'react'

const JobListing = () => {
const {fn, data, loading, error} = useFetch(getJobs,{});
console.log('data:', data)
const {session} = useSession();
  useEffect(() => {
    if(session){
      fn();
    }
    
    
  },[session])
  return (
    <div>JobListing</div>
  )
}

export default JobListing