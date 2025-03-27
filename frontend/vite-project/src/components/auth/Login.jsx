import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/stationeries-keyboard-eyeglasses-white-marble-textured-background_23-2148061521.jpg?t=st=1735111496~exp=1735115096~hmac=2767afeb9d8fb651cac72f9e74f166b75cb73c75094842133e77c3cb89773e50&w=996')` }}>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-800 rounded-md p-4 my-10  bg-opacity-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-4'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="ladaniket6@gmail.com"
                        />
                    </div>

                    <div className='my-4'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="ladaniket6@gmail.com"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Employee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>

                    </div>
                    {
                          loading ? <Button className="w-full my-4 bg-gray-600 hover:bg-gray-700"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-gray-600 hover:bg-gray-700">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>SignUp</Link></span>

                </form>
                
            </div>
        </div>


    )
}

export default Login