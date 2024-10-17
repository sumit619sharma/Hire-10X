import { getCompanies } from '@/api/apiCompanies';
import { getJobs } from '@/api/apiJobs';
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/use-fetch';
import { useSession, useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { State } from 'country-state-city';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const JobListing = () => {

 const [location, setLocation] = useState('');
 const [company_id, setCompany_id] = useState('');
 const [search_query, setSearch_query] = useState('');
 
 const {fn, data: jobs, loading: loadingJobs, error} = 
        useFetch(getJobs,{ location, company_id,searchQuery: search_query});
  const {fn: fnCompanies, data: companies} = useFetch(getCompanies);
  const { isLoaded, user} = useUser();
 console.log('isloaded:', isLoaded, "  ", user)
 useEffect(() => {
  if(isLoaded){
    fnCompanies();
  }
  },[isLoaded])


 console.log('jobs: ', jobs);
 useEffect(() => {
    if(isLoaded){
      
      fn();
    }
    },[isLoaded,location,company_id,search_query])

    const handleSearch = (e)=> {
      e.preventDefault();
      let formData = new FormData(e.target);
      const query = formData.get('search-query');
      
      if(query){
        setSearch_query(query);
      }
    }

    const clearFilters=()=> {
      setLocation('');
      setSearch_query('');
      setCompany_id('');
    }

    if(!isLoaded){
      return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
     }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl text-center sm:text-7xl pb-8'>
        Latest Jobs
      </h1>
      {/* adding filter here */}
      <form onSubmit={handleSearch} className='h-14 flex items-center gap-2 w-full mb-3'>
        <Input
          type="text"
          placeHolder="Search jobs by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2'>
    <Select value={location} onValueChange={(value)=> setLocation(value)}>
      <SelectTrigger >
        <SelectValue placeholder="filter for location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry('IN').map(({name}) => {
         return (   <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
         )
          })}
          </SelectGroup>
      </SelectContent>
    </Select>

    <Select value={company_id} onValueChange={(value)=> setCompany_id(value)}>
      <SelectTrigger >
        <SelectValue placeholder="filter by Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {companies && companies.map(({name,id}) => {
           return ( <SelectItem key={id} value={id}>
              {name}
            </SelectItem>)
          })}
          </SelectGroup>
      </SelectContent>
    </Select>

    <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">
      Clear Filter
    </Button>
      </div>
      
      {loadingJobs && (
        <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
      )}

      {loadingJobs===false &&  (

        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>{
          jobs && jobs.length>0 ?
          jobs.map((job) => {
          // chech saved job contains this job or not
          return <JobCard key={job.id} job={job}
                  isMyJob={false}
                  savedInit={job.saved.length > 0}
           />})
        : 
        <div>No Jobs Found</div>
        }
        </div>
      )}
    </div>
  )
}

export default JobListing