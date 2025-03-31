import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg'>
                <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Post a New Job</h1>
                <form onSubmit={submitHandler} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Title */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Title</Label>
                        <Input 
                            type="text" 
                            name="title" 
                            value={input.title} 
                            onChange={changeEventHandler} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Description</Label>
                        <Input 
                            type="text" 
                            name="description" 
                            value={input.description} 
                            onChange={changeEventHandler} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Requirements</Label>
                        <Input 
                            type="text" 
                            name="requirements" 
                            value={input.requirements} 
                            onChange={changeEventHandler} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Salary */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Salary</Label>
                        <Input 
                            type="text" 
                            name="salary" 
                            value={input.salary} 
                            onChange={changeEventHandler} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Location</Label>
                        <Input 
                            type="text" 
                            name="location" 
                            value={input.location} 
                            onChange={changeEventHandler} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Job Type */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Job Type</Label>
                        <Input 
                            type="text" 
                            name="jobType" 
                            value={input.jobType} 
                            onChange={changeEventHandler} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Experience Level</Label>
                        <Input 
                            type="text" 
                            name="experience" 
                            value={input.experience} 
                            onChange={changeEventHandler} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Number of Positions */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Number of Positions</Label>
                        <Input 
                            type="number" 
                            name="position" 
                            value={input.position} 
                            onChange={changeEventHandler} 
                            min="1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Select Company */}
                    {companies.length > 0 && (
                        <div className="col-span-2 space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Select Company</Label>
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <SelectValue placeholder="Choose a company" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem 
                                                key={company._id} 
                                                value={company?.name?.toLowerCase()}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className='col-span-2'>
                        {loading ? (
                            <Button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Post New Job
                            </Button>
                        )}
                        {companies.length === 0 && (
                            <p className='text-xs text-red-600 font-bold text-center mt-2'>
                                *Please register a company first before posting a job.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;