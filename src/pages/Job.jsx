import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import { SelectTrigger } from '@radix-ui/react-select';
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Job = () => {
  const {id} = useParams();
  const {fn: getJob, loading: jobLoading, data: job} = useFetch(getSingleJob, {job_id: id})
  const {fn: updateStatus, loading: loadingStatus, data: updateData} = useFetch(updateHiringStatus, {job_id: id})

  const {user, isLoaded}= useUser()

  useEffect(() => {
    if(isLoaded){
      getJob();
    }
  },[isLoaded])

  const handleStatusChange = (value) => {
    const isOpen = value==="open";
    updateStatus(isOpen).then(() => {
      getJob();
    })
  }

  if(!isLoaded || jobLoading){
    return  <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }
  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extralight pb-3 text-4xl sm:text-6xl'>
        {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className='h-12' alt={job?.title}/>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon/>
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <Briefcase/> {job?.applicants?.length} Applicants
        </div>
      </div>

     <div className='glex gap-2'>
      {job?.isOpen ? (
        <>
          <DoorOpen/> Open
        </>
      ) : (
        <>
          <DoorClosed/> Closed  
        </>
      )
    }
     </div>
      
      {/* hiring status */}
      {user.id===job?.recruiter_id && (
        <Select  onValueChange={(value)=> handleStatusChange(value)}>
        <SelectTrigger className={`w-full ${job?.isOpen? "bg-green-950" : "bg-red-950"}`}>
          <SelectValue placeholder={job?.isOpen ? "Hiring status (oepn)" : "Hiring status (close)" } />
        </SelectTrigger>
        <SelectContent>
             <SelectItem  value={"open"}>
                "Open"
              </SelectItem>
              <SelectItem  value={"Close"}>
                "Close"
              </SelectItem>
           </SelectContent>
      </Select>
      )}

    <h2 className='text-2xl sm:text-3xl font-bold'>About the Job</h2>
    <p className='sm:text-lg'>{job?.description}</p>

    <h2 className='text-2xl font-bold sm:text-3xl'>
      What we are looking for
    </h2>
    <MDEditor.Markdown 
      source={job?.requirements}
      className="bg-transparent sm: text-lg"
      />
    </div>
  )
}

export default Job;