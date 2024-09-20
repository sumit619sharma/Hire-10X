import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
 const {user ,isLoaded,isSignedIn } = useUser();
    const {pathname} =useLocation();

 if(isLoaded && isSignedIn!==undefined && !isSignedIn){
    return <Navigate to={"/?sign-in=true"} />
 }

if(user && !user.unsafeMetadata.role && pathname!== "/onboarding"){
   return <Navigate to={"/onboarding"} />
}

    return (
    <div>{children}</div>
  )
}

export default ProtectedRoute