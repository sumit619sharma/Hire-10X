import { useSession } from "@clerk/clerk-react";
import { useState } from "react";


const useFetch =(cb,options={}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const {session} = useSession();
    
    const fn =async (...args) => {
      
        setLoading(true)
        setError(null);
        try {
            const supabaseAccessToken = await session.getToken({
                template: 'supabase'
              })
          const resp =   await cb(supabaseAccessToken, options, ...args);            
        setData(resp);
        } catch (error) {
          console.log('useFetch hook error:', error);
           setError(error); 
        } finally{
            setLoading(false);
        }
    }
    return {fn, data,loading,error};
}

export default useFetch;