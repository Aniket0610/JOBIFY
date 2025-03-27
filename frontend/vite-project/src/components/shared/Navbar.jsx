import React from "react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { USER_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { setUser } from "@/redux/authSlice"

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          {
            !user ? (
              <>
                <h1 className="text-4xl font-bold text-gray-200 cursor-pointer ">
                  <Link to="/">JOB<span className='text-gray-400'>IFY</span> </Link>
                </h1>
              </>
            ) : user.role === 'student' ? (
              <>
                <h1 className="text-4xl font-bold text-gray-200 cursor-pointer ">
                  <Link to="/">JOB<span className='text-gray-400'>IFY</span> </Link>
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-gray-200 cursor-pointer ">
                  <Link to="/admin/companies">JOB<span className='text-gray-400'>IFY</span> </Link>
                </h1>
              </>
            )
          }
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-bold medium items-center gap-9 text-gray-400'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li className="hover:text-gray-200 cursor-pointer"><Link to="/admin/companies">COMPANIES</Link></li>
                  <li className="hover:text-gray-200 cursor-pointer"><Link to="/admin/jobs">JOBS</Link></li>
                </>
              ) : (
                <>
                  <li className="hover:text-gray-200 cursor-pointer"><Link to="/">HOME</Link></li>
                  <li className="hover:text-gray-200 cursor-pointer"><Link to="/jobs">JOBS</Link></li>
                  <li className="hover:text-gray-200 cursor-pointer"><Link to="/browse">BROWSE</Link></li>
                  <li className="hover:text-gray-200 cursor-pointer"><Link to="/chatbot">JOBYBOT 🤖</Link></li>
                </>
              )
            }
          </ul>
          {
            !user ? (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-200 hover:text-gray-900">Login</Button></Link>
                <Link to="/signup"><Button className="bg-gray-500 text-white hover:bg-gray-600">Signup</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-gray-700">
                    {
                      user && user.role === 'student' && (<div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                      </div>
                      )
                    }
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
