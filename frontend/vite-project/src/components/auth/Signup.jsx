import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle text input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file input changes
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            console.log("Signup Response:", res.data); // Debugging API response

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]); // ✅ Added `navigate` to dependencies

    return (
        <div className="min-h-screen bg-cover bg-center" 
            style={{ backgroundImage: `url('https://img.freepik.com/free-photo/stationeries-keyboard-eyeglasses-white-marble-textured-background_23-2148061521.jpg?t=st=1735111496~exp=1735115096~hmac=2767afeb9d8fb651cac72f9e74f166b75cb73c75094842133e77c3cb89773e50&w=996')` }}>
            
            <Navbar />
            
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-800 rounded-md p-4 my-10 bg-white bg-opacity-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Name" />
                    </div>

                    <div className='my-4'>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="example@gmail.com" />
                    </div>

                    <div className='my-4'>
                        <Label>Phone Number</Label>
                        <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="1234567890" />
                    </div>

                    <div className='my-4'>
                        <Label>Password</Label>
                        <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="********" />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label>Employee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 bg-gray-600 hover:bg-gray-700">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-gray-600 hover:bg-gray-700">Sign Up</Button>
                    )}

                    <span className='text-sm'>
                        Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
 