import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import UpdateJob from './components/admin/UpdateJob'
import Chatbot from './components/Chatbot'



const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/jobs',
    element: (
      <ProtectedRoute>
        <Jobs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/browse',
    element: (
      <ProtectedRoute>
        <Browse />
      </ProtectedRoute>
    ),
  },
  {
    path: '/description/:id',
    element: (
      <ProtectedRoute>
        <JobDescription />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute >
        <Profile />
      </ProtectedRoute>
    ),
  },
  // admin pages starts here
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id",
    element:<ProtectedRoute><UpdateJob/></ProtectedRoute> 
  },
  {
    path: '/chatbot',
    element: (
      <ProtectedRoute>
        <Chatbot />
      </ProtectedRoute>
    )
  }

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
