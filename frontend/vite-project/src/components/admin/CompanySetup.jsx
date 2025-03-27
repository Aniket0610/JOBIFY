import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null
        });
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-2xl mx-auto my-10 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                <h1 className="font-bold text-2xl text-gray-900 mb-6">Company Setup</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-gray-700">Company Name</Label>
                            <Input type="text" name="name" value={input.name} onChange={changeEventHandler} className="border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200" />
                        </div>
                        <div>
                            <Label className="text-gray-700">Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200" />
                        </div>
                        <div>
                            <Label className="text-gray-700">Website</Label>
                            <Input type="text" name="website" value={input.website} onChange={changeEventHandler} className="border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200" />
                        </div>
                        <div>
                            <Label className="text-gray-700">Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200" />
                        </div>
                        <div className="md:col-span-2">
                            <Label className="text-gray-700">Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} className="border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-purple-700 text-white hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center">
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : 'Update'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
