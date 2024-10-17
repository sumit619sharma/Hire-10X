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
   
    if(isSavedJob) {

        const {data, error:deleteError} = await supabase
            .from('saved_jobs')
            .delete()
            .eq('job_id', savedData.job_id)

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

export async function getSingleJob(token, {job_id}) {

    
    const supabase = await supabaseClient(token);
   
    const {data, error} = await supabase
    .from("jobs")
    .select(
        "*, company: companies(name,logo_url), applicants: applications(*)"
      )
    .eq('id', job_id)
    .single();


    if(error) {
        console.log('failed to get JOB:', error);
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