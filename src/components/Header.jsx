import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import hire10x from '../../public/hire10x.jpeg'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'
const Header = () => {
   const [showSignIn, setShowSignIn] = useState(false);
   const [search,setSearch] =useSearchParams();
  const {user , isLoaded} = useUser();

   useEffect(() => {
    if(search.get("sign-in")){
    setShowSignIn(true);
    }
   },[search])
  
   const handleOverlayClick =(e) => {
   
    if(e.target===e.currentTarget){
      setShowSignIn(false);
    setSearch({});
    }
  }
 
   return (
    <>
    <nav className='py-4 flex justify-between items-center'>
        <Link>
        <img src={hire10x} className='h-20 w-20 rounded-full'/>
        </Link>

        <div className='flex gap-8'>
        <SignedOut>
        <Button onClick={() => setShowSignIn(true)} variant="outline">Login</Button>
      </SignedOut>
      <SignedIn>
       {(user && user.unsafeMetadata.role==="recruiter") && <Link to="/post-job">
        <Button variant="destructive" className="rounded-full">
          <PenBox size={20} className='mr-2' />
          Post a Job
        </Button>
        </Link>}
        <UserButton appearance={{
          elements: {
            avatarBox: "w-10 h-10"
          }
        }} >
          <UserButton.MenuItems>
            <UserButton.Link
              label='My Jobs'
              labelIcon={<BriefcaseBusiness size={15} />}
              href='/my-jobs'
            />
              <UserButton.Link
              label='Saved Jobs'
              labelIcon={<Heart size={15} />}
              href='/saved-jobs'
            />
          </UserButton.MenuItems>
        </UserButton>
        
      </SignedIn>
      </div>
    </nav>

    {showSignIn && 
      <div className='fixed inset-0 flex justify-center items-center'
        onClick={handleOverlayClick}
      >
        <SignIn 
          signUpForceRedirectUrl='/onboarding'
          signUpFallbackRedirectUrl='/onboarding'
          />
      </div>
    }
    </>
  )
}

export default Header