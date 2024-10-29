import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import useFetch from '@/hooks/use-fetch'
import { deleteJob, saveJob } from '@/api/apiJobs'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
const JobCard = ({job, isMyJob=false, savedInit=false, onJobAction=()=>{}}) => {
const {user} = useUser();
const [saved,setSaved] = useState(savedInit);  
const {fn:fnSavedJob, data: savedJobData, loading: loadingSavedJob} = useFetch(saveJob, {isSavedJob: saved});
const {fn:fnDeleteJob, data: deleteJobData, loading: loadingDeleteJob} = useFetch(deleteJob, {job_id: job?.id});
  
  const handleSavedJob = async () => {
    await fnSavedJob({user_id: user.id, job_id: job.id})
    onJobAction();
  }
  const handleDeleteJob =async ()=> {
    await fnDeleteJob();
    onJobAction();
  }

  useEffect(()=>{
 if(savedJobData) {
  setSaved(savedJobData.length >0);
 }
  },[savedJobData])
  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && 
        <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
      }
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
             fill='red'
             size={18}
             className='text-red-300 cursor-pointer'
             onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 flex-1'>
    <div className='flex justify-between'>
        {job?.company && <img src={job?.company?.logo_url} className='h-6' />}
      <div>
        <MapPinIcon size={15}/> {job.location}
      </div>
      </div>
          <hr/>
      {job.description }
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Link to={`/job/${job.id}`} className='flex-1'>
          <Button variant='secondary' className='w-full'>more details</Button>
        </Link>
        {!isMyJob && (
          <Button 
            variant='outline'
            className='w-15'
            onClick={handleSavedJob}
            disabled={loadingSavedJob}
            >
              {saved ? 
                <Heart size={20} fill='red' stroke='red' />
              :
              <Heart size={20}  />
              }
          </Button>
        )}
        
      </CardFooter>
    </Card>
  )
}

export default JobCard