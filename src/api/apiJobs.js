import supabaseClient from "@/utils/supabase"

export const getJobs = async (token ,{location, company_id, searchQuery}) => {

    const supabase = await supabaseClient(token);
   
    let query = supabase.from("jobs").select("*, company: companies(name,logo_url), saved: saved_jobs(id)");
    
    if(location){
        query = query.eq('location', location);
    }
    if(company_id){
        query = query.eq('company_id', company_id);
    }
    
    if(searchQuery){
        query = query.ilike('title', `%${searchQuery}%`)
    }

    const {data,error} = await query;

    if(error) {
        console.error('get jobs error:' ,error);
        return null;
        }

        return data;
}

export const saveJob = async (token ,{isSavedJob}, savedData) => {

    const supabase = await supabaseClient(token);
   console.log('is saved job:', isSavedJob);
   console.log(' saved job data:', savedData);
   
    if(isSavedJob) {

        const {data, error:deleteError} = await supabase
            .from('saved_jobs')
            .delete()
            .eq('job_id', savedData.job_id)
            .eq('user_id', savedData.user_id);

            if(deleteError) {
                console.error('failed to delete saved sob' ,deleteError);
                return data;
                }
        
                return data;

        } else {

            const {data, error:insertError} = await supabase
                .from('saved_jobs')
                .insert([savedData])
                .select()

                if(insertError){
                    console.log('failed to insert save job', insertError)
                    return data;
                }
                console.log('insert saved job:', data);
                return data;
    }


}

export async function getSingleJob(token,  {job_id}) {

    const supabase = await supabaseClient(token);
   
    const {data, error} = await supabase
    .from("jobs")
    .select(
        "*, company: companies(name,logo_url), applicants: applications(*)"
      )
    .eq('id', job_id)
    .single();


    if(error) {
        console.error('failed to get JOB:', error);
        return null;
    }
    return data;
}

export async function updateHiringStatus(token, {job_id}, isOpen) {

    
    const supabase = await supabaseClient(token);
   
    const {data, error} = await supabase
    .from("jobs")
    .update({isOpen})
    .eq('id', job_id)
    .select();

    if(error) {
        console.log('Error updating Job:', error);
        return null;
    }
    return data;
}

export async function addNewJob(token, _, jobData) {

    
    const supabase = await supabaseClient(token);
   
    const {data, error} = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

    if(error) {
        console.log('Error creating Job:', error);
        return null;
    }
    return data;
}

export async function getSavedJobs(token) {

    
    const supabase = await supabaseClient(token);
   
    const {data, error} = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(*))");

    if(error) {
        console.log('Error fetching saved Job:', error);
        return null;
    }
    return data;
}

export async function getMyJobs(token, {recruiter_id}) {

    
    const supabase = await supabaseClient(token);
   
    const {data, error} = await supabase
    .from("jobs")
    .select("*, company: companies(*)")
    .eq("recruiter_id", recruiter_id);

    if(error) {
        console.log('Error fetching my Jobs:', error);
        return null;
    }
    return data;
}

export async function deleteJob(token, {job_id}) {

    
    const supabase = await supabaseClient(token);
   
    const {data, error: deleteError} = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

    if(deleteError) {
        console.log('Error deleting Job:', deleteError);
        return null;
    }
    return data;
}