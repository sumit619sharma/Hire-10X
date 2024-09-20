import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import LandingPage from "./pages/LandingPage"
import Onboarding from "./pages/Onboarding"
import JobListing from "./pages/job-listing"
import Job from "./pages/Job"
import PostJob from "./pages/post-job"
import SavedJob from "./pages/saved-job"
import MyJob from "./pages/my-job"
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import ProtectedRoute from "./components/Protected-route"
function App() {
  const Router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
            path: "/",
            element: <LandingPage />
        },
        {
          path: "/onboarding",
          element: <ProtectedRoute> <Onboarding />
                  </ProtectedRoute>
        },
        {
          path: "/jobs",
          element:<ProtectedRoute>
                    <JobListing />
                  </ProtectedRoute> 
        },
        {
          path: "/job/:id",
          element: <ProtectedRoute>
                     <Job />
                    </ProtectedRoute>
        },
        {
          path: "/post-job",
          element:<ProtectedRoute> 
                   <PostJob />
                   </ProtectedRoute>
        },
        {
          path: "/saved-jobs",
          element: <ProtectedRoute>
            <SavedJob />
            </ProtectedRoute>
        },
        {
          path: "/my-jobs",
          element: <ProtectedRoute>
                   <MyJob />
                  </ProtectedRoute>
        },
      ]
    }
  ])

  return (
   
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <RouterProvider router={Router} />
    </ThemeProvider>
   
   
  )
}

export default App
