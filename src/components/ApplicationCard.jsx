import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, Briefcase, Download, School } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { updateApplicationStatus } from '@/api/apiApplications'
import { BarLoader } from 'react-spinners'

const ApplicationCard = ({isCandidate=false, application}) => {
 const {fn: fnUpdateStatus, loading: loadingStatus , data} = useFetch(updateApplicationStatus, {job_id: application?.job_id, appId: application?.id})
 
   const handleDownload=()=> {
    const link = document.createElement("a");
    link.href = application?.resume ;
    link.target = '_blank'
    link.click();
   }

   const handleStatusUpdate = (status) => {
      fnUpdateStatus(status);
   }

    return (
    <Card>
      {loadingStatus && (
         <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
      )}
     <CardHeader>
      <CardTitle className="flex justify-between font-bold">
        {isCandidate 
         ? `${application?.job?.title} at ${application?.job?.company}`
         :  application?.name     
         }
         <Download
            size={18}
            className='bg-white text-black rounded-full h-8 w-8 p1.5 cursor-pointer'
            onClick={handleDownload}
         />
      </CardTitle>
     </CardHeader>
     <CardContent className="flex flex-col flex-1 gap-4">
        <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex gap-2 items-center'>
             <Briefcase size={15} />
            {application?.experience} years of experience
            </div>
            <div className='flex gap-2 items-center'>
             <School size={15} />
            {application?.education} 
            </div>
            <div className='flex gap-2 items-center'>
             <Boxes size={15} />
            Skills: {application?.skills} 
            </div>
        </div>
        <hr/>
     </CardContent>
     <CardFooter className="flex justify-between">
        <span>{new Date(application.created_at).toLocaleString()}</span>
      { isCandidate
        ? (
            <span className='font-bold capitalize'>Status: {application?.status}</span>
        ) :
        <Select onValueChange={(value)=> handleStatusUpdate(value)} defaultValue={application?.status}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Application Status" />
        </SelectTrigger>
        <SelectContent>
             <SelectItem  value={"applied"}>Applied</SelectItem>
             <SelectItem  value={"interviewing"}>Interviewing</SelectItem>
             <SelectItem  value={"hired"}>Hired</SelectItem>
             <SelectItem  value={"rejected"}>Rejected</SelectItem> 
           </SelectContent>
      </Select>
      }
     </CardFooter>
    </Card>
  )
}

export default ApplicationCard